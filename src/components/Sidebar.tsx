import { Link, useLocation } from "@tanstack/react-router";
import { LayoutDashboard, ArrowLeftRight, PieChart, Target, Settings, CreditCard } from "lucide-react";
import { useStore } from "@/store/app-store";
import { getDict } from "@/lib/i18n";
import { Logo } from "./Logo";

export function Sidebar() {
  const { lang } = useStore();
  const t = getDict(lang);
  const loc = useLocation();

  const items = [
    { to: "/app", label: t.dashboard, icon: LayoutDashboard },
    { to: "/app/transactions", label: t.transactions, icon: ArrowLeftRight },
    { to: "/app/cards", label: t.cards, icon: CreditCard },
    { to: "/app/analytics", label: t.analytics, icon: PieChart },
    { to: "/app/goals", label: t.goals, icon: Target },
    { to: "/app/settings", label: t.settings, icon: Settings },
  ] as const;

  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-border bg-card/50 backdrop-blur-xl">
      <Link to="/app" className="flex items-center gap-2.5 px-6 py-6">
        <Logo size={40} />
        <div>
          <div className="font-display text-lg font-bold leading-none">{t.appName}</div>
          <div className="text-[10px] text-muted-foreground mt-1">{t.tagline}</div>
        </div>
      </Link>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {items.map((it) => {
          const active = loc.pathname === it.to;
          const Icon = it.icon;
          return (
            <Link
              key={it.to}
              to={it.to}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                active
                  ? "bg-gradient-primary text-primary-foreground shadow-elegant"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              {it.label}
            </Link>
          );
        })}
      </nav>

      <div className="m-3 rounded-2xl bg-gradient-mesh p-4 border border-border">
        <div className="text-xs font-semibold mb-1">💎 Pro</div>
        <div className="text-[11px] text-muted-foreground leading-snug">
          Desbloqueie análises com IA e relatórios ilimitados.
        </div>
      </div>
    </aside>
  );
}

export function MobileNav() {
  const { lang } = useStore();
  const t = getDict(lang);
  const loc = useLocation();
  const items = [
    { to: "/app", label: t.dashboard, icon: LayoutDashboard },
    { to: "/app/transactions", label: t.transactions, icon: ArrowLeftRight },
    { to: "/app/cards", label: t.cards, icon: CreditCard },
    { to: "/app/analytics", label: t.analytics, icon: PieChart },
    { to: "/app/settings", label: t.settings, icon: Settings },
  ] as const;
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-border bg-card/95 backdrop-blur-xl">
      <div className="grid grid-cols-5">
        {items.map((it) => {
          const active = loc.pathname === it.to;
          const Icon = it.icon;
          return (
            <Link
              key={it.to}
              to={it.to}
              className={`flex flex-col items-center gap-1 py-3 text-[10px] font-medium ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className="h-5 w-5" />
              {it.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
