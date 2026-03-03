import { MessageSquare } from "lucide-react";

interface GreetingPreviewProps {
  eventName: string;
  eventDescription: string;
  bannerPreview: string | null;
  termsUrl: string;
}

const GreetingPreview = ({
  eventName,
  eventDescription,
  bannerPreview,
  termsUrl,
}: GreetingPreviewProps) => {
  return (
    <div>
      <h3 className="mb-3 text-sm font-bold text-foreground">Greeting Preview</h3>

      {/* Phone frame */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        {/* Status bar */}
        <div className="flex items-center justify-between bg-muted px-4 py-1.5">
          <span className="text-[10px] font-medium text-muted-foreground">9:41</span>
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-muted-foreground/40" />
            <div className="h-2 w-3 rounded-sm bg-muted-foreground/40" />
            <div className="h-2.5 w-4 rounded-sm bg-muted-foreground/40" />
          </div>
        </div>

        {/* Chat header */}
        <div className="flex items-center gap-3 border-b border-border bg-card px-4 py-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
            <MessageSquare className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-xs font-semibold text-foreground">Business Account</p>
            <p className="text-[10px] text-muted-foreground">Online</p>
          </div>
        </div>

        {/* Chat body */}
        <div
          className="space-y-3 p-4"
          style={{
            backgroundColor: "hsl(var(--accent))",
            minHeight: "360px",
          }}
        >
          {/* Date pill */}
          <div className="flex justify-center">
            <span className="rounded-full bg-muted px-3 py-0.5 text-[10px] text-muted-foreground">
              Today
            </span>
          </div>

          {/* Message bubble */}
          <div className="max-w-[85%] rounded-lg bg-card p-3 shadow-sm">
            {bannerPreview && (
              <img
                src={bannerPreview}
                alt="Banner"
                className="mb-2 rounded-md object-cover"
                style={{ maxHeight: "140px", width: "100%" }}
              />
            )}

            <p className="text-xs text-foreground">Hi!</p>
            <p className="text-xs text-foreground">Welcome to DOKU</p>
            <p className="mt-1 text-xs text-muted-foreground">
              To proceed with the {eventName || "Event"} transaction, please follow the filling instructions as per the message you received.
            </p>

            {eventDescription && (
              <p className="mt-2 text-xs text-foreground">
                {eventDescription}
              </p>
            )}

            {termsUrl && (
              <p className="mt-2 text-[10px] text-primary break-all">
                {termsUrl}
              </p>
            )}
          </div>
        </div>

        {/* Input bar */}
        <div className="flex items-center gap-2 border-t border-border bg-card px-3 py-2">
          <div className="flex-1 rounded-full bg-muted px-3 py-1.5 text-[10px] text-muted-foreground">
            Type a message...
          </div>
        </div>
      </div>
    </div>
  );
};

export default GreetingPreview;
