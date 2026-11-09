import { describe, expect, it } from 'vitest';
import { authValidation, savedInstruments, savedPlatforms, prototypeActions, INSTRUMENTS } from '@/lib/prototype';
import { isPrivatePath, buildSitemap } from '@/lib/seo-policy';
import { publicPlatforms } from '@/api/rules';
import { mockCatalog } from '@/api/mockClient';
import { DASHBOARD_NAV } from '@/screens/prototype/navigation';
import { routeTree } from '@/routeTree.gen';
import { createRouter, rootRouteId } from '@tanstack/react-router';
import { QueryClient } from '@tanstack/react-query';
describe('Day07 prototype boundaries',()=>{
 it('requires registration password confirmation and terms acceptance',()=>{
   expect(authValidation('register',{email:'preview@example.test',password:'preview-only-123',confirm:'different'},true)).not.toBeNull();
   expect(authValidation('register',{email:'preview@example.test',password:'preview-only-123',confirm:'preview-only-123'},false)).not.toBeNull();
   expect(authValidation('register',{email:'preview@example.test',password:'preview-only-123',confirm:'preview-only-123'},true)).toBeNull();
 });
 it('validates MFA as six digits in the admin form without authenticating',()=>{expect(authValidation('admin',{email:'preview@example.test',password:'preview-only-123',mfa:'123'},true)).not.toBeNull();expect(authValidation('admin',{email:'preview@example.test',password:'preview-only-123',mfa:'123456'},true)).toBeNull();expect(prototypeActions.authentication).toBe(false);});
 it('does not activate payments, attribution, commissions or scoring',()=>{expect(prototypeActions.payments).toBe(false);expect(prototypeActions.referralAttribution).toBe(false);expect(prototypeActions.commissions).toBe(false);expect(prototypeActions.scoring).toBe(false);});
 it('watchlist accepts only supported instruments and removes duplicates',()=>{expect(savedInstruments(['btcusd','unknown','btcusd','eurusd',null])).toEqual(['btcusd','eurusd']);expect(savedInstruments({symbol:'btcusd'})).toEqual([]);});
 it('saved platforms exclude demonstration records via public catalog boundary',()=>{expect(savedPlatforms(['a','b'],publicPlatforms(mockCatalog.platforms,'production'))).toEqual([]);});
 it('noindexes all admin, partner, account, auth and payment scenarios',()=>{for(const p of ['/admin','/admin/login','/admin/platforms/a','/partner/dashboard','/partner/commissions','/login','/register','/reset-password','/forgot-password','/account/security','/membership/payment-result'])expect(isPrivatePath(p),p).toBe(true);});
 it('never lists prototype private pages in the sitemap',()=>{const xml=buildSitemap(mockCatalog.platforms,'demonstration');for(const p of ['/admin','/partner/','/account','/register','/membership/checkout','/terminal'])expect(xml).not.toContain(p);});
 it('all dashboard and required product routes match their own page',()=>{const router=createRouter({routeTree,context:{queryClient:new QueryClient()}});const paths=[...Object.values(DASHBOARD_NAV).flat().map(([path])=>path),'/login','/register','/forgot-password','/reset-password','/membership/plans','/membership/payment-result','/admin/platforms/create','/admin/platforms/a','/terminal/watchlist','/markets/forex','/markets/crypto','/markets/stocks','/markets/commodities',...INSTRUMENTS.map(i=>`/terminal/${i.slug}`)];for(const path of paths){const match=router.matchRoutes(path).at(-1);expect(match?.routeId,path).not.toBe(rootRouteId);expect(match?.pathname,path).toBe(path);}});
});