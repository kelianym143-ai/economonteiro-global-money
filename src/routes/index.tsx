import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Sparkles, Globe2, ShieldCheck, TrendingUp } from "lucide-react";
import { useStore } from "@/store/app-store";
import { getDict } from "@/lib/i18n";
import { LangSwitcher } from "@/components/LangSwitcher";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "EconoMonteiro — Smart Finance Assistant" },
      { name: "description", content: "Track expenses, set goals, and master your money in 7 languages." },
    ],
  }),
});

function Landing() {
  const { lang } = useStore();
  const t = getDict(lang);

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <header className="relative z-10 flex items-center justify-between px-6 md:px-12 py-5">
        <div className="flex items-center gap-2.5">
          <Logo size={40} />
          <span className="font-display text-xl font-bold">{t.appName}</span>
        </div>
        <div className="flex items-center gap-2">
          <LangSwitcher />
          <Link
            to="/app"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-elegant hover:opacity-90 transition"
          >
            {t.getStarted} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </header>

      <section className="relative px-6 md:px-12 pt-12 pb-24 bg-gradient-mesh">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 backdrop-blur px-3 py-1 text-xs font-medium mb-6">
              <Sparkles className="h-3 w-3 text-primary" /> AI-powered · 7 idiomas
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6">
              <span className="text-gradient">{t.hero}</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg">{t.heroSub}</p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/app"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-elegant hover:shadow-glow transition-all"
              >
                {t.getStarted} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-6 mt-12 max-w-md">
              {[
                { v: "7", l: t.language },
                { v: "100%", l: "Free" },
                { v: "AI", l: "Smart" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-3xl font-bold font-display text-gradient">{s.v}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-primary opacity-20 blur-3xl rounded-full" />
            <div className="relative rounded-3xl bg-card border border-border shadow-elegant p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-muted-foreground">{t.balance}</div>
                  <div className="text-3xl font-bold font-display">$12,847.50</div>
                </div>
                <div className="rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" /> +12.5%
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-gradient-primary p-4 text-primary-foreground">
                  <div className="text-xs opacity-80">{t.income}</div>
                  <div className="text-xl font-bold mt-1">$7,000</div>
                </div>
                <div className="rounded-2xl bg-secondary p-4">
                  <div className="text-xs text-muted-foreground">{t.expenses}</div>
                  <div className="text-xl font-bold mt-1">$2,153</div>
                </div>
              </div>
              <div className="rounded-2xl bg-secondary/50 p-4 h-32 flex items-end gap-1.5">
                {[40, 65, 35, 80, 55, 90, 70, 60, 85, 50, 75, 95].map((h, i) => (
                  <div key={i} className="flex-1 rounded-t bg-gradient-primary" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { icon: BarChart3, title: t.analytics, desc: "Real-time charts and intelligent insights." },
            { icon: Globe2, title: "7 " + t.language, desc: "PT, EN, ES, FR, DE, IT, JA built-in." },
            { icon: ShieldCheck, title: "Private", desc: "Your data stays on your device. 100% local." },
          ].map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-elegant transition-all"
              >
                <div className="h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 shadow-elegant">
                  <Icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <footer className="px-6 md:px-12 py-8 border-t border-border text-center text-sm text-muted-foreground">
        © 2025 {t.appName} · {t.tagline}
      </footer>
    </div>
  );
}
