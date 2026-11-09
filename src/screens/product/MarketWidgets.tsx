import { Link } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { ComponentButton } from '@/ds';
import { useTheme } from '@/lib/theme';
import { SectionHead } from '../Shared';
/** Public provider embeds: no invented prices or private credentials. */
function MarketEmbed({ kind, widget: widgetName, config, label }: { kind: 'chart' | 'ticker' | 'mini'; widget?: string; config?: Record<string, unknown>; label?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let disposed = false;
    const markReady = () => { if (!disposed) setState('ready'); };
    const frames = new WeakSet<HTMLIFrameElement>();
    setState('loading');
    element.replaceChildren();
    const widget = document.createElement('div');
    widget.className = 'tradingview-widget-container__widget';
    element.append(widget);
    const script = document.createElement('script');
    script.src = `https://s3.tradingview.com/external-embedding/embed-widget-${widgetName ?? (kind === 'chart' ? 'advanced-chart' : 'ticker-tape')}.js`;
    script.async = true;
    script.type = 'text/javascript';
    script.textContent = JSON.stringify(config ? { ...config, colorTheme: theme, theme } : kind === 'chart' ? {
      autosize: true, symbol: 'BITSTAMP:BTCUSD', interval: 'D', timezone: 'Asia/Tehran', theme,
      style: '1', locale: 'en', allow_symbol_change: true, hide_side_toolbar: false,
      calendar: false, support_host: 'https://www.tradingview.com',
    } : {
      symbols: [
        { proName: 'FX_IDC:EURUSD', title: 'یورو / دلار' },
        { proName: 'FX_IDC:GBPUSD', title: 'پوند / دلار' },
        { proName: 'FX_IDC:USDJPY', title: 'دلار / ین' },
        { proName: 'BITSTAMP:BTCUSD', title: 'بیت‌کوین / دلار' },
        { proName: 'BITSTAMP:ETHUSD', title: 'اتریوم / دلار' },
        { proName: 'OANDA:XAUUSD', title: 'طلا / دلار' },
      ], showSymbolLogo: true, isTransparent: false, displayMode: 'regular', colorTheme: theme, locale: 'en',
    });
    script.onerror = () => { if (!disposed) setState('error'); };
    const observer = new MutationObserver(() => {
      const iframe = element.querySelector('iframe');
      if (iframe && !frames.has(iframe)) {
        frames.add(iframe);
        iframe.title = label ?? (kind === 'chart' ? 'نمودار بازار TradingView' : 'نوار قیمت بازار TradingView');
        iframe.addEventListener('load', markReady, { once: true });
      }
    });
    observer.observe(element, { childList: true, subtree: true });
    element.append(script);
    const timeout = window.setTimeout(() => setState(s => s === 'loading' ? 'error' : s), 20000);
    return () => { disposed = true; observer.disconnect(); window.clearTimeout(timeout); script.onerror = null; element.replaceChildren(); };
  }, [kind, theme, attempt, widgetName, JSON.stringify(config)]);
  return <div className={`nt-market-embed nt-market-embed--${kind}`}>
    <div className="tradingview-widget-container" ref={host} />
    {state !== 'ready' && <div className="nt-market-state" role="status">
      <span>{state === 'loading' ? 'دریافت قیمت‌های بازار…' : 'دریافت دادهٔ بازار ممکن نشد.'}</span>
      {state === 'error' && <ComponentButton type="tertiary" size="sm" onClick={() => setAttempt(n => n + 1)}>تلاش دوباره</ComponentButton>}
    </div>}
  </div>;
}
export function MarketTicker() {
  return <aside className="nt-market-ticker" aria-label="قیمت ارزها و بازار جهانی"><MarketEmbed kind="ticker" /></aside>;
}
export function MarketChart() {
  return <section className="nt-section nt-section--alt"><div className="nt-container">
    <SectionHead title="نبض بازار" desc="ارزهای جهانی، رمزارزها و طلا" />
    <MarketEmbed kind="chart" />
    <div className="nt-market-source"><a href="https://www.tradingview.com/" target="_blank" rel="noopener noreferrer">داده و نمودار: TradingView ↗</a><span>برخی قیمت‌ها با تأخیر ارائه می‌شوند؛ نرخ تومان نیستند و مبنای توصیهٔ معاملاتی نیستند.</span></div>
  </div></section>;
}

const SNAP = {
  crypto: [['BITSTAMP:BTCUSD', 'بیت‌کوین (BTC)'], ['BITSTAMP:ETHUSD', 'اتریوم (ETH)']],
  fx: [['FX_IDC:EURUSD', 'یورو / دلار'], ['FX_IDC:GBPUSD', 'پوند / دلار']],
  gold: [['OANDA:XAUUSD', 'طلا (XAUUSD)']],
  index: [['FOREXCOM:NSXUSD', 'نزدک ۱۰۰'], ['FOREXCOM:SPXUSD', 'اس‌اندپی ۵۰۰']],
} as const;
type SnapKey = keyof typeof SNAP;
const SNAP_TABS: readonly (readonly [SnapKey, string])[] = [['crypto', 'رمزارزها'], ['fx', 'ارزها'], ['gold', 'طلا'], ['index', 'شاخص‌ها']];
/** Snapshot cards: price, change, sparkline and timestamp are rendered by the provider; nothing is computed or cached locally. */
export function MarketSnapshotCard({ symbol, title }: { symbol: string; title: string }) {
  return <div className="nt-snap-card"><h3>{title}</h3><MarketEmbed kind="mini" widget="mini-symbol-overview" label={`نمای ${title} از TradingView`} config={{ symbol, width: '100%', height: 170, locale: 'en', dateRange: '1D', isTransparent: true, autosize: false, largeChartUrl: '' }}/></div>;
}
export function MarketOverview({ full = false }: { full?: boolean } = {}) {
  const [tab, setTab] = useState<SnapKey>('crypto');
  const [chart, setChart] = useState('BITSTAMP:BTCUSD');
  const all = Object.values(SNAP).flat();
  return <section id="markets" aria-labelledby="markets-t" className={`nt-home-sec${full ? '' : ' nt-home-sec--alt'}`}><div className="nt-container">
    <header className="nt-home-head"><div><h2 id="markets-t">{full ? 'نمادهای پشتیبانی‌شده' : 'نبض بازار'}</h2><p>نمایی از وضعیت بازارهای مالی، رمزارزها، ارزها و طلا.</p></div>{!full && <Link className="nt-home-more" to="/markets">نمای کامل بازار ←</Link>}</header>
    <div className="nt-home-tabs" role="tablist" aria-label="دستهٔ بازار">{SNAP_TABS.map(([id, t]) => <button key={id} type="button" role="tab" aria-selected={tab === id} className={tab === id ? 'is-on' : ''} onClick={() => setTab(id)}>{t}</button>)}</div>
    <div className="nt-snap-grid">{SNAP[tab].map(([s, t]) => <MarketSnapshotCard key={s} symbol={s} title={t}/>)}</div>
    <div className="nt-chart-box"><div className="nt-chart-bar"><label>نماد نمودار <select className="nt-input" value={chart} onChange={e => setChart(e.target.value)}>{all.map(([s, t]) => <option key={s} value={s}>{t}</option>)}</select></label></div>
      <MarketEmbed kind="chart" widget="advanced-chart" label="نمودار بازار TradingView" config={{ autosize: true, symbol: chart, interval: 'D', timezone: 'Asia/Tehran', style: '1', locale: 'en', allow_symbol_change: false, hide_side_toolbar: true, calendar: false, support_host: 'https://www.tradingview.com' }}/></div>
    <div className="nt-market-source"><a href="https://www.tradingview.com/" target="_blank" rel="noopener noreferrer">داده و نمودار: TradingView ↗</a><span>قیمت، تغییر روزانه و زمان به‌روزرسانی را TradingView نمایش می‌دهد؛ برخی داده‌ها با تأخیر است. نرخ تومان نیست و توصیهٔ معاملاتی نیست.</span></div>
  </div></section>;
}
