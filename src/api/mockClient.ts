import fixture from './catalog.json';
import type { Catalog, DataClient, Envelope } from './types';
export const mockCatalog = fixture as Catalog;
export const mockClient: DataClient = {
  async getCatalog(): Promise<Envelope<Catalog>> {
    return { data: mockCatalog, meta: { data_mode: 'demonstration', total: mockCatalog.platforms.length }, request_id: 'niktrust-local-catalog' };
  },
};