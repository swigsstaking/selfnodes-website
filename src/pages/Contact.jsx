import { Mail, MapPin } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const Contact = () => {
  return (
    <>
      <SEOHead page="contact" />
      
      <div className="relative min-h-screen pt-24 pb-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-dark-950 -z-10">
           <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-brand-purple/5 rounded-full blur-[120px]"></div>
           <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-brand-cyan/5 rounded-full blur-[100px]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 text-center text-white">
              Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-purple">Touch</span>
            </h1>
            <p className="text-xl text-gray-400 text-center mb-16 max-w-2xl mx-auto">
              Have questions about our services? Need help with your validator? Our team is here to help.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Info */}
              <div className="space-y-8">
                <div className="glass p-8 rounded-2xl">
                  <h2 className="text-2xl font-bold mb-6 text-white font-display">Contact Information</h2>
                  
                  <div className="space-y-6">
                    <a href="mailto:support@selfnodes.com" className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors group p-4 rounded-xl hover:bg-white/5">
                      <div className="w-12 h-12 bg-brand-cyan/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform text-brand-cyan">
                        <Mail size={24} />
                      </div>
                      <div>
                        <div className="font-bold text-white">Email Us</div>
                        <div className="text-sm text-gray-400">support@selfnodes.com</div>
                      </div>
                    </a>

                    <div className="flex items-center gap-4 text-gray-300 p-4">
                      <div className="w-12 h-12 bg-brand-orange/10 rounded-full flex items-center justify-center text-brand-orange">
                        <MapPin size={24} />
                      </div>
                      <div>
                        <div className="font-bold text-white">Location</div>
                        <div className="text-sm text-gray-400">Lausanne, Switzerland</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8 rounded-2xl bg-gradient-to-br from-brand-purple to-brand-pink text-white shadow-xl shadow-brand-purple/20 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                  
                  <h3 className="text-2xl font-bold mb-4 font-display">Need Urgent Support?</h3>
                  <p className="mb-8 opacity-90 leading-relaxed">
                    For critical issues with your validator, please contact us via email for faster response times.
                  </p>
                  <a 
                    href="mailto:support@selfnodes.com"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-purple rounded-lg font-bold hover:bg-gray-50 transition-colors shadow-lg"
                  >
                    <Mail size={20} /> Contact Support
                  </a>
                </div>
              </div>

              {/* FAQ */}
              <div className="glass p-8 rounded-2xl">
                <h2 className="text-2xl font-bold mb-8 text-white font-display">Common Questions</h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-white">Where are your servers located?</h3>
                    <p className="text-gray-400 leading-relaxed">All our infrastructure is hosted in Tier 4 datacenters in Switzerland, ensuring maximum security and privacy.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-white">Do you have custody of my funds?</h3>
                    <p className="text-gray-400 leading-relaxed">No. We provide non-custodial services. You always keep your withdrawal keys. We only manage the validator operations.</p>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg mb-2 text-white">Which networks do you support?</h3>
                    <p className="text-gray-400 leading-relaxed">We currently support Ethereum Mainnet, Gnosis Chain, and Lukso. More networks are coming soon.</p>
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
