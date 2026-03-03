import { useState } from "react";
import { Button } from "@/components/ui/button";
import OrderTypeSelection, { OrderType } from "@/components/OrderTypeSelection";
import StepSection from "@/components/StepSection";
import EventInfoForm from "@/components/EventInfoForm";
import EventConfigStep from "@/components/EventConfigStep";
import CustomFieldsStep, { CustomField } from "@/components/CustomFieldsStep";
import GreetingPreview from "@/components/GreetingPreview";
import SubscriptionProductModal from "@/components/SubscriptionProductModal";
import { SubscriptionProduct } from "@/types/subscription";
import { toast } from "@/hooks/use-toast";

type Phase = "type-select" | "wizard";

const Index = () => {
  const [phase, setPhase] = useState<Phase>("type-select");
  const [orderType, setOrderType] = useState<OrderType | null>(null);
  const [activeStep, setActiveStep] = useState(1);

  // Step 1 — Event Info
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [termsUrl, setTermsUrl] = useState("");
  const [language, setLanguage] = useState("en");

  // Step 2 — Event Config
  const [priceOption, setPriceOption] = useState("CUSTOMER");
  const [priceAmount, setPriceAmount] = useState("");
  const [products, setProducts] = useState<SubscriptionProduct[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<SubscriptionProduct | null>(null);
  const [activePeriodEnabled, setActivePeriodEnabled] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [advancedSettings, setAdvancedSettings] = useState<Record<string, boolean>>({
    multipleEntries: false,
    autoConfirmation: false,
    autoProcess: false,
    quantityConfig: false,
    additionalFees: false,
  });

  // Step 3 — Custom Fields
  const [customFields, setCustomFields] = useState<CustomField[]>([
    { id: "default-name", label: "name", hasReplyButton: false },
  ]);

  // Handlers
  const handleSaveProduct = (product: SubscriptionProduct) => {
    setProducts((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) return prev.map((p) => (p.id === product.id ? product : p));
      return [...prev, product];
    });
  };

  const handleDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleEditProduct = (product: SubscriptionProduct) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  const handleAdvancedChange = (key: string, value: boolean) => {
    setAdvancedSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleBannerChange = (f: File | null) => {
    setBannerFile(f);
    if (f) {
      const reader = new FileReader();
      reader.onloadend = () => setBannerPreview(reader.result as string);
      reader.readAsDataURL(f);
    } else {
      setBannerPreview(null);
    }
  };

  // Validation
  const step1Valid = eventName.trim().length > 0;
  const step2Valid = true; // config is flexible
  const canCreate = step1Valid;

  const handleCreate = () => {
    if (!canCreate) return;
    toast({
      title: "Event Created",
      description: `"${eventName}" has been created successfully.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-6 py-5">
          <h1 className="text-xl font-bold text-foreground">
            {phase === "type-select" ? "Accept Order" : "Create Event"}
          </h1>
          {phase === "type-select" && (
            <p className="mt-1 text-sm text-muted-foreground">
              Create an order flow that allows customers to complete transactions directly via WhatsApp, including product selection, data input, and payment.
            </p>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-6">
        {/* Pre-step: Type selection */}
        {phase === "type-select" && (
          <div className="mx-auto max-w-2xl">
            <OrderTypeSelection selected={orderType} onSelect={setOrderType} />
            <div className="mt-6 flex justify-end">
              <Button
                onClick={() => {
                  setPhase("wizard");
                  setActiveStep(1);
                }}
                disabled={!orderType}
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Wizard */}
        {phase === "wizard" && (
          <div className="flex gap-8">
            {/* Left: Steps */}
            <div className="flex-1 min-w-0">
              {/* Step 1 */}
              <StepSection
                step={1}
                title="Event Information Data"
                isActive={activeStep === 1}
                isCompleted={activeStep > 1}
                isClickable={true}
                onToggle={() => setActiveStep(activeStep === 1 ? 0 : 1)}
              >
                <EventInfoForm
                  eventName={eventName}
                  setEventName={setEventName}
                  language={language}
                  setLanguage={setLanguage}
                  eventDescription={eventDescription}
                  setEventDescription={setEventDescription}
                  bannerFile={bannerFile}
                  setBannerFile={handleBannerChange}
                  termsUrl={termsUrl}
                  setTermsUrl={setTermsUrl}
                />
                <div className="mt-6 flex justify-end">
                  <Button onClick={() => setActiveStep(2)} disabled={!step1Valid}>
                    Continue
                  </Button>
                </div>
              </StepSection>

              {/* Step 2 */}
              <StepSection
                step={2}
                title="Event Configuration"
                isActive={activeStep === 2}
                isCompleted={activeStep > 2}
                isClickable={activeStep >= 2}
                onToggle={() => setActiveStep(activeStep === 2 ? 0 : 2)}
              >
                <EventConfigStep
                  orderType={orderType!}
                  priceOption={priceOption}
                  setPriceOption={setPriceOption}
                  priceAmount={priceAmount}
                  setPriceAmount={setPriceAmount}
                  products={products}
                  onOpenModal={() => {
                    setEditingProduct(null);
                    setModalOpen(true);
                  }}
                  onDeleteProduct={handleDeleteProduct}
                  onEditProduct={handleEditProduct}
                  language={language}
                  setLanguage={setLanguage}
                  activePeriodEnabled={activePeriodEnabled}
                  setActivePeriodEnabled={setActivePeriodEnabled}
                  startDate={startDate}
                  setStartDate={setStartDate}
                  endDate={endDate}
                  setEndDate={setEndDate}
                  advancedSettings={advancedSettings}
                  onAdvancedChange={handleAdvancedChange}
                />
                <div className="mt-6 flex items-center justify-between">
                  <Button variant="outline" onClick={() => setActiveStep(1)}>
                    Back
                  </Button>
                  <Button onClick={() => setActiveStep(3)}>
                    Continue
                  </Button>
                </div>
              </StepSection>

              {/* Step 3 */}
              <StepSection
                step={3}
                title="Custom Field Data"
                isActive={activeStep === 3}
                isCompleted={false}
                isClickable={activeStep >= 3}
                onToggle={() => setActiveStep(activeStep === 3 ? 0 : 3)}
              >
                <CustomFieldsStep
                  fields={customFields}
                  setFields={setCustomFields}
                />
                <div className="mt-6 flex items-center justify-between">
                  <Button variant="outline" onClick={() => setActiveStep(2)}>
                    Back
                  </Button>
                  <Button onClick={handleCreate} disabled={!canCreate}>
                    Create Event
                  </Button>
                </div>
              </StepSection>

              {/* Footer */}
              <div className="mt-6 flex items-center gap-3">
                <Button variant="outline" onClick={() => setPhase("type-select")}>
                  Cancel
                </Button>
                <Button onClick={handleCreate} disabled={!canCreate}>
                  Create Event
                </Button>
              </div>
            </div>

            {/* Right: Greeting Preview */}
            <div className="hidden w-80 shrink-0 lg:block">
              <div className="sticky top-6">
                <GreetingPreview
                  eventName={eventName}
                  eventDescription={eventDescription}
                  bannerPreview={bannerPreview}
                  termsUrl={termsUrl}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      <SubscriptionProductModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingProduct(null);
        }}
        onSave={handleSaveProduct}
        editProduct={editingProduct}
      />
    </div>
  );
};

export default Index;
