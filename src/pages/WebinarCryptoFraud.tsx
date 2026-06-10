import { useState } from "react";
import { Calendar, Clock, Users, CheckCircle2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const WebinarCryptoFraud = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length > 100) {
      newErrors.name = "Name must be less than 100 characters";
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company is required";
    } else if (formData.company.trim().length > 200) {
      newErrors.company = "Company must be less than 200 characters";
    }

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Invalid email address";
    } else if (formData.email.trim().length > 255) {
      newErrors.email = "Email must be less than 255 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('submit-webinar-registration', {
        body: {
          name: formData.name.trim(),
          company: formData.company.trim(),
          email: formData.email.trim(),
          webinarSlug: 'crypto-fraud-webinar-nov-2025',
        },
      });

      if (error) {
        console.error('Error submitting registration:', error);
        throw error;
      }

      if (data?.error) {
        if (data.fields) {
          setErrors(data.fields);
        }
        toast({
          title: "Registration Failed",
          description: data.error,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Application Submitted!",
        description: "Thank you for your application. We'll review it and send you a confirmation email if selected.",
      });

      // Reset form
      setFormData({ name: "", company: "", email: "" });
      setErrors({});
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Submission Failed",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-1">
        <section className="relative py-20 md:py-32 px-6">
          <div className="container mx-auto max-w-4xl">
            <div className="space-y-12">
              {/* Event Details */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium mb-6">
                  Exclusive Invite-Only Webinar
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  Crypto Fraud Response for Lawyers: Practical Insights from Crystal Intelligence and Blockquery
                </h1>

                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span>20 November 2025</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-5 h-5 text-primary" />
                    <span>14:00 CET</span>
                  </div>
                </div>

                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  When a client calls your firm after falling victim to a crypto scam or fraud, every minute matters.
                </p>

                <p className="text-muted-foreground mb-8 leading-relaxed">
                  In this exclusive session, Nick Smart (Crystal Intelligence) and The Blockquery Team will share a practical, step-by-step framework for what law firms should do in the critical first 24 hours after a client reaches out.
                </p>
              </div>

              {/* What You'll Learn & Event Details & Application Form */}
              <div className="space-y-8">
                {/* What You'll Learn */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">What You'll Learn</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {[
                        "Understand how to quickly assess whether recovery is possible",
                        "Identify what key details are needed to start the investigation",
                        "Communicate effectively with clients, exchanges, and law enforcement",
                        "Avoid the common mistakes that weaken a potential recovery case"
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Event Details Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Event Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <div className="font-medium">Date</div>
                        <div className="text-sm text-muted-foreground">Thursday, 20 November 2025</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <div className="font-medium">Time</div>
                        <div className="text-sm text-muted-foreground">14:00–15:00 CET</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <div className="font-medium">Speakers</div>
                        <div className="text-sm text-muted-foreground">
                          Nick Smart (Crystal Intelligence) & Blockquery
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <p className="text-sm text-muted-foreground">
                        This is an interactive, small-group session designed for lawyers who want practical takeaways, not theory. 
                        Google Meet link will be shared upon confirmation.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Application Form */}
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-2xl">Apply for a Spot</CardTitle>
                    <CardDescription>
                      Participation is by invitation only and space is limited. Selected attendees will receive a confirmation email.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="Your full name"
                          className={errors.name ? "border-destructive" : ""}
                        />
                        {errors.name && (
                          <p className="text-sm text-destructive">{errors.name}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="company">Company *</Label>
                        <Input
                          id="company"
                          type="text"
                          value={formData.company}
                          onChange={(e) => handleInputChange("company", e.target.value)}
                          placeholder="Your law firm or organization"
                          className={errors.company ? "border-destructive" : ""}
                        />
                        {errors.company && (
                          <p className="text-sm text-destructive">{errors.company}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="your.email@lawfirm.com"
                          className={errors.email ? "border-destructive" : ""}
                        />
                        {errors.email && (
                          <p className="text-sm text-destructive">{errors.email}</p>
                        )}
                      </div>

                      <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting Application..." : "Apply Now"}
                      </Button>

                      <p className="text-xs text-center text-muted-foreground">
                        By submitting this form, you agree to be contacted regarding this webinar.
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default WebinarCryptoFraud;
