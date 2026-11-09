import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { articles, changes, terms } from './public-content';
/** Static-source adapter until approved published content / original CMS contract arrives. */
export const contentQuery = queryOptions({ queryKey:['niktrust','public-content'], queryFn: async () => ({articles,changes,terms}), staleTime:60_000 });
export function usePublicContent() { return useSuspenseQuery(contentQuery).data; }