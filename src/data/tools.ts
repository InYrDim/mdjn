export type ToolCategory = 'photo' | 'document' | 'utility';
export type ToolStatus = 'ready' | 'coming_soon';

export interface LocalizedString {
  en: string;
  id: string;
}

export interface ToolItem {
  id: string; // URL slug
  title: LocalizedString;
  description: LocalizedString;
  category: ToolCategory;
  icon: 'camera' | 'identification-badge' | 'files' | 'wrench' | 'cube' | 'sparkle';
  status: ToolStatus;
  badge?: LocalizedString;
  tags: string[];
}

export const tools: ToolItem[] = [
  {
    id: 'starter-card',
    title: {
      en: 'Quick Card Generator',
      id: 'Pembuat Kartu Cepat',
    },
    description: {
      en: 'A starter proof-of-concept utility tool: customize text, theme, and instant badge with live preview.',
      id: 'Tool starter percontohan wadah: kustomisasi teks, tema, dan badge instan dengan preview langsung.',
    },
    category: 'utility',
    icon: 'cube',
    status: 'ready',
    badge: {
      en: 'Starter Demo',
      id: 'Demo Starter',
    },
    tags: ['generator', 'utility', 'demo'],
  },
  {
    id: 'foto-laporan',
    title: {
      en: 'Field Report Photo Stamping',
      id: 'Stempel Foto Laporan Lapangan',
    },
    description: {
      en: 'Format and stamp site inspection photos with timestamp, GPS, and project metadata in a standardized grid.',
      id: 'Format dan beri cap foto inspeksi lapangan dengan tanggal, GPS, dan metadata proyek dalam kisi standar.',
    },
    category: 'photo',
    icon: 'camera',
    status: 'coming_soon',
    badge: {
      en: 'Planned',
      id: 'Direncanakan',
    },
    tags: ['photo', 'inspection', 'grid'],
  },
  {
    id: 'pas-foto',
    title: {
      en: 'ID Photo Studio & Background',
      id: 'Studio Pas Foto & Latar Merah/Biru',
    },
    description: {
      en: 'Crop to official dimensions (2x3, 3x4, 4x6) and swap red/blue background entirely inside the browser.',
      id: 'Potong ukuran standar (2x3, 3x4, 4x6) dan ganti warna latar merah/biru langsung di dalam browser.',
    },
    category: 'photo',
    icon: 'identification-badge',
    status: 'coming_soon',
    badge: {
      en: 'Planned',
      id: 'Direncanakan',
    },
    tags: ['photo', 'id-photo', 'crop'],
  },
  {
    id: 'pdf-combiner',
    title: {
      en: 'Client-Side Document Combiner',
      id: 'Penggabung Dokumen Cepat',
    },
    description: {
      en: 'Combine and organize daily scanned paperwork locally without uploading sensitive files to external servers.',
      id: 'Gabungkan dan rapikan berkas dokumen harian secara lokal tanpa mengunggah data sensitif ke server luar.',
    },
    category: 'document',
    icon: 'files',
    status: 'coming_soon',
    badge: {
      en: 'Planned',
      id: 'Direncanakan',
    },
    tags: ['document', 'pdf', 'scanner'],
  },
];
