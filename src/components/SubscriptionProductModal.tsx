import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { SubscriptionProduct } from "@/types/subscription";

interface SubscriptionProductModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (product: SubscriptionProduct) => void;
  editProduct?: SubscriptionProduct | null;
}

const SubscriptionProductModal = ({
  open,
  onClose,
  onSave,
  editProduct,
}: SubscriptionProductModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [billingInterval, setBillingInterval] = useState<"monthly" | "yearly" | "6months">("monthly");
  const [durationType, setDurationType] = useState<"never" | "date" | "payments">("never");
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [maxPayments, setMaxPayments] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (editProduct) {
      setTitle(editProduct.title);
      setDescription(editProduct.description);
      setAmount(editProduct.amount.toString());
      setBillingInterval(editProduct.billingInterval);
      setDurationType(editProduct.durationType);
      if (editProduct.endDate) setEndDate(new Date(editProduct.endDate));
      if (editProduct.maxPayments) setMaxPayments(editProduct.maxPayments.toString());
    } else {
      resetForm();
    }
  }, [editProduct, open]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setAmount("");
    setBillingInterval("monthly");
    setDurationType("never");
    setEndDate(undefined);
    setMaxPayments("");
    setErrors({});
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!title.trim()) errs.title = "Product title is required";
    if (!amount || parseFloat(amount) <= 0) errs.amount = "Valid amount is required";
    if (durationType === "date" && !endDate) errs.endDate = "End date is required";
    if (durationType === "payments" && (!maxPayments || parseInt(maxPayments) <= 0))
      errs.maxPayments = "Valid number of payments is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave({
      id: editProduct?.id || crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      amount: parseFloat(amount),
      billingInterval,
      durationType,
      endDate: endDate?.toISOString(),
      maxPayments: maxPayments ? parseInt(maxPayments) : undefined,
    });
    resetForm();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{editProduct ? "Edit Subscription Product" : "Set Subscription Product"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-2">
          {/* Title */}
          <div>
            <Label className="text-sm font-medium">
              Product Title <span className="text-destructive">*</span>
            </Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Premium Monthly Plan"
              className="mt-1.5"
            />
            {errors.title && <p className="mt-1 text-xs text-destructive">{errors.title}</p>}
          </div>

          {/* Description */}
          <div>
            <Label className="text-sm font-medium">Product Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of the subscription..."
              rows={2}
              className="mt-1.5"
            />
          </div>

          {/* Amount */}
          <div>
            <Label className="text-sm font-medium">
              Amount <span className="text-destructive">*</span>
            </Label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="10,000"
              className="mt-1.5"
              min={0}
            />
            {errors.amount && <p className="mt-1 text-xs text-destructive">{errors.amount}</p>}
          </div>

          {/* Billing Interval */}
          <div>
            <Label className="text-sm font-medium">Billing Interval</Label>
            <RadioGroup
              value={billingInterval}
              onValueChange={(v) => setBillingInterval(v as typeof billingInterval)}
              className="mt-2 flex gap-1"
            >
              {[
                { value: "monthly", label: "Monthly" },
                { value: "yearly", label: "Yearly" },
                { value: "6months", label: "Every 6 Months" },
              ].map((opt) => (
                <label
                  key={opt.value}
                  className={cn(
                    "flex cursor-pointer items-center gap-2 rounded-md border px-4 py-2.5 text-sm transition-colors",
                    billingInterval === opt.value
                      ? "border-primary bg-primary/5 text-foreground"
                      : "border-border bg-card text-muted-foreground hover:bg-accent"
                  )}
                >
                  <RadioGroupItem value={opt.value} className="sr-only" />
                  {opt.label}
                </label>
              ))}
            </RadioGroup>
          </div>

          {/* Duration */}
          <div>
            <Label className="text-sm font-medium">Subscription Duration</Label>
            <RadioGroup
              value={durationType}
              onValueChange={(v) => setDurationType(v as typeof durationType)}
              className="mt-2 space-y-3"
            >
              <label className="flex cursor-pointer items-center gap-3">
                <RadioGroupItem value="never" />
                <span className="text-sm">Never Ends</span>
              </label>

              <div>
                <label className="flex cursor-pointer items-center gap-3">
                  <RadioGroupItem value="date" />
                  <span className="text-sm">Ends on Specific Date</span>
                </label>
                {durationType === "date" && (
                  <div className="ml-7 mt-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-[220px] justify-start text-left font-normal",
                            !endDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "dd/MM/yyyy") : "Select end date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          initialFocus
                          className="p-3 pointer-events-auto"
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.endDate && <p className="mt-1 text-xs text-destructive">{errors.endDate}</p>}
                  </div>
                )}
              </div>

              <div>
                <label className="flex cursor-pointer items-center gap-3">
                  <RadioGroupItem value="payments" />
                  <span className="text-sm">Ends after X Payments</span>
                </label>
                {durationType === "payments" && (
                  <div className="ml-7 mt-2">
                    <Input
                      type="number"
                      value={maxPayments}
                      onChange={(e) => setMaxPayments(e.target.value)}
                      placeholder="Number of payments"
                      className="w-[220px]"
                      min={1}
                    />
                    {errors.maxPayments && <p className="mt-1 text-xs text-destructive">{errors.maxPayments}</p>}
                  </div>
                )}
              </div>
            </RadioGroup>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>
            {editProduct ? "Save Changes" : "Add Subscription"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionProductModal;
