import { useStore, type CreditCard } from "@/store/app-store";
import { Money } from "./Money";
import { Wifi, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getDict } from "@/lib/i18n";
import { store } from "@/store/app-store";

const BRAND_LABEL: Record<string, string> = {
  visa: "VISA",
  mastercard: "Mastercard",
  amex: "AMEX",
  elo: "ELO",
  other: "CARD",
};

export function CardItem({ card, used, onDelete }: { card: CreditCard; used: number; onDelete?: () => void }) {
  const { lang, privacyMode } = useStore();
  const t = getDict(lang);
  const available = Math.max(0, card.limit - used);
  const pct = card.limit > 0 ? Math.min(100, (used / card.limit) * 100) : 0;
  const holder = privacyMode ? "•••• ••••" : store.getCardHolder(card.id);

  return (
    <div className="space-y-3">
      <div className={`relative rounded-2xl p-5 text-white shadow-elegant overflow-hidden aspect-[1.586/1] ${card.color}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_60%)]" />
        <div className="relative h-full flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[11px] opacity-80 uppercase tracking-wider">{card.nickname}</div>
              <div className="text-xs opacity-70 mt-0.5">{t.creditLimit}: <Money value={card.limit} /></div>
            </div>
            <Wifi className="h-5 w-5 opacity-70 rotate-90" />
          </div>
          <div className="font-mono text-lg tracking-[0.2em] opacity-95">
            •••• •••• •••• {privacyMode ? "••••" : card.last4}
          </div>
          <div className="flex items-end justify-between">
            <div>
              <div className="text-[10px] opacity-60 uppercase">{t.cardHolder}</div>
              <div className="text-sm font-medium uppercase">{holder}</div>
            </div>
            <div className="text-sm font-bold tracking-wider italic opacity-95">
              {BRAND_LABEL[card.brand]}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">{t.used}</span>
          <span className="font-semibold"><Money value={used} /></span>
        </div>
        <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
          <div
            className={`h-full transition-all ${pct > 80 ? "bg-destructive" : pct > 50 ? "bg-warning" : "bg-gradient-success"}`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">{t.available}</span>
          <span className="font-semibold text-success"><Money value={available} /></span>
        </div>
      </div>

      {onDelete && (
        <Button variant="ghost" size="sm" onClick={onDelete} className="w-full text-destructive hover:text-destructive">
          <Trash2 className="h-3.5 w-3.5 mr-1.5" /> {t.delete}
        </Button>
      )}
    </div>
  );
}
