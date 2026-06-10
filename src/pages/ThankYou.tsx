import { useSearchParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock } from "lucide-react";

const ThankYou = () => {
  const [searchParams] = useSearchParams();
  const reportId = searchParams.get("reportId");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl w-full text-center space-y-8">
          <div className="flex justify-center">
            <div className="rounded-full bg-primary/10 p-6">
              <CheckCircle2 className="h-16 w-16 text-primary" />
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">Thank You for Your Payment!</h1>
            {reportId && (
              <p className="text-muted-foreground text-lg">
                Your report ID: <span className="font-mono font-semibold">{reportId}</span>
              </p>
            )}
            <p className="text-lg text-muted-foreground">
              Our team will begin processing your investigation report within 48 hours. You'll receive updates via the email address you provided.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/">Return to Home</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ThankYou;
