import { Shield, Zap, Server, Lock, Check } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const Services = () => {
  return (
    <>
      <SEOHead page="services" />
      
      <div className="bg-primary-900 text-white min-h-screen pt-20">
        {/* Header */}
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Professional Web3 infrastructure services tailored to your needs. From validator hosting to custom RPC nodes.
          </p>
        </div>

        {/* Services Grid */}
        <div className="container mx-auto px-4 pb-20">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            
            {/* Managed Validators */}
            <div className="bg-primary-800 rounded-2xl p-8 border border-primary-700 hover:border-secondary-500 transition-colors">
              <div className="w-14 h-14 bg-secondary-500/20 rounded-lg flex items-center justify-center mb-6 text-secondary-400">
                <Server size={32} />
              </div>
              <h2 className="text-2xl font-bold mb-4">Managed Validator Nodes</h2>
              <p className="text-gray-300 mb-6 h-20">
                Run your own validator without the technical hassle. We handle updates, maintenance, and monitoring 24/7.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-gray-300">
                  <Check size={20} className="text-green-400" /> Ethereum, Gnosis, Lukso support
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <Check size={20} className="text-green-400" /> 99.9% Uptime Guarantee
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <Check size={20} className="text-green-400" /> Non-custodial (you keep keys)
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <Check size={20} className="text-green-400" /> Swiss Hosted Infrastructure
                </li>
              </ul>
              <a href="https://t.me/selfnodes" target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-secondary-600 hover:bg-secondary-500 text-center rounded-lg font-bold transition-colors">
                Contact Sales
              </a>
            </div>

            {/* RPC Nodes */}
            <div className="bg-primary-800 rounded-2xl p-8 border border-primary-700 hover:border-secondary-500 transition-colors">
              <div className="w-14 h-14 bg-secondary-500/20 rounded-lg flex items-center justify-center mb-6 text-secondary-400">
                <Zap size={32} />
              </div>
              <h2 className="text-2xl font-bold mb-4">Dedicated RPC Nodes</h2>
              <p className="text-gray-300 mb-6 h-20">
                High-performance private RPC endpoints for your dApps or trading bots. Low latency and unlimited requests.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-gray-300">
                  <Check size={20} className="text-green-400" /> WebSocket & HTTP support
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <Check size={20} className="text-green-400" /> Custom Rate Limits
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <Check size={20} className="text-green-400" /> Multi-chain Support
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <Check size={20} className="text-green-400" /> Dedicated Resources
                </li>
              </ul>
              <a href="https://t.me/selfnodes" target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-primary-600 hover:bg-primary-500 text-center rounded-lg font-bold transition-colors">
                Get Access
              </a>
            </div>
          </div>

          {/* Security Section */}
          <div className="mt-20 max-w-4xl mx-auto bg-primary-800 rounded-2xl p-12 border border-primary-700 text-center">
            <Shield size={48} className="mx-auto text-secondary-400 mb-6" />
            <h2 className="text-3xl font-bold mb-6">Security First Architecture</h2>
            <p className="text-gray-300 mb-8">
              Our infrastructure is located in Tier 4 datacenters in Switzerland. We use enterprise-grade hardware and redundant connections to ensure maximum availability and security for your assets.
            </p>
            <div className="grid md:grid-cols-3 gap-8 text-left mt-12">
              <div>
                <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                  <Lock size={18} className="text-secondary-400" /> Physical Security
                </h3>
                <p className="text-sm text-gray-400">Biometric access control, 24/7 guards, and video surveillance.</p>
              </div>
              <div>
                <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                  <Server size={18} className="text-secondary-400" /> Hardware
                </h3>
                <p className="text-sm text-gray-400">Enterprise NVMe SSDs and ECC RAM for data integrity.</p>
              </div>
              <div>
                <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                  <Shield size={18} className="text-secondary-400" /> Network
                </h3>
                <p className="text-sm text-gray-400">DDoS protection and redundant 10Gbps uplinks.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
