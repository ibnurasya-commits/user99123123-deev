import { User, Phone, Mail, Info } from "lucide-react";

const CustomFieldsStep = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3 rounded-md border border-info/30 bg-info/5 px-4 py-3">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-info" />
        <p className="text-sm text-info">
          The following customer data will be collected automatically:
        </p>
      </div>

      <div className="space-y-2 pl-1">
        {[
          { icon: User, label: "Name" },
          { icon: Phone, label: "Phone Number" },
          { icon: Mail, label: "Email" },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-3 rounded-md border border-border bg-card px-4 py-3">
            <Icon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">{label}</span>
            <span className="ml-auto rounded bg-accent px-2 py-0.5 text-xs text-muted-foreground">Auto</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomFieldsStep;
