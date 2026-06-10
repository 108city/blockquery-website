import { Link } from "react-router-dom";
import { Calendar, Users, Clock } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Events = () => {
  const upcomingEvents = [
    {
      id: "crypto-fraud-webinar",
      title: "Crypto Fraud Response for Lawyers: Practical Insights",
      slug: "crypto-fraud-webinar",
      date: "20 November 2025",
      time: "14:00–15:00 CET",
      format: "Live, Invite-Only Webinar",
      speakers: "Nick Smart (Crystal Intelligence) & Blockquery",
      description: "Learn practical, step-by-step frameworks for what law firms should do in the critical first 24 hours after a client falls victim to crypto fraud.",
      highlights: [
        "Quickly assess recovery possibilities",
        "Identify key investigation details",
        "Communicate with clients, exchanges, and law enforcement",
        "Avoid common mistakes that weaken recovery cases"
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Upcoming Events
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Join exclusive webinars and workshops with industry experts in blockchain investigations and crypto fraud response.
              </p>
            </div>

            {/* Events Grid */}
            <div className="grid gap-8 md:gap-12">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden border-2 hover:border-primary/50 transition-all duration-300">
                  <CardHeader className="bg-gradient-to-br from-primary/5 to-primary/10 pb-8">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <CardTitle className="text-2xl md:text-3xl mb-2">
                          {event.title}
                        </CardTitle>
                        <CardDescription className="text-base">
                          {event.speakers}
                        </CardDescription>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium">
                          <Calendar className="w-4 h-4" />
                          {event.date}
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Left Column: Details */}
                      <div>
                        <p className="text-muted-foreground mb-6">
                          {event.description}
                        </p>

                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="font-medium">Time</div>
                              <div className="text-sm text-muted-foreground">{event.time}</div>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <Users className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="font-medium">Format</div>
                              <div className="text-sm text-muted-foreground">{event.format}</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Column: What You'll Learn */}
                      <div>
                        <h3 className="font-semibold text-lg mb-4">What You'll Learn</h3>
                        <ul className="space-y-3">
                          {event.highlights.map((highlight, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                              <span className="text-muted-foreground">{highlight}</span>
                            </li>
                          ))}
                        </ul>

                        <Button asChild size="lg" className="w-full mt-8">
                          <Link to={`/events/${event.slug}`}>
                            View Details & Apply
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Events;
