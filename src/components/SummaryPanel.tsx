import { SubscriptionProduct } from "@/types/subscription";
import { CheckCircle, User, Phone, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { OrderType } from "@/components/OrderTypeSelection";
import { EventConfigState } from "@/components/EventConfigForm";
import { CustomField } from "@/components/CustomFieldsStep";

interface SummaryPanelProps {
  eventName: string;
  products: SubscriptionProduct[];
  orderType: OrderType | null;
  wizardStep: number;
  totalSteps: number;
  eventConfig?: EventConfigState;
  customFields?: CustomField[];
}

const billingLabel = (interval: string) => {
  switch (interval) {
    case "monthly": return "Monthly";
    case "yearly": return "Yearly";
    case "6months": return "Every 6 Months";
    default: return "";
  }
};

const priceOptionLabel = (opt: string) => {
  switch (opt) {
    case "customer": return "Set by Customer";
    case "fixed": return "Fixed Price";
    case "subscription": return "Subscription";
    default: return opt;
  }
};

const SummaryPanel = ({ eventName, products, orderType, wizardStep, totalSteps, eventConfig, customFields }: SummaryPanelProps) => {
  const isSubscription = orderType === "whatsapp-subscription";
  const isAcceptOrder = orderType === "accept-order";

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <h3 className="text-sm font-semibold text-foreground">
        {isSubscription ? "Subscription Summary" : "Accept Order Summary"}
      </h3>
      <Separator className="my-3" />

      <div className="space-y-3">
        {/* Event */}
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Event</p>
          <p className="mt-1 text-sm text-foreground">
            {eventName || <span className="italic text-muted-foreground">No name set</span>}
          </p>
        </div>

        {/* Subscription Plans */}
        {isSubscription && (
          <>
            <Separator />
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Subscription Plans</p>
              {products.length === 0 ? (
                <p className="mt-1 text-sm italic text-muted-foreground">No products configured</p>
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
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Event Configuration</p>
              <div className="mt-2 space-y-1.5 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Price Option</span>
                  <span className="text-foreground">{priceOptionLabel(eventConfig.priceOption)}</span>
                </div>
                {eventConfig.priceAmount && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Amount</span>
                    <span className="text-foreground">{eventConfig.priceAmount}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Active Period</span>
                  <span className="text-foreground">{eventConfig.setActivePeriod ? "Yes" : "No"}</span>
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
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Custom Fields</p>
              <div className="mt-2 space-y-1.5">
                {customFields.map((f, i) => (
                  <div key={f.id} className="flex items-center gap-2 rounded-md bg-accent/50 px-3 py-1.5">
                    <span className="text-xs font-medium text-muted-foreground">Step {i + 1}</span>
                    <span className="text-sm text-foreground">{f.label || "Untitled"}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <Separator />

        {/* Auto-collected */}
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Auto-collected Fields</p>
          <div className="mt-2 space-y-1.5">
            {[
              { icon: User, label: "Name" },
              { icon: Phone, label: "Phone Number" },
              { icon: Mail, label: "Email" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-foreground">
                <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                {label}
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Progress */}
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Progress</p>
          <div className="mt-2 space-y-1.5">
            {(isSubscription
              ? ["Event Information", "Subscription Config"]
              : ["Event Information", "Event Configuration", "Custom Fields"]
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
