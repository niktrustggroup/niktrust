import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { mockClient } from './mockClient';
import { httpClient } from './httpClient';
export const client = import.meta.env.VITE_NIKTRUST_DATA_CLIENT === 'http' ? httpClient : mockClient;
export const catalogQuery = queryOptions({ queryKey: ['niktrust', 'catalog'], queryFn: () => client.getCatalog(), staleTime: 60_000 });
export function useCatalog() { return useSuspenseQuery(catalogQuery).data.data; }