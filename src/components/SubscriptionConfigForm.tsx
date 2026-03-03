import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, AlertCircle } from "lucide-react";
import { SubscriptionProduct } from "@/types/subscription";

interface SubscriptionConfigFormProps {
  products: SubscriptionProduct[];
  onOpenModal: () => void;
  onDeleteProduct: (id: string) => void;
  onEditProduct: (product: SubscriptionProduct) => void;
}

const billingLabel = (interval: string) => {
  switch (interval) {
    case "monthly": return "/ month";
    case "yearly": return "/ year";
    case "6months": return "/ 6 months";
    default: return "";
  }
};

const SubscriptionConfigForm = ({
  products,
  onOpenModal,
  onDeleteProduct,
  onEditProduct,
}: SubscriptionConfigFormProps) => {
  return (
    <div className="space-y-6">
      {/* Subscription Products */}
      <div className="rounded-lg border border-border bg-card p-4">
        <Label className="text-sm font-semibold text-foreground">Subscription Product</Label>

        {products.length === 0 ? (
          <div className="mt-3 space-y-3">
            <div className="flex items-center gap-2 rounded-md border border-dashed border-border bg-accent/50 px-4 py-6 text-center">
              <div className="w-full text-sm text-muted-foreground">
                No subscription product created yet
              </div>
            </div>
            <Button onClick={onOpenModal} className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Set Subscription Product
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
              Add Another Product
            </Button>
          </div>
        )}
      </div>

      {/* Info Banner */}
      <div className="flex items-start gap-3 rounded-md border border-warning/30 bg-warning/5 px-4 py-3">
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
        <p className="text-xs text-warning">
          Customers will be asked to select a subscription plan when making a payment, and the merchant must confirm the customer's order.
        </p>
      </div>

      {/* Advanced Settings */}
      <Collapsible open={advancedOpen} onOpenChange={setAdvancedOpen}>
        <CollapsibleTrigger asChild>
          <button
            type="button"
            className="flex w-full items-center justify-between rounded-md border border-border bg-card px-4 py-3 text-sm font-medium text-foreground hover:bg-accent"
          >
            Advanced Settings
            <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${advancedOpen ? "rotate-180" : ""}`} />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2 space-y-3 pl-1">
          {checkboxItems.map(({ key, label }) => (
            <label key={key} className="flex cursor-pointer items-center gap-3">
              <Checkbox
                checked={advancedSettings[key as keyof typeof advancedSettings]}
                onCheckedChange={(v) => onAdvancedChange(key, v as boolean)}
              />
              <span className="text-sm text-foreground">{label}</span>
              <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
            </label>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default SubscriptionConfigForm;
