---
title: "Apa yang saya pelajari soal data berantakan saat membangun scraper BlobMania"
description: "Catatan tentang membangun pembaca komik tanpa API publik untuk diambil datanya, dan trade-off kualitas data yang muncul akibat scraping."
lang: "id"
pubDate: 2026-08-18
tags: ["Next.js", "Web scraping", "Devlog"]
---

Ketika mulai membangun BlobMania, rencananya sederhana: pembaca komik full-stack yang cepat, dibangun dengan Next.js. Bagian yang saya remehkan adalah dari mana sebenarnya data itu akan berasal.

Tidak ada API publik untuk daftar komik — setidaknya tidak ada yang bisa saya temukan yang andal dan gratis. Jadi katalognya butuh pipeline sendiri. Saya memisahkan bagian itu jadi proyek terpisah: sebuah scraper yang mengambil daftar dan data chapter dari bato.to, lalu memasukkannya ke katalog BlobMania.

## Bagian yang tidak pernah diceritakan orang soal scraping

Menulis scraper-nya sendiri adalah bagian yang mudah — ambil halaman, parse HTML-nya, ekstrak yang dibutuhkan. Bagian yang lebih sulit adalah menerima kenyataan bahwa datanya tidak akan pernah benar-benar bersih, karena memang bukan data milik saya sejak awal.

Listing sumbernya berasal dari unggahan pengguna, yang artinya:

- Judul yang sama bisa muncul lebih dari sekali dengan nama yang sedikit berbeda
- Tag dan kategori tidak selalu konsisten antar entri
- Metadata kadang jadi basi di antara waktu scrape dan waktu halaman dimuat

Semua itu bukan bug di scraper-nya. Itu memang yang terjadi kalau kita membangun sesuatu di atas data yang tidak sepenuhnya kita kendalikan.

## Apa yang akan saya lakukan berbeda

Kalau saya membangunnya ulang hari ini, saya akan menambahkan tahap normalisasi sebelum data masuk ke database — fuzzy-matching judul untuk menangkap duplikat yang hampir sama, alih-alih percaya sumbernya konsisten secara internal. Kurang lebih seperti ini:

```ts
function normalizeTitle(raw: string) {
  return raw
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}
```

Fungsinya kecil, tapi bisa menyelamatkan beberapa entri duplikat yang sampai sekarang masih nongkrong di katalog.

Pelajaran yang lebih besar sebenarnya bukan soal scraping — melainkan soal mendesain untuk data yang tidak bisa sepenuhnya kita percayai, yang ternyata adalah kebanyakan data, hampir sepanjang waktu.
