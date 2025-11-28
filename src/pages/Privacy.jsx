import SEOHead from '../components/SEOHead';

const Privacy = () => {
  return (
    <>
      <SEOHead page="privacy" />
      
      <div className="relative min-h-screen pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-dark-950 -z-10"></div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-8 text-white">
              Privacy Policy
            </h1>
            
            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-gray-400 text-lg mb-8">
                Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>

              <section className="glass p-8 rounded-2xl mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">1. Data Controller</h2>
                <p className="text-gray-400 leading-relaxed">
                  Selfnodes, based in Switzerland, is the data controller for the personal data collected 
                  through our services. We are committed to protecting your privacy in accordance with 
                  Swiss data protection laws and GDPR.
                </p>
              </section>

              <section className="glass p-8 rounded-2xl mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">2. Data We Collect</h2>
                <p className="text-gray-400 leading-relaxed mb-4">We collect the following types of data:</p>
                <ul className="list-disc list-inside text-gray-400 space-y-2">
                  <li><strong className="text-white">Account Information:</strong> Email address, name, password (hashed)</li>
                  <li><strong className="text-white">Validator Data:</strong> Public keys, validator indices (public blockchain data)</li>
                  <li><strong className="text-white">Payment Information:</strong> Processed securely by Stripe; we do not store card details</li>
                  <li><strong className="text-white">Communication Data:</strong> Telegram User ID (if you enable alerts)</li>
                  <li><strong className="text-white">Usage Data:</strong> Log files, IP addresses, browser type</li>
                </ul>
              </section>

              <section className="glass p-8 rounded-2xl mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Data</h2>
                <ul className="list-disc list-inside text-gray-400 space-y-2">
                  <li>To provide and maintain our validator hosting and monitoring services</li>
                  <li>To send you alerts about your validator status (if enabled)</li>
                  <li>To process payments and manage your subscription</li>
                  <li>To communicate with you about service updates</li>
                  <li>To improve our services and user experience</li>
                </ul>
              </section>

              <section className="glass p-8 rounded-2xl mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">4. Data Storage & Security</h2>
                <p className="text-gray-400 leading-relaxed">
                  Your data is stored on secure servers located in Switzerland. We implement industry-standard 
                  security measures including encryption at rest and in transit, access controls, and regular 
                  security audits.
                </p>
              </section>

              <section className="glass p-8 rounded-2xl mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">5. Data Sharing</h2>
                <p className="text-gray-400 leading-relaxed mb-4">
                  We do not sell your personal data. We may share data with:
                </p>
                <ul className="list-disc list-inside text-gray-400 space-y-2">
                  <li><strong className="text-white">Stripe:</strong> For payment processing</li>
                  <li><strong className="text-white">Telegram:</strong> For sending alerts (only your Telegram ID)</li>
                  <li><strong className="text-white">Legal authorities:</strong> When required by law</li>
                </ul>
              </section>

              <section className="glass p-8 rounded-2xl mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">6. Cookies</h2>
                <p className="text-gray-400 leading-relaxed">
                  We use essential cookies for authentication and session management. We do not use 
                  tracking cookies or third-party advertising cookies. You can disable cookies in your 
                  browser settings, but this may affect service functionality.
                </p>
              </section>

              <section className="glass p-8 rounded-2xl mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">7. Your Rights</h2>
                <p className="text-gray-400 leading-relaxed mb-4">Under GDPR and Swiss law, you have the right to:</p>
                <ul className="list-disc list-inside text-gray-400 space-y-2">
                  <li>Access your personal data</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Export your data (data portability)</li>
                  <li>Object to processing</li>
                  <li>Withdraw consent at any time</li>
                </ul>
              </section>

              <section className="glass p-8 rounded-2xl mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">8. Data Retention</h2>
                <p className="text-gray-400 leading-relaxed">
                  We retain your data for as long as your account is active or as needed to provide services. 
                  After account deletion, we may retain certain data for legal compliance purposes for up to 
                  7 years.
                </p>
              </section>

              <section className="glass p-8 rounded-2xl">
                <h2 className="text-2xl font-bold text-white mb-4">9. Contact Us</h2>
                <p className="text-gray-400 leading-relaxed">
                  For privacy-related inquiries or to exercise your rights, contact us at{' '}
                  <a href="mailto:privacy@selfnodes.com" className="text-brand-cyan hover:underline">
                    privacy@selfnodes.com
                  </a>
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Privacy;
