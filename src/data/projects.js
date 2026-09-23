// Real projects for Muh. Dimas Januardi Nur, pulled from github.com/InYrDim
// and a published paper found via search.
//
// title/stack/url/repo are locale-agnostic (proper nouns, tech names, links).
// Everything a visitor reads — role, description, content, the link label,
// even the "year" badge — lives under en/id so each locale renders fully
// localized copy, not just a translated shell around English text.
export const projects = [
  {
    slug: 'fokus',
    title: 'FOKUS!',
    stack: ['Next.js', 'Supabase', 'PostgreSQL', 'Figma'],
    url: 'https://doi.org/10.59562/jessi.v6i2.9588',
    repo: '',
    en: {
      year: '2025',
      role: 'Team project, 5 contributors, Universitas Negeri Makassar',
      description:
        'A task and scheduling app for students and professionals, built over three Agile sprints and later published as peer-reviewed research on the development process.',
      content:
        "FOKUS! is a web-based scheduling and task-management app built with a four-person team across three Agile sprints: UI/UX design in Figma, then backend and frontend build-out on Next.js and Supabase (Postgres, with Supabase Auth handling sign-up and login), then task CRUD and reminder notifications. White Box testing showed 100% frontend code coverage; Black Box testing confirmed registration, login, task management, and reminders all worked as intended. The team wrote up the process and results as a paper, published in the Journal of Embedded Systems, Security and Intelligent Systems (JESSI), Vol. 6 No. 2, 2025.",
      urlLabel: 'Read the paper',
    },
    id: {
      year: '2025',
      role: 'Proyek tim, 5 kontributor, Universitas Negeri Makassar',
      description:
        'Aplikasi tugas dan penjadwalan untuk pelajar dan profesional, dibangun selama tiga sprint Agile dan kemudian dipublikasikan sebagai riset peer-reviewed tentang proses pengembangannya.',
      content:
        'FOKUS! adalah aplikasi manajemen tugas dan penjadwalan berbasis web yang dibangun bersama tim beranggotakan empat orang selama tiga sprint Agile: desain UI/UX di Figma, lalu pengembangan backend dan frontend menggunakan Next.js dan Supabase (Postgres, dengan Supabase Auth untuk pendaftaran dan login), kemudian fitur CRUD tugas dan notifikasi pengingat. Pengujian White Box menunjukkan cakupan kode frontend 100%; pengujian Black Box mengonfirmasi bahwa pendaftaran, login, manajemen tugas, dan pengingat semuanya berjalan sesuai rencana. Tim menuliskan proses dan hasilnya sebagai paper, yang dipublikasikan di Journal of Embedded Systems, Security and Intelligent Systems (JESSI), Vol. 6 No. 2, 2025.',
      urlLabel: 'Baca paper-nya',
    },
  },
  {
    slug: 'blob-mania',
    title: 'BlobMania',
    stack: ['Next.js', 'JavaScript', 'Web scraping'],
    url: 'https://blob-mania.vercel.app',
    repo: 'https://github.com/InYrDim/blob-mania',
    en: {
      year: 'Personal project',
      role: 'Solo, frontend, backend, and data pipeline',
      description:
        'A full-stack comic database and reader, with a custom scraper feeding the catalog since no public API existed for the source data.',
      content:
        "BlobMania is a comic discovery and reading site built entirely in Next.js, with frontend and API routes in one codebase, deployed on Vercel. Since there wasn't a public API for comic data, I built a separate scraper (bato-to) that pulls listings and chapter data from bato.to and feeds the site's catalog. One tradeoff worth noting in the README: because the source data comes from user uploads, entries can occasionally be duplicated or mistagged upstream.",
      urlLabel: 'Visit live site',
    },
    id: {
      year: 'Proyek pribadi',
      role: 'Solo, frontend, backend, dan data pipeline',
      description:
        'Database dan pembaca komik full-stack, dengan scraper khusus yang mengisi katalognya karena tidak ada API publik untuk data sumbernya.',
      content:
        "BlobMania adalah situs penemuan dan pembacaan komik yang dibangun sepenuhnya dengan Next.js, frontend dan API routes dalam satu codebase, di-deploy di Vercel. Karena tidak ada API publik untuk data komik, saya membangun scraper terpisah (bato-to) yang mengambil daftar dan data chapter dari bato.to untuk mengisi katalog situs. Satu catatan dari README: karena data sumbernya berasal dari unggahan pengguna, entri kadang bisa terduplikasi atau salah label di sumbernya.",
      urlLabel: 'Kunjungi situsnya',
    },
  },
  {
    slug: 'ilalin',
    title: 'iLalin',
    stack: ['PHP', 'MySQL', 'Tailwind CSS'],
    url: 'https://ilalin.vegetable-md.com',
    repo: 'https://github.com/InYrDim/iLalin',
    en: {
      year: 'University project',
      role: 'Coursework, full-stack',
      description:
        'A concept for an on-demand local errand and ride service, with separate customer, driver, and admin flows, built for a university assignment.',
      content:
        "iLalin (\"Mau kemana-mana? Ialin ajah!\") was built for a university course assignment, with a PHP and MySQL backend and Tailwind CSS on the frontend. Rather than just a marketing page, it's structured like a small logistics platform: separate auth, admin, driver, and user modules, with the marketing pages built on top of a free HTML template for the public-facing side.",
      urlLabel: 'Visit live site',
    },
    id: {
      year: 'Proyek kuliah',
      role: 'Tugas kuliah, full-stack',
      description:
        'Konsep layanan antar-jemput dan pesan-antar lokal on-demand, dengan alur terpisah untuk pelanggan, driver, dan admin, dibuat untuk tugas kuliah.',
      content:
        'iLalin ("Mau kemana-mana? Ialin ajah!") dibuat untuk tugas mata kuliah, dengan backend PHP dan MySQL serta Tailwind CSS di frontend. Alih-alih sekadar halaman promosi, strukturnya menyerupai platform logistik kecil: modul auth, admin, driver, dan user yang terpisah, dengan halaman publiknya dibangun di atas template HTML gratis.',
      urlLabel: 'Kunjungi situsnya',
    },
  },
];
