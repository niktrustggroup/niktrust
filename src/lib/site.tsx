import type React from "react";
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { PATHS } from "@/ds/paths";
import { usePublicPlatforms } from '@/api/client';
import { sanitizeSelection } from '@/api/rules';

export const MAX_COMPARE = 4;

/** Pure rule: toggle a platform in the compare list, capped at MAX_COMPARE. */
export function toggleInList(list: string[], id: string): string[] {
  if (list.includes(id)) return list.filter((x) => x !== id);
  if (list.length >= MAX_COMPARE) return list;
  return [...list, id];
}

type CompareCtx = {
  compare: string[];
  setCompare: (ids: string[]) => void;
  toggleCompare: (id: string) => void;
};

// Kept on globalThis so a hot reload of this module reuses the same context instead of orphaning the provider.
const g = globalThis as { __ntCompareCtx?: React.Context<CompareCtx | null> };
const Ctx = (g.__ntCompareCtx ??= createContext<CompareCtx | null>(null));
const KEY = "nt-compare";

export function CompareProvider({ children }: { children: ReactNode }) {
  const { platforms } = usePublicPlatforms();
  const [compare, setCompareState] = useState<string[]>([]);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setCompareState(sanitizeSelection(JSON.parse(raw), platforms));
    } catch {
      /* ignore */
    }
  }, [platforms]);
  const setCompare = useCallback((ids: string[]) => {
    const safe = sanitizeSelection(ids, platforms);
    setCompareState(safe);
    try {
      localStorage.setItem(KEY, JSON.stringify(safe));
    } catch {
      /* ignore */
    }
  }, [platforms]);
  const toggleCompare = useCallback((id: string) => {
    setCompareState((prev) => {
      if (!platforms.some(p=>p.id===id) || (prev.length && platforms.find(p=>p.id===prev[0])?.category !== platforms.find(p=>p.id===id)?.category)) return prev;
      const next = toggleInList(prev, id);
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, [platforms]);
  return <Ctx.Provider value={{ compare, setCompare, toggleCompare }}>{children}</Ctx.Provider>;
}

export function useCompare() {
  const c = useContext(Ctx);
  if (!c) throw new Error("CompareProvider missing");
  return c;
}

/** Navigation helper used by the design-system screens: go("brokers"), go("review", "a"). */
export function useGo() {
  const navigate = useNavigate();
  const { platforms } = usePublicPlatforms();
  return useCallback(
    (id: string, arg?: string) => {
      const platform = platforms.find(p => p.id === arg);
      if (id === 'review') {
        if (!platform) { void navigate({to:'/review/$id',params:{id:arg??'unknown'}}); return; }
        const to = platform.category==='brokers'?'/forex-brokers/$slug':platform.category==='exchanges'?'/crypto-exchanges/$slug':'/prop-firms/$slug';
        void navigate({to,params:{slug:platform.slug}});
      } else void navigate({ to: PATHS[id] ?? '/' });
      if (typeof window !== "undefined") window.scrollTo(0, 0);
    },
    [navigate, platforms],
  );
}

/** Props bundle the screens expect. */
export function useScreenProps() {
  const go = useGo();
  const c = useCompare();
  return { go, ...c };
}
