import { SubscriptionProduct } from "@/types/subscription";
import { CheckCircle, FileText, User, Phone, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface SummaryPanelProps {
  eventName: string;
  products: SubscriptionProduct[];
  currentStep: number;
}

const billingLabel = (interval: string) => {
  switch (interval) {
    case "monthly": return "Monthly";
    case "yearly": return "Yearly";
    case "6months": return "Every 6 Months";
    default: return "";
  }
};

const SummaryPanel = ({ eventName, products, currentStep }: SummaryPanelProps) => {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <h3 className="text-sm font-semibold text-foreground">Subscription Summary</h3>
      <Separator className="my-3" />

      {/* Event */}
      <div className="space-y-3">
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Event</p>
          <p className="mt-1 text-sm text-foreground">
            {eventName || <span className="italic text-muted-foreground">No name set</span>}
          </p>
        </div>

        <Separator />

        {/* Products */}
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

        <Separator />

        {/* Auto-collected data */}
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

        {/* Steps progress */}
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Progress</p>
          <div className="mt-2 space-y-1.5">
            {["Event Information", "Subscription Config", "Custom Fields"].map((label, i) => (
              <div key={label} className="flex items-center gap-2 text-sm">
                <CheckCircle
                  className={`h-4 w-4 ${
                    i < currentStep ? "text-success" : "text-border"
                  }`}
                />
                <span className={i < currentStep ? "text-foreground" : "text-muted-foreground"}>
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
