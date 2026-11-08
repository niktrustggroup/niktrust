import { useEffect, useRef, useState } from 'react';
import { ComponentButton } from '@/ds';
import { useTheme } from '@/lib/theme';
import { SectionHead } from '../Shared';
/** Public provider embeds: no invented prices or private credentials. */
function MarketEmbed({ kind }: { kind: 'chart' | 'ticker' }) {
  const host = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    setState('loading');
    element.replaceChildren();
    const widget = document.createElement('div');
    widget.className = 'tradingview-widget-container__widget';
    element.append(widget);
    const script = document.createElement('script');
    script.src = `https://s3.tradingview.com/external-embedding/embed-widget-${kind === 'chart' ? 'advanced-chart' : 'ticker-tape'}.js`;
    script.async = true;
    script.type = 'text/javascript';
    script.textContent = JSON.stringify(kind === 'chart' ? {
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
      ], showSymbolLogo: true, isTransparent: true, displayMode: 'regular', colorTheme: theme, locale: 'en',
    });
    script.onerror = () => setState('error');
    const observer = new MutationObserver(() => {
      const iframe = element.querySelector('iframe');
      if (iframe) {
        iframe.title = kind === 'chart' ? 'نمودار بازار TradingView' : 'نوار قیمت بازار TradingView';
        iframe.addEventListener('load', () => setState('ready'), { once: true });
      }
    });
    observer.observe(element, { childList: true, subtree: true });
    element.append(script);
    const timeout = window.setTimeout(() => setState(s => s === 'loading' ? 'error' : s), 20000);
    return () => { observer.disconnect(); window.clearTimeout(timeout); script.onerror = null; element.replaceChildren(); };
  }, [kind, theme, attempt]);
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
