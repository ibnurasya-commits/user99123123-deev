import { useLanguage } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";

const LanguageToggle = () => {
  const { lang, setLang } = useLanguage();

  return (
    <div className="inline-flex items-center rounded-md border border-border bg-muted p-0.5 text-sm font-medium">
      <button
        type="button"
        onClick={() => setLang("en")}
        className={cn(
          "rounded-sm px-3 py-1 transition-colors",
          lang === "en"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        🇺🇸 EN
      </button>
      <button
        type="button"
        onClick={() => setLang("id")}
        className={cn(
          "rounded-sm px-3 py-1 transition-colors",
          lang === "id"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        🇮🇩 ID
      </button>
    </div>
  );
};

export default LanguageToggle;
