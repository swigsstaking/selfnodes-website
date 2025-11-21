import { Link } from 'react-router-dom';
import { ArrowRight, Server, Shield, Activity } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const Home = () => {
  return (
    <>
      <SEOHead page="home" />
      
      {/* Hero Section */}
      <section className="relative bg-primary-900 text-white min-h-[80vh] flex items-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Launch, monitor, and manage your <span className="text-secondary-400">Validators</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Secure and scalable Web3 infrastructure in a few clicks. Supports Ethereum, Lukso, and Gnosis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/services"
                className="px-8 py-4 bg-secondary-500 hover:bg-secondary-600 text-white rounded-lg font-bold text-center transition-colors flex items-center justify-center gap-2"
              >
                Get Started Now <ArrowRight size={20} />
              </Link>
              <Link 
                to="/monitoring"
                className="px-8 py-4 bg-primary-700 hover:bg-primary-600 text-white rounded-lg font-bold text-center transition-colors"
              >
                Validator Monitoring
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-primary-800 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-primary-700 p-8 rounded-xl hover:transform hover:-translate-y-1 transition-all border border-primary-600">
              <div className="w-16 h-16 bg-secondary-500/20 rounded-lg flex items-center justify-center mb-6 text-secondary-400">
                <Activity size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Validator Monitoring</h3>
              <p className="text-gray-300 mb-6">
                Monitor your validator in real time. Get instant alerts via Telegram if your node goes offline.
              </p>
              <Link to="/monitoring" className="text-secondary-400 hover:text-secondary-300 font-bold flex items-center gap-2">
                Learn more <ArrowRight size={16} />
              </Link>
            </div>

            <div className="bg-primary-700 p-8 rounded-xl hover:transform hover:-translate-y-1 transition-all border border-primary-600">
              <div className="w-16 h-16 bg-secondary-500/20 rounded-lg flex items-center justify-center mb-6 text-secondary-400">
                <Server size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Custom RPC Nodes</h3>
              <p className="text-gray-300 mb-6">
                Fully Managed Nodes for Ethereum, Gnosis, Lukso and more. High performance and reliability.
              </p>
              <Link to="/services" className="text-secondary-400 hover:text-secondary-300 font-bold flex items-center gap-2">
                Learn more <ArrowRight size={16} />
              </Link>
            </div>

            <div className="bg-primary-700 p-8 rounded-xl hover:transform hover:-translate-y-1 transition-all border border-primary-600">
              <div className="w-16 h-16 bg-secondary-500/20 rounded-lg flex items-center justify-center mb-6 text-secondary-400">
                <Shield size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Secure Hosting</h3>
              <p className="text-gray-300 mb-6">
                100% Swiss Infrastructure. Full GDPR Compliance & Data Privacy. Non-custodial solutions.
              </p>
              <Link to="/services" className="text-secondary-400 hover:text-secondary-300 font-bold flex items-center gap-2">
                Learn more <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-white text-primary-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-12">Why Choose Selfnodes?</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="p-6 rounded-xl bg-gray-50">
              <div className="text-5xl mb-4">🇨🇭</div>
              <h3 className="text-xl font-bold mb-2">100% Swiss</h3>
              <p className="text-gray-600">Infrastructure hosted in Switzerland</p>
            </div>
            <div className="p-6 rounded-xl bg-gray-50">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-xl font-bold mb-2">GDPR Compliant</h3>
              <p className="text-gray-600">Full data privacy & security</p>
            </div>
            <div className="p-6 rounded-xl bg-gray-50">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-2">99%+ Uptime</h3>
              <p className="text-gray-600">Professional monitoring</p>
            </div>
            <div className="p-6 rounded-xl bg-gray-50">
              <div className="text-5xl mb-4">👨‍💻</div>
              <h3 className="text-xl font-bold mb-2">Human Support</h3>
              <p className="text-gray-600">Direct access via Telegram & Email</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to launch your node?</h2>
          <p className="text-xl mb-8 opacity-90">Take control of your staking infrastructure today.</p>
          <Link 
            to="/contact"
            className="px-8 py-4 bg-white text-secondary-600 hover:bg-gray-100 rounded-lg font-bold inline-block transition-colors"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
