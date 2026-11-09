import { useNavigate, useSearch } from '@tanstack/react-router';
export type PublicSearch = { q?: string; coverage?: string; sort?: string; filters?: string; region?: string; page?: number; topic?: string; letter?: string; type?: string };
export function validatePublicSearch(raw: Record<string, unknown>): PublicSearch {
  const result: PublicSearch = {};
  for (const key of ['q','coverage','sort','filters','region','topic','letter','type'] as const) if (typeof raw[key] === 'string') result[key] = raw[key];
  if (typeof raw['page'] === 'number' && Number.isFinite(raw['page'])) result.page = raw['page'];
  return result;
}
export function usePublicSearch() {
  const search = useSearch({ strict: false }) as PublicSearch;
  const navigate = useNavigate();
  const update = (value: PublicSearch) => void navigate({ to: '.', search: previous => ({ ...previous, ...value }), resetScroll: false });
  return { search, update };
}