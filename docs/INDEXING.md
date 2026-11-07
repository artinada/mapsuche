# Search indexing and static rendering

`npm run build` now produces a complete HTML document for each public React route. The main text, content H1, title, description, canonical, Open Graph/Twitter metadata and WebPage JSON-LD are present before JavaScript executes. React hydrates those documents to enable navigation and forms. The build uses the same components and SEO catalog as the browser; it does not serve different content to crawlers.

English and German have stable language URLs: `/en/`, `/de/`, `/en/services`, `/de/services`, and equivalent paths for every page. Each document is prerendered in its URL's language, including `html[lang]`, the main text, title and description. Browser settings and previously saved language preferences cannot override that language. Language-switch anchors point to the equivalent route and preserve query parameters and report-token fragments.

Every public language page has a self-referencing canonical, reciprocal `en`/`de` hreflang links, and `x-default` pointing to its English equivalent. Both language versions appear in the sitemap. The old unprefixed paths permanently redirect to English, preserving the application's previous default; `/en` and `/de` redirect to the respective language homepages with a trailing slash. Inner-page canonical URLs have no trailing slash.

## Files and indexing policy

- `shared/seo.ts`: metadata and robots policy shared by the server build and client navigation. The central `RouteSEO` component covers every route, including legal/GEO pages and unknown URLs.
- `shared/locales.mjs` and `scripts/route-config.js`: shared language parsing, legacy aliases, canonical URL variants and hosting redirects. Wouter's language base keeps internal links and GEO navigation in the selected language.
- `scripts/prerender.js`: builds the server entry, renders each route into `dist`, and generates the hosting rules. Missing metadata, missing headings or sitemap/indexing-policy disagreement fail the build.
- `dist/route-manifest.json`: generated route-to-file map, used by the production preview.
- `hosting/amplify-rules.json`: generated exact page rewrites, permanent redirects for old paths and trailing-slash/`.html` variants, followed by a genuine 404 fallback.
- `customHttp.yml`: extra noindex/no-store headers for private GEO views and noindex for the error document. HTML robots and googlebot tags also carry the policy.

The 44 public language pages appear in `sitemap.xml` (22 per language). `/en/geo-check/results`, `/de/geo-check/results`, `/en/geo/dashboard` and `/de/geo/dashboard` render generic initial views with `noindex, follow`, contain no report data, and mount on the client to read private tokens/browser storage. They have self-canonicals but no hreflang annotations. An unknown URL receives the corresponding language's error document with `noindex, nofollow`, no canonical and no hreflang. Robots exclusions are not access control: the GEO API still requires the report token.

The shared logo is no longer a heading. The homepage hero supplies the page's H1. Route metadata is updated on client navigation as well as direct loads, including `og:url`, Twitter tags, canonical and structured data.

## Build and verify locally

Use Node.js 22 and install dependencies with `npm ci`, then run:

```bash
npm run check
npm run check:geo
npm run build
npm run test:indexing
npm run test:sitemap
npm run test:geo
npm run preview -- --host 127.0.0.1 --port 4173
```

Preview uses a small static server rather than Vite's SPA fallback. Known pages return 200, old URLs redirect with 301, unknown pages return 404, and missing assets/API requests are not served a successful app document. The preview does not run the GEO API; use `npm run dev` for the local server-side GEO implementation or deploy its backend.

The indexing tests inspect every built document and exercise real HTTP status codes, redirect destinations, private-view headers, missing resources and script MIME types. The other suites cover sitemap generation and GEO behavior. No OpenAI requests are needed for these tests.

Verification covers all 48 built language documents, reciprocal alternate destinations, localized internal links, title/description lengths, canonical variants, private views and HTTP status codes. Browser checks on 2026-11-07 covered hydration on all 48 routes, language switching and client navigation, and EN/DE home, services and GEO pages with JavaScript disabled. A mocked GEO submission confirmed that language, report access tokens, refresh and saved-report navigation still work without calling OpenAI. Existing meta-header/security-monitor warnings are separate from indexing. See the [language audit follow-up](LANGUAGE_SEO_AUDIT.md) and [current metadata inventory](LANGUAGE_SEO_INVENTORY.csv).

## Publish to Amplify

The inspected production application is `dt8tngg48sft6`, branch `main`, region `eu-central-1`. Its Git-backed pipeline installs dependencies, deploys the backend, runs `npm run build`, and publishes `dist`. The new build command includes prerendering, so retain that output directory and publish **all** its nested files. Keep `customHttp.yml` in the repository root.

1. Review and publish the intended source changes through the existing Git/Amplify pipeline. This checkout also contains earlier GEO backend changes: configure the branch's server-side `OPENAI_API_KEY` secret before deploying those resources; see [GEO setup](GEO_CHECK.md). Never add the key to frontend environment variables or commit `.env.local`.
2. Wait for the deployment to succeed. Confirm `/en/services/index.html` and `/de/services/index.html` contain the corresponding language's text and metadata before installing rewrites that target them. Publish the nested language directories and both language error documents.
3. Replace the app's existing `/<*> → /index.html (404-200)` rule with the generated `hosting/amplify-rules.json`. In the Amplify console, use **Hosting → Rewrites and redirects → JSON editor**, preserving the generated order. Alternatively, from the verified build checkout:

   ```bash
   aws amplify get-app --app-id dt8tngg48sft6 --region eu-central-1 --query app.customRules --output json > .local-data/amplify-rules-before.json
   aws amplify update-app --app-id dt8tngg48sft6 --region eu-central-1 --custom-rules file://hosting/amplify-rules.json --query app.customRules
   ```

   The build creates `.local-data`; it is ignored by Git. The saved rules provide a rollback if needed. Rebuild the generated rules whenever routes change. The final 404 rule is intentional: a broad successful SPA rewrite would create soft 404s.
4. Recheck the deployed domain after propagation. Known language pages must return 200 directly and on reload; `/maps` must redirect to `/en/services/google-maps`; `/de/maps` must redirect to `/de/services/google-maps`; an invented path must return 404. `/en` and `/de` must resolve to real language homepages. Check raw HTML and every hreflang destination. Confirm private views are noindex and the public sitemap has 44 URLs.

Example verification:

```bash
curl --max-time 20 -sSI https://mapsuche.de/en/services
curl --max-time 20 -sS https://mapsuche.de/de/services
curl --max-time 20 -sSI https://mapsuche.de/maps
curl --max-time 20 -sSI https://mapsuche.de/this-page-does-not-exist
curl --max-time 20 -sS https://mapsuche.de/sitemap.xml
```

The checked-in `amplify.yml` selects Node 22, runs type checks, deploys the backend, builds all language documents and runs the regression suites before publishing `dist`. Verify the live release using the commands above; local checks alone do not establish deployment status.

## Google verification after publication

In Search Console, inspect the EN and DE versions of the homepage, services, Google Maps, website, GEO Check and GEO optimization pages. Run **Test live URL**, inspect the rendered HTML and resources, and compare Google's selected canonical with the declared language URL. Resubmit `https://mapsuche.de/sitemap.xml` and request indexing for the important public language pages. HTTP/browser checks establish crawlability; only Google's own reports establish its crawl/index status.

References: [Google JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics), [URL Inspection](https://support.google.com/webmasters/answer/9012289), [Amplify redirect and 404 rules](https://docs.aws.amazon.com/amplify/latest/userguide/redirect-rewrite-examples.html), [Amplify custom headers](https://docs.aws.amazon.com/amplify/latest/userguide/custom-headers.html).
