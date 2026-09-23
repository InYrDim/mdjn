---
title: 'Mirror ISO Debian Netinstall'
description: 'Image installer standalone untuk Debian stable — ISO netinstall yang selalu saya pakai untuk VM dan install ulang bare-metal, lengkap dengan checksum untuk verifikasi sebelum dibakar ke USB.'
lang: 'id'
type: 'iso'
tags: ['debian', 'linux', 'installer']
size: '~700 MB'
url: 'https://cdimage.debian.org/debian-cd/current/amd64/iso-cd/'
pubDate: 2026-09-23
---

Image netinstall Debian resmi, ditautkan langsung ke mirror upstream supaya kamu
selalu mendapat rilis stable terbaru. File ISO-nya tidak di-host di sini — ISO
ukurannya besar dan mirror upstream jauh lebih cepat dari apa pun yang bisa saya
jalankan sendiri.

**Sebelum di-flash ke USB, verifikasi dulu:**

1. Unduh ISO dan file `SHA256SUMS` yang cocok dari mirror.
2. Jalankan `sha256sum debian-*.iso` lalu bandingkan dengan manifest.
3. Setelah itu baru tulis ke USB dengan `dd`, Ventoy, atau Rufus.

Setelah install, saya biasanya langsung memakai [cheatsheet command line](/id/artifacts/linux-command-line-cheatsheet)
yang juga ada di situs ini — keduanya cocok dipakai berpasangan.
