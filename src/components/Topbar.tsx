import { Moon, Sun, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LangSwitcher } from "./LangSwitcher";
import { store, useStore } from "@/store/app-store";
import { getDict } from "@/lib/i18n";

export function Topbar({ onAdd }: { onAdd?: () => void }) {
  const { lang, theme } = useStore();
  const t = getDict(lang);
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-border bg-background/80 backdrop-blur-xl px-4 md:px-8 py-3">
      <div className="md:hidden font-display text-lg font-bold">{t.appName}</div>
      <div className="hidden md:block" />
      <div className="flex items-center gap-2">
        {onAdd && (
          <Button onClick={onAdd} size="sm" className="bg-gradient-primary hover:opacity-90 shadow-elegant gap-1.5">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">{t.addTransaction}</span>
          </Button>
        )}
        <LangSwitcher />
        <Button
          variant="outline"
          size="icon"
          onClick={() => store.setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </div>
    </header>
  );
}
