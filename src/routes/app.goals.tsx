import { createFileRoute } from "@tanstack/react-router";
import { Topbar } from "@/components/Topbar";
import { useStore } from "@/store/app-store";
import { getDict } from "@/lib/i18n";
import { Target } from "lucide-react";

export const Route = createFileRoute("/app/goals")({
  component: Page,
  head: () => ({ meta: [{ title: "Goals — EconoMonteiro" }] }),
});

function Page() {
  const { lang } = useStore();
  const t = getDict(lang);
  const goals = [
    { name: "Viagem Japão", current: 4500, target: 12000, color: "bg-gradient-primary" },
    { name: "Reserva emergência", current: 8200, target: 15000, color: "bg-gradient-success" },
    { name: "Novo notebook", current: 1800, target: 6000, color: "bg-warning" },
  ];
  return (
    <>
      <Topbar />
      <main className="flex-1 p-4 md:p-8 space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold">{t.goals}</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {goals.map((g) => {
            const pct = Math.round((g.current / g.target) * 100);
            return (
              <div key={g.name} className="rounded-2xl bg-card border border-border p-5 shadow-soft">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="h-4 w-4 text-primary" />
                  <h3 className="font-semibold">{g.name}</h3>
                </div>
                <div className="text-2xl font-bold font-display mb-1">{pct}%</div>
                <div className="text-xs text-muted-foreground mb-3">${g.current.toLocaleString()} / ${g.target.toLocaleString()}</div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div className={`h-full ${g.color} transition-all`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}
