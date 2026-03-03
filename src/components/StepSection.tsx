import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface StepSectionProps {
  step: number;
  title: string;
  isActive: boolean;
  isCompleted: boolean;
  isClickable: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  hasInstruction?: boolean;
}

const StepSection = ({
  step,
  title,
  isActive,
  isCompleted,
  isClickable,
  onToggle,
  children,
  hasInstruction = true,
}: StepSectionProps) => {
  const [instructionOpen, setInstructionOpen] = useState(false);

  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={() => isClickable && onToggle()}
        className={cn(
          "flex w-full items-center justify-between py-4 text-left",
          !isClickable && "cursor-default opacity-60"
        )}
        disabled={!isClickable}
      >
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "inline-flex items-center rounded px-2.5 py-1 text-xs font-semibold",
              isActive
                ? "bg-step-badge text-step-badge-foreground"
                : isCompleted
                ? "bg-step-badge text-step-badge-foreground"
                : "bg-muted text-muted-foreground"
            )}
          >
            Step {step}
          </span>
          <span className="text-sm font-semibold text-foreground">{title}</span>
        </div>
        {isActive ? (
          <ChevronUp className="h-5 w-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        )}
      </button>

      {isActive && (
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
