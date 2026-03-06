import { cn } from "@/lib/utils";
import { ShoppingCart, RefreshCw } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { TranslationKey } from "@/i18n/translations";

export type OrderType = "accept-order" | "whatsapp-subscription";

interface OrderTypeSelectionProps {
  selected: OrderType | null;
  onSelect: (type: OrderType) => void;
}

const options: { value: OrderType; titleKey: TranslationKey; descKey: TranslationKey; icon: typeof ShoppingCart }[] = [
  {
    value: "accept-order",
    titleKey: "acceptOrderTitle",
    descKey: "acceptOrderDesc",
    icon: ShoppingCart,
  },
  {
    value: "whatsapp-subscription",
    titleKey: "whatsappSubscriptionTitle",
    descKey: "whatsappSubscriptionDesc",
    icon: RefreshCw,
  },
];

const OrderTypeSelection = ({ selected, onSelect }: OrderTypeSelectionProps) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-4">
      {options.map(({ value, titleKey, descKey, icon: Icon }) => {
        const isSelected = selected === value;
        return (
          <button
            key={value}
            type="button"
            onClick={() => onSelect(value)}
            className={cn(
              "flex w-full items-start gap-4 rounded-lg border-2 p-5 text-left transition-colors",
              isSelected
                ? "border-primary bg-primary/5"
                : "border-border bg-card hover:border-primary/40 hover:bg-accent/50"
            )}
          >
            <div
              className={cn(
                "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <p className="text-sm font-semibold text-foreground">{t(titleKey)}</p>
                <span
                  className={cn(
                    "inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2",
                    isSelected ? "border-primary" : "border-muted-foreground/40"
                  )}
                >
                  {isSelected && <span className="h-2 w-2 rounded-full bg-primary" />}
                </span>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{t(descKey)}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default OrderTypeSelection;
