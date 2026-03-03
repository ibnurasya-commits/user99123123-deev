import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload } from "lucide-react";

interface EventInfoFormProps {
  eventName: string;
  setEventName: (v: string) => void;
  language: string;
  setLanguage: (v: string) => void;
  eventDescription: string;
  setEventDescription: (v: string) => void;
  bannerFile: File | null;
  setBannerFile: (f: File | null) => void;
  termsUrl: string;
  setTermsUrl: (v: string) => void;
}

const EventInfoForm = ({
  eventName, setEventName,
  eventDescription, setEventDescription,
  bannerFile, setBannerFile,
  termsUrl, setTermsUrl,
}: EventInfoFormProps) => {
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBannerFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setBannerPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <Label className="text-sm font-medium text-foreground">
          Event Name <span className="text-destructive">*</span>
        </Label>
        <Input
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          placeholder="e.g. Monthly Fitness Subscription"
          className="mt-1.5"
          maxLength={200}
        />
        <p className="mt-1 text-xs text-muted-foreground">
          {eventName.length}/200 characters remaining
        </p>
      </div>

      <div>
        <Label className="text-sm font-medium text-foreground">
          Event Description <span className="text-destructive">*</span>
        </Label>
        {bannerPreview && (
          <div className="mt-1.5 overflow-hidden rounded-lg border border-border">
            <img src={bannerPreview} alt="Banner preview" className="h-48 w-full object-cover" />
          </div>
        )}
        <div className="mt-1.5">
          <label
            htmlFor="banner-upload"
            className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-card px-4 py-8 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:bg-accent"
          >
            <Upload className="h-5 w-5" />
            <span>{bannerFile ? bannerFile.name : "Click to upload banner image"}</span>
          </label>
          <input
            id="banner-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleBannerChange}
          />
        </div>
        {bannerFile && (
          <p className="mt-1 text-xs text-muted-foreground">
            File: {bannerFile.name} — Size: {(bannerFile.size / 1024).toFixed(2)} KB
          </p>
        )}
      </div>

      <div>
        <Textarea
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
          placeholder="Describe your subscription event..."
          rows={3}
          maxLength={700}
        />
        <p className="mt-1 text-xs text-muted-foreground">
          {eventDescription.length}/700 characters remaining
        </p>
      </div>

      <div>
        <Label className="text-sm font-medium text-foreground">
          T&C URL
        </Label>
        <Input
          value={termsUrl}
          onChange={(e) => setTermsUrl(e.target.value)}
          placeholder="https://example.com/terms"
          className="mt-1.5"
          type="url"
        />
      </div>
    </div>
  );
};

export default EventInfoForm;
