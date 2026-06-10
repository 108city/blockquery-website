import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Terms and Conditions
          </h1>
          <p className="text-muted-foreground mb-8">Last updated: January 29, 2026</p>
          
          <div className="prose prose-lg max-w-none space-y-8 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Introduction</h2>
              <p>
                These Terms and Conditions ("Terms") govern your access to and use of the Blockquery website and services provided by Blockquery Pte. Ltd. ("Blockquery", "we", "us", or "our"), a company registered in Singapore at 160 Robinson Road, 14-04 SBF Center, 068914, Singapore.
              </p>
              <p>
                By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part of these Terms, you may not access our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Services Description</h2>
              <p>Blockquery provides blockchain intelligence and wallet labeling services, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Comprehensive wallet label datasets covering multiple blockchain networks</li>
                <li>Real-time blockchain entity identification and risk assessment</li>
                <li>API access and data integration services</li>
                <li>Intelligence reporting and analysis</li>
                <li>Consultation services for compliance and law enforcement</li>
              </ul>
              <p>The specific services provided to you will be outlined in a separate service agreement.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Account Registration and Access</h2>
              <p>To access certain features of our services, you may be required to register an account. You agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate, current, and complete information during registration</li>
                <li>Maintain and promptly update your account information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
                <li>Accept responsibility for all activities that occur under your account</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Acceptable Use</h2>
              <p>You agree to use our services only for lawful purposes and in accordance with these Terms. You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use our services in any way that violates applicable laws or regulations</li>
                <li>Attempt to gain unauthorized access to our systems or networks</li>
                <li>Interfere with or disrupt the integrity or performance of our services</li>
                <li>Reverse engineer, decompile, or disassemble any part of our services</li>
                <li>Use our data for purposes other than those specified in your service agreement</li>
                <li>Resell, redistribute, or sublicense our data without explicit authorization</li>
                <li>Use automated means to access our services without permission</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Intellectual Property Rights</h2>
              <p>All content, data, trademarks, and other intellectual property on our website and in our services are owned by or licensed to Blockquery. This includes but is not limited to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Wallet label datasets and classifications</li>
                <li>Analysis methodologies and algorithms</li>
                <li>Software, APIs, and technical documentation</li>
                <li>Reports, graphics, and visual content</li>
                <li>Trademarks, logos, and branding materials</li>
              </ul>
              <p>Subject to these Terms and your service agreement, we grant you a limited, non-exclusive, non-transferable license to access and use our services for their intended purpose.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Data Accuracy and Limitations</h2>
              <p>While we strive to provide accurate and up-to-date blockchain intelligence, you acknowledge that:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Blockchain data is complex and constantly evolving</li>
                <li>Our labels and classifications are based on available information and analysis</li>
                <li>We make no guarantees about the completeness or accuracy of any specific data point</li>
                <li>You should conduct your own verification and due diligence</li>
                <li>Our services are intended to supplement, not replace, your own analysis and decision-making</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Confidentiality</h2>
              <p>Both parties agree to maintain the confidentiality of any proprietary or confidential information disclosed during the course of the business relationship. This includes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Technical specifications and methodologies</li>
                <li>Pricing and commercial terms</li>
                <li>Business strategies and plans</li>
                <li>Customer information and usage data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Payment Terms</h2>
              <p>If you purchase services from Blockquery:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Payment terms will be specified in your service agreement</li>
                <li>All fees are non-refundable unless otherwise stated</li>
                <li>We reserve the right to modify our pricing with reasonable notice</li>
                <li>Late payments may result in service suspension or termination</li>
                <li>You are responsible for all applicable taxes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Limitation of Liability</h2>
              <p>To the maximum extent permitted by applicable law:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Our services are provided "as is" without warranties of any kind</li>
                <li>We shall not be liable for any indirect, incidental, special, consequential, or punitive damages</li>
                <li>Our total liability shall not exceed the fees paid by you in the 12 months preceding the claim</li>
                <li>We are not responsible for losses resulting from your use or inability to use our services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">10. Indemnification</h2>
              <p>You agree to indemnify and hold Blockquery harmless from any claims, damages, losses, liabilities, and expenses arising from:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your violation of these Terms</li>
                <li>Your use of our services</li>
                <li>Your violation of any rights of another party</li>
                <li>Any content or information you provide to us</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">11. Term and Termination</h2>
              <p>These Terms remain in effect until terminated by either party. We may terminate or suspend your access immediately, without prior notice, if you breach these Terms.</p>
              <p>Upon termination:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your right to use our services immediately ceases</li>
                <li>You must cease all use of our data and materials</li>
                <li>Provisions regarding confidentiality, intellectual property, and liability survive termination</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">12. Governing Law and Dispute Resolution</h2>
              <p>These Terms shall be governed by and construed in accordance with the laws of Singapore, without regard to its conflict of law provisions.</p>
              <p>Any disputes arising from these Terms shall be resolved through good faith negotiations. If negotiations fail, disputes shall be submitted to arbitration in Singapore in accordance with the Arbitration Rules of the Singapore International Arbitration Centre.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">13. Changes to Terms</h2>
              <p>We reserve the right to modify these Terms at any time. We will provide notice of material changes by posting the updated Terms on our website and updating the "Last updated" date.</p>
              <p>Your continued use of our services after such changes constitutes acceptance of the new Terms.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">14. Miscellaneous</h2>
              <p><strong>Severability:</strong> If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect.</p>
              <p><strong>Waiver:</strong> No waiver of any term shall be deemed a further or continuing waiver of such term or any other term.</p>
              <p><strong>Entire Agreement:</strong> These Terms constitute the entire agreement between you and Blockquery regarding the use of our services.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">15. Contact Information</h2>
              <p>If you have any questions about these Terms, please contact us:</p>
              <div className="mt-4">
                <p><strong>Blockquery Pte. Ltd.</strong></p>
                <p>160 Robinson Road</p>
                <p>14-04 SBF Center</p>
                <p>068914, Singapore</p>
                <p className="mt-2"><strong>Phone:</strong> +1 (628) 236-9769</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsAndConditions;
