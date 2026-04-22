import { useState } from "react";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { store, useStore, type CardBrand } from "@/store/app-store";
import { getDict } from "@/lib/i18n";
import { luhnValid, detectBrand } from "@/lib/security";
import { ShieldCheck, AlertCircle } from "lucide-react";

const cardSchema = z.object({
  nickname: z.string().trim().min(1).max(40),
  holder: z.string().trim().min(2).max(60).regex(/^[\p{L}\s.'-]+$/u, "invalid"),
  fullNumber: z.string().regex(/^\d{13,19}$/),
  limit: z.number().positive().max(10_000_000),
  closingDay: z.number().int().min(1).max(28),
  dueDay: z.number().int().min(1).max(28),
});

const COLORS = [
  "bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500",
  "bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500",
  "bg-gradient-to-br from-amber-500 via-orange-500 to-red-500",
  "bg-gradient-to-br from-slate-700 via-slate-800 to-black",
];

export function AddCardDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const { lang } = useStore();
  const t = getDict(lang);
  const [nickname, setNickname] = useState("");
  const [holder, setHolder] = useState("");
  const [number, setNumber] = useState("");
  const [limit, setLimit] = useState("");
  const [closingDay, setClosingDay] = useState("5");
  const [dueDay, setDueDay] = useState("15");
  const [color, setColor] = useState(COLORS[0]);
  const [error, setError] = useState<string | null>(null);

  const reset = () => {
    setNickname(""); setHolder(""); setNumber(""); setLimit("");
    setClosingDay("5"); setDueDay("15"); setColor(COLORS[0]); setError(null);
  };

  const formatNumber = (v: string) => v.replace(/\D/g, "").slice(0, 19).replace(/(\d{4})(?=\d)/g, "$1 ");

  const submit = () => {
    setError(null);
    const cleanNumber = number.replace(/\D/g, "");
    const parsed = cardSchema.safeParse({
      nickname,
      holder,
      fullNumber: cleanNumber,
      limit: parseFloat(limit),
      closingDay: parseInt(closingDay, 10),
      dueDay: parseInt(dueDay, 10),
    });
    if (!parsed.success) {
      setError(t.invalidCard);
      return;
    }
    if (!luhnValid(cleanNumber)) {
      setError(t.invalidCard);
      return;
    }
    const brand: CardBrand = detectBrand(cleanNumber);
    store.addCard({
      nickname: parsed.data.nickname,
      holder: parsed.data.holder,
      fullNumber: cleanNumber,
      brand,
      limit: parsed.data.limit,
      closingDay: parsed.data.closingDay,
      dueDay: parsed.data.dueDay,
      color,
    });
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) reset(); onOpenChange(v); }}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display">{t.addCard}</DialogTitle>
        </DialogHeader>

        <div className="rounded-xl bg-success/10 border border-success/20 p-3 flex gap-2 text-xs text-foreground">
          <ShieldCheck className="h-4 w-4 text-success shrink-0 mt-0.5" />
          <p className="leading-snug">{t.securityNote}</p>
        </div>

        <div className="space-y-3 py-2">
          <div className="space-y-2">
            <Label>{t.cardNickname}</Label>
            <Input
              value={nickname}
              onChange={(e) => setNickname(e.target.value.slice(0, 40))}
              placeholder="Nubank, Itaú..."
              maxLength={40}
              autoComplete="off"
            />
          </div>
          <div className="space-y-2">
            <Label>{t.cardHolder}</Label>
            <Input
              value={holder}
              onChange={(e) => setHolder(e.target.value.slice(0, 60))}
              placeholder="João Silva"
              maxLength={60}
              autoComplete="off"
            />
          </div>
          <div className="space-y-2">
            <Label>{t.cardNumber}</Label>
            <Input
              value={formatNumber(number)}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="•••• •••• •••• ••••"
              inputMode="numeric"
              autoComplete="off"
              maxLength={23}
            />
          </div>
          <div className="space-y-2">
            <Label>{t.creditLimit}</Label>
            <Input
              type="number"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              placeholder="5000"
              min="0"
              autoComplete="off"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <Label>{t.closingDay}</Label>
              <Select value={closingDay} onValueChange={setClosingDay}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 28 }, (_, i) => i + 1).map((d) => (
                    <SelectItem key={d} value={String(d)}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{t.dueDay}</Label>
              <Select value={dueDay} onValueChange={setDueDay}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 28 }, (_, i) => i + 1).map((d) => (
                    <SelectItem key={d} value={String(d)}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Cor</Label>
            <div className="grid grid-cols-4 gap-2">
              {COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`h-12 rounded-xl ${c} transition-all ${color === c ? "ring-2 ring-offset-2 ring-primary ring-offset-background" : ""}`}
                />
              ))}
            </div>
          </div>
          {error && (
            <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-2.5 flex gap-2 text-xs text-destructive">
              <AlertCircle className="h-4 w-4 shrink-0" /> {error}
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
