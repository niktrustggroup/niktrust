import { notFound } from '@tanstack/react-router';
import type { QueryClient } from '@tanstack/react-query';
import { catalogQuery } from '@/api/client';
import { publicPlatforms, canCompare } from '@/api/rules';
import { contentQuery } from '@/api/content-client';
import type { Category } from '@/api/types';
export async function loadPublicPlatform(queryClient:QueryClient,id:string,category?:Category) {
  const env=await queryClient.ensureQueryData(catalogQuery);
  const p=publicPlatforms(env.data.platforms,env.meta.data_mode).find(p=>(p.slug===id||p.id===id)&&(!category||p.category===category));
  if(!p)throw notFound(); return p;
}
export async function loadArticle(queryClient:QueryClient,slug:string,kind:string,topic?:string) {
  const data=await queryClient.ensureQueryData(contentQuery);const a=data.articles.find(a=>a.slug===slug&&a.kind===kind&&(!topic||a.topic===topic));if(!a)throw notFound();return a;
}
export async function loadChange(queryClient:QueryClient,slug:string) {
  const data=await queryClient.ensureQueryData(contentQuery);const c=data.changes.find(c=>c.slug===slug);if(!c)throw notFound();await loadPublicPlatform(queryClient,c.platform_id);return c;
}
export async function loadPair(queryClient:QueryClient,pair:string) {
  const ids=pair.split('-vs-');if(ids.length!==2)throw notFound();
  const platforms=await Promise.all(ids.map(id=>loadPublicPlatform(queryClient,id)));if(!canCompare(platforms)||platforms[0]?.id===platforms[1]?.id)throw notFound();return platforms;
}