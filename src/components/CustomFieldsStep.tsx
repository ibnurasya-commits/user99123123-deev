import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, GripVertical } from "lucide-react";

export interface CustomField {
  id: string;
  label: string;
  hasReplyButton: boolean;
}

interface CustomFieldsStepProps {
  fields: CustomField[];
  setFields: (fields: CustomField[]) => void;
}

const CustomFieldsStep = ({ fields, setFields }: CustomFieldsStepProps) => {
  const addField = () => {
    setFields([
      ...fields,
      { id: crypto.randomUUID(), label: "", hasReplyButton: false },
    ]);
  };

  const removeField = (id: string) => {
    setFields(fields.filter((f) => f.id !== id));
  };

  const updateFieldLabel = (id: string, label: string) => {
    setFields(fields.map((f) => (f.id === id ? { ...f, label } : f)));
  };

  return (
    <div className="space-y-5">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <Label className="text-sm text-foreground">
          Ask customer to fill data as you need
        </Label>
        <Select>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select Reference" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">No Reference</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Add Field button */}
      <Button variant="outline" onClick={addField} className="text-primary border-primary/30">
        <Plus className="mr-2 h-4 w-4" />
        Add Field
      </Button>

      {/* Field list */}
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="rounded-lg border border-border bg-card p-4"
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-medium text-foreground">
                Step [{index + 1} of {fields.length}] Please enter{" "}
                <strong>{field.label || "..."}</strong>
              </p>
              <button
                type="button"
                onClick={() => removeField(field.id)}
                className="flex items-center gap-1 text-xs font-medium text-destructive hover:underline"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Remove
              </button>
            </div>
            <div className="flex items-center gap-3">
              <Input
                value={field.label}
                onChange={(e) => updateFieldLabel(field.id, e.target.value)}
                placeholder="e.g. name, email, t-shirt size"
                className="flex-1"
              />
              <Button variant="ghost" size="icon" className="shrink-0 text-muted-foreground">
                <GripVertical className="h-4 w-4" />
              </Button>
              <Button variant="default" size="sm" className="shrink-0 whitespace-nowrap">
                Set Reply Button
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomFieldsStep;
