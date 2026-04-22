import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Topbar } from "@/components/Topbar";
import { AddCardDialog } from "@/components/AddCardDialog";
import { CardItem } from "@/components/CardItem";
import { Money } from "@/components/Money";
import { store, useStore } from "@/store/app-store";
import { getDict } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Plus, CreditCard, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/app/cards")({
  component: Page,
  head: () => ({ meta: [{ title: "Cards — EconoMonteiro" }] }),
});

function Page() {
  const { lang, cards, transactions } = useStore();
  const t = getDict(lang);
  const [open, setOpen] = useState(false);

  const usedByCard = useMemo(() => {
    const map: Record<string, number> = {};
    transactions.forEach((tx) => {
      if (tx.type === "expense" && tx.cardId) {
        map[tx.cardId] = (map[tx.cardId] || 0) + tx.amount;
      }
    });
    return map;
  }, [transactions]);

  const totalLimit = cards.reduce((s, c) => s + c.limit, 0);
  const totalUsed = Object.values(usedByCard).reduce((s, v) => s + v, 0);

  return (
    <>
      <Topbar />
      <main className="flex-1 p-4 md:p-8 space-y-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
              <CreditCard className="h-8 w-8 text-primary" />
              {t.myCards}
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">{t.cardsDescription}</p>
          </div>
          <Button onClick={() => setOpen(true)} className="bg-gradient-primary shadow-elegant gap-1.5">
            <Plus className="h-4 w-4" /> {t.addCard}
          </Button>
        </div>

        {cards.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl bg-gradient-primary p-5 text-primary-foreground shadow-elegant">
              <div className="text-xs opacity-80">{t.creditLimit}</div>
              <div className="text-2xl font-bold font-display mt-1"><Money value={totalLimit} /></div>
            </div>
            <div className="rounded-2xl bg-card border border-border p-5 shadow-soft">
              <div className="text-xs text-muted-foreground">{t.used}</div>
              <div className="text-2xl font-bold font-display mt-1 text-destructive"><Money value={totalUsed} /></div>
            </div>
            <div className="rounded-2xl bg-card border border-border p-5 shadow-soft">
              <div className="text-xs text-muted-foreground">{t.available}</div>
              <div className="text-2xl font-bold font-display mt-1 text-success">
                <Money value={Math.max(0, totalLimit - totalUsed)} />
              </div>
            </div>
          </div>
        )}

        <div className="rounded-xl bg-success/5 border border-success/20 p-3 flex gap-2 text-xs">
          <ShieldCheck className="h-4 w-4 text-success shrink-0 mt-0.5" />
          <p className="leading-snug text-foreground/80">{t.securityNote}</p>
        </div>

        {cards.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-border p-12 text-center">
            <CreditCard className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
            <p className="text-muted-foreground mb-4">{t.noCards}</p>
            <Button onClick={() => setOpen(true)} className="bg-gradient-primary">
              <Plus className="h-4 w-4 mr-1.5" /> {t.addCard}
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card, i) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="rounded-2xl bg-card border border-border p-4 shadow-soft"
              >
                <CardItem
                  card={card}
                  used={usedByCard[card.id] || 0}
                  onDelete={() => {
                    if (confirm(t.confirmDelete)) store.removeCard(card.id);
                  }}
                />
              </motion.div>
            ))}
          </div>
        )}
      </main>
      <AddCardDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
