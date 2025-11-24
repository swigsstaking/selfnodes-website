import { useState, useEffect } from 'react';
import { Activity, Bell, Smartphone, CheckCircle, AlertTriangle, Plus, X, ChevronDown, Server } from 'lucide-react';
import SEOHead from '../components/SEOHead';

// Mock data for blockchains (replacing CMS_APR_Blockchains)
const BLOCKCHAINS = [
  { name: 'Ethereum', logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png', color: 'bg-indigo-500' },
  { name: 'Gnosis', logo: 'https://cryptologos.cc/logos/gnosis-gno-logo.png', color: 'bg-green-600' },
  { name: 'Lukso', logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5625.png', color: 'bg-pink-500' },
];

const Monitoring = () => {
  const [selectedChain, setSelectedChain] = useState(BLOCKCHAINS[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [validatorInput, setValidatorInput] = useState('');
  const [validators, setValidators] = useState([]); // Local state for now
  const [notification, setNotification] = useState(null);
  const [stats, setStats] = useState({ monitored: 1245, alerts: 34 }); // Mock global stats

  // Helper to validate input
  const isValidValidatorEntry = (entry) => {
    return /^0x[a-fA-F0-9]{40,98}$/.test(entry) || /^\d+$/.test(entry);
  };

  const handleAddValidator = () => {
    const rawEntries = validatorInput.split(',').map(x => x.trim()).filter(x => x !== "");
    
    if (rawEntries.length === 0) return;

    const invalid = rawEntries.filter(x => !isValidValidatorEntry(x));
    
    if (invalid.length > 0) {
      setNotification({ type: 'error', message: `Invalid format: ${invalid.join(", ")}` });
      return;
    }

    // Mock adding validators
    const newValidators = rawEntries.map(id => ({
      id,
      chain: selectedChain.name,
      status: 'syncing', // Initial status
      addedAt: new Date().toISOString()
    }));

    setValidators([...validators, ...newValidators]);
    setValidatorInput('');
    setNotification({ type: 'success', message: `✅ ${rawEntries.length} validator(s) added successfully.` });
    
    // Clear notification after 3s
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <>
      <SEOHead page="monitoring" />
      
      <div className="relative min-h-screen pt-24 pb-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-dark-950 -z-10">
           <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-purple/10 rounded-full blur-[120px]"></div>
           <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[100px]"></div>
        </div>
        
        {/* Hero / Input Section */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-purple/10 text-brand-purple rounded-full text-sm font-bold mb-6 border border-brand-purple/20 backdrop-blur-sm">
              <Activity size={16} /> Live Beta
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight text-white">
              Validator Monitoring
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Receive real-time alerts if your validator goes offline. Don’t lose a block — ever.
            </p>

            {/* Main Card */}
            <div className="glass rounded-2xl p-6 md:p-8 shadow-xl max-w-2xl mx-auto text-left relative z-10">
              
              {/* Notification Toast */}
              {notification && (
                <div className={`mb-4 p-4 rounded-lg text-sm font-bold flex items-center gap-2 animate-fade-in ${notification.type === 'error' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-green-500/20 text-green-400 border border-green-500/30'}`}>
                  {notification.type === 'error' ? <AlertTriangle size={18} /> : <CheckCircle size={18} />}
                  {notification.message}
                </div>
              )}

              <div className="flex flex-col md:flex-row gap-4">
                {/* Blockchain Selector */}
                <div className="relative">
                  <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full md:w-48 h-[56px] bg-dark-900/50 border border-white/10 rounded-xl px-4 flex items-center justify-between hover:border-brand-purple/50 transition-colors text-white"
                  >
                    <div className="flex items-center gap-3">
                      <img src={selectedChain.logo} alt={selectedChain.name} className="w-6 h-6 rounded-full" />
                      <span className="font-bold">{selectedChain.name}</span>
                    </div>
                    <ChevronDown size={16} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 w-full mt-2 bg-dark-900 border border-white/10 rounded-xl shadow-xl overflow-hidden z-50">
                      {BLOCKCHAINS.map(chain => (
                        <button
                          key={chain.name}
                          onClick={() => { setSelectedChain(chain); setIsDropdownOpen(false); }}
                          className="w-full px-4 py-3 flex items-center gap-3 hover:bg-white/5 transition-colors text-left text-white"
                        >
                          <img src={chain.logo} alt={chain.name} className="w-6 h-6 rounded-full" />
                          <span className="font-medium">{chain.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Input Field */}
                <div className="flex-grow relative">
                  <input
                    type="text"
                    value={validatorInput}
                    onChange={(e) => setValidatorInput(e.target.value)}
                    placeholder="Index (1234) or Pubkey (0x123...)"
                    className="w-full h-[56px] bg-dark-900/50 border border-white/10 rounded-xl px-4 focus:outline-none focus:border-brand-purple/50 transition-colors placeholder-gray-500 font-mono text-sm text-white"
                  />
                </div>

                {/* Add Button */}
                <button 
                  onClick={handleAddValidator}
                  className="h-[56px] px-6 bg-brand-purple hover:bg-brand-purple/80 text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-brand-purple/20"
                >
                  <Plus size={20} /> <span className="md:hidden">Add</span>
                </button>
              </div>
              
              <p className="text-xs text-gray-500 mt-3 ml-1">
                *To add multiple indexes, separate them with commas: 1234, 5678, 9012
              </p>
            </div>

            {/* Global Stats */}
            <div className="mt-8 flex items-center justify-center gap-6 text-gray-400 text-sm">
               <div className="flex items-center gap-2">
                 <Server size={16} className="text-brand-cyan" />
                 <span>{stats.monitored} validators monitored</span>
               </div>
               <div className="flex items-center gap-2">
                 <Bell size={16} className="text-brand-orange" />
                 <span>{stats.alerts} alerts sent</span>
               </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="border-t border-white/5 bg-dark-900/30 py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="p-6 rounded-2xl bg-dark-900/40 border border-white/5 hover:border-brand-purple/30 transition-colors">
                <div className="w-12 h-12 bg-brand-purple/10 rounded-lg flex items-center justify-center mb-4 text-brand-purple">
                  <Bell size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Instant Alerts</h3>
                <p className="text-gray-400 text-sm">Receive notifications within seconds of an event occurring on-chain via Telegram.</p>
              </div>
              <div className="p-6 rounded-2xl bg-dark-900/40 border border-white/5 hover:border-brand-cyan/30 transition-colors">
                <div className="w-12 h-12 bg-brand-cyan/10 rounded-lg flex items-center justify-center mb-4 text-brand-cyan">
                  <CheckCircle size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Performance Tracking</h3>
                <p className="text-gray-400 text-sm">Track your validator effectiveness, missed attestations and rewards over time.</p>
              </div>
              <div className="p-6 rounded-2xl bg-dark-900/40 border border-white/5 hover:border-brand-orange/30 transition-colors">
                <div className="w-12 h-12 bg-brand-orange/10 rounded-lg flex items-center justify-center mb-4 text-brand-orange">
                  <Smartphone size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Mobile First</h3>
                <p className="text-gray-400 text-sm">Manage everything from our Telegram Bot. No complex dashboard needed.</p>
              </div>
            </div>
          </div>
        </div>

        {/* User's Monitored Nodes List (Mock) */}
        {validators.length > 0 && (
          <div className="container mx-auto px-4 py-12">
            <h2 className="text-2xl font-bold mb-6 text-white font-display">Your Monitored Validators</h2>
            <div className="grid gap-4 max-w-3xl mx-auto">
              {validators.map((v, i) => (
                <div key={i} className="glass p-4 rounded-xl flex items-center justify-between animate-slide-up">
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full ${v.status === 'active' ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'}`}></div>
                    <div>
                      <div className="font-bold font-mono text-lg text-white">{v.id}</div>
                      <div className="text-xs text-gray-400">{v.chain} • Added {new Date(v.addedAt).toLocaleTimeString()}</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      const newV = [...validators];
                      newV.splice(i, 1);
                      setValidators(newV);
                    }}
                    className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Monitoring;
