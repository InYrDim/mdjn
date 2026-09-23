---
title: "Menulis paper dari tugas kuliah: cerita di balik FOKUS!"
description: "Catatan tentang proses mengubah proyek kelas menjadi paper yang dipublikasikan, dan apa yang saya pelajari dari tiga sprint Agile bersama tim."
lang: "id"
pubDate: 2026-09-02
tags: ["Next.js", "Supabase", "Riset"]
---

FOKUS! awalnya cuma proyek kelas — aplikasi penjadwalan dan manajemen tugas yang saya bangun bersama empat rekan tim. Yang tidak saya duga adalah kami akan menuliskannya menjadi paper dan mempublikasikannya di jurnal.

## Tiga sprint, satu aplikasi

Kami membagi pengembangan FOKUS! ke dalam tiga sprint Agile:

1. **Sprint 1** — desain UI/UX di Figma, menentukan alur pengguna dari pendaftaran sampai pengingat tugas
2. **Sprint 2** — pembangunan backend dan frontend, dengan Next.js di sisi frontend dan Supabase (Postgres + Supabase Auth) di sisi backend
3. **Sprint 3** — fitur CRUD tugas, notifikasi pengingat, dan sinkronisasi

Setelah aplikasinya jadi, kami menjalankan dua jenis pengujian: White Box untuk memastikan cakupan kode di sisi frontend, dan Black Box untuk memastikan alur inti — pendaftaran, login, manajemen tugas, pengingat — benar-benar berjalan dari sudut pandang pengguna.

## Bagian yang lebih sulit dari coding

Menulis paper-nya ternyata sama menantangnya dengan membangun aplikasinya, mungkin lebih. Setiap keputusan teknis yang terasa "wajar" saat coding — kenapa pakai Supabase, kenapa tiga sprint, kenapa struktur database seperti itu — harus bisa dijelaskan dan dipertanggungjawabkan di atas kertas.

Hasilnya diterbitkan di *Journal of Embedded Systems, Security and Intelligent Systems* (JESSI), Vol. 6 No. 2, 2025 — bersama Mushaf, Nurul Ilmi, Nurfadilah, dan Ahmad Khairul Shiddiq.

Kalau ada satu hal yang saya bawa dari pengalaman ini: proyek kuliah yang terasa "kecil" sering kali punya lebih banyak nilai daripada yang kita kira, asal mau diselesaikan sampai benar-benar rapi.
