import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AISkills from "@/components/AISkills";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Bot,
  Users,
  CheckCircle,
  Activity,
  Eye,
  Zap,
  Lock,
} from "lucide-react";

const Platform = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 sm:pt-40 sm:pb-28 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-6">
            The Platform
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            A unified intelligence platform for blockchain investigation.
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
            Industry dashboards, autonomous AI agents, and an on-demand network of
            human investigators, assembled into a single intelligence stack and
            tailored to the workflow of each sector we serve.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="font-semibold" asChild>
              <Link to="/contact">Book a Platform Demo</Link>
            </Button>
            <Button size="lg" variant="outline-white" className="font-semibold" asChild>
              <a href="#dashboards">See How It Works</a>
            </Button>
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* Industry Dashboards */}
      <section id="dashboards" className="py-20 sm:py-28 px-4 sm:px-6 scroll-mt-24">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-12 h-12 rounded-lg border border-primary/30 bg-primary/5 flex items-center justify-center mb-6">
                <LayoutDashboard className="w-6 h-6 text-primary" strokeWidth={1.5} />
              </div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
                01 / Industry Dashboards
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight">
                Live intelligence, not static reports.
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Real-time criminal-trend feeds, role-based command centers, and
                jurisdiction-wide oversight views, built for the team actually
                using them. From a national financial-intelligence unit to a
                gaming regulator monitoring licensed operators, each deployment
                is shaped around the workflow it supports.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Sovereign cloud",
                  "Role-based access for investigators, supervisors and auditors",
                  "Continuous data refresh, no overnight batch jobs",
                  "Custom views per case, jurisdiction, or operator",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="aspect-square rounded-2xl border border-border bg-card flex items-center justify-center">
              <LayoutDashboard className="w-24 h-24 text-muted-foreground/30" strokeWidth={1} />
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* AI Agents */}
      <section id="ai-agents" className="py-20 sm:py-28 px-4 sm:px-6 bg-card scroll-mt-24">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="aspect-square rounded-2xl border border-border bg-background flex items-center justify-center md:order-1 order-2">
              <Bot className="w-24 h-24 text-muted-foreground/30" strokeWidth={1} />
            </div>
            <div className="md:order-2 order-1">
              <div className="w-12 h-12 rounded-lg border border-primary/30 bg-primary/5 flex items-center justify-center mb-6">
                <Bot className="w-6 h-6 text-primary" strokeWidth={1.5} />
              </div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
                02 / AI Agents
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight">
                Up to 80% of routine triage, resolved in seconds.
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Autonomous agents handle the analyst-hours that used to define
                this work: wallet screening, risk scoring, counterparty
                investigation, exploit-path reconstruction. Human attention is
                reserved for the cases where it actually moves the needle.
              </p>
              <ul className="space-y-3">
                {[
                  "Wallet & transaction screening at scale",
                  "Counterparty and cluster analysis",
                  "Cross-chain fund-flow reconstruction",
                  "Risk scoring with audit-trail explanations",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* AI Skills */}
      <AISkills />

      <div className="border-t border-border" />

      {/* Call for Backup */}
      <section id="call-for-backup" className="py-20 sm:py-28 px-4 sm:px-6 scroll-mt-24">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-12 h-12 rounded-lg border border-primary/30 bg-primary/5 flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-primary" strokeWidth={1.5} />
              </div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
                03 / Call for Backup
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight">
                A hybrid model that scales with complexity.
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                When a case escapes the AI's confidence threshold, our network of
                vetted human investigators picks it up, delivering court-ready
                output, expert-witness testimony, and the kind of judgment that
                only experience produces. AI does the heavy lifting; humans
                handle the complexity.
              </p>
              <ul className="space-y-3">
                {[
                  "On-demand access to specialist investigators",
                  "Court-ready evidence packages and expert testimony",
                  "Clear escalation thresholds, transparent pricing",
                  "Hours billed only when human judgment is required",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="aspect-square rounded-2xl border border-border bg-card flex items-center justify-center">
              <Users className="w-24 h-24 text-muted-foreground/30" strokeWidth={1} />
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* Why this stack */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 bg-card">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-14">
            Why this stack works.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Zap, title: "Built for speed", body: "Pilots live in weeks. New skills shipped weekly via vibe-code sprints." },
              { icon: Activity, title: "Continuous, not periodic", body: "Live intelligence feeds replace point-in-time reports." },
              { icon: Eye, title: "Operator-grade UX", body: "Designed for the analyst on the front line, not for procurement decks." },
              { icon: Lock, title: "Secure by deployment", body: "Sovereign cloud. Your data, your perimeter." },
            ].map((item) => (
              <div key={item.title} className="border border-border rounded-lg p-6 bg-background">
                <div className="w-10 h-10 rounded-lg border border-border flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28 px-4 sm:px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            See it running on your data.
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            We'll spin up a tailored pilot dashboard against your jurisdiction,
            operator, or case load, and walk your team through it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="font-semibold" asChild>
              <Link to="/contact">Book a Platform Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Platform;
