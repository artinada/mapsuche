# React content and indexing audit

Implementation follow-up: the initial-HTML, metadata, heading, private-view and local HTTP issues described below have now been addressed and verified in this checkout. See [the indexing implementation and deployment steps](INDEXING.md). This document retains the original audit observations; the live website still needs publication and post-deployment verification.

Checked on 2026-11-07 against `https://mapsuche.de`, the local checkout at `http://127.0.0.1:3000`, and the existing production build using Vite preview on port 4173.

**React renders the main content in Chromium, but live internal URLs return HTTP 404.** The live service pages also keep the homepage title, description and canonical after rendering. These are concrete indexing problems separate from the general limitations of client-side rendering.

This audit checked the website; it did not deploy changes. Chromium rendering and requests using a Googlebot user-agent do not prove what Google's actual crawler has rendered or indexed. Search Console access was not available.

## Direct HTTP retrieval

The live homepage returns HTTP 200. The following tested internal URLs return HTTP 404, even though their response body is the same 16,446-byte app shell as the homepage:

- `/services`
- `/services/google-maps`
- `/services/website`
- `/geo-check`
- `/geo-optimierung`
- `/privacy`
- `/blog/wie-findet-man-gute-firmen-in-der-naehe`

Both ordinary requests and requests carrying a Googlebot user-agent reproduced the service-page failures. Browser reloads confirmed the 404 status. The response reports `Server: AmazonS3`; the underlying AWS configuration was not inspected.

The body still loads React, so a browser can display `/services` despite receiving HTTP 404. Clicking the Services navigation link from the homepage also displays the page, without making a new document request. This explains why the site can appear functional while direct crawler requests fail. Google documents that rendering may be skipped for non-200 responses.

The live main JavaScript asset and stylesheet both return HTTP 200 with the crawler user-agent. No fatal JavaScript exceptions were recorded in the rendering checks. The tested public paths are not blocked by the live robots.txt, and the responses did not contain an `X-Robots-Tag: noindex` header.

## Main text and metadata after JavaScript

Character counts refer to visible text inside `<main>`, excluding navigation and footer. Measurements are snapshots, not search-engine indexing records.

| Environment and route | Document status | Rendered main text | Title after rendering | Canonical after rendering |
| --- | --- | --- | --- | --- |
| Live `/` | 200 | 3,813 characters | Existing homepage title | Homepage |
| Live `/services`, direct request | **404** | 2,283 characters | **Homepage title** | **Homepage** |
| Live `/services/google-maps` | **404** | 906 characters | **Homepage title** | **Homepage** |
| Live `/services/website` | **404** | 1,123 characters | **Homepage title** | **Homepage** |
| Live `/geo-check` | **404** | “404 Page Not Found” | Homepage title | Homepage |
| Live `/geo-optimierung` | **404** | “404 Page Not Found” | Homepage title | Homepage |
| Production preview `/services` | 200 | 2,465 characters | `Services \| MapSuche` | `/services` |
| Production preview `/services/google-maps` | 200 | 906 characters | `Google Maps Optimization \| MapSuche` | `/services/google-maps` |
| Production preview `/geo-check` | 200 | 1,023 characters | **Generic site title** | **Homepage** |
| Production preview `/geo-optimierung` | 200 | 828 characters | **Generic site title** | **Homepage** |

The live console reports `SEO meta data not found for page: home` and the equivalent warning on the service page. The deployed version still has the failed metadata lookup. The local `useSEO.tsx` fix works for pages that call it: the checked service routes receive their own titles, descriptions and canonicals.

The live version differs from the local checkout: GEO routes render Not Found, the old homepage service carousel is present, and the live sitemap still has 17 entries, obsolete paths and 2024–2025 dates. The corrected local sitemap has 22 entries. Local improvements should not be described as live fixes until deployment and HTTP verification are complete.

## Content is absent before JavaScript

The tested live and local initial HTML responses contain an empty `<div id="root"></div>` and no page headings. The local production build behaves the same way. In a Chromium context with JavaScript disabled, `/services` returned HTTP 200 but had an empty body and zero children inside `#root`.

This matches `client/src/main.tsx`, which uses `ReactDOM.createRoot(...).render(...)`, and the empty root in `client/index.html`. Main content and route metadata depend on client execution. Google can render JavaScript, but this test does not establish that its rendering queue has processed these pages. Other crawlers may not execute JavaScript.

The initial HTML also declares the homepage canonical on internal pages. The service-page hook later changes it to a different URL. Google recommends having the correct canonical in the original HTML rather than changing a conflicting initial canonical with JavaScript.

## Remaining local gaps

1. **GEO and legal-page metadata coverage.** `/geo-check`, `/geo-optimierung` and `/privacy` do not call `useSEO`. Direct visits retain the generic title/description and homepage canonical. Routes without the hook can behave differently after navigation because the previous page's cleanup updates the canonical. Metadata should be correct on direct loads as well as navigation.
2. **Private/utility pages remain indexable.** `/geo-check/results` and `/geo/dashboard` are excluded from the sitemap but still have `robots: index, follow` and `googlebot: index, follow`. They should receive explicit noindex rules. This is an indexing measure, not a replacement for the report access tokens already enforced by the API.
3. **Unknown local routes return 200.** A nonexistent URL shows “404 Page Not Found” with HTTP 200 and no noindex rule in development and production preview. This is a soft-404 risk if the production hosting fallback is configured the same way. The tested live nonexistent URL currently returns a real 404; preserve that behavior while fixing valid-route handling.
4. **Social metadata is only partly updated.** The local helper updates Open Graph title and description, but `og:url` and Twitter title/description remain the generic homepage values. This affects sharing previews; it is separate from the main search-indexing blockers.
5. **Homepage heading semantics.** The only H1 is the shared “MapSuche” logo; the main homepage heading is H2. Use a content H1 for the page and a non-heading element for the logo. This is a semantic improvement, not proof of an indexing failure.

## Recommended order of work

1. Fix AWS hosting so **valid public page URLs return HTTP 200 on direct requests and reloads**. Preserve real 404 responses for unknown routes and do not rewrite asset/API requests to HTML. The current combination of an app-shell body and 404 status is consistent with an error-document fallback, but the exact AWS configuration needs inspection.
2. Deploy the current source changes, then recheck the public URLs, sitemap and metadata over HTTPS. The live site has not yet picked up the local metadata and sitemap fixes.
3. Add route-specific metadata for all intended public landing pages and noindex rules for results/dashboard/error views. Check both `robots` and `googlebot` tags for consistent directives.
4. Pre-render the public marketing/service/blog routes, or add server-side rendering, so initial HTML includes the main text and the correct title, description and canonical. Keep the interactive GEO form/report functionality client-side as needed. No crawler-specific content or user-agent-based rendering is required.
5. Verify the deployed result using Google's own tools rather than treating a successful browser render as confirmation of indexing.

## Google Search Console verification

For `/`, `/services`, `/services/google-maps`, `/services/website`, `/geo-check` and `/geo-optimierung`:

1. Inspect the URL and record its indexed status, last crawl, page-fetch result, and Google-selected versus user-declared canonical.
2. Run **Test live URL**, then inspect the tested page's rendered HTML, screenshot and resource-loading details. Confirm the actual main heading/body text and route-specific metadata are present. A successful live test does not itself mean the URL is indexed.
3. After deploying the fixes, request indexing for the important public URLs and resubmit the corrected sitemap. Recheck the indexed results after Google recrawls them.

No forms were submitted and no AI API requests were made for this audit. Temporary HTTP and browser evidence is saved in `/tmp/mapsuche-indexing-audit/` for this session. The temporary production-preview server was used only for verification.

References: [Google JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics), [Google's rendering recommendations](https://developers.google.com/search/docs/crawling-indexing/javascript/dynamic-rendering), [Search Console URL Inspection](https://support.google.com/webmasters/answer/9012289).
