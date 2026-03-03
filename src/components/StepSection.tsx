import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepSectionProps {
  step: number;
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  hasInstruction?: boolean;
}

const StepSection = ({ step, title, isOpen, onToggle, children, hasInstruction = true }: StepSectionProps) => {
  const [instructionOpen, setInstructionOpen] = useState(false);

  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center rounded bg-step-badge px-2.5 py-1 text-xs font-semibold text-step-badge-foreground">
            Step {step}
          </span>
          <span className="text-sm font-semibold text-foreground">{title}</span>
        </div>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        )}
      </button>

      {isOpen && (
        <div className="pb-6">
          {hasInstruction && (
            <button
              type="button"
              onClick={() => setInstructionOpen(!instructionOpen)}
              className="mb-4 flex w-full items-center justify-between rounded-md border border-border bg-card px-4 py-3 text-sm text-muted-foreground hover:bg-accent"
            >
              <div className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                <span>Step Instruction</span>
              </div>
              {instructionOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
          )}
          {children}
        </div>
      )}
    </div>
  );
};

export default StepSection;
