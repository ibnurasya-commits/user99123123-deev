import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { SubscriptionProduct } from "@/types/subscription";
import { useLanguage } from "@/i18n/LanguageContext";

interface SubscriptionConfigFormProps {
  products: SubscriptionProduct[];
  onOpenModal: () => void;
  onDeleteProduct: (id: string) => void;
  onEditProduct: (product: SubscriptionProduct) => void;
}

const SubscriptionConfigForm = ({
  products,
  onOpenModal,
  onDeleteProduct,
  onEditProduct,
}: SubscriptionConfigFormProps) => {
  const { t } = useLanguage();

  const billingLabel = (interval: string) => {
    switch (interval) {
      case "monthly": return `/ ${t("monthly").toLowerCase()}`;
      case "yearly": return `/ ${t("yearly").toLowerCase()}`;
      case "6months": return `/ ${t("every6Months").toLowerCase()}`;
      default: return "";
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-border bg-card p-4">
        <Label className="text-sm font-semibold text-foreground">{t("subscriptionProduct")}</Label>

        {products.length === 0 ? (
          <div className="mt-3 space-y-3">
            <div className="flex items-center gap-2 rounded-md border border-dashed border-border bg-accent/50 px-4 py-6 text-center">
              <div className="w-full text-sm text-muted-foreground">
                {t("noSubscriptionProduct")}
              </div>
            </div>
            <Button onClick={onOpenModal} className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              {t("setSubscriptionProduct")}
            </Button>
          </div>
        ) : (
          <div className="mt-3 space-y-2">
            {products.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between rounded-md border border-border bg-accent/30 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{p.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {p.amount.toLocaleString()} {billingLabel(p.billingInterval)}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    onClick={() => onEditProduct(p)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => onDeleteProduct(p.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            <Button variant="outline" onClick={onOpenModal} className="mt-2 w-full">
              <Plus className="mr-2 h-4 w-4" />
              {t("addAnotherProduct")}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionConfigForm;
