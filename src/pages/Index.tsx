import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import StepSection from "@/components/StepSection";
import EventInfoForm from "@/components/EventInfoForm";
import SubscriptionConfigForm from "@/components/SubscriptionConfigForm";
import CustomFieldsStep from "@/components/CustomFieldsStep";
import SummaryPanel from "@/components/SummaryPanel";
import SubscriptionProductModal from "@/components/SubscriptionProductModal";
import { SubscriptionProduct } from "@/types/subscription";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  // Steps
  const [openStep, setOpenStep] = useState(1);

  // Step 1
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [termsUrl, setTermsUrl] = useState("");

  // Step 1 extra
  const [language, setLanguage] = useState("en");

  // Step 2
  const [products, setProducts] = useState<SubscriptionProduct[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<SubscriptionProduct | null>(null);

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

  const canCreate = eventName.trim() && products.length > 0;

  const handleCreate = () => {
    if (!canCreate) return;
    toast({
      title: "Subscription Created",
      description: `"${eventName}" has been created with ${products.length} plan(s).`,
    });
  };

  const currentStep = eventName.trim() ? (products.length > 0 ? 3 : 1) : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-6 py-5">
          <h1 className="text-xl font-bold text-foreground">Create Subscription</h1>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-6">
        <div className="flex gap-8">
          {/* Left: Form */}
          <div className="flex-1 min-w-0">
            <StepSection
              step={1}
              title="Event Information Data"
              isOpen={openStep === 1}
              onToggle={() => setOpenStep(openStep === 1 ? 0 : 1)}
            >
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
            </StepSection>

            <StepSection
              step={2}
              title="Subscription Configuration"
              isOpen={openStep === 2}
              onToggle={() => setOpenStep(openStep === 2 ? 0 : 2)}
            >
              <SubscriptionConfigForm
                products={products}
                onOpenModal={() => {
                  setEditingProduct(null);
                  setModalOpen(true);
                }}
                onDeleteProduct={handleDeleteProduct}
                onEditProduct={handleEditProduct}
              />
            </StepSection>

            <StepSection
              step={3}
              title="Custom Field Data"
              isOpen={openStep === 3}
              onToggle={() => setOpenStep(openStep === 3 ? 0 : 3)}
              hasInstruction={false}
            >
              <CustomFieldsStep />
            </StepSection>

            {/* Footer */}
            <Separator className="my-6" />
            <div className="flex items-center gap-3">
              <Button variant="outline">Cancel</Button>
              <Button onClick={handleCreate} disabled={!canCreate}>
                Create Subscription
              </Button>
            </div>
          </div>

          {/* Right: Summary */}
          <div className="hidden w-80 shrink-0 lg:block">
            <div className="sticky top-6">
              <SummaryPanel
                eventName={eventName}
                products={products}
                currentStep={currentStep}
              />
            </div>
          </div>
        </div>
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
