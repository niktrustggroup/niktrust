import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { mockClient } from './mockClient';
import { httpClient } from './httpClient';
import { useMemo } from 'react';
export const client = import.meta.env['VITE_NIKTRUST_DATA_CLIENT'] === 'http' ? httpClient : mockClient;
export const catalogQuery = queryOptions({ queryKey: ['niktrust', 'catalog'], queryFn: () => client.getCatalog(), staleTime: 60_000 });
export function useCatalog() { return useSuspenseQuery(catalogQuery).data.data; }import { publicPlatforms } from './rules';
/** Platforms eligible for public recommendations; demonstration records are never returned. */
export function usePublicPlatforms() { const env = useSuspenseQuery(catalogQuery).data; return useMemo(() => ({ platforms: publicPlatforms(env.data.platforms, env.meta.data_mode), mode: env.meta.data_mode }), [env]); }
