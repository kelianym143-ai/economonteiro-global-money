import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { store, useStore, type Category, type TxType } from "@/store/app-store";
import { getDict } from "@/lib/i18n";

export function AddTransactionDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const { lang } = useStore();
  const t = getDict(lang);
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<TxType>("expense");
  const [category, setCategory] = useState<Category>("food");

  const cats: Category[] = ["food", "transport", "shopping", "bills", "entertainment", "salary", "other"];

  const submit = () => {
    const a = parseFloat(amount);
    if (!desc || !a) return;
    store.addTransaction({
      description: desc,
      amount: a,
      type,
      category,
      date: new Date().toISOString().slice(0, 10),
    });
    setDesc(""); setAmount(""); setType("expense"); setCategory("food");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
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
            <Input value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="..." />
          </div>
          <div className="space-y-2">
            <Label>{t.amount}</Label>
            <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" />
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
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>{t.cancel}</Button>
          <Button onClick={submit} className="bg-gradient-primary">{t.save}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
