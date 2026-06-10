import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CaseStudies from "@/components/CaseStudies";
import ArticleCard from "@/components/ArticleCard";
import { Article, isCaseStudy } from "@/lib/articles";
import { BOOK_DEMO_HREF } from "@/config/site";

const CaseStudiesPage = () => {
  const [caseStudies, setCaseStudies] = useState<Article[]>([]);

  useEffect(() => {
    const fetchCaseStudies = async () => {
      const { data } = await supabase
        .from("articles")
        .select("id, title, slug, excerpt, cover_image_url, author_name, published_at")
        .eq("published", true)
        .order("published_at", { ascending: false });

      setCaseStudies(((data as Article[]) || []).filter((a) => isCaseStudy(a.title)));
    };

    fetchCaseStudies();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-12 sm:pt-40 sm:pb-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-6">
            Case studies
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Work that holds up where it matters.
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Sovereign government intelligence, regulator-grade gaming oversight,
            operator fraud response and asset recovery, already in production for
            the institutions that can't afford to get this wrong.
          </p>
        </div>
      </section>

      {/* Written case studies (moved from Insights) */}
      {caseStudies.length > 0 && (
        <section className="py-20 sm:py-28 px-4 sm:px-6 bg-card border-t border-border">
          <div className="container mx-auto max-w-6xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary text-center mb-4">
              Case files
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4">
              Read the full investigations.
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-14 max-w-2xl mx-auto">
              In-depth write-ups of recent investigations and recoveries.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {caseStudies.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Deployment highlights */}
      <CaseStudies showCta={false} />

      {/* Closing CTA */}
      <section className="py-20 sm:py-28 md:py-36 px-4 sm:px-6 bg-card border-t border-border">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Bring us a case.
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Tell us the problem you're trying to solve and we'll show you the
            dashboard, investigation or report that fits.
          </p>
          <Button size="lg" className="font-medium" asChild>
            <Link to={BOOK_DEMO_HREF}>Book a demo</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CaseStudiesPage;
