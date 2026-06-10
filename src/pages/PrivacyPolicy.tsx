import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">
            Privacy Policy
          </h1>
          
          <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
            <p>
              BlockQuery ("Company", "we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services. By accessing or using our website, you consent to the practices described in this Privacy Policy.
            </p>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Information We Collect</h2>
              <p>
                We may collect personal information from you in a variety of ways, including when you:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Visit our website</li>
                <li>Fill out forms or submit inquiries</li>
                <li>Use our investigation services</li>
                <li>Contact us directly</li>
              </ul>
              <p className="mt-4">
                The types of information we may collect include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Personal Information:</strong> Name, email address, phone number, organization, and other identifiers you provide.</li>
                <li><strong>Usage Data:</strong> Information about how you use our website, including IP address, browser type, device information, referring/exit pages, and date/time stamps.</li>
                <li><strong>Cookies and Tracking Technologies:</strong> We use cookies and similar technologies to enhance user experience and analyze website usage.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. How We Use Your Information</h2>
              <p>
                We may use the information we collect for purposes including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To provide and operate our investigation services</li>
                <li>To respond to your inquiries and requests</li>
                <li>To improve our website, services, and user experience</li>
                <li>To communicate with you about updates, promotions, or relevant information</li>
                <li>To comply with legal obligations and protect our rights</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Disclosure of Your Information</h2>
              <p>
                We may share your information in the following situations:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Service Providers:</strong> With trusted third parties who perform services on our behalf, such as analytics or data processing.</li>
                <li><strong>Legal Requirements:</strong> When required by law, regulation, or legal process, or to protect the rights, property, or safety of BlockQuery or others.</li>
                <li><strong>Business Transfers:</strong> In connection with any merger, sale, or asset transfer, your information may be transferred to a successor entity.</li>
              </ul>
              <p className="mt-4">
                We do not sell or rent your personal information to third parties for their marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no internet transmission or storage method is 100% secure; we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. International Data Transfers</h2>
              <p>
                Your information may be transferred to, and maintained on, servers located outside your country of residence. By using our website, you consent to the transfer of information to countries outside your own.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Your Data Rights</h2>
              <p>
                Depending on your location, you may have certain rights regarding your personal information, such as:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>The right to access, update, or delete your personal data</li>
                <li>The right to object to or restrict certain types of processing</li>
                <li>The right to withdraw consent where processing is based on consent</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, please contact us at investigations@blockquery.io
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Cookies and Tracking</h2>
              <p>
                You can manage your cookie preferences through your browser settings. Please note that disabling cookies may affect the functionality of our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party sites. We are not responsible for the privacy practices or content of such sites. Please review their privacy policies before providing any information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Children's Privacy</h2>
              <p>
                Our website is not intended for children under the age of 18. We do not knowingly collect personal information from children. If we learn we have collected such information, we will take steps to delete it promptly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">10. Changes to This Privacy Policy</h2>
              <p>
                We reserve the right to update or modify this Privacy Policy at any time. Any changes will be posted on this page with the updated effective date. Your continued use of our website constitutes acceptance of the revised policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">11. Contact Us</h2>
              <p>
                If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
              </p>
              <p className="mt-4">
                <strong>Email:</strong> investigations@blockquery.io<br />
                <strong>Address:</strong> 15 Rue du Colonel Driant, 75001 Paris, France
              </p>
            </section>

            <div className="mt-12 pt-8 border-t border-border">
              <p className="italic">
                By using our website, you acknowledge that you have read, understood, and agree to this Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
