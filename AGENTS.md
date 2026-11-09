<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture rules
- NikTrust Design System lives in `src/ds/` (components ported verbatim from the uploaded DS as `@ts-nocheck` TSX, CSS tokens in `src/ds/css/`); reuse these `nt-*` components and tokens instead of shadcn/Tailwind colors — the DS is the brand source of truth.
- Page bodies live in `src/screens/` (ported from the DS UI kit) and routes are thin wrappers that pass `useScreenProps()` (go/compare); keeps routes simple and screens faithful to the kit.
- Navigation ids map to URLs only in `src/ds/paths.ts`; header, footer and breadcrumbs read from it so URLs change in one place.
- Compare selection is client-only (localStorage) via `CompareProvider`; no backend exists yet.
- Data-driven screens read the shared query/client envelope in `src/api/`; provisional view models must be replaced from the missing Day04 OpenAPI companion rather than claiming contract conformance.
- Product service/account presentation screens expose unavailable states until real authenticated services exist; never substitute local mock success for a production operation.
- Shared research navigation groups live in `src/ds/navigation.ts`, resolve through PATHS, and serve both desktop mega menus and mobile accordions to prevent hierarchy drift.
- The research publication styling layer lives in `src/ds/css/research.css` and inherits NT semantic tokens; shared discovery and publication screens keep category/review/editorial journeys consistent.

- ThemeProvider owns appearance preference; appearance.css overrides NT semantic roles globally so all screens share night mode.
- Header brand assets render as CSS masks with a dedicated semantic logo token so original SVG fills cannot override the shared appearance role.
- Public market displays use client-mounted TradingView embeds with provider attribution and failure states; never substitute fabricated prices.
- Crawl policy (canonical, noindex, sitemap) lives in src/lib/seo-policy.ts and is applied once in the root head; keeps one canonical per page and one private-path list.
- Homepage modules live in src/screens/home/; public recommendation surfaces read usePublicPlatforms() (rules.publicPlatforms), which excludes demonstration records so sample data never appears as a recommendation.
