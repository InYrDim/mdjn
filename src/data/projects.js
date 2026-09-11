// Real projects for Muh. Dimas Januardi Nur, pulled from github.com/InYrDim
// and a published paper found via search. Double-check dates/links, and
// add anything from your other repos that isn't reflected here yet.
export const projects = [
  {
    slug: 'fokus',
    title: 'FOKUS!',
    year: '2025',
    role: 'Team project — 5 contributors, Universitas Negeri Makassar',
    description:
      'A task and scheduling app for students and professionals, built over three Agile sprints and later published as peer-reviewed research on the development process.',
    content:
      "FOKUS! is a web-based scheduling and task-management app built with a four-person team across three Agile sprints: UI/UX design in Figma, then backend and frontend build-out on Next.js and Supabase (Postgres, with Supabase Auth handling sign-up and login), then task CRUD and reminder notifications. White Box testing showed 100% frontend code coverage; Black Box testing confirmed registration, login, task management, and reminders all worked as intended. The team wrote up the process and results as a paper, published in the Journal of Embedded Systems, Security and Intelligent Systems (JESSI), Vol. 6 No. 2, 2025.",
    stack: ['Next.js', 'Supabase', 'PostgreSQL', 'Figma'],
    url: 'https://doi.org/10.59562/jessi.v6i2.9588',
    urlLabel: 'Read the paper',
    repo: '',
  },
  {
    slug: 'blob-mania',
    title: 'BlobMania',
    year: 'Personal project',
    role: 'Solo — frontend, backend, and data pipeline',
    description:
      'A full-stack comic database and reader, with a custom scraper feeding the catalog since no public API existed for the source data.',
    content:
      "BlobMania is a comic discovery and reading site built entirely in Next.js — frontend and API routes in one codebase, deployed on Vercel. Since there wasn't a public API for comic data, I built a separate scraper (bato-to) that pulls listings and chapter data from bato.to and feeds the site's catalog. One tradeoff worth noting in the README: because the source data comes from user uploads, entries can occasionally be duplicated or mistagged upstream.",
    stack: ['Next.js', 'JavaScript', 'Web scraping'],
    url: 'https://blob-mania.vercel.app',
    urlLabel: 'Visit live site',
    repo: 'https://github.com/InYrDim/blob-mania',
  },
  {
    slug: 'ilalin',
    title: 'iLalin',
    year: 'University project',
    role: 'Coursework — full-stack',
    description:
      'A concept for an on-demand local errand and ride service, with separate customer, driver, and admin flows — built for a university assignment.',
    content:
      "iLalin (\"Mau kemana-mana? Ialin ajah!\") was built for a university course assignment, with a PHP and MySQL backend and Tailwind CSS on the frontend. Rather than just a marketing page, it's structured like a small logistics platform: separate auth, admin, driver, and user modules, with the marketing pages built on top of a free HTML template for the public-facing side.",
    stack: ['PHP', 'MySQL', 'Tailwind CSS'],
    url: 'https://ilalin.vegetable-md.com',
    urlLabel: 'Visit live site',
    repo: 'https://github.com/InYrDim/iLalin',
  },
];
