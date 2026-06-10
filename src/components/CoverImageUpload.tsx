import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CoverImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  password: string;
}

const CoverImageUpload = ({ value, onChange, password }: CoverImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [useUrl, setUseUrl] = useState(!value || value.startsWith("http"));
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({ title: "Please select an image file", variant: "destructive" });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "Image must be less than 5MB", variant: "destructive" });
      return;
    }

    setIsUploading(true);

    try {
      // Convert file to base64
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const base64Data = await base64Promise;

      // Upload via edge function
      const { data, error } = await supabase.functions.invoke("upload-article-image", {
        body: {
          password,
          fileName: file.name,
          fileType: file.type,
          fileData: base64Data,
        },
      });

      if (error) throw error;

      if (data.url) {
        onChange(data.url);
        toast({ title: "Image uploaded successfully" });
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast({ title: "Failed to upload image", variant: "destructive" });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const clearImage = () => {
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label>Cover Image</Label>
        <div className="flex gap-2">
          <Button
            type="button"
            variant={!useUrl ? "default" : "outline"}
            size="sm"
            onClick={() => setUseUrl(false)}
          >
            Upload
          </Button>
          <Button
            type="button"
            variant={useUrl ? "default" : "outline"}
            size="sm"
            onClick={() => setUseUrl(true)}
          >
            URL
          </Button>
        </div>
      </div>

      {useUrl ? (
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://example.com/image.jpg"
        />
      ) : (
        <div className="space-y-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
          >
            {isUploading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Choose Image
              </>
            )}
          </Button>
        </div>
      )}

      {value && (
        <div className="relative rounded-lg overflow-hidden border">
          <img
            src={value}
            alt="Cover preview"
            className="w-full h-48 object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={clearImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {!value && (
        <div className="flex items-center justify-center h-32 border-2 border-dashed rounded-lg text-muted-foreground">
          <div className="text-center">
            <ImageIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No image selected</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoverImageUpload;
