import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
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
import ForensicServices from "./pages/ForensicServices";
import CryptoCompliance from "./pages/CryptoCompliance";
import IGaming from "./pages/IGaming";
import Platform from "./pages/Platform";
import SolutionsLawFirms from "./pages/SolutionsLawFirms";
import SolutionsIGaming from "./pages/SolutionsIGaming";
import SolutionsGamingRegulators from "./pages/SolutionsGamingRegulators";
import SolutionsLawEnforcement from "./pages/SolutionsLawEnforcement";
import SolutionsCryptoInsurance from "./pages/SolutionsCryptoInsurance";
import SolutionsForensic from "./pages/SolutionsForensic";

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

          {/* New B2B platform & solutions */}
          <Route path="/platform" element={<Platform />} />
          <Route path="/solutions/law-firms" element={<SolutionsLawFirms />} />
          <Route path="/solutions/igaming-operators" element={<SolutionsIGaming />} />
          <Route path="/solutions/gaming-regulators" element={<SolutionsGamingRegulators />} />
          <Route path="/solutions/law-enforcement" element={<SolutionsLawEnforcement />} />
          <Route path="/solutions/crypto-insurance" element={<SolutionsCryptoInsurance />} />
          <Route path="/solutions/forensic-services" element={<SolutionsForensic />} />

          {/* Standard pages */}
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/insights/:slug" element={<ArticleDetail />} />
          <Route path="/admin/articles" element={<AdminArticles />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/crypto-fraud-webinar" element={<WebinarCryptoFraud />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/meeting-confirmed" element={<MeetingConfirmation />} />
          <Route path="/contact-thank-you" element={<ContactThankYou />} />
          <Route path="/thank-you" element={<ThankYou />} />

          {/* Legacy routes — kept reachable but removed from navigation */}
          <Route path="/companies" element={<Companies />} />
          <Route path="/individual" element={<Individual />} />
          <Route path="/investigations" element={<Investigations />} />
          <Route path="/self-service" element={<SelfServiceCheckout />} />
          <Route path="/sample-report" element={<SampleReportDownload />} />
          <Route path="/report-thank-you" element={<ReportThankYou />} />
          <Route path="/forensic-services" element={<ForensicServices />} />
          <Route path="/crypto-compliance" element={<CryptoCompliance />} />
          <Route path="/igaming" element={<IGaming />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
