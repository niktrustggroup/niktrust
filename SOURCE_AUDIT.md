# NikTrust source-of-truth matrix

| Subject | Authority | Applied outcome |
|---|---|---|
| Brand, typography, components | NikTrust Design System archive and Brand Assets | Existing NT components/tokens, official logo, Vazirmatn retained |
| Product boundaries and revised scope | Day01 Product Brief and Scope Register, superseded by Day04 | Decision support, not trading/execution; expanded service presentation |
| Route inventory | All 14 sheets of Day02–03 workbook | Separate category/review/trust/service/account/partner routes; existing public URLs preserved |
| Trust and data layer | Day04 Handoff | Replaceable mock/http client, envelope, unpublished scores hidden, explicit unknown evidence |
| Voice and content | Brand Book PDF and archive extracts (voice, content map, brief, personas, data model, keywords) | Neutral Persian, no invented real authors, claims, partners or statistics |

## Missing and conflicting sources

- The Day04 companion `NikTrust_Day04_Lovable_Mock_Data.json` and `NikTrust_Day04_API_Contract_v1.yaml` are not among the uploads or inspected archives. Current interfaces are **provisional**, not generated or validated against that OpenAPI contract. Fixtures preserve the previous UI kit's explicitly fictional specifications and remove unsupported scores and regulatory claims.
- Day04 requests the expanded MVP prototype; older master-prompt passages describe narrower account scope. The newer explicit request and Day04 govern this work.
- The supplied workbook contains 85 MVP pages/states, not 85 distinct routes. Proposed and pending decisions remain labelled as such in the source; route presence is not production-service completion.
- Authentication strategy (PD-08/PD-12), actual backend contract, provider/licensing for market data, approved calculator formulas, membership pricing/entitlements, IB contracts, rebate terms and final legal/team/contact content remain unavailable.
- No fake authentication, financial calculations, affiliate destination, payment, commission or submission service was introduced. Account/partner and tool screens clearly expose these integration limits.

## Validation

Behavior tests cover four-item cap, same-category comparisons, unpublished scores, sanitized restoration, working coverage filtering, report length and exact rial/toman conversion. Browser checks cover search, filtering, pagination, comparison persistence, category reviews, phone menu and viewport widths 320–1920. Detailed production integration and authenticated end-to-end verification remain blocked by the absent services.