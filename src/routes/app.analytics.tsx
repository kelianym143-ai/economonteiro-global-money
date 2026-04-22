import { createFileRoute } from "@tanstack/react-router";
import { Topbar } from "@/components/Topbar";
import { useStore } from "@/store/app-store";
import { getDict } from "@/lib/i18n";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export const Route = createFileRoute("/app/analytics")({
  component: Page,
  head: () => ({ meta: [{ title: "Analytics — EconoMonteiro" }] }),
});

function Page() {
  const { lang, transactions } = useStore();
  const t = getDict(lang);

  const data = ["food", "transport", "shopping", "bills", "entertainment", "salary", "other"].map((c) => ({
    name: t[c as keyof typeof t] as string,
    value: transactions.filter((x) => x.category === c && x.type === "expense").reduce((s, x) => s + x.amount, 0),
  })).filter((d) => d.value > 0);

  return (
    <>
      <Topbar />
      <main className="flex-1 p-4 md:p-8 space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold">{t.analytics}</h1>
        <div className="rounded-2xl bg-card border border-border p-5 shadow-soft">
          <h2 className="font-display font-semibold mb-4">{t.spendingByCategory}</h2>
          <ResponsiveContainer width="100%" height={360}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={11} />
              <YAxis stroke="var(--muted-foreground)" fontSize={11} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
              <Bar dataKey="value" fill="oklch(0.55 0.22 260)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </main>
    </>
  );
}
