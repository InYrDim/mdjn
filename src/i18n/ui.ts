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
    'nav.about': 'About',
    'nav.contact': 'Contact',

    'hero.role': 'Full-stack developer',
    'hero.location': 'Makassar, Indonesia',
    'hero.status': 'Open to opportunities',
    'hero.intro':
      'I build things that live on the web, in your pocket, and in the cloud — full-stack by trade, most at home across Next.js, Flutter, and the infrastructure that keeps it all running.',

    'work.heading': 'Selected work',

    'contact.heading': 'Get in touch',
    'contact.body': 'Best way to reach me is email — I read everything and reply within a couple of days.',

    'footer.built': 'Built with Astro.',

    'about.title': 'About — Muh. Dimas Januardi Nur',
    'about.description':
      'Full-stack developer based in Makassar, Indonesia, working across web, mobile, and infrastructure.',
    'about.heading': 'About',
    'about.p1':
      "I'm Dimas — a full-stack developer based in Makassar, Indonesia, working across web, mobile, and the infrastructure that ties them together. Most of what I build runs on Next.js and Supabase on the web side and Flutter on mobile, with Docker and GitHub Actions handling the parts nobody wants to think about after launch.",
    'about.p2':
      'In 2025, my team and I published our work on FOKUS!, a scheduling app we built and tested over three Agile sprints, in the Journal of Embedded Systems, Security and Intelligent Systems — writing up the process taught me almost as much as building the thing did.',
    'about.p3':
      'Online I mostly go by InYrDim — short for "in your dream." Ship fast, iterate, improve is more or less the whole philosophy.',
    'about.toolsHeading': 'Tools I reach for',

    'project.back': '← Back to work',
    'project.viewSource': 'View source',
  },
  id: {
    'nav.work': 'Karya',
    'nav.about': 'Tentang',
    'nav.contact': 'Kontak',

    'hero.role': 'Pengembang full-stack',
    'hero.location': 'Makassar, Indonesia',
    'hero.status': 'Terbuka untuk peluang baru',
    'hero.intro':
      'Saya membangun hal-hal yang hidup di web, di saku Anda, dan di cloud — full-stack sebagai profesi, dan paling nyaman bekerja dengan Next.js, Flutter, serta infrastruktur yang menjaga semuanya tetap berjalan.',

    'work.heading': 'Karya pilihan',

    'contact.heading': 'Hubungi saya',
    'contact.body':
      'Cara terbaik menghubungi saya adalah lewat email — saya membaca semua pesan dan biasanya membalas dalam beberapa hari.',

    'footer.built': 'Dibuat dengan Astro.',

    'about.title': 'Tentang — Muh. Dimas Januardi Nur',
    'about.description':
      'Pengembang full-stack yang berbasis di Makassar, Indonesia, bekerja di bidang web, mobile, dan infrastruktur.',
    'about.heading': 'Tentang',
    'about.p1':
      'Saya Dimas — pengembang full-stack yang berbasis di Makassar, Indonesia, bekerja di web, mobile, dan infrastruktur yang menghubungkan keduanya. Sebagian besar yang saya bangun berjalan di atas Next.js dan Supabase untuk sisi web, serta Flutter untuk mobile, dengan Docker dan GitHub Actions mengurus bagian-bagian yang tidak ingin dipikirkan siapa pun setelah rilis.',
    'about.p2':
      'Pada 2025, saya dan tim mempublikasikan hasil kerja kami di FOKUS!, sebuah aplikasi penjadwalan yang kami bangun dan uji selama tiga sprint Agile, di Journal of Embedded Systems, Security and Intelligent Systems — menulis prosesnya mengajarkan saya hampir sebanyak proses membangunnya.',
    'about.p3':
      'Di dunia maya saya biasa memakai nama InYrDim — singkatan dari "in your dream." Rilis cepat, iterasi, dan terus perbaiki, kurang lebih itulah seluruh filosofinya.',
    'about.toolsHeading': 'Tools yang sering saya pakai',

    'project.back': '← Kembali ke karya',
    'project.viewSource': 'Lihat kode sumber',
  },
} as const;
