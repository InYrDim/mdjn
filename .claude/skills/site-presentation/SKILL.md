---
name: site-presentation
description: >-
  Menambah, mengaktifkan, atau mengubah fitur Presentation Mode di website ini — slide deck overlay yang dibangun dari konten Markdown halaman saat tombol diklik. Gunakan skill ini setiap kali user minta "mode presentasi", "presentation mode", "slide deck", "PPT dari blog post/artifact", minta mengaktifkan presentation mode di halaman yang belum memilikinya, minta mengubah perilaku deck (navigasi, pembagian slide, chrome, shortcut), melaporkan bug pada deck slide, atau minta fitur turunannya (presenter notes, timer, export) — bahkan kalau user tidak menyebut nama komponen PresentationMode.astro secara eksplisit. Bukan untuk membuat file deck `.html` standalone — itu tugas skill html-ppt. Konvensi deck mengikuti skill html-ppt (pattern .slide + .is-active, keyboard-first, deep-link #/N), diadaptasi ke design-token situs.
---

# Skill: Presentation Mode (slide deck dari konten Markdown)

Skill ini mendokumentasikan fitur **Presentation Mode** milik website user:
satu komponen reusable `src/components/PresentationMode.astro` yang mengubah
konten Markdown halaman (blog post, artifact, atau halaman lain yang merender
koleksi) menjadi slide deck overlay, dibangun **saat tombol diklik** dari DOM
yang hidup — bukan saat build.

Ikuti alur kerja di bawah setiap kali diminta menambah/mengubah fitur ini,
karena beberapa aturan di sini bersifat desain-fix (melanggarnya merusak SEO
atau mode gelap situs).

## 1. Cara kerja (baca dulu sebelum mengubah apa pun)

- **Dibangun saat klik, bukan saat build.** HTML statis yang dilihat crawler
  TIDAK berubah sama sekali — deck dibentuk dari `contentSelector` di DOM
  yang hidup setiap kali deck dibuka. Jangan pindahkan logika ini ke build
  time; itu akan menggandakan konten di HTML output.
- **Satu komponen, banyak halaman.** Komponen dirender sekali per halaman
  dengan props `contentSelector` (wajib), `title`, `lang`. Tidak ada halaman
  yang punya logika deck sendiri — semua behavior ada di komponen.
- **Konvensi deck dari skill `html-ppt`**, diadaptasi:
  - Satu `.pslide` per halaman slide; `.is-active` yang ditampilkan.
  - Chrome deck: progress bar (atas), judul + counter `N / total` + tombol
    close (kanan atas), hint keyboard (bawah).
  - Keyboard-first: ← → / Space / PgUp / PgDn / Home / End navigasi, `F`
    fullscreen, `Esc` keluar.
  - Touch: swipe kiri/kanan untuk navigasi.
  - Deep-link `#/N`: URL deck berubah per slide (`/blog/slug#/2`), dipulihkan
    saat dibuka lewat link, dan dihapus saat keluar.
  - `prefers-reduced-motion` dimatikan animasinya.
- **Design token, bukan warna literal.** Semua warna deck memakai
  `var(--color-paper)`, `var(--color-ink)`, `var(--color-accent)`,
  `var(--color-line)` sehingga deck otomatis mengikuti light/dark mode situs.
  JANGAN pernah menaruh hex literal di CSS deck — itu yang paling sering
  salah dan merusak dark mode.
- **Event delegation.** Semua listener (klik, keydown, touch) terpasang di
  `document` dan idempotent — pola yang sama dengan ShareButton/ThemeToggle —
  supaya tetap berfungsi lintas navigasi Astro view transitions
  (`astro:page-load` tidak dipakai karena listener tidak pernah di-rebind).

## 2. Pemetaan konten → slide

`buildSlides()` membagi konten dengan aturan tetap ini — jangan diubah
sepihak tanpa konfirmasi user, karena menentukan ritme semua deck di situs:

| Elemen sumber | Hasil di deck |
|---|---|
| Judul halaman (prop `title`) | Slide cover (data-kind="title") |
| Setiap `h1`–`h3` | Memulai slide baru |
| Heading tanpa isi di bawahnya | Slide section divider (data-kind="section") |
| `<hr>` | Slide divider "· · ·" |
| List `ul`/`ol` lebih dari 8 item | Dipecah antar beberapa slide (MAX_LIST_ITEMS) |
| Blok kosong / tanpa teks | Dibuang (kecuali berisi img/video/iframe) |

Detail penting saat meng-clone konten ke slide (`cloneBlock()`):

- Tombol copy-code hasil injeksi runtime ArtifactPage **dihapus** dari clone.
- Semua `<a href>` diberi `target="_blank"` supaya klik saat presentasi tidak
  menavigasi keluar dari deck.
- **Mermaid dan code block di-clone dalam bentuk yang sudah ter-render** —
  deck dibuka setelah `astro:page-load`, jadi diagramnya sudah SVG/iframe.
  Jangan mencoba merender ulang mermaid di dalam deck.
- Slide yang kontennya meluap di-scale otomatis oleh `fitSlide()` (minimum
  scale 0.55) — dipanggil saat `show()` dan saat `resize`.

## 3. Mengaktifkan presentation mode di halaman baru

Tiga langkah pemasangan, lalu satu langkah validasi — ikuti persis
(contoh nyata: `src/components/views/BlogPostPage.astro`):

1. **Import** komponen di file view (bukan file route):

   ```astro
   import PresentationMode from '../../components/PresentationMode.astro';
   ```

2. **Render** di dalam elemen yang punya akses ke judul + lang, dengan
   selector yang mengarah ke container konten Markdown halaman itu:

   ```astro
   <PresentationMode contentSelector="article .prose" title={entry.data.title} lang={lang} />
   ```

   - `contentSelector` harus unik dan stabil di halaman itu — biasanya
     `article .prose` karena view Blog/Artifact memakai pola ini. Tapi
     **cek dulu view-nya**: tidak semua punya container `.prose`
     (mis. `ProjectPage.astro` merender paragraf langsung di `<article>`).
     Kalau tidak ada, bungkus konten Markdown/naratifnya dengan satu div
     wrapper tanpa styling (mis. `article .presentation-content`) dan arahkan
     selector ke situ — jangan pakai `article` mentah, deck akan menarik
     back-link, judul, dan meta sebagai slide konten.
   - `title` dipakai untuk slide cover + chrome; kalau tidak diberikan,
     runtime memakai `document.title` dengan suffix situs dipangkas.
   - `lang` wajib diteruskan supaya label tombol ikut locale halaman.

3. **Jangan** menambahkan string i18n baru — key `presentation.*`
   (`presentation.open`, `presentation.close`, `presentation.hint`) sudah ada
   di `src/i18n/ui.ts` untuk en dan id. Hanya tambah key baru kalau fitur
   baru benar-benar butuh copy tambahan.

4. Jalankan `npm run build` untuk validasi, lalu cek halaman hasil build:

   ```bash
   grep -c "data-presentation" dist/blog/<slug>/index.html   # harus 1
   grep -c "data-presentation" dist/index.html               # harus 0
   ```

   Presentation mode hanya boleh muncul di halaman yang memang dipasangi
   komponen — homepage/listing tidak punya konten Markdown panjang sehingga
   tidak dipasangi.

## 4. Perubahan yang butuh konfirmasi user dulu

Ini mengubah behavior global semua deck — selalu konfirmasi sebelum eksekusi:

- **Mengubah aturan pemecahan slide** (§2): memengaruhi ritme seluruh deck.
- **Menambah shortcut keyboard baru**: cek dulu tidak bentrok dengan
  shortcut browser/site yang sudah dipakai; `F` dan `Esc` sudah terpakai.
- **Menambah fitur turunan** (presenter notes/timer seperti presenter mode
  html-ppt, export PDF/PNG, pilihan tema transisi): ini fitur baru, jangan
  implementasi tanpa diskusi scope.
- **Mengubah posisi/penampilan tombol pembuka**: tombol share juga fixed
  kanan-bawah (`bottom-6 right-6`); tombol presentasi sengaja ditaruh di
  atasnya (`bottom-[4.75rem]`) — ubah keduanya bersamaan supaya tidak
  bertumpuk.

## 5. Checklist sebelum menyampaikan hasil

- [ ] Perubahan hanya menyentuh `PresentationMode.astro` / file view pemasang / `ui.ts` — tidak ada file lain
- [ ] Tidak ada hex literal baru di CSS deck (semua lewat design token)
- [ ] Semua listener tetap delegated + idempotent (tahan view transitions)
- [ ] HTML statis tidak berubah (deck tetap click-time only)
- [ ] String UI baru (kalau ada) ditambahkan di blok `en` **dan** `id`
- [ ] `npm run build` lulus; tombol hanya ada di halaman yang dipasangi komponen
- [ ] `node --check` pada bundle hasil build yang mengandung deck, kalau script diubah:

  ```bash
  node --check dist/_astro/PresentationMode*.js
  ```

## 6. Kesalahan umum yang harus dihindari

- Memasang logika deck di file route (`src/pages/...`) alih-alih file view
  (`src/components/views/...`) — route hanya pemanis tipis per locale; semua
  behavior hidup di views/komponen.
- Merender komponen dua kali di satu halaman (mis. di view dan di Layout):
  deck pakai id/selector global (`[data-pdeck]`), dua instance akan
  saling menimpa.
- Memangkas judul dengan regex sendiri di komponen pemanggil — pemangkasan
  `document.title` sudah ditangani runtime; cukup berikan prop `title`.
- Lupa `lang={lang}` saat memasang di halaman locale `id` — tombolnya akan
  berlabel bahasa Inggris di halaman Indonesia.
- Mengubah `MAX_LIST_ITEMS` atau threshold scale tanpa memikirkan slide
  proyektor — angka ini dipilih supaya slide terbaca dari barisan belakang.
- Mencoba merender ulang mermaid di dalam deck — diagram di-clone dalam
  bentuk jadi; merender ulang akan dobel-render dan merusak layout slide.
