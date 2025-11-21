import { Activity, Bell, Smartphone, CheckCircle } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const Monitoring = () => {
  return (
    <>
      <SEOHead page="monitoring" />
      
      <div className="bg-primary-900 text-white min-h-screen pt-20">
        {/* Hero */}
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary-500/10 text-secondary-400 rounded-full text-sm font-bold mb-6">
                <Activity size={16} /> Live Beta
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Never miss a missed attestation again
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Get instant alerts via Telegram if your validator goes offline, misses an attestation, or gets slashed. Simple setup, peace of mind.
              </p>
              <div className="flex gap-4">
                <a 
                  href="https://t.me/SelfNodeBot" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-secondary-500 hover:bg-secondary-600 text-white rounded-lg font-bold flex items-center gap-2 transition-colors"
                >
                  Start Bot <Smartphone size={20} />
                </a>
              </div>
            </div>
            <div className="flex-1">
              <div className="bg-primary-800 p-8 rounded-2xl border border-primary-700 shadow-2xl">
                {/* Mockup Interface */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-primary-900 rounded-lg border border-primary-700">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <div>
                        <div className="font-bold text-sm">Validator #12345</div>
                        <div className="text-xs text-gray-400">Ethereum Mainnet</div>
                      </div>
                    </div>
                    <span className="text-green-400 text-sm font-bold">Active</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-primary-900 rounded-lg border border-red-500/30">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div>
                        <div className="font-bold text-sm">Validator #67890</div>
                        <div className="text-xs text-gray-400">Gnosis Chain</div>
                      </div>
                    </div>
                    <span className="text-red-400 text-sm font-bold">Missed Attestation</span>
                  </div>

                  <div className="p-4 bg-secondary-500/10 rounded-lg border border-secondary-500/20 text-sm text-gray-300">
                    <span className="text-secondary-400 font-bold">@SelfNodeBot:</span> ⚠️ Alert! Validator #67890 missed 2 attestations in a row. Check your node immediately.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-primary-800 py-20 mt-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16">Monitoring Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-700 rounded-full flex items-center justify-center mx-auto mb-6 text-secondary-400">
                  <Bell size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3">Instant Alerts</h3>
                <p className="text-gray-400">Receive notifications within seconds of an event occurring on-chain.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-700 rounded-full flex items-center justify-center mx-auto mb-6 text-secondary-400">
                  <CheckCircle size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3">Performance Tracking</h3>
                <p className="text-gray-400">Track your validator effectiveness and rewards over time.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-700 rounded-full flex items-center justify-center mx-auto mb-6 text-secondary-400">
                  <Smartphone size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3">Mobile First</h3>
                <p className="text-gray-400">Manage everything from Telegram. No complex dashboard needed.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Monitoring;
