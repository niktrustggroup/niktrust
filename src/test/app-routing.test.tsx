import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { RESEARCH_NAV } from '@/ds/navigation';
import { PATHS } from '@/ds/paths';

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });
  it('matches the new public, research, account and partner addresses', () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    for (const path of ['/search','/check','/alerts','/alerts/report','/forex-brokers/a','/crypto-exchanges/e','/prop-firms/f','/compare/a-vs-b','/about/team','/terminal','/tools/margin','/account/login','/partners/dashboard']) {
      expect(router.matchRoutes(path).at(-1)?.routeId, path).not.toBe(rootRouteId);
    }
  });
  it('maps the seven research categories and every navigation destination to existing pages', () => {
    const router=createRouter({routeTree,context:{queryClient:new QueryClient()}});
    expect(RESEARCH_NAV.map(n=>n.id)).toEqual(['brokers','exchanges','prop','markets','tools','learn','news']);
    const ids=RESEARCH_NAV.flatMap(n=>[n.id,...n.groups.flatMap(g=>g.links.map(([,id])=>id))]);
    for(const id of ids){
      const path=PATHS[id];
      expect(path,id).toBeDefined();
      if(!path)continue;
      const match=router.matchRoutes(path).at(-1);
      expect(match?.routeId,path).not.toBe(rootRouteId);
      expect(match?.pathname,path).toBe(path);
    }
  });
});
