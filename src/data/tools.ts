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
    id: 'foto-laporan',
    title: {
      en: 'Field Report Photo Layout',
      id: 'Tata Letak Foto Laporan',
    },
    description: {
      en: 'Format and organize site inspection photos into printable pages (A4/Letter), with interactive crop, auto-captions, and instant client-side PDF export.',
      id: 'Tata dan susun foto dokumentasi lapangan ke format kertas cetak (A4/Letter), crop interaktif, caption otomatis, dan unduh PDF tanpa server.',
    },
    category: 'photo',
    icon: 'camera',
    status: 'ready',
    badge: {
      en: 'New',
      id: 'Baru',
    },
    tags: ['photo', 'inspection', 'grid', 'pdf'],
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
