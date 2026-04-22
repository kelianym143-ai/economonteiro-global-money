import { useEffect, useState } from "react";
import type { Lang } from "@/lib/i18n";

export type TxType = "income" | "expense";
export type Category = "food" | "transport" | "shopping" | "bills" | "entertainment" | "salary" | "other";

export type Transaction = {
  id: string;
  description: string;
  amount: number;
  type: TxType;
  category: Category;
  date: string;
};

const seed: Transaction[] = [
  { id: "1", description: "Salário", amount: 5800, type: "income", category: "salary", date: "2025-04-01" },
  { id: "2", description: "Supermercado", amount: 320, type: "expense", category: "food", date: "2025-04-03" },
  { id: "3", description: "Uber", amount: 45, type: "expense", category: "transport", date: "2025-04-05" },
  { id: "4", description: "Netflix", amount: 39, type: "expense", category: "entertainment", date: "2025-04-07" },
  { id: "5", description: "Conta de luz", amount: 180, type: "expense", category: "bills", date: "2025-04-10" },
  { id: "6", description: "Camisa nova", amount: 120, type: "expense", category: "shopping", date: "2025-04-12" },
  { id: "7", description: "Restaurante", amount: 95, type: "expense", category: "food", date: "2025-04-15" },
  { id: "8", description: "Freelance", amount: 1200, type: "income", category: "other", date: "2025-04-18" },
];

type Listener = () => void;
const listeners = new Set<Listener>();

let state = {
  lang: "pt" as Lang,
  theme: "light" as "light" | "dark",
  transactions: seed,
};

if (typeof window !== "undefined") {
  try {
    const saved = localStorage.getItem("economonteiro");
    if (saved) {
      const parsed = JSON.parse(saved);
      state = { ...state, ...parsed };
    }
  } catch {}
}

const persist = () => {
  if (typeof window !== "undefined") {
    localStorage.setItem("economonteiro", JSON.stringify(state));
    document.documentElement.classList.toggle("dark", state.theme === "dark");
  }
};

const notify = () => {
  persist();
  listeners.forEach((l) => l());
};

export const store = {
  get: () => state,
  setLang: (lang: Lang) => { state = { ...state, lang }; notify(); },
  setTheme: (theme: "light" | "dark") => { state = { ...state, theme }; notify(); },
  addTransaction: (tx: Omit<Transaction, "id">) => {
    state = { ...state, transactions: [{ ...tx, id: crypto.randomUUID() }, ...state.transactions] };
    notify();
  },
  removeTransaction: (id: string) => {
    state = { ...state, transactions: state.transactions.filter((t) => t.id !== id) };
    notify();
  },
};

export function useStore() {
  const [, force] = useState(0);
  useEffect(() => {
    const l = () => force((n) => n + 1);
    listeners.add(l);
    document.documentElement.classList.toggle("dark", state.theme === "dark");
    return () => { listeners.delete(l); };
  }, []);
  return state;
}
