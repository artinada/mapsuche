import { languages, localizedPath, legacyAliases } from '../shared/locales.mjs';

// The production server, Vite redirects and Amplify use the same route map.
export function buildRouteConfig(baseRoutes) {
  const paths = baseRoutes.flatMap(route => languages.map(language => localizedPath(route, language)));
  const redirects = {};
  const variants = (source, target) => {
    const clean = source.replace(/\/+$/, '') || '/';
    const aliases = clean === '/' ? ['/', '/index.html'] : [clean, `${clean}/`, `${clean}.html`, `${clean}/index.html`];
    for (const alias of aliases) if (alias !== target) redirects[alias] = target;
  };
  for (const route of baseRoutes) {
    variants(route, localizedPath(route));
    for (const language of languages) variants(localizedPath(route, language), localizedPath(route, language));
  }
  for (const [source, target] of Object.entries(legacyAliases)) {
    variants(source, localizedPath(target));
    for (const language of languages) variants(localizedPath(source, language), localizedPath(target, language));
  }
  return { paths, redirects };
}

export function hostingRules(baseRoutes) {
  const { paths, redirects } = buildRouteConfig(baseRoutes);
  return [
    ...Object.entries(redirects).map(([source, target]) => ({ source, target, status: '301' })),
    ...paths.map(source => ({ source, target: `${source.replace(/\/$/, '')}/index.html`, status: '200' })),
    // Leave unmatched resources to Amplify's native 404. Its custom 404 rule
    // redirects to a 200 error document on this deployment (a soft 404).
  ];
}
