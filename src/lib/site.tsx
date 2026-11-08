import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { PATHS } from "@/ds/paths";
import { mockCatalog } from '@/api/mockClient';
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

const Ctx = createContext<CompareCtx | null>(null);
const KEY = "nt-compare";

export function CompareProvider({ children }: { children: ReactNode }) {
  const [compare, setCompareState] = useState<string[]>([]);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setCompareState(sanitizeSelection(JSON.parse(raw), mockCatalog.platforms));
    } catch {
      /* ignore */
    }
  }, []);
  const setCompare = useCallback((ids: string[]) => {
    const safe = sanitizeSelection(ids, mockCatalog.platforms);
    setCompareState(safe);
    try {
      localStorage.setItem(KEY, JSON.stringify(safe));
    } catch {
      /* ignore */
    }
  }, []);
  const toggleCompare = useCallback((id: string) => {
    setCompareState((prev) => {
      const next = toggleInList(prev, id);
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);
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
  return useCallback(
    (id: string, arg?: string) => {
      const platform = mockCatalog.platforms.find(p => p.id === arg);
      const categoryPath = platform ? PATHS[platform.category] : undefined;
      const to = id === "review" ? (platform && categoryPath ? `${categoryPath}/${platform.slug}` : `/review/${arg ?? "a"}`) : (PATHS[id] ?? "/");
      void navigate({ to });
      if (typeof window !== "undefined") window.scrollTo(0, 0);
    },
    [navigate],
  );
}

/** Props bundle the screens expect. */
export function useScreenProps() {
  const go = useGo();
  const c = useCompare();
  return { go, ...c };
}
