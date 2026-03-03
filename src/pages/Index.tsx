import { useState } from "react";
import { Button } from "@/components/ui/button";
import OrderTypeSelection, { OrderType } from "@/components/OrderTypeSelection";
import WizardStepIndicator from "@/components/WizardStepIndicator";
import EventInfoForm from "@/components/EventInfoForm";
import SubscriptionConfigForm from "@/components/SubscriptionConfigForm";
import EventConfigForm, { EventProduct } from "@/components/EventConfigForm";
import CustomFieldsStep from "@/components/CustomFieldsStep";
import SummaryPanel from "@/components/SummaryPanel";
import SubscriptionProductModal from "@/components/SubscriptionProductModal";
import { SubscriptionProduct } from "@/types/subscription";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

type WizardPhase = "type-select" | "step1" | "step2" | "step3";
const Index = () => {
  const [phase, setPhase] = useState<WizardPhase>("type-select");
  const [orderType, setOrderType] = useState<OrderType | null>(null);

  // Step 1
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [termsUrl, setTermsUrl] = useState("");
  const [language, setLanguage] = useState("en");

  // Step 2 - Subscription
  const [products, setProducts] = useState<SubscriptionProduct[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<SubscriptionProduct | null>(null);

  // Step 2 - Accept Order
  const [eventProducts, setEventProducts] = useState<EventProduct[]>([]);

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

  const isSubscription = orderType === "whatsapp-subscription";
  const isAcceptOrder = orderType === "accept-order";
  const totalSteps = isSubscription ? 2 : 3;

  const step1Valid = eventName.trim().length > 0;
  const canCreate = isSubscription ? step1Valid && products.length > 0 : step1Valid;

  const handleContinueFromType = () => {
    if (orderType) setPhase("step1");
  };

  const handleContinueFromStep1 = () => {
    if (!step1Valid) return;
    setPhase("step2");
  };

  const handleContinueFromStep2 = () => {
    if (isAcceptOrder) {
      setPhase("step3");
    } else {
      handleCreate();
    }
  };

  const handleCreate = () => {
    if (!canCreate) return;
    toast({
      title: isSubscription ? "Subscription Created" : "Order Created",
      description: `"${eventName}" has been created${isSubscription ? ` with ${products.length} plan(s)` : ""}.`,
    });
  };

  const currentWizardStep = phase === "step1" ? 1 : phase === "step2" ? 2 : 3;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-6 py-5">
          <h1 className="text-xl font-bold text-foreground">
            {phase === "type-select" ? "Accept Order" : isSubscription ? "Create Subscription" : "Create Order"}
          </h1>
          {phase === "type-select" && (
            <p className="mt-1 text-sm text-muted-foreground">
              Allow merchants to create an order flow that customers can complete directly from WhatsApp, including product selection, customer data collection, and payment.
            </p>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-6">
        {/* Phase: Type Selection */}
        {phase === "type-select" && (
          <div className="mx-auto max-w-2xl">
            <OrderTypeSelection selected={orderType} onSelect={setOrderType} />
            <div className="mt-6 flex justify-end">
              <Button onClick={handleContinueFromType} disabled={!orderType}>
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Phase: Wizard Steps */}
        {phase !== "type-select" && (
          <div className="flex gap-8">
            {/* Left: Form */}
            <div className="flex-1 min-w-0">
              <WizardStepIndicator currentStep={currentWizardStep} totalSteps={totalSteps} />

              {phase === "step1" && (
                <div className="rounded-lg border border-border bg-card p-6">
                  <h2 className="mb-5 text-base font-semibold text-foreground">Event Information</h2>
                  <EventInfoForm
                    eventName={eventName}
                    setEventName={setEventName}
                    language={language}
                    setLanguage={setLanguage}
                    eventDescription={eventDescription}
                    setEventDescription={setEventDescription}
                    bannerFile={bannerFile}
                    setBannerFile={setBannerFile}
                    termsUrl={termsUrl}
                    setTermsUrl={setTermsUrl}
                  />
                  <div className="mt-6 flex items-center justify-between">
                    <Button
                      variant="ghost"
                      onClick={() => setPhase("type-select")}
                      className="text-muted-foreground"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button onClick={handleContinueFromStep1} disabled={!step1Valid}>
                      Continue
                    </Button>
                  </div>
                </div>
              )}

              {/* Accept Order - Step 2: Event Configuration */}
              {phase === "step2" && isAcceptOrder && (
                <div className="rounded-lg border border-border bg-card p-6">
                  <h2 className="mb-5 text-base font-semibold text-foreground">Event Configuration</h2>
                  <EventConfigForm
                    products={eventProducts}
                    onAddProduct={(p) => setEventProducts((prev) => [...prev, p])}
                    onEditProduct={(p) => setEventProducts((prev) => prev.map((ep) => ep.id === p.id ? p : ep))}
                    onDeleteProduct={(id) => setEventProducts((prev) => prev.filter((p) => p.id !== id))}
                  />
                  <div className="mt-6 flex items-center justify-between">
                    <Button
                      variant="ghost"
                      onClick={() => setPhase("step1")}
                      className="text-muted-foreground"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button onClick={handleContinueFromStep2}>
                      Continue
                    </Button>
                  </div>
                </div>
              )}

              {phase === "step2" && isSubscription && (
                <div className="rounded-lg border border-border bg-card p-6">
                  <h2 className="mb-5 text-base font-semibold text-foreground">Subscription Configuration</h2>
                  <SubscriptionConfigForm
                    products={products}
                    onOpenModal={() => {
                      setEditingProduct(null);
                      setModalOpen(true);
                    }}
                    onDeleteProduct={handleDeleteProduct}
                    onEditProduct={handleEditProduct}
                  />
                  <div className="mt-6 flex items-center justify-between">
                    <Button
                      variant="ghost"
                      onClick={() => setPhase("step1")}
                      className="text-muted-foreground"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button onClick={handleCreate} disabled={!canCreate}>
                      Create Subscription
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Summary */}
            <div className="hidden w-80 shrink-0 lg:block">
              <div className="sticky top-6">
                <SummaryPanel
                  eventName={eventName}
                  products={products}
                  orderType={orderType}
                  wizardStep={currentWizardStep}
                  totalSteps={totalSteps}
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
