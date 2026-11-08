import type { Catalog, DataClient, Envelope } from './types';
/** URL is configured, not guessed: the original OpenAPI contract is not supplied. */
export const httpClient: DataClient = {
  async getCatalog() {
    const url = import.meta.env['VITE_NIKTRUST_CATALOG_URL'];
    if (!url) throw new Error('نشانی سرویس داده تنظیم نشده است.');
    const response = await fetch(url, { credentials: 'include', headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error('دریافت اطلاعات ممکن نشد.');
    const envelope = await response.json() as Envelope<Catalog>;
    if (!Array.isArray(envelope.data?.platforms)) throw new Error('پاسخ سرویس داده معتبر نیست.');
    return envelope;
  },
};