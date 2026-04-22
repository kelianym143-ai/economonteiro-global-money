import { Globe } from "lucide-react";
import { LANGS, type Lang } from "@/lib/i18n";
import { store, useStore } from "@/store/app-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function LangSwitcher() {
  const { lang } = useStore();
  const current = LANGS.find((l) => l.code === lang)!;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          <span>{current.flag}</span>
          <span className="hidden sm:inline">{current.label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {LANGS.map((l) => (
          <DropdownMenuItem
            key={l.code}
            onClick={() => store.setLang(l.code as Lang)}
            className={lang === l.code ? "bg-secondary font-semibold" : ""}
          >
            <span className="mr-2">{l.flag}</span> {l.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
