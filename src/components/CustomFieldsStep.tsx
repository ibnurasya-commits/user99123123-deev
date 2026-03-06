import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, List } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export interface CustomField {
  id: string;
  label: string;
}

interface CustomFieldsStepProps {
  fields: CustomField[];
  onChange: (fields: CustomField[]) => void;
  reference: string;
  onReferenceChange: (value: string) => void;
}

const CustomFieldsStep = ({ fields, onChange, reference, onReferenceChange }: CustomFieldsStepProps) => {
  const { t } = useLanguage();

  const addField = () => {
    onChange([...fields, { id: crypto.randomUUID(), label: "" }]);
  };

  const removeField = (id: string) => {
    onChange(fields.filter((f) => f.id !== id));
  };

  const updateLabel = (id: string, label: string) => {
    onChange(fields.map((f) => (f.id === id ? { ...f, label } : f)));
  };

  return (
    <div className="space-y-5">
      {/* Header row */}
      <div className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3">
        <span className="text-sm font-medium text-foreground">
          {t("askCustomerToFill")}
        </span>
        <Select value={reference} onValueChange={onReferenceChange}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder={t("selectReference")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">{t("selectReference")}</SelectItem>
            <SelectItem value="name">{t("name")}</SelectItem>
            <SelectItem value="phone">{t("phone")}</SelectItem>
            <SelectItem value="email">{t("email")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Add Field button */}
      <Button variant="outline" onClick={addField} className="border-primary text-primary hover:bg-primary/5">
        <Plus className="mr-2 h-4 w-4" />
        {t("addField")}
      </Button>

      {/* Field list */}
      {fields.map((field, index) => (
        <div key={field.id} className="rounded-lg border border-border bg-card p-4 space-y-3">
          <div className="flex items-start justify-between">
            <p className="text-sm text-foreground">
              {t("stepLabel", { current: index + 1, total: fields.length }).replace("...", "")}{" "}
              <span className="font-semibold">{field.label || "..."}</span>
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => removeField(field.id)}
            >
              <Trash2 className="mr-1.5 h-4 w-4" />
              {t("remove")}
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <Input
              value={field.label}
              onChange={(e) => updateLabel(field.id, e.target.value)}
              placeholder={t("fieldName")}
              className="flex-1"
              maxLength={100}
            />
            <Button className="shrink-0">
              <List className="mr-2 h-4 w-4" />
              {t("setReplyButton")}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomFieldsStep;
