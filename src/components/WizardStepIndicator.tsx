import { useLanguage } from "@/i18n/LanguageContext";

interface WizardStepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const WizardStepIndicator = ({ currentStep, totalSteps }: WizardStepIndicatorProps) => {
  const { t } = useLanguage();

  return (
    <div className="mb-6 flex items-center gap-3">
      {Array.from({ length: totalSteps }, (_, i) => {
        const step = i + 1;
        const isActive = step === currentStep;
        const isCompleted = step < currentStep;
        return (
          <div key={step} className="flex items-center gap-3">
            {i > 0 && (
              <div className={`h-px w-8 ${isCompleted ? "bg-primary" : "bg-border"}`} />
            )}
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : isCompleted
                    ? "bg-primary/20 text-primary"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {step}
              </span>
              <span
                className={`text-sm font-medium ${
                  isActive ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {t("stepOf", { current: step, total: totalSteps })}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WizardStepIndicator;
