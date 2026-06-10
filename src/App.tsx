import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import Intelligence from "./pages/Intelligence";
import Embedded from "./pages/Embedded";
import WalletChecker from "./pages/WalletChecker";
import LawFirms from "./pages/LawFirms";
import CaseStudiesPage from "./pages/CaseStudiesPage";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Events from "./pages/Events";
import WebinarCryptoFraud from "./pages/WebinarCryptoFraud";
import SelfServiceCheckout from "./pages/SelfServiceCheckout";
import ThankYou from "./pages/ThankYou";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Insights from "./pages/Insights";
import ArticleDetail from "./pages/ArticleDetail";
import AdminArticles from "./pages/AdminArticles";
import NotFound from "./pages/NotFound";
import Companies from "./pages/Companies";
import Individual from "./pages/Individual";
import MeetingConfirmation from "./pages/MeetingConfirmation";
import ContactThankYou from "./pages/ContactThankYou";
import SampleReportDownload from "./pages/SampleReportDownload";
import ReportThankYou from "./pages/ReportThankYou";
import Investigations from "./pages/Investigations";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />

          {/* Offerings */}
          <Route path="/intelligence" element={<Intelligence />} />
          <Route path="/embedded" element={<Embedded />} />
          <Route path="/wallet-checker" element={<WalletChecker />} />
          <Route path="/law-firms" element={<LawFirms />} />

          {/* Standard pages */}
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/case-studies" element={<CaseStudiesPage />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/insights/:slug" element={<ArticleDetail />} />
          <Route path="/admin/articles" element={<AdminArticles />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/meeting-confirmed" element={<MeetingConfirmation />} />
          <Route path="/contact-thank-you" element={<ContactThankYou />} />
          <Route path="/thank-you" element={<ThankYou />} />

          {/*
            Archived events — retained because the webinar registration writes to
            Supabase. In production, /events/* 301s to /insights via netlify.toml.
          */}
          <Route path="/events" element={<Events />} />
          <Route path="/events/crypto-fraud-webinar" element={<WebinarCryptoFraud />} />

          {/*
            Self-service forensic-report funnel — Supabase-wired, kept functional
            but unlinked from primary navigation. Surfaced via /intelligence#forensic-reports.
          */}
          <Route path="/companies" element={<Companies />} />
          <Route path="/individual" element={<Individual />} />
          <Route path="/investigations" element={<Investigations />} />
          <Route path="/self-service" element={<SelfServiceCheckout />} />
          <Route path="/sample-report" element={<SampleReportDownload />} />
          <Route path="/report-thank-you" element={<ReportThankYou />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
