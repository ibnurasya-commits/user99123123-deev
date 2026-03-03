import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HelpCircle, Plus, Edit, Trash2 } from "lucide-react";
import { SubscriptionProduct } from "@/types/subscription";
import { OrderType } from "@/components/OrderTypeSelection";

interface EventConfigStepProps {
  orderType: OrderType;
  // Accept Order fields
  priceOption: string;
  setPriceOption: (v: string) => void;
  priceAmount: string;
  setPriceAmount: (v: string) => void;
  // Subscription fields
  products: SubscriptionProduct[];
  onOpenModal: () => void;
  onDeleteProduct: (id: string) => void;
  onEditProduct: (product: SubscriptionProduct) => void;
  // Shared
  language: string;
  setLanguage: (v: string) => void;
  activePeriodEnabled: boolean;
  setActivePeriodEnabled: (v: boolean) => void;
  startDate: string;
  setStartDate: (v: string) => void;
  endDate: string;
  setEndDate: (v: string) => void;
  // Advanced
  advancedSettings: Record<string, boolean>;
  onAdvancedChange: (key: string, value: boolean) => void;
}

const billingLabel = (interval: string) => {
  switch (interval) {
    case "monthly": return "/ month";
    case "yearly": return "/ year";
    case "6months": return "/ 6 months";
    default: return "";
  }
};

const EventConfigStep = ({
  orderType,
  priceOption,
  setPriceOption,
  priceAmount,
  setPriceAmount,
  products,
  onOpenModal,
  onDeleteProduct,
  onEditProduct,
  language,
  setLanguage,
  activePeriodEnabled,
  setActivePeriodEnabled,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  advancedSettings,
  onAdvancedChange,
}: EventConfigStepProps) => {
  const isSubscription = orderType === "whatsapp-subscription";

  const checkboxItems = [
    { key: "multipleEntries", label: "Allow customers to input multiple data entries in a single invoice" },
    { key: "autoConfirmation", label: "Auto confirmation process" },
    { key: "autoProcess", label: "Auto process order" },
    { key: "quantityConfig", label: "Activate quantity configuration" },
    { key: "additionalFees", label: "Additional fees are charged to the merchant" },
  ];

  return (
    <div className="space-y-5">
      {/* Price Option - only for Accept Order */}
      {!isSubscription && (
        <div>
          <Label className="text-sm font-medium text-foreground">
            Price Option <span className="text-destructive">*</span>
            <HelpCircle className="ml-1 inline h-3.5 w-3.5 text-muted-foreground" />
          </Label>
          <div className="mt-1.5 flex gap-3">
            <Select value={priceOption} onValueChange={setPriceOption}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CUSTOMER">CUSTOMER</SelectItem>
                <SelectItem value="FIXED">FIXED</SelectItem>
                <SelectItem value="SUBSCRIPTION">SUBSCRIPTION</SelectItem>
              </SelectContent>
            </Select>
            <Input
              value={priceAmount}
              onChange={(e) => setPriceAmount(e.target.value)}
              placeholder="10.000"
              className="flex-1"
            />
          </div>
        </div>
      )}

      {/* Subscription Products - only for Subscription */}
      {isSubscription && (
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
      )}

      {/* Language */}
      <div>
        <Label className="text-sm font-medium text-foreground">
          Language <span className="text-destructive">*</span>
        </Label>
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="mt-1.5 w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="id">Bahasa Indonesia</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Active Period */}
      <div className="space-y-3">
        <label className="flex cursor-pointer items-center gap-3">
          <Checkbox
            checked={activePeriodEnabled}
            onCheckedChange={(v) => setActivePeriodEnabled(v as boolean)}
          />
          <span className="text-sm font-medium text-foreground">
            Set event active period
            <HelpCircle className="ml-1 inline h-3.5 w-3.5 text-muted-foreground" />
          </span>
        </label>
        {activePeriodEnabled && (
          <div className="flex items-center gap-3 pl-7">
            <div>
              <Label className="text-xs text-muted-foreground">Starting Date</Label>
              <Input
                type="datetime-local"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">End Date</Label>
              <Input
                type="datetime-local"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        )}
      </div>

      {/* Advanced checkboxes */}
      <div className="space-y-3">
        {checkboxItems.map(({ key, label }) => (
          <label key={key} className="flex cursor-pointer items-center gap-3">
            <Checkbox
              checked={advancedSettings[key] ?? false}
              onCheckedChange={(v) => onAdvancedChange(key, v as boolean)}
            />
            <span className="text-sm text-foreground">
              {label}
              <HelpCircle className="ml-1 inline h-3.5 w-3.5 text-muted-foreground" />
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default EventConfigStep;
