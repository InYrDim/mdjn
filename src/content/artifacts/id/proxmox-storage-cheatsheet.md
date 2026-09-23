---
title: 'Proxmox VE Storage Cheatsheet'
description: 'Referensi manajemen storage Proxmox VE: pvesm, konsep local vs local-lvm, diagnosa disk penuh, sampai extend partisi root dan lvmthin langkah demi langkah.'
lang: 'id'
type: 'cheatsheet'
tags: ['proxmox', 'lvm', 'storage', 'virtualisasi']
pubDate: 2026-09-23
---

## 1. Cek Semua Storage

| Perintah | Fungsi |
|---|---|
| `pvesm status` | Ringkasan semua storage: type, status, total/used/available/% |
| `pvesm status --enabled` | Cuma storage yang aktif |
| `pvesm status --content iso` | Filter storage yang nerima content type tertentu (`iso`, `images`, `backup`, `vztmpl`, `rootdir`) |
| `cat /etc/pve/storage.cfg` | Konfigurasi detail tiap storage (type, content type, node akses) |
| `lsblk` | Disk fisik & partisi level OS |
| `df -h` | Kapasitas filesystem yang ter-mount |

**GUI:** Datacenter → Storage (daftar semua) · klik storage → tab **Summary** untuk grafik usage.

---

## 2. Konsep: `local` vs `local-lvm`

| | `local` (dir) | `local-lvm` (lvmthin) |
|---|---|---|
| Isi | ISO, template CT, backup, snippet | Disk VM/CT saja |
| Basis | File di filesystem biasa | Block storage LVM thin |
| Letak fisik | Partisi root (`/`) | Logical Volume terpisah (`pve/data`) |
| Resize pakai | `lvextend` + `resize2fs` | `lvextend` saja (tanpa `resize2fs`) |

Saat install VM: **ISO installer** dibaca dari `local` → **disk OS hasil install** disimpan di `local-lvm`.

---

## 3. Diagnosa Disk/Storage Penuh

```bash
# Cari folder yang paling makan space
du -xh / --max-depth=1 | sort -rh
du -xh /var --max-depth=1 | sort -rh

# Cek ukuran log systemd
journalctl --disk-usage
journalctl --vacuum-time=3d        # bersihin log > 3 hari
journalctl --vacuum-size=200M      # atau batasi ke ukuran tertentu

# Cek & bersihin cache apt
du -sh /var/cache/apt/archives
apt clean

# Cek kernel lama yang numpuk
dpkg -l | grep pve-kernel
apt autoremove

# Cek sisa file upload gagal (sering jadi biang keladi /var/tmp penuh)
ls -lah /var/tmp/
rm /var/tmp/pveupload-xxxxxxxx     # hapus manual kalau ketemu file besar nyangkut
```

---

## 4. Extend `local` (dir) — via extend partisi root

`local` nempel di partisi **root**, jadi extend `local` = extend partisi root lewat LVM.

**Alur:** Disk fisik → Partisi → Physical Volume → Volume Group → Logical Volume (`root`) → Filesystem

### Langkah 1 — Cek ada sisa space kosong di VG?

```bash
lsblk
vgs
```

Kalau kolom `VFree` di `vgs` udah ada isinya → langsung ke **Langkah 3**.
Kalau partisi belum makan semua kapasitas disk fisik → lanjut **Langkah 2**.

### Langkah 2 — Extend partisi (pakai `fdisk`, tanpa tool tambahan)

```bash
fdisk -l /dev/sda
```

Catat angka **Start** partisi LVM-nya (contoh: `1050624`) — harus sama persis nanti.

```bash
fdisk /dev/sda
```

Di dalam prompt interaktif:

```
d              # delete partition
<nomor>        # pilih nomor partisi yang mau di-resize

n              # new partition
<nomor sama>   # nomor partisi sama seperti tadi
<start sector> # ketik ULANG start sector yang dicatat — WAJIB sama persis
<Enter>        # last sector: pakai default (sampai akhir disk)
N              # kalau ditanya "remove signature?" → JAWAB N, JANGAN Y

p              # print, cek ulang partisi sebelum commit
w              # write — tulis perubahan ke disk
```

> ⚠️ `d` lalu `n` itu aman — perubahan cuma di memory sampai `w` ditekan. Cek dulu pakai `p` sebelum `w`.

```bash
partprobe /dev/sda
lsblk           # konfirmasi partisi udah membesar
```

### Langkah 3 — Extend Physical Volume

```bash
pvresize /dev/sda3
vgs             # cek VFree yang sekarang bisa dipakai
```

### Langkah 4 — Extend Logical Volume `root`

```bash
lvextend -L +20G /dev/pve/root       # nambah jumlah spesifik
# ATAU
lvextend -l +100%FREE /dev/pve/root  # pakai semua sisa VFree
```

### Langkah 5 — Resize filesystem (WAJIB!)

```bash
resize2fs /dev/mapper/pve-root
```

Tanpa langkah ini, LV udah gede tapi filesystem-nya belum "tau", space gak kepake.

### Verifikasi

```bash
df -h /
pvesm status
```

---

## 5. Extend `local-lvm` (lvmthin)

Lebih simpel, **tanpa** `resize2fs`:

```bash
pvresize /dev/sda3        # kalau belum dilakukan di atas
lvextend -l +100%FREE /dev/pve/data
```

Verifikasi:

```bash
pvesm status
lvs
```

---

## 6. Titik Kritis

- `resize2fs` wajib setelah `lvextend` untuk `root` (ext4). Untuk `data` (lvmthin) tidak perlu.
- Start sector di `fdisk` harus sama persis dengan sebelumnya.
- Saat fdisk nanya "remove signature?" → selalu jawab **N** kalau partisinya isi LVM yang mau dipertahankan.
- `local-lvm` gak bisa dipakai buat ISO/template/backup — cuma disk VM/CT.
- File `/var/tmp/pveupload-*` yang besar biasanya sisa upload gagal — aman dihapus kalau gak ada proses upload aktif (`ps aux | grep pveupload`).
