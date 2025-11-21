import { Mail, MapPin, Send } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const Contact = () => {
  return (
    <>
      <SEOHead page="contact" />
      
      <div className="bg-primary-900 text-white min-h-screen pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Get in Touch</h1>
            <p className="text-xl text-gray-300 text-center mb-16">
              Have questions about our services? Need help with your validator? Our team is here to help.
            </p>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <div className="bg-primary-800 p-8 rounded-2xl border border-primary-700">
                  <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                  
                  <div className="space-y-6">
                    <a href="https://t.me/selfnodes" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-gray-300 hover:text-secondary-400 transition-colors group">
                      <div className="w-12 h-12 bg-primary-700 rounded-lg flex items-center justify-center group-hover:bg-secondary-500/20">
                        <Send size={24} />
                      </div>
                      <div>
                        <div className="font-bold text-white">Telegram Support</div>
                        <div className="text-sm">@selfnodes</div>
                      </div>
                    </a>

                    <a href="mailto:support@selfnodes.com" className="flex items-center gap-4 text-gray-300 hover:text-secondary-400 transition-colors group">
                      <div className="w-12 h-12 bg-primary-700 rounded-lg flex items-center justify-center group-hover:bg-secondary-500/20">
                        <Mail size={24} />
                      </div>
                      <div>
                        <div className="font-bold text-white">Email Us</div>
                        <div className="text-sm">support@selfnodes.com</div>
                      </div>
                    </a>

                    <div className="flex items-center gap-4 text-gray-300">
                      <div className="w-12 h-12 bg-primary-700 rounded-lg flex items-center justify-center">
                        <MapPin size={24} />
                      </div>
                      <div>
                        <div className="font-bold text-white">Location</div>
                        <div className="text-sm">Lausanne, Switzerland</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-secondary-600 p-8 rounded-2xl text-white">
                  <h3 className="text-xl font-bold mb-4">Need Urgent Support?</h3>
                  <p className="mb-6 opacity-90">
                    For critical issues with your validator, please use our dedicated Telegram support channel for faster response times.
                  </p>
                  <a 
                    href="https://t.me/selfnodes" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-white text-secondary-600 rounded-lg font-bold hover:bg-gray-100 transition-colors"
                  >
                    Contact Support
                  </a>
                </div>
              </div>

              {/* FAQ / Form Placeholder */}
              <div className="bg-primary-800 p-8 rounded-2xl border border-primary-700">
                <h2 className="text-2xl font-bold mb-6">Common Questions</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-white">Where are your servers located?</h3>
                    <p className="text-gray-400">All our infrastructure is hosted in Tier 4 datacenters in Switzerland, ensuring maximum security and privacy.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-white">Do you have custody of my funds?</h3>
                    <p className="text-gray-400">No. We provide non-custodial services. You always keep your withdrawal keys. We only manage the validator operations.</p>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg mb-2 text-white">Which networks do you support?</h3>
                    <p className="text-gray-400">We currently support Ethereum Mainnet, Gnosis Chain, and Lukso. More networks are coming soon.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
