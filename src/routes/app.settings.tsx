import { createFileRoute } from "@tanstack/react-router";
import { Topbar } from "@/components/Topbar";
import { store, useStore } from "@/store/app-store";
import { getDict, LANGS, type Lang } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Moon, Sun, ShieldCheck, Eye, EyeOff } from "lucide-react";

export const Route = createFileRoute("/app/settings")({
  component: Page,
  head: () => ({ meta: [{ title: "Settings — EconoMonteiro" }] }),
});

function Page() {
  const { lang, theme, privacyMode } = useStore();
  const t = getDict(lang);
  return (
    <>
      <Topbar />
      <main className="flex-1 p-4 md:p-8 space-y-6 max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-bold">{t.settings}</h1>

        <div className="rounded-2xl bg-card border border-border p-6 shadow-soft space-y-3">
          <h2 className="font-display font-semibold">{t.language}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {LANGS.map((l) => (
              <Button
                key={l.code}
                variant={lang === l.code ? "default" : "outline"}
                onClick={() => store.setLang(l.code as Lang)}
                className={lang === l.code ? "bg-gradient-primary" : ""}
              >
                <span className="mr-2">{l.flag}</span> {l.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-card border border-border p-6 shadow-soft space-y-3">
          <h2 className="font-display font-semibold">{t.theme}</h2>
          <div className="grid grid-cols-2 gap-2">
            <Button variant={theme === "light" ? "default" : "outline"} onClick={() => store.setTheme("light")} className={theme === "light" ? "bg-gradient-primary" : ""}>
              <Sun className="h-4 w-4 mr-2" /> {t.light}
            </Button>
            <Button variant={theme === "dark" ? "default" : "outline"} onClick={() => store.setTheme("dark")} className={theme === "dark" ? "bg-gradient-primary" : ""}>
              <Moon className="h-4 w-4 mr-2" /> {t.dark}
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
