import { Link } from 'react-router-dom';
import { Shield, Server, Lock, Check, Activity, Bell, Calculator } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const Services = () => {
  return (
    <>
      <SEOHead page="services" />
      
      <div className="relative min-h-screen pt-24 pb-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-dark-950 -z-10">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-brand-purple/10 rounded-full blur-[120px]"></div>
        </div>

        {/* Header */}
        <div className="container mx-auto px-4 py-16 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 text-white">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-purple">Services</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Professional Web3 infrastructure services tailored to your needs. From validator hosting to real-time monitoring.
          </p>
        </div>

        {/* Services Grid */}
        <div className="container mx-auto px-4 pb-20 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* Managed Validators */}
            <div className="group relative p-8 rounded-2xl bg-dark-900/50 border border-white/10 hover:border-brand-purple/50 transition-all duration-300 hover:-translate-y-2 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 bg-brand-purple/10 rounded-xl flex items-center justify-center mb-6 text-brand-purple group-hover:scale-110 transition-transform">
                  <Server size={32} />
                </div>
                <h2 className="text-2xl font-display font-bold mb-4 text-white">Managed Validator Nodes</h2>
                <p className="text-gray-400 mb-8 h-20 leading-relaxed">
                  Run your own validator without the technical hassle. We handle updates, maintenance, and monitoring 24/7.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-gray-300">
                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Check size={12} className="text-green-500" />
                    </div>
                    Ethereum Mainnet Support
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Check size={12} className="text-green-500" />
                    </div>
                    99.9% Uptime Guarantee
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Check size={12} className="text-green-500" />
                    </div>
                    Non-custodial (you keep keys)
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Check size={12} className="text-green-500" />
                    </div>
                    Swiss Hosted Infrastructure
                  </li>
                </ul>
                <Link to="/migrate" className="block w-full py-4 bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 text-center rounded-xl font-bold text-white transition-all shadow-lg shadow-brand-purple/20">
                  Get Started
                </Link>
              </div>
            </div>

            {/* Validator Monitoring */}
            <div className="group relative p-8 rounded-2xl bg-dark-900/50 border border-white/10 hover:border-brand-cyan/50 transition-all duration-300 hover:-translate-y-2 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 bg-brand-cyan/10 rounded-xl flex items-center justify-center mb-6 text-brand-cyan group-hover:scale-110 transition-transform">
                  <Activity size={32} />
                </div>
                <h2 className="text-2xl font-display font-bold mb-4 text-white">Validator Monitoring</h2>
                <p className="text-gray-400 mb-8 h-20 leading-relaxed">
                  Real-time monitoring for your validators. Get instant alerts when something goes wrong and track performance metrics.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-gray-300">
                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Check size={12} className="text-green-500" />
                    </div>
                    Real-time Status Dashboard
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Check size={12} className="text-green-500" />
                    </div>
                    Telegram Alerts (Coming Soon)
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Check size={12} className="text-green-500" />
                    </div>
                    Performance Analytics
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Check size={12} className="text-green-500" />
                    </div>
                    Multi-chain Support
                  </li>
                </ul>
                <Link to="/monitoring" className="block w-full py-4 bg-dark-800 hover:bg-dark-700 border border-white/10 text-center rounded-xl font-bold text-white transition-colors">
                  Start Monitoring
                </Link>
              </div>
            </div>

          </div>

          {/* Calculator CTA */}
          <div className="mt-16 max-w-2xl mx-auto">
            <Link 
              to="/calculator"
              className="group flex items-center justify-between p-6 glass rounded-2xl border border-white/10 hover:border-brand-cyan/50 transition-all hover:-translate-y-1"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-brand-cyan to-brand-purple rounded-xl flex items-center justify-center">
                  <Calculator size={28} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Staking Calculator</h3>
                  <p className="text-gray-400 text-sm">Estimate your rewards and ROI before you start</p>
                </div>
              </div>
              <div className="text-brand-cyan group-hover:translate-x-2 transition-transform">
                →
              </div>
            </Link>
          </div>

          {/* Security Section */}
          <div className="mt-20 max-w-4xl mx-auto glass rounded-2xl p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-orange via-brand-pink to-brand-purple"></div>
            
            <Shield size={48} className="mx-auto text-brand-orange mb-6" />
            <h2 className="text-3xl font-display font-bold mb-6 text-white">Security First Architecture</h2>
            <p className="text-gray-400 mb-12 leading-relaxed">
              Our infrastructure is located in Tier 4 datacenters in Switzerland. We use enterprise-grade hardware and redundant connections to ensure maximum availability and security for your assets.
            </p>
            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div className="p-4 rounded-xl bg-dark-900/50 border border-white/5">
                <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                  <Lock size={18} className="text-brand-purple" /> Physical Security
                </h3>
                <p className="text-sm text-gray-400">24/7 guards and video surveillance.</p>
              </div>
              <div className="p-4 rounded-xl bg-dark-900/50 border border-white/5">
                <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                  <Server size={18} className="text-brand-cyan" /> Hardware
                </h3>
                <p className="text-sm text-gray-400">Enterprise NVMe SSDs and ECC RAM for data integrity.</p>
              </div>
              <div className="p-4 rounded-xl bg-dark-900/50 border border-white/5">
                <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                  <Shield size={18} className="text-brand-orange" /> Network
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
