/** Provisional Day04 view models; replace with generated types when the OpenAPI companion is supplied. */
export type Category = 'brokers' | 'exchanges' | 'prop';
export type EvidenceSummary = { source_name: string; source_url: string | null; verified_at: string | null; claim_origin: 'demonstration' | 'independent' | 'platform'; is_stale: boolean };
export type AttributeValueView = { label: string; value: string | null; value_status: 'known' | 'unknown' | 'in_review' | 'not_applicable'; evidence: EvidenceSummary };
export type PlatformDetail = {
  id: string; slug: string; name_fa: string; category: Category; category_fa: string;
  exchange_region: 'iranian' | 'international' | null;
  coverage_level: 'identified' | 'basic_profile' | 'full_review';
  score: { is_published: boolean; value: string | null };
  iran_access: { status: 'unknown'; confidence: 'unknown'; evidence: EvidenceSummary };
  key_attributes: AttributeValueView[]; summary_fa: string; updated_at: string;
  disclosure: { is_affiliate: boolean; url: string | null };
};
export type Envelope<T> = { data: T; meta: { data_mode: 'demonstration' | 'unavailable'; total: number }; request_id: string };
export type Catalog = { platforms: PlatformDetail[] };
export interface DataClient { getCatalog(): Promise<Envelope<Catalog>> }