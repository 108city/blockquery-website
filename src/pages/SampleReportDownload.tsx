import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const schema = z.object({
  fullName: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
});

const SampleReportDownload = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = schema.safeParse({ fullName, email });
    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message);
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("submit-report-download", {
        body: { fullName: parsed.data.fullName, email: parsed.data.email },
      });

      if (error) throw error;

      // Trigger download
      const link = document.createElement("a");
      link.href = "/Sample_Report_Blockchain_Investigation.pdf";
      link.download = "Sample_Report_Blockchain_Investigation.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      navigate("/report-thank-you");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="pt-32 pb-20 sm:pt-40 sm:pb-28 px-4 sm:px-6">
        <div className="container mx-auto max-w-md text-center">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-full border border-border flex items-center justify-center">
              <FileText className="w-8 h-8 text-muted-foreground" strokeWidth={1.5} />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Download Sample Report
          </h1>
          <p className="text-muted-foreground mb-10 max-w-sm mx-auto">
            Enter your details below to receive our redacted sample blockchain investigation report.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5 text-left">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your full name"
                maxLength={100}
                required
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                maxLength={255}
                required
                className="mt-1.5"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="w-full font-semibold text-base"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Download Report"}
            </Button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SampleReportDownload;
