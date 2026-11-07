export type SiteLanguage = 'en' | 'de';
export const languages: readonly SiteLanguage[];
export const defaultLanguage: SiteLanguage;
export const legacyAliases: Record<string, string>;
export function splitLocale(value: string): { language: SiteLanguage; prefix: string; pathname: string };
export function localizedPath(value: string, language?: SiteLanguage): string;
