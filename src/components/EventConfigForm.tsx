import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HelpCircle, AlertCircle, List } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { TranslationKey } from "@/i18n/translations";

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
  const { t } = useLanguage();
  const update = (partial: Partial<EventConfigState>) => {
    onChange({ ...config, ...partial });
  };

  const isCustomer = config.priceOption === "customer";

  const checkboxOptions: { id: string; labelKey: TranslationKey; key: keyof EventConfigState }[] = [
    { id: "multi-entries", labelKey: "allowMultipleEntries", key: "allowMultipleEntries" },
    { id: "auto-confirm", labelKey: "autoConfirmation", key: "autoConfirmation" },
    { id: "auto-process", labelKey: "autoProcessOrder", key: "autoProcessOrder" },
    { id: "quantity-config", labelKey: "activateQuantity", key: "activateQuantity" },
    { id: "additional-fees", labelKey: "additionalFees", key: "additionalFees" },
  ];

  return (
    <div className="space-y-6">
      {/* Price Option */}
      <div className="rounded-lg border border-border bg-card p-4 space-y-4">
        <div>
          <div className="flex items-center gap-1.5">
            <Label className="text-sm font-semibold text-foreground">
              {t("priceOption")} <span className="text-destructive">*</span>
            </Label>
            <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
          </div>
          <div className="mt-2 grid grid-cols-2 gap-3">
            <Select value={config.priceOption} onValueChange={(v) => update({ priceOption: v })}>
              <SelectTrigger>
                <SelectValue placeholder={t("priceOption")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="customer">{t("customer")}</SelectItem>
                <SelectItem value="fixed">{t("fixed")}</SelectItem>
                <SelectItem value="subscription">{t("subscription")}</SelectItem>
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
          <div className="rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3">
            <div className="flex items-start gap-2">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
              <p className="text-sm text-destructive">{t("customerWarning")}</p>
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
            {t("priceReference")}
          </label>
        </div>

        <Button onClick={onSetOption} className="w-full bg-primary hover:bg-primary/90">
          <List className="mr-2 h-4 w-4" />
          {t("setOption")}
        </Button>
      </div>

      {/* Language */}
      <div>
        <Label className="text-sm font-medium text-foreground">
          {t("language")} <span className="text-destructive">*</span>
        </Label>
        <Select value={config.language} onValueChange={(v) => update({ language: v })}>
          <SelectTrigger className="mt-1.5 w-full">
            <SelectValue placeholder={t("language")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">{t("english")}</SelectItem>
            <SelectItem value="id">{t("bahasaIndonesia")}</SelectItem>
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
            {t("setActivePeriod")}
          </label>
          <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
        </div>

        {config.setActivePeriod && (
          <div className="grid grid-cols-2 gap-3 pl-6">
            <div>
              <Label className="text-sm font-medium text-foreground">{t("startingDate")}</Label>
              <Input
                type="datetime-local"
                value={config.startDate}
                onChange={(e) => update({ startDate: e.target.value })}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-foreground">{t("endDate")}</Label>
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
        {checkboxOptions.map(({ id, labelKey, key }) => (
          <div key={id} className="flex items-center gap-2">
            <Checkbox
              id={id}
              checked={config[key] as boolean}
              onCheckedChange={(v) => update({ [key]: !!v })}
            />
            <label htmlFor={id} className="text-sm font-medium text-foreground cursor-pointer">
              {t(labelKey)}
            </label>
            <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventConfigForm;
