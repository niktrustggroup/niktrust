import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { PlatformDetail } from '@/api/types';
import { sanitizeSelection } from '@/api/rules';

export type PreviewArea = 'user' | 'partner' | 'admin';
export const INSTRUMENTS = [
  { slug: 'eurusd', symbol: 'FX_IDC:EURUSD', name: 'یورو / دلار', category: 'forex' },
  { slug: 'gbpusd', symbol: 'FX_IDC:GBPUSD', name: 'پوند / دلار', category: 'forex' },
  { slug: 'usdjpy', symbol: 'FX_IDC:USDJPY', name: 'دلار / ین', category: 'forex' },
  { slug: 'btcusd', symbol: 'BITSTAMP:BTCUSD', name: 'بیت‌کوین / دلار', category: 'crypto' },
  { slug: 'ethusd', symbol: 'BITSTAMP:ETHUSD', name: 'اتریوم / دلار', category: 'crypto' },
  { slug: 'nasdaq100', symbol: 'FOREXCOM:NSXUSD', name: 'شاخص نزدک ۱۰۰', category: 'stocks' },
  { slug: 'sp500', symbol: 'FOREXCOM:SPXUSD', name: 'شاخص اس‌اندپی ۵۰۰', category: 'stocks' },
  { slug: 'xauusd', symbol: 'OANDA:XAUUSD', name: 'طلا / دلار', category: 'commodities' },
] as const;
export type Instrument = typeof INSTRUMENTS[number];
export function savedInstruments(input: unknown): string[] {
  return Array.isArray(input) ? [...new Set(input.filter((v): v is string => typeof v === 'string' && INSTRUMENTS.some(i => i.slug === v)))] : [];
}
export function savedPlatforms(input: unknown, platforms: PlatformDetail[]): string[] {
  return Array.isArray(input) ? [...new Set(input.filter((v): v is string => typeof v === 'string' && platforms.some(p => p.id === v)))] : [];
}
export function authValidation(mode: string, values: Record<string, string>, accepted: boolean): string | null {
  if (mode !== 'reset' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values['email'] ?? '')) return 'ایمیل معتبر وارد کنید.';
  if (mode !== 'recover' && (values['password'] ?? '').length < 10) return 'رمز عبور باید حداقل ۱۰ نویسه داشته باشد.';
  if (['register', 'reset'].includes(mode) && values['password'] !== values['confirm']) return 'تکرار رمز عبور یکسان نیست.';
  if (mode === 'register' && !accepted) return 'پذیرش شرایط و سیاست حریم خصوصی لازم است.';
  if (mode === 'admin' && !/^\d{6}$/.test(values['mfa'] ?? '')) return 'کد شش‌رقمی مرحلهٔ دوم وارد کنید.';
  return null;
}
export const prototypeActions = { authentication: false, payments: false, referralAttribution: false, commissions: false, scoring: false } as const;
type PrototypeContext = {
  access: PreviewArea[]; enter: (area: PreviewArea) => void; leave: (area: PreviewArea) => void;
  instruments: string[]; toggleInstrument: (slug: string) => void;
  platformIds: string[]; togglePlatform: (id: string, records: PlatformDetail[]) => void;
};
const Context = createContext<PrototypeContext | null>(null);
const KEY = 'nt-day07-watchlist';
export function PrototypeProvider({ children }: { children: ReactNode }) {
  const [access, setAccess] = useState<PreviewArea[]>([]);
  const [instruments, setInstruments] = useState<string[]>([]);
  const [platformIds, setPlatformIds] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try { const saved = JSON.parse(sessionStorage.getItem(KEY) ?? '{}'); setInstruments(savedInstruments(saved.instruments)); setPlatformIds(Array.isArray(saved.platformIds) ? saved.platformIds.filter((v: unknown) => typeof v === 'string') : []); } catch { /* corrupt preview state is discarded */ }
    setReady(true);
  }, []);
  useEffect(() => { if (ready) { try { sessionStorage.setItem(KEY, JSON.stringify({ instruments, platformIds })); } catch { /* optional browser storage */ } } }, [ready, instruments, platformIds]);
  return <Context.Provider value={{ access,
    enter: area => setAccess(prev => prev.includes(area) ? prev : [...prev, area]),
    leave: area => setAccess(prev => prev.filter(a => a !== area)), instruments, platformIds,
    toggleInstrument: slug => { if (INSTRUMENTS.some(i => i.slug === slug)) setInstruments(prev => prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]); },
    togglePlatform: (id, records) => { if (records.some(p => p.id === id)) setPlatformIds(prev => { const safe = savedPlatforms(prev, records); return safe.includes(id) ? safe.filter(s => s !== id) : [...safe, id]; }); },
  }}>{children}</Context.Provider>;
}
export function usePrototype() { const value = useContext(Context); if (!value) throw new Error('PrototypeProvider missing'); return value; }
export function previewCompare(ids: string[], platforms: PlatformDetail[]) { return sanitizeSelection(ids, platforms); }