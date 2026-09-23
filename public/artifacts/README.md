# /public/artifacts/

File yang di-commit di sini otomatis tersedia di URL `/artifacts/<nama-file>`.

- File **kecil** (PDF cheatsheet, dokumen) → boleh di-commit ke folder ini.
- File **besar** (ISO, image, arsip > beberapa MB) → **jangan** di-commit. Tulis
  link eksternal (mirror resmi, release GitHub, Drive) di frontmatter `url`.

.gitignore di root sudah memblokir ekstensi besar agar tidak ter-commit
tidak sengaja; pakai `git add -f` hanya jika benar-benar disengaja.
