import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const ContactThankYou = () => {
  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="pt-32 pb-20 sm:pt-40 sm:pb-28 px-4 sm:px-6">
        <div className="container mx-auto max-w-2xl text-center">
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 rounded-full border border-border flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Thank you for reaching out
          </h1>
          <p className="text-lg text-muted-foreground mb-4 max-w-lg mx-auto">
            Our team will review your case and respond within 24 hours.
          </p>
          <p className="text-muted-foreground mb-10 max-w-lg mx-auto">
            If your matter is urgent, feel free to book a consultation directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="font-semibold text-base px-8" asChild>
              <a
                href="https://koalendar.com/e/meet-with-greg-schneider-podproza"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a Consultation
              </a>
            </Button>
            <Button size="lg" variant="outline-white" className="font-semibold text-base px-8" asChild>
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactThankYou;
