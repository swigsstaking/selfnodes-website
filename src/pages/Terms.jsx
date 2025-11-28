import SEOHead from '../components/SEOHead';

const Terms = () => {
  return (
    <>
      <SEOHead page="terms" />
      
      <div className="relative min-h-screen pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-dark-950 -z-10"></div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-8 text-white">
              Terms and Conditions
            </h1>
            
            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-gray-400 text-lg mb-8">
                Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>

              <section className="glass p-8 rounded-2xl mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
                <p className="text-gray-400 leading-relaxed">
                  Welcome to Selfnodes. These Terms and Conditions govern your use of our validator hosting, 
                  monitoring services, and related infrastructure services. By accessing or using our services, 
                  you agree to be bound by these terms.
                </p>
              </section>

              <section className="glass p-8 rounded-2xl mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">2. Services Description</h2>
                <p className="text-gray-400 leading-relaxed mb-4">
                  Selfnodes provides the following services:
                </p>
                <ul className="list-disc list-inside text-gray-400 space-y-2">
                  <li>Managed Validator Node Hosting for Ethereum, Lukso, and Gnosis networks</li>
                  <li>Real-time validator monitoring and alerting</li>
                  <li>Non-custodial key management (you retain full control of your keys)</li>
                  <li>Infrastructure hosted in Swiss Tier 4 datacenters</li>
                </ul>
              </section>

              <section className="glass p-8 rounded-2xl mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">3. Non-Custodial Service</h2>
                <p className="text-gray-400 leading-relaxed">
                  Selfnodes operates on a non-custodial basis. You maintain full ownership and control of your 
                  validator keys at all times. We never have access to your withdrawal keys. You are solely 
                  responsible for the security and backup of your keys.
                </p>
              </section>

              <section className="glass p-8 rounded-2xl mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">4. Payment Terms</h2>
                <p className="text-gray-400 leading-relaxed mb-4">
                  Services are billed on a monthly subscription basis. Payments are processed through Stripe. 
                  Prices are displayed in the currency specified at checkout (USD, CHF, or EUR).
                </p>
                <p className="text-gray-400 leading-relaxed">
                  Failure to pay may result in suspension of services. We will provide reasonable notice before 
                  any service interruption.
                </p>
              </section>

              <section className="glass p-8 rounded-2xl mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">5. Uptime Guarantee</h2>
                <p className="text-gray-400 leading-relaxed">
                  We guarantee 99.9% uptime for our validator hosting services. In case of downtime exceeding 
                  this threshold, you may be eligible for service credits. This guarantee does not cover 
                  scheduled maintenance or network-wide issues beyond our control.
                </p>
              </section>

              <section className="glass p-8 rounded-2xl mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">6. Limitation of Liability</h2>
                <p className="text-gray-400 leading-relaxed">
                  Selfnodes is not liable for any slashing events, missed attestations, or financial losses 
                  resulting from network issues, client bugs, or circumstances beyond our reasonable control. 
                  Our maximum liability is limited to the fees paid for the affected service period.
                </p>
              </section>

              <section className="glass p-8 rounded-2xl mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">7. Termination</h2>
                <p className="text-gray-400 leading-relaxed">
                  Either party may terminate the service with 30 days written notice. Upon termination, 
                  you are responsible for migrating your validators to another provider. We will provide 
                  reasonable assistance during the transition period.
                </p>
              </section>

              <section className="glass p-8 rounded-2xl mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">8. Governing Law</h2>
                <p className="text-gray-400 leading-relaxed">
                  These terms are governed by the laws of Switzerland. Any disputes shall be resolved in 
                  the courts of Geneva, Switzerland.
                </p>
              </section>

              <section className="glass p-8 rounded-2xl">
                <h2 className="text-2xl font-bold text-white mb-4">9. Contact</h2>
                <p className="text-gray-400 leading-relaxed">
                  For questions about these terms, please contact us at{' '}
                  <a href="mailto:support@selfnodes.com" className="text-brand-cyan hover:underline">
                    support@selfnodes.com
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

export default Terms;
