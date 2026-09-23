// Every piece of UI copy on the site lives here, keyed by locale.
// To add a language: add its code to astro.config.mjs (i18n.locales),
// add a matching block below, then duplicate the src/pages/id/ folder
// as src/pages/<code>/ pointing view components at lang="<code>".

export const defaultLang = 'en';

export const languageNames = {
  en: 'English',
  id: 'Bahasa Indonesia',
} as const;

export const ui = {
  en: {
    'nav.work': 'Work',
    'nav.blog': 'Blog',
    'nav.about': 'About',
    'nav.contact': 'Contact',

    'hero.role': 'Full-stack developer',
    'hero.location': 'Makassar, Indonesia',
    'hero.status': 'Open to opportunities',
    'hero.intro':
      'I build things that live on the web, in your pocket, and in the cloud: full-stack by trade, most at home across Next.js, Flutter, and the infrastructure that keeps it all running.',

    'work.heading': 'Selected work',

    'home.latestHeading': 'Latest writing',
    'home.viewAllPosts': 'All posts',

    'blog.title': 'Blog - Muh. Dimas Januardi Nur',
    'blog.description': "Notes on what I'm building, what's breaking, and what I'm learning along the way.",
    'blog.heading': 'Blog',
    'blog.empty': 'No posts yet. Check back soon.',
    'blog.back': '← Back to blog',

    'nav.artifacts': 'Artifacts',
    'artifacts.title': 'Artifacts - Muh. Dimas Januardi Nur',
    'artifacts.description':
      'Downloadable resources: ISO images, documents, cheatsheets, and tools worth keeping around.',
    'artifacts.heading': 'Artifacts',
    'artifacts.empty': 'No artifacts yet. Check back soon.',
    'artifacts.back': '← Back to artifacts',
    'artifacts.download': 'Download',
    'artifacts.visitLink': 'Open link',
    'artifacts.sizeLabel': 'Size',
    'artifacts.typeLabel': 'Type',
    'artifacts.copy': 'Copy',
    'artifacts.copied': 'Copied!',
    'artifact.type.iso': 'ISO',
    'artifact.type.document': 'Document',
    'artifact.type.cheatsheet': 'Cheatsheet',
    'artifact.type.tool': 'Tool',
    'artifact.type.other': 'Other',

    'share.label': 'Share this page',
    'share.title': 'Share',
    'share.copy': 'Copy link',
    'share.copied': 'Copied!',
    'share.qr': 'Scan to open this page',
    'share.close': 'Close',

    'contact.heading': 'Get in touch',
    'contact.body': 'Best way to reach me is email. I read everything and reply within a couple of days.',

    'footer.built': 'Built with Astro.',

    'about.title': 'About - Muh. Dimas Januardi Nur',
    'about.description':
      'Full-stack developer based in Makassar, Indonesia, working across web, mobile, and infrastructure.',
    'about.heading': 'About',
    'about.p1':
      "I'm Dimas, a full-stack developer based in Makassar, Indonesia, working across web, mobile, and the infrastructure that ties them together. Most of what I build runs on Next.js and Supabase on the web side and Flutter on mobile, with Docker and GitHub Actions handling the parts nobody wants to think about after launch.",
    'about.p2':
      'In 2025, my team and I published our work on FOKUS!, a scheduling app we built and tested over three Agile sprints, in the Journal of Embedded Systems, Security and Intelligent Systems. Writing up the process taught me almost as much as building the thing did.',
    'about.p3':
      'Online I mostly go by InYrDim, short for "in your dream." Ship fast, iterate, improve is more or less the whole philosophy.',
    'about.toolsHeading': 'Tools I reach for',

    'project.back': '← Back to work',
    'project.viewSource': 'View source',
  },
  id: {
    'nav.work': 'Karya',
    'nav.blog': 'Blog',
    'nav.about': 'Tentang',
    'nav.contact': 'Kontak',

    'hero.role': 'Pengembang full-stack',
    'hero.location': 'Makassar, Indonesia',
    'hero.status': 'Terbuka untuk peluang baru',
    'hero.intro':
      'Saya membangun hal-hal yang hidup di web, di saku Anda, dan di cloud: full-stack sebagai profesi, dan paling nyaman bekerja dengan Next.js, Flutter, serta infrastruktur yang menjaga semuanya tetap berjalan.',

    'work.heading': 'Karya pilihan',

    'home.latestHeading': 'Tulisan terbaru',
    'home.viewAllPosts': 'Semua tulisan',

    'blog.title': 'Blog - Muh. Dimas Januardi Nur',
    'blog.description': 'Catatan tentang apa yang sedang saya bangun, apa yang rusak, dan apa yang saya pelajari di sepanjang jalan.',
    'blog.heading': 'Blog',
    'blog.empty': 'Belum ada tulisan. Nantikan yang berikutnya.',
    'blog.back': '← Kembali ke blog',

    'nav.artifacts': 'Artefak',
    'artifacts.title': 'Artefak - Muh. Dimas Januardi Nur',
    'artifacts.description':
      'Resource yang bisa diunduh: image ISO, dokumen, cheatsheet, dan tools yang layak disimpan.',
    'artifacts.heading': 'Artefak',
    'artifacts.empty': 'Belum ada artefak. Nantikan yang berikutnya.',
    'artifacts.back': '← Kembali ke artefak',
    'artifacts.download': 'Unduh',
    'artifacts.visitLink': 'Buka tautan',
    'artifacts.sizeLabel': 'Ukuran',
    'artifacts.typeLabel': 'Tipe',
    'artifacts.copy': 'Salin',
    'artifacts.copied': 'Tersalin!',
    'artifact.type.iso': 'ISO',
    'artifact.type.document': 'Dokumen',
    'artifact.type.cheatsheet': 'Cheatsheet',
    'artifact.type.tool': 'Tool',
    'artifact.type.other': 'Lainnya',

    'share.label': 'Bagikan halaman ini',
    'share.title': 'Bagikan',
    'share.copy': 'Salin tautan',
    'share.copied': 'Tersalin!',
    'share.qr': 'Pindai untuk membuka halaman ini',
    'share.close': 'Tutup',

    'contact.heading': 'Hubungi saya',
    'contact.body':
      'Cara terbaik menghubungi saya adalah lewat email. Saya membaca semua pesan dan biasanya membalas dalam beberapa hari.',

    'footer.built': 'Dibuat dengan Astro.',

    'about.title': 'Tentang - Muh. Dimas Januardi Nur',
    'about.description':
      'Pengembang full-stack yang berbasis di Makassar, Indonesia, bekerja di bidang web, mobile, dan infrastruktur.',
    'about.heading': 'Tentang',
    'about.p1':
      'Saya Dimas, pengembang full-stack yang berbasis di Makassar, Indonesia, bekerja di web, mobile, dan infrastruktur yang menghubungkan keduanya. Sebagian besar yang saya bangun berjalan di atas Next.js dan Supabase untuk sisi web, serta Flutter untuk mobile, dengan Docker dan GitHub Actions mengurus bagian-bagian yang tidak ingin dipikirkan siapa pun setelah rilis.',
    'about.p2':
      'Pada 2025, saya dan tim mempublikasikan hasil kerja kami di FOKUS!, sebuah aplikasi penjadwalan yang kami bangun dan uji selama tiga sprint Agile, di Journal of Embedded Systems, Security and Intelligent Systems. Menulis prosesnya mengajarkan saya hampir sebanyak proses membangunnya.',
    'about.p3':
      'Di dunia maya saya biasa memakai nama InYrDim, singkatan dari "in your dream." Rilis cepat, iterasi, dan terus perbaiki, kurang lebih itulah seluruh filosofinya.',
    'about.toolsHeading': 'Tools yang sering saya pakai',

    'project.back': '← Kembali ke karya',
    'project.viewSource': 'Lihat kode sumber',
  },
} as const;
