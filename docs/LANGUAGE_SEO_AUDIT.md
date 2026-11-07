# DE/EN canonical and language metadata audit

## Implementation follow-up

The local findings below have been fixed. The build now generates 44 public language documents and four private noindex views. Each DE/EN page has its own URL, HTML language, localized title/description, self-canonical and matching social locale. Public pages include reciprocal `en`/`de` hreflang links and an English `x-default` equivalent. Language-switch anchors retain query parameters and report fragments; internal navigation remains in the selected language. Legacy paths redirect, and EN/DE 404 pages remain noindex.

Long blog metadata was shortened; unverified review/authenticity claims and the unsourced mobile-search percentage were removed from metadata excerpts. The German homepage title is localized. The static alternate Open Graph locale now changes with the selected language. The inventory linked below has been regenerated for the new URLs. See [INDEXING.md](INDEXING.md) for validation and hosting setup.

The live observations below describe the pre-deployment site. Use the publication checks in INDEXING.md to verify the released build and hosting rules; the historical observations are retained for comparison.

## Original observations

Checked on 2026-11-07. This is an audit; no application code or hosting settings were changed.

Scope: all 24 routes in the local production build, both language selections in Chromium (48 rendered states), initial HTML for all 24 documents, and live HTTP/browser samples for the homepage and services. The 24 routes include 22 public pages and two private noindex GEO views. See [the complete metadata inventory](LANGUAGE_SEO_INVENTORY.csv) for both languages.

## Findings

| Item | Local production build | Live site samples |
| --- | --- | --- |
| Canonical | One absolute HTTPS canonical per known page. Same URL in DE and EN because both languages currently share a route. Initial HTML agrees with the rendered canonical. | Homepage points to itself. `/services` incorrectly points to the homepage, before and after language switching. |
| Hreflang | Absent from all 24 documents and all 48 rendered language states. There are no separate language URLs in React Router. | Contains `en → https://mapsuche.de/en`, `de → https://mapsuche.de/de`, and `x-default → https://mapsuche.de`. Both language targets redirect to a trailing slash and then return **404**. |
| HTML lang | Initial HTML is always `en`. Switching language sets `en` or `de` correctly on all routes. German currently depends on JavaScript, browser language or saved preference. | Initial HTML is `en`; the buttons correctly set `en`/`de` on the sampled pages. |
| Title | Present once per page, correct for the selected language and route. Initial HTML contains the English title. | Homepage title stays English in both languages. Services also retains that homepage title. |
| Meta description | Present once per page, localized for all routes after switching. Initial HTML contains the English description. | Homepage description stays English after selecting DE. Services retains the same homepage description. |

No uncaught JavaScript exceptions occurred in the local 48-state check. All local direct route requests returned 200. No forms or AI API calls were submitted.

## Main indexing gap

MapSuche currently provides two interface languages at the same URL, rather than two independently addressable language versions. For example, both selections use `https://mapsuche.de/services`. A shared canonical is consistent with that architecture, but it does not identify separate German and English pages. The build only emits English documents, so the German version cannot be retrieved as an independent language-specific HTML URL.

Google recommends distinct URLs for language versions rather than choosing content using browser settings or cookies. Adding `hreflang` tags alone will not fix the current architecture: their destinations must be functioning, language-specific pages. Google's guidance also explains that it determines page language from visible content; the HTML `lang` attribute is still useful, but does not make German content independently discoverable. [Google multilingual-site guidance](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites).

For independently indexable DE/EN versions, the next implementation should:

1. Add stable language routes, for example `/de/services` and `/en/services`, and prerender the corresponding content and metadata in each language.
2. Give each translated page its own canonical. German should canonicalize to its German URL and English to its English URL.
3. Include reciprocal, absolute `hreflang="de"` and `hreflang="en"` links on both versions, including the self-reference. Choose an appropriate `x-default` fallback.
4. Use ordinary language-switch links to the equivalent translated route. The URL should determine the rendered language without depending on saved preferences or browser language.
5. Extend the sitemap, exact hosting rewrites and legacy redirects to the language routes. Keep private GEO results/dashboard noindex, and preserve report query parameters and token fragments when switching languages.

Google requires each language version to list itself and the alternatives, with return links between the versions. [Google hreflang requirements](https://developers.google.com/search/docs/specialty/international/localized-versions).

## Local examples

Both language selections below currently use canonical `https://mapsuche.de/services` and have no hreflang links.

| Field | EN | DE |
| --- | --- | --- |
| HTML lang after JavaScript | `en` | `de` |
| Title | Services \| MapSuche | Leistungen \| MapSuche |
| Description | An overview of GEO checks, Google Maps optimization, business profiles, website development and process audits. | Übersicht zu GEO Checks, Google Maps Optimierung, Unternehmensprofilen, Website-Entwicklung und Ablauf-Audits. |

For `/geo-check`, the titles correctly switch between `Free GEO Check | MapSuche` and `Kostenloser GEO Check | MapSuche`; the canonical remains `https://mapsuche.de/geo-check` in both languages. Legal pages and all eight published articles also have EN/DE metadata.

## Additional metadata observations

- The homepage title is identical across languages: `MapSuche | GEO Analytics & Digital Marketing`. This is not a duplicate-tag problem, but a more explicitly German title could improve consistency. `Blog | MapSuche` and `Impressum | MapSuche` are also the same in both languages, appropriately for those names.
- Several blog titles/descriptions are long. Using 65 title characters and 160 description characters only as editorial review thresholds, six articles have long titles and five have long descriptions in at least one language. These are not validity limits or guaranteed truncation points. The inventory includes exact lengths.
- Blog metadata inherits excerpts with claims such as “authentic reviews from our experts” on the restaurants article and “over 60%” on the mobile article. This audit found no verification attached to those statements in the metadata source; confirm their evidence or use neutral summaries.
- `og:locale` switches correctly, but `og:locale:alternate` remains `de_DE` even when the selected language is German. This social-sharing detail is separate from hreflang and needs adjustment during the language-routing work.

## Live deployment status

The local prerendering and central metadata work is still unpublished. Live `/services` redirects to `/services/` and returns 404, with the old homepage metadata. The live `/en` and `/de` alternates behave similarly. Publish the verified local fixes and hosting rules described in [INDEXING.md](INDEXING.md), then verify the language implementation on the actual domain. Do not treat local checks as proof of deployed metadata or Google's indexed state.

Session evidence for raw HTML, catalog values and live browser metadata is stored under ignored `.local-data/language-seo-audit/`. The CSV inventory records metadata catalog values, which were observed in the local rendered language checks. No deployment, Git commit or push was performed for this audit.
