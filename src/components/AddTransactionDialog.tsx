import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { store, useStore, type Category, type TxType } from "@/store/app-store";
import { getDict } from "@/lib/i18n";
import { z } from "zod";

const schema = z.object({
  description: z.string().trim().min(1).max(80),
  amount: z.number().positive().max(10_000_000),
});

export function AddTransactionDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const { lang, cards } = useStore();
  const t = getDict(lang);
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<TxType>("expense");
  const [category, setCategory] = useState<Category>("food");
  const [cardId, setCardId] = useState<string>("none");

  const cats: Category[] = ["food", "transport", "shopping", "bills", "entertainment", "salary", "other"];

  const submit = () => {
    const parsed = schema.safeParse({ description: desc, amount: parseFloat(amount) });
    if (!parsed.success) return;
    store.addTransaction({
      description: parsed.data.description,
      amount: parsed.data.amount,
      type,
      category,
      date: new Date().toISOString().slice(0, 10),
      cardId: type === "expense" && cardId !== "none" ? cardId : undefined,
    });
    setDesc(""); setAmount(""); setType("expense"); setCategory("food"); setCardId("none");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display">{t.addTransaction}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant={type === "expense" ? "default" : "outline"}
              onClick={() => setType("expense")}
              className={type === "expense" ? "bg-destructive hover:bg-destructive/90" : ""}
            >
              ↓ {t.expenses}
            </Button>
            <Button
              variant={type === "income" ? "default" : "outline"}
              onClick={() => setType("income")}
              className={type === "income" ? "bg-success hover:bg-success/90 text-success-foreground" : ""}
            >
              ↑ {t.income}
            </Button>
          </div>
          <div className="space-y-2">
            <Label>{t.description}</Label>
            <Input value={desc} onChange={(e) => setDesc(e.target.value.slice(0, 80))} placeholder="..." maxLength={80} autoComplete="off" />
          </div>
          <div className="space-y-2">
            <Label>{t.amount}</Label>
            <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" min="0" autoComplete="off" />
          </div>
          <div className="space-y-2">
            <Label>{t.category}</Label>
            <Select value={category} onValueChange={(v) => setCategory(v as Category)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {cats.map((c) => (
                  <SelectItem key={c} value={c}>{t[c]}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {type === "expense" && cards.length > 0 && (
            <div className="space-y-2">
              <Label>{t.linkedCard}</Label>
              <Select value={cardId} onValueChange={setCardId}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">{t.none}</SelectItem>
                  {cards.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.nickname} •••• {c.last4}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>{t.cancel}</Button>
          <Button onClick={submit} className="bg-gradient-primary">{t.save}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
