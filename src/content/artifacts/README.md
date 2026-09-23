# 📦 Format Artifact

Panduan menambahkan resource baru ke halaman **Artifacts** (`/artifacts`).
Satu artifact = satu file Markdown. Tidak perlu menyentuh kode apa pun.

---

## 1. Lokasi & Nama File

```
src/content/artifacts/
├── en/<slug>.md     ← versi Inggris
└── id/<slug>.md     ← versi Indonesia
```

- **Nama file = slug = URL.** `linux-cheatsheet.md` → `/artifacts/linux-cheatsheet`
  (untuk versi `id`: `/id/artifacts/linux-cheatsheet`).
- **Slug sama di kedua folder = dianggap terjemahan.** Language switcher dan
  hreflang otomatis menghubungkannya.
- Tidak wajib dwibahasa. Kalau baru ada satu versi, biarkan saja — halaman
  bahasa satunya otomatis menangani fallback.

## 2. Frontmatter

### Wajib

| Field | Tipe | Keterangan |
|---|---|---|
| `title` | string | Judul, tampil di listing & halaman detail. |
| `description` | string | 1–2 kalimat. Tampil di listing + meta SEO. |
| `lang` | `'en'` \| `'id'` | Bahasa file ini — bukan bahasa kontennya saja, tapi penentu di halaman locale mana ia muncul. |
| `type` | `'iso'` \| `'document'` \| `'cheatsheet'` \| `'tool'` \| `'other'` | Kategori. Menentukan kelompok di listing + badge. |
| `url` | string | Lokasi file-nya — lihat aturan di §3. |
| `pubDate` | tanggal | Format `YYYY-MM-DD`. Dipakai untuk urutan listing. |

### Opsional

| Field | Tipe | Default | Keterangan |
|---|---|---|---|
| `tags` | array string | `[]` | Tag bebas, tampil sebagai badge. |
| `size` | string | — | Ukuran **ditulis manual**, gaya manusiawi: `'4.7 GB'`, `'1.2 MB'`, `'\~700 MB'`. Tidak dihitung otomatis. |
| `updatedDate` | tanggal | — | Isi saat merevisi konten. |
| `draft` | boolean | `false` | `true` = sembunyikan dari listing, sitemap & routing (mode draft). |

## 3. Aturan `url`

| Jenis file | Cara host | Nilai `url` |
|---|---|---|
| **Kecil** (PDF cheatsheet, dokumen, config) | Commit ke `public/artifacts/` | Path situs: `/artifacts/nama-file.ext` |
| **Besar** (ISO, image, arsip ratusan MB) | Jangan commit — link eksternal | URL absolut: `https://mirror.example.org/...` |

Aturan hard:

- `url` **harus** diawali `https://` atau `/` — selain itu akan ditolak saat build.
- File besar **tidak pernah masuk git**. `.gitignore` sudah memblokir
  `*.iso`, `*.img`, `*.zip`, `*.tar*`, `*.7z`, `*.rar` di `public/artifacts/`.
- Tombol di halaman detail menyesuaikan otomatis:
  path lokal → **⬇ Unduh** (attribute `download`), eksternal → **↗ Buka tautan** (tab baru).

## 4. Body Markdown

Bebas, dirender dengan typography penuh (`prose`). Konvensi yang disarankan
untuk konsistensi antar-artifact:

1. **Konteks singkat** — apa ini dan kenapa disimpan.
2. **Cara pakai / instal** — langkah atau perintah dalam code block.
3. **Verifikasi** — checksum (`sha256sum`), versi, sumber.
4. **Catatan** — lisensi, batasan, link terkait (bisa link ke artifact lain di situs).

## 5. Contoh Lengkap

### File lokal (cheatsheet kecil)

```markdown
---
title: 'Vim Motion Cheatsheet'
description: 'Referensi satu halaman untuk gerakan dan editing Vim.'
lang: 'id'
type: 'cheatsheet'
tags: ['vim', 'editor']
size: '300 KB'
url: '/artifacts/vim-motions.pdf'
pubDate: 2026-09-23
---

Cara pakai: tempel di dinding. ...
```

### Link eksternal (ISO besar)

```markdown
---
title: 'Debian Netinstall Mirror'
description: 'ISO installer Debian stable dari mirror resmi.'
lang: 'en'
type: 'iso'
tags: ['debian', 'linux', 'installer']
size: '~700 MB'
url: 'https://cdimage.debian.org/debian-cd/current/amd64/iso-cd/'
pubDate: 2026-09-23
---

Verify with sha256sum before flashing to USB. ...
```

## 6. Menambah Tipe Kategori Baru

Kalau `iso/document/cheatsheet/tool/other` tidak cukup, tambah kategori baru
butuh 3 tempat:

1. `src/content.config.ts` — tambah di `z.enum([...])` pada field `type`.
2. `src/i18n/ui.ts` — tambah label `'artifact.type.<tipe>'` di blok `en` **dan** `id`.
3. `src/components/views/ArtifactIndexPage.astro` — tambahkan di array `typeOrder`
   (menentukan urutan kelompok di listing).

## 7. Checklist Sebelum Publish

- [ ] `lang` sesuai folder (`en/` atau `id/`)
- [ ] `type` salah satu dari enum yang valid
- [ ] `url` diawali `https://` atau `/`; file besarnya **tidak** ikut di-commit
- [ ] `size` ditulis manual dan masuk akal
- [ ] `pubDate` terisi; `draft: true` masih terpasang kalau belum mau ditampilkan
- [ ] `npm run build` lulus (schema tervalidasi saat build — error frontmatter akan tertangkap di sini)
