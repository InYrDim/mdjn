import { ui, defaultLang } from './ui';

export type Lang = keyof typeof ui;

/** Returns a t(key) function scoped to one locale, falling back to English if a key is ever missing. */
export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

/**
 * Turns a canonical, locale-agnostic path ("/", "/about", "/projects/fokus", "/#work")
 * into the URL for a specific locale. English is unprefixed; every other locale
 * gets a "/<lang>" prefix, matching the folder structure under src/pages/.
 */
export function translatePath(path: string, targetLang: Lang) {
  if (targetLang === defaultLang) return path;
  const [base, hash] = path.split('#');
  const normalizedBase = base === '/' ? '' : base;
  const localized = `/${targetLang}${normalizedBase}`;
  return hash ? `${localized}#${hash}` : localized;
}

/** Returns a translatePath(path) function pre-bound to one locale. */
export function useTranslatedPath(lang: Lang) {
  return (path: string) => translatePath(path, lang);
}
