---
name: site-artifacts
description: >-
  Menambah, mengedit, atau mengelola entri di halaman "Artifacts" (/artifacts) pada website ini — cheatsheet, ISO, dokumen, tool, atau resource lain yang bisa diunduh/dibaca langsung. Setiap artifact adalah satu file Markdown berfrontmatter di src/content/artifacts/en/ atau src/content/artifacts/id/. Gunakan skill ini setiap kali user minta menambah/mengedit resource ke halaman Artifacts situs, menyebut src/content/artifacts, minta buatkan cheatsheet/ISO/tool entry baru, minta versi terjemahan (en/id) dari sebuah artifact, atau minta tambah kategori (type) baru di halaman itu — bahkan kalau user tidak menyebut kata "frontmatter" atau "schema" secara eksplisit. Catatan penting, ini sama sekali tidak berhubungan dengan fitur Artifact/canvas bawaan Claude — ini adalah content resource page milik website user sendiri.
---

# Skill: Artifact Halaman /artifacts

Skill ini membantu menambah atau mengubah entri di halaman resource **Artifacts**
milik website user (Astro content collection). Satu artifact = satu file
Markdown di `src/content/artifacts/<lang>/<slug>.md`. Tidak ada kode yang perlu
disentuh untuk kasus normal — cukup file Markdown yang valid.

Ikuti alur kerja di bawah setiap kali diminta menambah/mengedit artifact,
karena beberapa aturan di sini bersifat hard-validation (build akan gagal
kalau dilanggar).

## 1. Alur kerja menambah artifact baru

1. **Tentukan slug.** Slug = nama file (tanpa `.md`) = URL akhir
   (`/artifacts/<slug>`, atau `/id/artifacts/<slug>` untuk versi Indonesia).
   Gunakan kebab-case yang deskriptif, mis. `linux-cheatsheet.md`.
2. **Tentukan jenis konten** — ini menentukan nilai `url` (lihat §3):
   - File kecil (PDF, config, dokumen) → commit ke `public/artifacts/`.
   - File besar (ISO, image, arsip) → JANGAN commit, pakai link eksternal absolut.
   - Cheatsheet yang isinya langsung dibaca di halaman (tanpa file) → kosongkan `url`, tulis konten di body Markdown.
3. **Tentukan bahasa (`lang`).** Kalau user minta dwibahasa, buat DUA file
   dengan slug yang **sama persis** di `en/` dan `id/` — language switcher
   dan hreflang menghubungkannya otomatis berdasarkan slug yang sama. Kalau
   user cuma minta satu bahasa, cukup buat satu file; jangan buat file
   placeholder kosong untuk bahasa yang tidak diminta.
4. **Tulis frontmatter** sesuai tabel di §2, lalu isi body Markdown sesuai
   konvensi di §4.
5. **Cek ulang dengan checklist §6** sebelum menyampaikan hasil ke user.
6. Kalau ada perintah build yang bisa dijalankan (`npm run build`), tawarkan
   atau jalankan untuk validasi schema — error frontmatter baru ketahuan
   saat build.

Tiga template siap-copy ada di `assets/`:
- `assets/template-file-lokal.md` — untuk file kecil yang di-commit ke `public/artifacts/`.
- `assets/template-link-eksternal.md` — untuk ISO/file besar yang di-link eksternal.
- `assets/template-cheatsheet-baca-langsung.md` — untuk cheatsheet tanpa file, isi penuh di body.

Mulai dari template yang paling cocok, jangan mengetik frontmatter dari nol,
supaya urutan dan format field konsisten.

## 2. Frontmatter

### Field wajib

| Field | Tipe | Keterangan |
|---|---|---|
| `title` | string | Judul, tampil di listing & halaman detail. |
| `description` | string | 1–2 kalimat, tampil di listing + meta SEO. |
| `lang` | `'en'` \| `'id'` | Bahasa file ini — menentukan di halaman locale mana artifact muncul, bukan sekadar bahasa kontennya. |
| `type` | `'iso'` \| `'document'` \| `'cheatsheet'` \| `'tool'` \| `'other'` | Kategori. Menentukan kelompok di listing + badge. Kalau tidak ada yang cocok, lihat §5 sebelum memaksakan salah satu. |
| `url` | string *(opsional tapi menentukan perilaku)* | Lihat aturan di §3. Kosongkan untuk cheatsheet baca-langsung. |
| `pubDate` | tanggal `YYYY-MM-DD` | Dipakai untuk urutan listing. |

### Field opsional

| Field | Tipe | Default | Keterangan |
|---|---|---|---|
| `tags` | array string | `[]` | Tag bebas, tampil sebagai badge. |
| `size` | string | — | Ditulis manual, gaya manusiawi: `'4.7 GB'`, `'1.2 MB'`, `'~700 MB'`. JANGAN dihitung/diestimasi otomatis dari file — kalau ukuran tidak diketahui, tanyakan ke user atau biarkan field ini kosong. |
| `updatedDate` | tanggal | — | Isi saat merevisi konten yang sudah publish. Mengaktifkan label "Diperbarui \<tanggal\>" otomatis di halaman detail. |
| `draft` | boolean | `false` | `true` = sembunyikan dari listing, sitemap, dan routing. Set `true` kalau user minta disiapkan dulu tapi belum tayang. |

## 3. Aturan `url` (hard rules)

| Jenis file | Cara host | Nilai `url` |
|---|---|---|
| Kecil (PDF cheatsheet, dokumen, config) | Commit ke `public/artifacts/` | Path situs: `/artifacts/nama-file.ext` |
| Besar (ISO, image, arsip ratusan MB) | Jangan commit — link eksternal | URL absolut: `https://mirror.example.org/...` |
| Cheatsheet baca langsung | Tidak ada file, konten di body | Kosongkan `url` |

Aturan yang WAJIB dipatuhi, karena build akan menolak kalau dilanggar:

- Kalau `url` diisi, **harus** diawali `https://` atau `/`. Selain itu = invalid.
- File besar **tidak pernah** ikut di-commit ke git. `.gitignore` sudah
  memblokir `*.iso`, `*.img`, `*.zip`, `*.tar*`, `*.7z`, `*.rar` di
  `public/artifacts/` — jangan coba memaksakan commit file jenis ini di sana;
  kalau user minta, arahkan ke pola link eksternal.
- Tombol di halaman detail menyesuaikan otomatis berdasarkan `url` — Claude
  tidak perlu (dan tidak bisa) mengatur tombolnya secara manual:
  - path lokal (`/...`) → tombol "⬇ Unduh" (`download`)
  - eksternal (`https://...`) → tombol "↗ Buka tautan" (tab baru)
  - tanpa `url` → tanpa tombol sama sekali

## 4. Body Markdown

Ditulis bebas, dirender penuh dengan typography (`prose`). Fitur berikut
**otomatis aktif** di halaman detail tanpa perlu apa pun di markdown-nya —
jangan menambahkan tombol copy manual atau styling code block sendiri,
itu sudah ditangani komponen halaman:

- Tombol Copy di setiap code block (muncul saat hover/fokus keyboard).
- Code block dual-theme (github-light/github-dark), ikut light/dark mode situs.
- Syntax highlighting Shiki untuk semua fenced code block.

Konvensi urutan section yang disarankan (ikuti kecuali user minta struktur lain):

1. **Konteks singkat** — apa ini dan kenapa disimpan.
2. **Cara pakai / instal** — langkah atau perintah dalam code block.
3. **Verifikasi** — checksum (`sha256sum`), versi, sumber.
4. **Catatan** — lisensi, batasan, link terkait (boleh link ke artifact lain di situs, mis. `/artifacts/slug-lain`).

## 5. Menambah kategori (`type`) baru

Kalau `iso/document/cheatsheet/tool/other` tidak cukup untuk kebutuhan user,
tambah kategori baru butuh perubahan di TIGA tempat sekaligus — jangan cuma
menulis `type` baru di frontmatter tanpa mengubah ketiganya, karena build
akan gagal validasi enum:

1. `src/content.config.ts` — tambahkan nilai baru di `z.enum([...])` pada field `type`.
2. `src/i18n/ui.ts` — tambahkan label `'artifact.type.<tipe>'` di blok `en` **dan** `id`.
3. `src/components/views/ArtifactIndexPage.astro` — tambahkan ke array `typeOrder` (menentukan urutan kelompok di listing).

Selalu konfirmasi ke user nama kategori barunya sebelum eksekusi, karena ini
mengubah schema global yang berlaku untuk semua artifact lain, bukan cuma satu file.

## 6. Checklist sebelum publish

Cek ulang setiap file yang baru dibuat/diedit terhadap daftar ini sebelum
menyampaikan hasil ke user:

- [ ] `lang` sesuai dengan folder tempat file disimpan (`en/` atau `id/`)
- [ ] `type` salah satu dari enum yang valid (atau sudah ditambah lewat §5)
- [ ] `url` diawali `https://` atau `/`, ATAU sengaja dikosongkan untuk cheatsheet baca-langsung
- [ ] File besar (ISO/image/arsip) TIDAK ikut disalin/commit ke `public/artifacts/`
- [ ] `size` ditulis manual dan masuk akal (bukan hasil hitung otomatis)
- [ ] `pubDate` terisi; `draft: true` tetap terpasang kalau belum mau ditampilkan
- [ ] Kalau dwibahasa: slug di `en/` dan `id/` sama persis
- [ ] `npm run build` (kalau bisa dijalankan) lulus tanpa error schema

## 7. Kesalahan umum yang harus dihindari

- Mengisi `size` dengan angka hasil `ls -lh` mentah-mentah tanpa dirapikan — field ini memang untuk ditulis manual gaya manusiawi, bukan output command apa adanya.
- Membuat file kosong di bahasa yang tidak diminta hanya supaya "lengkap dwibahasa" — biarkan fallback bahasa lain menangani, sesuai desain sistemnya.
- Lupa bahwa `lang` menentukan halaman locale tempat file muncul, bukan sekadar bahasa isi teksnya — file berisi teks Inggris tapi `lang: 'id'` akan muncul di halaman `/id/artifacts`, bukan `/artifacts`.
- Menaruh file besar di `public/artifacts/` — akan diblokir `.gitignore` dan tidak akan ter-commit meski terlihat berhasil disalin secara lokal.