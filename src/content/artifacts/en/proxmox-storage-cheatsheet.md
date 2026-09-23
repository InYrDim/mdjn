---
title: 'Proxmox VE Storage Cheatsheet'
description: 'Reference for Proxmox VE storage management: pvesm, the local vs local-lvm concept, diagnosing a full disk, and step-by-step root partition and lvmthin extension.'
lang: 'en'
type: 'cheatsheet'
tags: ['proxmox', 'lvm', 'storage', 'virtualization']
pubDate: 2026-09-23
---

## 1. Check All Storage

| Command | What it does |
|---|---|
| `pvesm status` | Summary of all storage: type, status, total/used/available/% |
| `pvesm status --enabled` | Only active storage |
| `pvesm status --content iso` | Filter storage that accepts a content type (`iso`, `images`, `backup`, `vztmpl`, `rootdir`) |
| `cat /etc/pve/storage.cfg` | Detailed config per storage (type, content types, node access) |
| `lsblk` | Physical disks and partitions at the OS level |
| `df -h` | Mounted filesystem capacity |

**GUI:** Datacenter → Storage (full list) · click a storage → **Summary** tab for usage graphs.

---

## 2. The Concept: `local` vs `local-lvm`

| | `local` (dir) | `local-lvm` (lvmthin) |
|---|---|---|
| Holds | ISOs, CT templates, backups, snippets | VM/CT disks only |
| Basis | Files on a regular filesystem | LVM thin block storage |
| Physical location | Root partition (`/`) | Separate Logical Volume (`pve/data`) |
| Resize with | `lvextend` + `resize2fs` | `lvextend` only (no `resize2fs`) |

When installing a VM: the **installer ISO** is read from `local` → the resulting **OS disk** lands in `local-lvm`.

---

## 3. Diagnosing a Full Disk/Storage

```bash
# Find the folders eating the most space
du -xh / --max-depth=1 | sort -rh
du -xh /var --max-depth=1 | sort -rh

# Check systemd journal size
journalctl --disk-usage
journalctl --vacuum-time=3d        # drop logs older than 3 days
journalctl --vacuum-size=200M      # or cap by size

# Check and clean the apt cache
du -sh /var/cache/apt/archives
apt clean

# Check for piled-up old kernels
dpkg -l | grep pve-kernel
apt autoremove

# Check for failed-upload leftovers (often the culprit behind a full /var/tmp)
ls -lah /var/tmp/
rm /var/tmp/pveupload-xxxxxxxx     # delete manually if a big file is stuck
```

---

## 4. Extend `local` (dir) — via the Root Partition

`local` lives on the **root** partition, so extending `local` means extending the root partition through LVM.

**Flow:** Physical disk → Partition → Physical Volume → Volume Group → Logical Volume (`root`) → Filesystem

### Step 1 — Is there free space left in the VG?

```bash
lsblk
vgs
```

If the `VFree` column in `vgs` already has a value → jump to **Step 3**.
If the partition does not yet use the full physical disk → continue to **Step 2**.

### Step 2 — Extend the partition (using `fdisk`, no extra tools)

```bash
fdisk -l /dev/sda
```

Note the **Start** sector of the LVM partition (example: `1050624`) — it must be retyped exactly later.

```bash
fdisk /dev/sda
```

Inside the interactive prompt:

```
d              # delete partition
<number>       # pick the number of the partition to resize

n              # new partition
<same number>  # same partition number as before
<start sector> # retype the recorded start sector — MUST match exactly
<Enter>        # last sector: accept the default (to end of disk)
N              # if asked "remove signature?" → ANSWER N, NOT Y

p              # print, double-check the partition before committing
w              # write — flush changes to disk
```

> ⚠️ `d` then `n` is safe — nothing changes on disk until `w` is pressed. Verify with `p` first.

```bash
partprobe /dev/sda
lsblk           # confirm the partition has grown
```

### Step 3 — Extend the Physical Volume

```bash
pvresize /dev/sda3
vgs             # check the VFree that is now usable
```

### Step 4 — Extend the `root` Logical Volume

```bash
lvextend -L +20G /dev/pve/root       # add a specific amount
# OR
lvextend -l +100%FREE /dev/pve/root  # use all remaining VFree
```

### Step 5 — Resize the filesystem (REQUIRED!)

```bash
resize2fs /dev/mapper/pve-root
```

Without this step, the LV is bigger but the filesystem does not know it, so the space stays unusable.

### Verify

```bash
df -h /
pvesm status
```

---

## 5. Extend `local-lvm` (lvmthin)

Simpler, **no** `resize2fs` needed:

```bash
pvresize /dev/sda3        # if not already done above
lvextend -l +100%FREE /dev/pve/data
```

Verify:

```bash
pvesm status
lvs
```

---

## 6. Critical Points

- `resize2fs` is required after `lvextend` for `root` (ext4). Not needed for `data` (lvmthin).
- The `fdisk` start sector must match the previous one exactly.
- When fdisk asks "remove signature?" → always answer **N** if the partition holds the LVM you want to keep.
- `local-lvm` cannot hold ISOs/templates/backups — only VM/CT disks.
- Large `/var/tmp/pveupload-*` files are usually failed uploads — safe to delete when no upload process is running (`ps aux | grep pveupload`).
