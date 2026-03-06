import { SubscriptionProduct } from "@/types/subscription";
import { CheckCircle, User, Phone, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { OrderType } from "@/components/OrderTypeSelection";
import { EventConfigState } from "@/components/EventConfigForm";
import { CustomField } from "@/components/CustomFieldsStep";
import { useLanguage } from "@/i18n/LanguageContext";

interface SummaryPanelProps {
  eventName: string;
  products: SubscriptionProduct[];
  orderType: OrderType | null;
  wizardStep: number;
  totalSteps: number;
  eventConfig?: EventConfigState;
  customFields?: CustomField[];
}

const SummaryPanel = ({ eventName, products, orderType, wizardStep, totalSteps, eventConfig, customFields }: SummaryPanelProps) => {
  const { t } = useLanguage();
  const isSubscription = orderType === "whatsapp-subscription";
  const isAcceptOrder = orderType === "accept-order";

  const billingLabel = (interval: string) => {
    switch (interval) {
      case "monthly": return t("monthly");
      case "yearly": return t("yearly");
      case "6months": return t("every6Months");
      default: return "";
    }
  };

  const priceOptLabel = (opt: string) => {
    switch (opt) {
      case "customer": return t("setByCustomer");
      case "fixed": return t("fixedPrice");
      case "subscription": return t("subscription");
      default: return opt;
    }
  };

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <h3 className="text-sm font-semibold text-foreground">
        {isSubscription ? t("subscriptionSummary") : t("acceptOrderSummary")}
      </h3>
      <Separator className="my-3" />

      <div className="space-y-3">
        {/* Event */}
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t("event")}</p>
          <p className="mt-1 text-sm text-foreground">
            {eventName || <span className="italic text-muted-foreground">{t("noNameSet")}</span>}
          </p>
        </div>

        {/* Subscription Plans */}
        {isSubscription && (
          <>
            <Separator />
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t("subscriptionPlans")}</p>
              {products.length === 0 ? (
                <p className="mt-1 text-sm italic text-muted-foreground">{t("noProductsConfigured")}</p>
              ) : (
                <div className="mt-2 space-y-2">
                  {products.map((p) => (
                    <div key={p.id} className="flex items-center justify-between rounded-md bg-accent/50 px-3 py-2">
                      <span className="text-sm font-medium text-foreground">{p.title}</span>
                      <span className="text-xs text-muted-foreground">
                        {p.amount.toLocaleString()} · {billingLabel(p.billingInterval)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* Accept Order - Event Configuration */}
        {isAcceptOrder && eventConfig && (
          <>
            <Separator />
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t("eventConfiguration")}</p>
              <div className="mt-2 space-y-1.5 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{t("priceOptionLabel")}</span>
                  <span className="text-foreground">{priceOptLabel(eventConfig.priceOption)}</span>
                </div>
                {eventConfig.priceAmount && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">{t("amount")}</span>
                    <span className="text-foreground">{eventConfig.priceAmount}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{t("activePeriod")}</span>
                  <span className="text-foreground">{eventConfig.setActivePeriod ? t("yes") : t("no")}</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Accept Order - Custom Fields */}
        {isAcceptOrder && customFields && customFields.length > 0 && (
          <>
            <Separator />
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t("customFields")}</p>
              <div className="mt-2 space-y-1.5">
                {customFields.map((f, i) => (
                  <div key={f.id} className="flex items-center gap-2 rounded-md bg-accent/50 px-3 py-1.5">
                    <span className="text-xs font-medium text-muted-foreground">{t("stepOf", { current: i + 1, total: customFields.length })}</span>
                    <span className="text-sm text-foreground">{f.label || t("untitled")}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <Separator />

        {/* Auto-collected - only for Subscription */}
        {isSubscription && (
          <>
            <Separator />
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t("autoCollectedFields")}</p>
              <div className="mt-2 space-y-1.5">
                {[
                  { icon: User, label: t("name") },
                  { icon: Phone, label: t("phoneNumber") },
                  { icon: Mail, label: t("email") },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-sm text-foreground">
                    <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Progress */}
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t("progress")}</p>
          <div className="mt-2 space-y-1.5">
            {(isSubscription
              ? [t("eventInfo"), t("subscriptionConfig")]
              : [t("eventInfo"), t("eventConfiguration"), t("customFields")]
            ).map((label, i) => (
              <div key={label} className="flex items-center gap-2 text-sm">
                <CheckCircle
                  className={`h-4 w-4 ${i + 1 < wizardStep ? "text-success" : i + 1 === wizardStep ? "text-primary" : "text-border"}`}
                />
                <span className={i + 1 <= wizardStep ? "text-foreground" : "text-muted-foreground"}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryPanel;
