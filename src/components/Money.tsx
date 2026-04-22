import { useStore } from "@/store/app-store";

export function Money({ value, className = "" }: { value: number; className?: string }) {
  const { lang, privacyMode } = useStore();
  if (privacyMode) {
    return <span className={className}>•••••</span>;
  }
  const formatted = new Intl.NumberFormat(lang === "pt" ? "pt-BR" : lang === "ja" ? "ja-JP" : lang, {
    style: "currency",
    currency: lang === "pt" ? "BRL" : lang === "ja" ? "JPY" : lang === "en" ? "USD" : "EUR",
    maximumFractionDigits: 0,
  }).format(value);
  return <span className={className}>{formatted}</span>;
}
