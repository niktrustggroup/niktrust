import { describe,expect,it } from 'vitest';
import { QueryClient } from '@tanstack/react-query';
import { mockCatalog } from '@/api/mockClient';
import { directoryResults,filterOptions,verifiedDate,canSortNumerically } from '@/api/discovery';
import { contentQuery } from '@/api/content-client';
import { publicPlatforms,visibleScore } from '@/api/rules';
import { loadPublicPlatform,loadArticle,loadChange,loadPair } from '@/lib/public-loaders';
import { catalogQuery } from '@/api/client';
import { buildSitemap } from '@/lib/seo-policy';
import { routeTree } from '@/routeTree.gen';
import { createRouter,rootRouteId } from '@tanstack/react-router';
import type { PlatformDetail } from '@/api/types';

/** Test-only records. These are never seeded, served or imported by application code. */
function record(id:string,min:string,date:string):PlatformDetail {
 const base=mockCatalog.platforms[0];if(!base)throw new Error('Fixture missing');
 return {...base,id,slug:id,name_fa:id,updated_at:date,iran_access:{...base.iran_access,evidence:{...base.iran_access.evidence,claim_origin:'independent'}},key_attributes:[{label:'حداقل واریز',value:min,value_status:'known',evidence:{source_name:'Test source',source_url:'https://example.com/evidence',verified_at:date,claim_origin:'independent',is_stale:false}},{label:'نوع حساب',value:'ECN',value_status:'known',evidence:{source_name:'Test source',source_url:'https://example.com/evidence',verified_at:date,claim_origin:'independent',is_stale:false}}]};
}
describe('Day06-B public integrity',()=>{
 it('never sorts amounts with mixed currencies as one numeric scale',()=>{expect(canSortNumerically(['$100','€50'])).toBe(false);expect(canSortNumerically(['$100','$50'])).toBe(true);});
 it('returns only an actual recorded change tied to a public platform',async()=>{const q=new QueryClient(),p=record('a','100','2026-11-08');q.setQueryData(catalogQuery.queryKey,{data:{platforms:[p]},meta:{data_mode:'production',total:1},request_id:'test'});const c={slug:'change',platform_id:'a',type:'fee',title:'Test-only change',explanation:'Test',changed_at:'2026-11-08',verified_at:'2026-11-08',attribute:'حداقل واریز',previous:'200',current:'100',evidence:p.iran_access.evidence};q.setQueryData(contentQuery.queryKey,{articles:[],terms:[],changes:[c]});expect((await loadChange(q,'change')).previous).toBe('200');await expect(loadChange(q,'missing')).rejects.toBeDefined();});
 it('no numerical score is published before approval, even if flag is true',()=>expect(visibleScore({is_published:true,value:'9.9'})).toBeNull());
 it('fails closed for unknown catalog modes',()=>expect(publicPlatforms([record('test','100','2026-11-08')],'draft')).toEqual([]));
 it('excludes demo records from all category sources',()=>{for(const category of ['brokers','exchanges','prop'])expect(publicPlatforms(mockCatalog.platforms,'production').filter(p=>p.category===category)).toEqual([]);});
 it('rejects direct demo review URLs for all three categories',async()=>{const q=new QueryClient();for(const p of mockCatalog.platforms)await expect(loadPublicPlatform(q,p.slug,p.category)).rejects.toBeDefined();});
 it('rejects nonexistent article and update records',async()=>{const q=new QueryClient();await expect(loadArticle(q,'missing','learn')).rejects.toBeDefined();await expect(loadChange(q,'missing')).rejects.toBeDefined();});
 it('searches actual attribute values',()=>{expect(directoryResults([record('a','100','2026-11-08')],'ECN','','name',[])).toHaveLength(1);});
 it('only offers verified facets, excluding stale, missing-source and announced claims',()=>{const p=record('a','100','2026-11-08');p.key_attributes=p.key_attributes.map(a=>({...a,evidence:{...a.evidence,claim_origin:'platform'}}));expect(filterOptions([p])).toEqual([]);expect(verifiedDate(p)).toBeNull();});
 it('applies verified attribute filters and numeric sort, keeping unknowns last',()=>{const a=record('a','100','2026-11-08'),b=record('b','50','2026-11-09'),c=record('c','200','2026-11-07');expect(directoryResults([a,b,c],'','','numeric:حداقل واریز',[]).map(p=>p.id)).toEqual(['b','a','c']);expect(directoryResults([a,b,c],'','','name',[{label:'حداقل واریز',value:'50'}]).map(p=>p.id)).toEqual(['b']);});
 it('sorts by actual verification and update dates',()=>{const a=record('a','100','2026-11-08'),b=record('b','50','2026-11-09');expect(directoryResults([a,b],'','','verified',[]).map(p=>p.id)).toEqual(['b','a']);expect(directoryResults([a,b],'','','updated',[]).map(p=>p.id)).toEqual(['b','a']);});
 it('loads actual public records and rejects mixed-category comparison pairs',async()=>{const q=new QueryClient();const a=record('a','100','2026-11-08'),b={...record('b','50','2026-11-09'),category:'prop' as const};q.setQueryData(catalogQuery.queryKey,{data:{platforms:[a,b]},meta:{data_mode:'production',total:2},request_id:'test'});expect((await loadPublicPlatform(q,'a')).id).toBe('a');await expect(loadPair(q,'a-vs-b')).rejects.toBeDefined();await expect(loadPair(q,'a-vs-a')).rejects.toBeDefined();});
 it('every sitemap URL resolves to an existing route',()=>{const q=new QueryClient();const router=createRouter({routeTree,context:{queryClient:q}});const xml=buildSitemap(mockCatalog.platforms,'demonstration');const paths=[...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>new URL(m[1]??'').pathname);expect(paths.length).toBeGreaterThan(10);expect(new Set(paths).size).toBe(paths.length);for(const path of paths)expect(router.matchRoutes(path).at(-1)?.routeId,path).not.toBe(rootRouteId);});
});