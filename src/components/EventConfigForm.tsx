import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HelpCircle, AlertCircle, List } from "lucide-react";

export interface EventConfigState {
  priceOption: string;
  priceAmount: string;
  priceReference: boolean;
  language: string;
  setActivePeriod: boolean;
  startDate: string;
  endDate: string;
  allowMultipleEntries: boolean;
  autoConfirmation: boolean;
  autoProcessOrder: boolean;
  activateQuantity: boolean;
  additionalFees: boolean;
}

interface EventConfigFormProps {
  config: EventConfigState;
  onChange: (config: EventConfigState) => void;
  onSetOption: () => void;
}

const EventConfigForm = ({ config, onChange, onSetOption }: EventConfigFormProps) => {
  const update = (partial: Partial<EventConfigState>) => {
    onChange({ ...config, ...partial });
  };

  const isCustomer = config.priceOption === "customer";

  return (
    <div className="space-y-6">
      {/* Price Option */}
      <div className="rounded-lg border border-border bg-card p-4 space-y-4">
        <div>
          <div className="flex items-center gap-1.5">
            <Label className="text-sm font-semibold text-foreground">
              Price Option <span className="text-destructive">*</span>
            </Label>
            <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
          </div>
          <div className="mt-2 grid grid-cols-2 gap-3">
            <Select value={config.priceOption} onValueChange={(v) => update({ priceOption: v })}>
              <SelectTrigger>
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="customer">CUSTOMER</SelectItem>
                <SelectItem value="fixed">FIXED</SelectItem>
                <SelectItem value="subscription">SUBSCRIPTION</SelectItem>
              </SelectContent>
            </Select>
            <Input
              value={config.priceAmount}
              onChange={(e) => update({ priceAmount: e.target.value })}
              placeholder="10.000"
              type="text"
            />
          </div>
        </div>

        {isCustomer && (
          <div className="rounded-md border border-orange-300 bg-orange-50 px-4 py-3">
            <div className="flex items-start gap-2">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
              <p className="text-sm text-orange-700">
                Customers will be asked to enter the amount when making a payment, and the merchant must confirm the customer's order.
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2">
          <Checkbox
            id="price-ref"
            checked={config.priceReference}
            onCheckedChange={(v) => update({ priceReference: !!v })}
          />
          <label htmlFor="price-ref" className="text-sm font-medium text-foreground cursor-pointer">
            Price reference
          </label>
        </div>

        <Button onClick={onSetOption} className="w-full bg-primary hover:bg-primary/90">
          <List className="mr-2 h-4 w-4" />
          Set Option
        </Button>
      </div>

      {/* Language */}
      <div>
        <Label className="text-sm font-medium text-foreground">
          Language <span className="text-destructive">*</span>
        </Label>
        <Select value={config.language} onValueChange={(v) => update({ language: v })}>
          <SelectTrigger className="mt-1.5 w-full">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="id">Bahasa Indonesia</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Set event active period */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Checkbox
            id="active-period"
            checked={config.setActivePeriod}
            onCheckedChange={(v) => update({ setActivePeriod: !!v })}
          />
          <label htmlFor="active-period" className="text-sm font-medium text-foreground cursor-pointer">
            Set event active period
          </label>
          <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
        </div>

        {config.setActivePeriod && (
          <div className="grid grid-cols-2 gap-3 pl-6">
            <div>
              <Label className="text-sm font-medium text-foreground">Starting Date</Label>
              <Input
                type="datetime-local"
                value={config.startDate}
                onChange={(e) => update({ startDate: e.target.value })}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-foreground">End Date</Label>
              <Input
                type="datetime-local"
                value={config.endDate}
                onChange={(e) => update({ endDate: e.target.value })}
                className="mt-1.5"
              />
            </div>
          </div>
        )}
      </div>

      {/* Checkbox options */}
      <div className="space-y-3">
        {[
          { id: "multi-entries", label: "Allow customers to input multiple data entries in a single invoice", key: "allowMultipleEntries" as const },
          { id: "auto-confirm", label: "Auto confirmation process", key: "autoConfirmation" as const },
          { id: "auto-process", label: "Auto process order", key: "autoProcessOrder" as const },
          { id: "quantity-config", label: "Activate quantity configuration", key: "activateQuantity" as const },
          { id: "additional-fees", label: "Additional fees are charged to the merchant", key: "additionalFees" as const },
        ].map(({ id, label, key }) => (
          <div key={id} className="flex items-center gap-2">
            <Checkbox
              id={id}
              checked={config[key]}
              onCheckedChange={(v) => update({ [key]: !!v })}
            />
            <label htmlFor={id} className="text-sm font-medium text-foreground cursor-pointer">
              {label}
            </label>
            <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventConfigForm;
