import { Link } from 'react-router-dom';
import { ArrowRight, Server, Shield, Activity, Lock, Zap, CheckCircle } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const Home = () => {
  return (
    <>
      <SEOHead page="home" />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-dark-950">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-brand-purple/20 rounded-full blur-[120px] animate-blob"></div>
          <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-brand-cyan/10 rounded-full blur-[120px]"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 pt-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-brand-green shadow-[0_0_10px_#22c55e]"></span>
              <span className="text-sm font-medium text-gray-300">Selfnodes V2 is live</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-8 leading-tight tracking-tight animate-slide-up">
              Validator Hosting <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-brand-pink to-brand-purple">Reimagined</span>
            </h1>
            
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Secure, non-custodial, and scalable Web3 infrastructure. 
              Launch your Ethereum, Lukso, or Gnosis validator in minutes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Link 
                to="/migrate"
                className="px-8 py-4 bg-gradient-to-r from-brand-orange to-brand-purple hover:opacity-90 text-white rounded-xl font-bold transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-brand-purple/25"
              >
                Launch Node <ArrowRight size={20} />
              </Link>
              <Link 
                to="/monitoring"
                className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-bold transition-colors backdrop-blur-sm flex items-center justify-center gap-2"
              >
                Start Monitoring <Activity size={20} />
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 border-t border-white/10 pt-12 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div>
                <div className="text-3xl font-bold text-white mb-1 font-display">1,200+</div>
                <div className="text-sm text-gray-500 font-medium">Validators Active</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1 font-display">$120M+</div>
                <div className="text-sm text-gray-500 font-medium">Assets Staked</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1 font-display">99.9%</div>
                <div className="text-sm text-gray-500 font-medium">Uptime</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1 font-display">0%</div>
                <div className="text-sm text-gray-500 font-medium">Custody</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-dark-950 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to stake</h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              From solo stakers to institutions, we provide the tooling for reliable validator operations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-2xl bg-dark-900/50 border border-white/5 hover:border-brand-purple/50 transition-all duration-300 hover:-translate-y-2">
              <div className="w-14 h-14 rounded-xl bg-brand-purple/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Activity size={32} className="text-brand-purple" />
              </div>
              <h3 className="text-xl font-bold mb-4">Smart Monitoring</h3>
              <p className="text-gray-400 leading-relaxed">
                Real-time alerts via Telegram. Know instantly if your validator misses an attestation or goes offline.
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-dark-900/50 border border-white/5 hover:border-brand-cyan/50 transition-all duration-300 hover:-translate-y-2">
              <div className="w-14 h-14 rounded-xl bg-brand-cyan/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Server size={32} className="text-brand-cyan" />
              </div>
              <h3 className="text-xl font-bold mb-4">Managed Hosting</h3>
              <p className="text-gray-400 leading-relaxed">
                Run your own validator without the hardware headache. We handle updates, security, and backups.
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-dark-900/50 border border-white/5 hover:border-brand-orange/50 transition-all duration-300 hover:-translate-y-2">
              <div className="w-14 h-14 rounded-xl bg-brand-orange/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield size={32} className="text-brand-orange" />
              </div>
              <h3 className="text-xl font-bold mb-4">Non-Custodial</h3>
              <p className="text-gray-400 leading-relaxed">
                You keep your withdrawal keys. We only run the infrastructure. Your assets remain 100% yours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust / Security Section */}
      <section className="py-24 bg-dark-900 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-purple/50 to-transparent"></div>
        
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block px-4 py-1 rounded-full bg-brand-cyan/10 text-brand-cyan text-sm font-bold mb-6">
                Swiss Made Infrastructure 🇨🇭
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Security is not an option. <br/> It's our foundation.
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                Hosted in Tier 4 datacenters in Switzerland, protected by Swiss privacy laws and enterprise-grade hardware.
              </p>
              
              <div className="space-y-4">
                {[
                  'Full GDPR Compliance',
                  '24/7 Physical Security & Biometrics',
                  'DDoS Protection & Redundant Power',
                  'Enterprise NVMe Storage'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                      <CheckCircle size={14} className="text-green-500" />
                    </div>
                    <span className="text-white font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-brand-cyan/20 blur-[100px] rounded-full"></div>
              <div className="relative bg-dark-950 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-xs text-gray-500 font-mono">validator_logs.txt</div>
                </div>
                <div className="font-mono text-sm space-y-2">
                  <div className="text-gray-500"># System Status Check</div>
                  <div className="flex gap-2">
                    <span className="text-brand-purple">➜</span>
                    <span className="text-white">Checking Consensus Layer...</span>
                    <span className="text-green-500">OK</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-brand-purple">➜</span>
                    <span className="text-white">Checking Execution Layer...</span>
                    <span className="text-green-500">OK</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-brand-purple">➜</span>
                    <span className="text-white">Validating Keys...</span>
                    <span className="text-green-500">Verified</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-brand-purple">➜</span>
                    <span className="text-white">Uptime Status...</span>
                    <span className="text-brand-cyan">99.99%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950 to-brand-purple/20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to launch?</h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Join hundreds of validators securing the future of Web3 with Selfnodes.
          </p>
          <Link 
            to="/migrate"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-dark-950 hover:bg-gray-100 rounded-xl font-bold text-lg transition-colors shadow-xl shadow-white/10"
          >
            Start Staking Now <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
