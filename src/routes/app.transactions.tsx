import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Topbar } from "@/components/Topbar";
import { AddTransactionDialog } from "@/components/AddTransactionDialog";
import { useStore, store } from "@/store/app-store";
import { getDict } from "@/lib/i18n";
import { ArrowDownRight, ArrowUpRight, Trash2, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Money } from "@/components/Money";

export const Route = createFileRoute("/app/transactions")({
  component: Page,
  head: () => ({ meta: [{ title: "Transactions — EconoMonteiro" }] }),
});

function Page() {
  const { lang, transactions, cards } = useStore();
  const t = getDict(lang);
  const [open, setOpen] = useState(false);
  const cardName = (id?: string) => cards.find((c) => c.id === id)?.nickname;

  return (
    <>
      <Topbar onAdd={() => setOpen(true)} />
      <main className="flex-1 p-4 md:p-8 space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold">{t.transactions}</h1>
        <div className="rounded-2xl bg-card border border-border shadow-soft overflow-hidden">
          <div className="divide-y divide-border">
            {transactions.length === 0 && (
              <div className="p-8 text-center text-muted-foreground">{t.noTransactions}</div>
            )}
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${tx.type === "income" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
                    {tx.type === "income" ? <ArrowUpRight className="h-5 w-5" /> : <ArrowDownRight className="h-5 w-5" />}
                  </div>
                  <div>
                    <div className="font-medium">{tx.description}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                      {t[tx.category]} · {tx.date}
                      {tx.cardId && cardName(tx.cardId) && (
                        <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-1.5 py-0.5 text-primary">
                          <CreditCard className="h-3 w-3" /> {cardName(tx.cardId)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`font-semibold ${tx.type === "income" ? "text-success" : ""}`}>
                    {tx.type === "income" ? "+" : "−"}<Money value={tx.amount} />
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => store.removeTransaction(tx.id)}>
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
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
