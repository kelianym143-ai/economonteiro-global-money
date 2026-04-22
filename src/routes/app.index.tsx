import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Topbar } from "@/components/Topbar";
import { AddTransactionDialog } from "@/components/AddTransactionDialog";
import { useStore } from "@/store/app-store";
import { getDict } from "@/lib/i18n";
import { ArrowDownRight, ArrowUpRight, TrendingUp, Wallet, PiggyBank } from "lucide-react";
import { Money } from "@/components/Money";
import { motion } from "framer-motion";
import {
  AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis, PieChart as RPieChart, Pie, Cell,
} from "recharts";

export const Route = createFileRoute("/app/")({
  component: Dashboard,
  head: () => ({ meta: [{ title: "Dashboard — EconoMonteiro" }] }),
});

const CAT_COLORS = ["oklch(0.55 0.22 260)", "oklch(0.72 0.18 165)", "oklch(0.78 0.16 75)", "oklch(0.62 0.24 25)", "oklch(0.7 0.2 290)", "oklch(0.6 0.18 200)", "oklch(0.5 0.05 250)"];

function Dashboard() {
  const { lang, transactions } = useStore();
  const t = getDict(lang);
  const [open, setOpen] = useState(false);

  const stats = useMemo(() => {
    const income = transactions.filter((x) => x.type === "income").reduce((s, x) => s + x.amount, 0);
    const expenses = transactions.filter((x) => x.type === "expense").reduce((s, x) => s + x.amount, 0);
    return { income, expenses, balance: income - expenses, savings: income - expenses };
  }, [transactions]);

  const byCategory = useMemo(() => {
    const map: Record<string, number> = {};
    transactions.filter((x) => x.type === "expense").forEach((x) => {
      map[x.category] = (map[x.category] || 0) + x.amount;
    });
    return Object.entries(map).map(([name, value]) => ({ name: t[name as keyof typeof t] as string, value }));
  }, [transactions, t]);

  const trend = useMemo(() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    return months.map((m, i) => ({
      m,
      income: 4000 + Math.sin(i) * 800 + i * 200,
      expenses: 2500 + Math.cos(i) * 500 + i * 150,
    }));
  }, []);

  const fmt = (n: number) =>
    new Intl.NumberFormat(lang === "pt" ? "pt-BR" : lang === "ja" ? "ja-JP" : lang, {
      style: "currency",
      currency: lang === "pt" ? "BRL" : lang === "ja" ? "JPY" : lang === "en" ? "USD" : "EUR",
      maximumFractionDigits: 0,
    }).format(n);

  const cards = [
    { label: t.balance, value: stats.balance, icon: Wallet, gradient: "bg-gradient-primary", text: "text-primary-foreground", delta: "+12.5%" },
    { label: t.income, value: stats.income, icon: ArrowUpRight, color: "text-success", delta: "+8.2%" },
    { label: t.expenses, value: stats.expenses, icon: ArrowDownRight, color: "text-destructive", delta: "-3.1%" },
    { label: t.savings, value: stats.savings, icon: PiggyBank, color: "text-accent", delta: "+18%" },
  ];

  return (
    <>
      <Topbar onAdd={() => setOpen(true)} />
      <main className="flex-1 p-4 md:p-8 space-y-6 bg-gradient-mesh">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">{t.dashboard}</h1>
          <p className="text-muted-foreground mt-1">{t.thisMonth}</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((c, i) => {
            const Icon = c.icon;
            const isPrimary = !!c.gradient;
            return (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className={`rounded-2xl p-5 border border-border shadow-soft ${isPrimary ? `${c.gradient} ${c.text}` : "bg-card"}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`text-xs font-medium ${isPrimary ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                    {c.label}
                  </div>
                  <Icon className={`h-4 w-4 ${isPrimary ? "" : c.color}`} />
                </div>
                <div className="text-xl md:text-2xl font-bold font-display"><Money value={c.value} /></div>
                <div className={`text-[11px] mt-1 ${isPrimary ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {c.delta} {t.vsLastMonth}
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 rounded-2xl bg-card border border-border p-5 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-semibold">{t.monthlyTrend}</h2>
              <TrendingUp className="h-4 w-4 text-success" />
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={trend}>
                <defs>
                  <linearGradient id="gIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.7 0.18 155)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="oklch(0.7 0.18 155)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gExp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.55 0.22 260)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="oklch(0.55 0.22 260)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="m" stroke="var(--muted-foreground)" fontSize={11} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} />
                <Tooltip
                  contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }}
                />
                <Area type="monotone" dataKey="income" stroke="oklch(0.7 0.18 155)" strokeWidth={2.5} fill="url(#gIncome)" />
                <Area type="monotone" dataKey="expenses" stroke="oklch(0.55 0.22 260)" strokeWidth={2.5} fill="url(#gExp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-2xl bg-card border border-border p-5 shadow-soft">
            <h2 className="font-display font-semibold mb-4">{t.spendingByCategory}</h2>
            <ResponsiveContainer width="100%" height={200}>
              <RPieChart>
                <Pie data={byCategory} dataKey="value" innerRadius={50} outerRadius={80} paddingAngle={3}>
                  {byCategory.map((_, i) => (
                    <Cell key={i} fill={CAT_COLORS[i % CAT_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
              </RPieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5 mt-2">
              {byCategory.map((c, i) => (
                <div key={c.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full" style={{ background: CAT_COLORS[i % CAT_COLORS.length] }} />
                    <span className="text-muted-foreground">{c.name}</span>
                  </div>
                  <span className="font-medium">{fmt(c.value)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-card border border-border p-5 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold">{t.recentTransactions}</h2>
            <Link to="/app/transactions" className="text-xs text-primary font-medium hover:underline">
              {t.viewAll} →
            </Link>
          </div>
          <div className="divide-y divide-border">
            {transactions.slice(0, 5).map((tx) => (
              <div key={tx.id} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className={`h-9 w-9 rounded-xl flex items-center justify-center ${tx.type === "income" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
                    {tx.type === "income" ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{tx.description}</div>
                    <div className="text-xs text-muted-foreground">{t[tx.category]} · {tx.date}</div>
                  </div>
                </div>
                <div className={`text-sm font-semibold ${tx.type === "income" ? "text-success" : "text-foreground"}`}>
                  {tx.type === "income" ? "+" : "−"}<Money value={tx.amount} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <AddTransactionDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
