import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { ComponentHeader, ComponentFooter } from "@/ds";
import { CompareProvider, useScreenProps } from "@/lib/site";
import { ThemeProvider, useTheme } from "@/lib/theme";
import { MarketTicker } from "@/screens/product/MarketWidgets";
import logoSymbol from "@/assets/logo.svg.asset.json";
import logoWhite from "@/assets/logotype-white.svg.asset.json";
import logoBlue from "@/assets/logotype-blue.svg.asset.json";
import fontRegular from "@/assets/Vazirmatn-Regular.woff2.asset.json";
import fontBold from "@/assets/Vazirmatn-Bold.woff2.asset.json";
import { catalogQuery } from '@/api/client';
import { canonicalUrl, isPrivatePath } from '@/lib/seo-policy';
import { ComponentButton, ComponentDataCard } from '@/ds';

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">صفحه پیدا نشد</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          صفحهٔ موردنظر وجود ندارد یا جابه‌جا شده است.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            بازگشت به نیک‌تراست
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          دریافت این صفحه ممکن نشد
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          اطلاعات دریافت نشد؛ دوباره تلاش کنید یا به صفحهٔ اصلی برگردید.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            تلاش دوباره
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            بازگشت به نیک‌تراست
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  loader: ({ context }) => context.queryClient.ensureQueryData(catalogQuery),
  pendingComponent: () => <div className="nt-container nt-section"><ComponentDataCard state="loading"/></div>,
  head: ({ matches }) => {
    const leaf = matches.at(-1);
    const path = leaf?.pathname ?? '/';
    const hidden = isPrivatePath(path) || matches.some(m => m.status === 'notFound' || (m as { globalNotFound?: boolean }).globalNotFound) || leaf?.routeId === '__root__' || (!!leaf && /\/\$slug$/.test(leaf.routeId) && !leaf.loaderData);
    return {
    meta: [
      ...(hidden ? [{ name: "robots", content: "noindex, nofollow" }] : [{ property: "og:url", content: canonicalUrl(path) }]),
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "نیک‌تراست — ارزیابی و مقایسهٔ مستقل پلتفرم‌های مالی" },
      { name: "description", content: "نیک‌تراست، ارزیاب مستقل بروکرها، صرافی‌ها و پراپ‌فرم‌ها با معیارهای شفاف." },
      { name: "author", content: "NikTrust" },
      { property: "og:site_name", content: "نیک‌تراست" },
      { property: "og:locale", content: "fa_IR" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      ...(hidden ? [] : [{ rel: "canonical", href: canonicalUrl(path) }]),
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      ...[fontRegular, fontBold].map((f) => ({ rel: "preload", href: f.url, as: "font", type: "font/woff2", crossOrigin: "anonymous" as const })),
    ],
  };
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

const CURRENT: Record<string, string> = {
  "/forex-brokers": "brokers",
  "/crypto-exchanges": "exchanges",
  "/prop-firms": "prop",
  "/markets": "markets",
  "/tools": "tools",
  "/methodology": "method",
  "/learn":"learn", "/glossary":"learn", "/blog":"learn", "/news":"news", "/terminal":"markets",
};

function Chrome() {
  const { theme } = useTheme();
  const { go, compare } = useScreenProps();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const current = path.startsWith("/review") ? "brokers" : Object.entries(CURRENT).find(([url])=>path===url||path.startsWith(url+'/'))?.[1];
  return (
    <>
      <a href="#main" className="nt-skip">پرش به محتوا</a>
      <MarketTicker />
      <ComponentHeader
        logoSrc={logoBlue.url}
        logoSymbolSrc={logoSymbol.url}
        logoDarkSrc={logoWhite.url}
        current={current}
        compareCount={compare.length}
        onNavigate={go}
        onCompare={() => go("compare")}
        onSearch={() => go("search")}
      />
      <div id="main">
        <Outlet />
      </div>
      <ComponentFooter logoSrc={theme === "dark" ? logoWhite.url : logoBlue.url} onNavigate={go} />
    </>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider><CompareProvider>
        <Chrome />
      </CompareProvider></ThemeProvider>
    </QueryClientProvider>
  );
}
