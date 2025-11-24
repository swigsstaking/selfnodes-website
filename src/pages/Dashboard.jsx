import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Server, 
  DollarSign, 
  Clock, 
  AlertCircle, 
  ChevronRight, 
  Settings, 
  Send, 
  CheckCircle 
} from 'lucide-react';
import SEOHead from '../components/SEOHead';

const Dashboard = () => {
  // Telegram Connection State
  const [isTelegramConnected, setIsTelegramConnected] = useState(false);
  const [telegramCode, setTelegramCode] = useState('');

  // Real Data State
  const [validators, setValidators] = useState([]);
  const [stats, setStats] = useState([
    { label: 'Total Staked', value: '0 ETH', icon: Server, color: 'text-brand-purple', bg: 'bg-brand-purple/10' },
    { label: 'Total Rewards', value: '0 ETH', icon: DollarSign, color: 'text-green-400', bg: 'bg-green-500/10' },
    { label: 'Avg. Effectiveness', value: '0%', icon: Activity, color: 'text-brand-cyan', bg: 'bg-brand-cyan/10' },
    { label: 'Validator Count', value: '0', icon: Server, color: 'text-brand-orange', bg: 'bg-brand-orange/10' },
  ]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  // Add Validator State
  const [newValidatorInput, setNewValidatorInput] = useState('');
  const [addingValidator, setAddingValidator] = useState(false);

  // Fetch Data Helper
  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token'); 
      if (!token) return;

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/nodes/dashboard`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      
      if (data.success) {
        const s = data.data.stats;
        setValidators(data.data.validators);
        setStats([
          { label: 'Total Staked', value: `${s.totalStaked.toFixed(1)} ETH`, icon: Server, color: 'text-brand-purple', bg: 'bg-brand-purple/10' },
          { label: 'Total Rewards', value: `${s.totalRewards.toFixed(4)} ETH`, icon: DollarSign, color: 'text-green-400', bg: 'bg-green-500/10' },
          { label: 'Avg. Effectiveness', value: `${(s.avgEffectiveness * 100).toFixed(1)}%`, icon: Activity, color: 'text-brand-cyan', bg: 'bg-brand-cyan/10' },
          { label: 'Validator Count', value: s.validatorCount, icon: Server, color: 'text-brand-orange', bg: 'bg-brand-orange/10' },
        ]);
      }
    } catch (error) {
      console.error('Dashboard Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Initial Load
  useEffect(() => {
    fetchData();
    
    // Trigger Refresh logic... (omitted for brevity, kept same as before if needed or just call fetchData)
    const triggerRefresh = async () => {
       const token = localStorage.getItem('token');
       if(!token) return;
       setRefreshing(true);
       try {
         await fetch(`${import.meta.env.VITE_API_URL}/api/nodes/refresh`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` }
         });
         setTimeout(() => setRefreshing(false), 2000);
       } catch (e) { console.error(e); setRefreshing(false); }
    };
    triggerRefresh();
  }, []);

  const handleAddValidator = async () => {
    if (!newValidatorInput) return;
    
    setAddingValidator(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/nodes/validators`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ input: newValidatorInput, network: 'eth' })
      });
      
      const data = await response.json();
      if (data.success) {
        setNewValidatorInput('');
        // Refresh list immediately
        await fetchData();
        alert('Validator added successfully!');
      } else {
        alert(data.message || 'Failed to add validator');
      }
    } catch (error) {
      alert('Error connecting to server');
    } finally {
      setAddingValidator(false);
    }
  };

  const handleConnectTelegram = () => {
    // Mock connection logic
    setTelegramCode('123-456'); // Mock OTP code
    // In production: Call backend to get a unique start code for the bot
  };

  return (
    <>
      <SEOHead page="monitoring" />
      
      <div className="relative min-h-screen pt-24 pb-20 overflow-hidden">
         {/* Background Effects */}
         <div className="absolute inset-0 bg-dark-950 -z-10">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-purple/5 rounded-full blur-[120px]"></div>
        </div>

        <div className="w-full max-w-[1920px] mx-auto px-6 md:px-12 relative z-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">Dashboard</h1>
              <p className="text-gray-400">Welcome back, User. Here is your infrastructure overview.</p>
            </div>
            <button className="px-6 py-2 bg-dark-800 hover:bg-dark-700 border border-white/10 rounded-lg text-white font-medium transition-colors flex items-center gap-2">
              <Settings size={18} /> Settings
            </button>
          </div>

          {/* Add Validator Section (Stretched & Centered Content) */}
          <div className="glass p-6 rounded-2xl mb-8 border border-white/5 bg-dark-900/40">
            <div className="flex flex-col md:flex-row items-center gap-4 max-w-5xl mx-auto">
              <div className="flex-1 w-full flex flex-col md:flex-row gap-4">
                {/* Network Select */}
                <div className="relative min-w-[160px]">
                  <select className="w-full appearance-none bg-dark-950 border border-dark-700 text-white px-5 py-4 rounded-xl focus:outline-none focus:border-brand-purple transition-colors cursor-pointer font-medium text-lg">
                    <option value="eth">Ethereum</option>
                    <option value="gnosis">Gnosis</option>
                  </select>
                  <ChevronRight className="absolute right-5 top-1/2 -translate-y-1/2 rotate-90 text-gray-500 pointer-events-none" size={20} />
                </div>

                {/* Input */}
                <div className="flex-1 relative">
                  <input 
                    type="text" 
                    value={newValidatorInput}
                    onChange={(e) => setNewValidatorInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddValidator()}
                    placeholder="Index (1234) or Pubkey (0x123...)"
                    className="w-full bg-dark-950 border border-dark-700 text-white px-5 py-4 rounded-xl focus:outline-none focus:border-brand-purple transition-colors placeholder-gray-600 font-mono text-lg"
                  />
                  <div className="absolute -bottom-6 left-0 text-xs text-gray-500 hidden md:block pl-2">
                    *To add multiple indexes, separate them with commas: 1234, 5678
                  </div>
                </div>
              </div>

              <button 
                onClick={handleAddValidator}
                disabled={addingValidator || !newValidatorInput}
                className={`w-full md:w-auto bg-brand-purple hover:bg-brand-purple/90 text-white px-8 py-4 rounded-xl transition-all shadow-lg shadow-brand-purple/20 flex items-center justify-center min-w-[80px] ${
                  (addingValidator || !newValidatorInput) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {addingValidator ? (
                  <span className="text-sm font-medium animate-pulse">Adding...</span>
                ) : (
                  <span className="font-bold text-2xl leading-none mb-0.5">+</span>
                )}
              </button>
            </div>
          </div>

          {/* KPI Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, i) => (
              <div key={i} className="glass p-6 rounded-2xl hover:bg-white/5 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                    <stat.icon size={20} />
                  </div>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">30d</span>
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Node List */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Server size={20} className="text-brand-purple" /> Your Validators
              </h2>
              
              <div className="glass rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/5 bg-dark-900/50">
                        <th className="p-4 text-sm font-medium text-gray-400">Validator</th>
                        <th className="p-4 text-sm font-medium text-gray-400">Status</th>
                        <th className="p-4 text-sm font-medium text-gray-400">Effectiveness</th>
                        <th className="p-4 text-sm font-medium text-gray-400">Rewards</th>
                        <th className="p-4 text-sm font-medium text-gray-400"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {validators.map((node, i) => (
                        <tr key={i} className="hover:bg-white/5 transition-colors group">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-orange to-brand-purple flex items-center justify-center text-xs font-bold text-white">
                                {node.name.substring(0, 2)}
                              </div>
                              <div>
                                <div className="font-bold text-white">{node.name}</div>
                                <div className="text-xs text-gray-500 font-mono">{node.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium capitalize ${
                              node.status === 'active' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${node.status === 'active' ? 'bg-green-400' : 'bg-yellow-400 animate-pulse'}`}></span>
                              {node.status}
                            </span>
                          </td>
                          <td className="p-4 text-white font-mono">{node.effectiveness}</td>
                          <td className="p-4 text-white font-mono">{node.rewards}</td>
                          <td className="p-4 text-right">
                            <button className="p-2 text-gray-500 hover:text-white transition-colors">
                              <ChevronRight size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Telegram / Alerts Side Panel */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Send size={20} className="text-brand-cyan" /> Alert Settings
              </h2>
              
              <div className="glass p-6 rounded-2xl relative overflow-hidden">
                {/* Decorative bg */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/10 rounded-full blur-2xl -mr-10 -mt-10"></div>

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-brand-cyan/20 text-brand-cyan rounded-xl flex items-center justify-center">
                      <Send size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg">Telegram Bot</h3>
                      <p className="text-xs text-gray-400">Receive instant alerts on your mobile.</p>
                    </div>
                  </div>

                  {!isTelegramConnected ? (
                    <div className="space-y-4">
                       <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-xs text-blue-300 leading-relaxed">
                          <strong className="block mb-1">Instructions:</strong>
                          1. Open <a href="#" className="underline hover:text-white">@SelfNodesBot</a> on Telegram.<br/>
                          2. Click "Start".<br/>
                          3. Enter the code below to link your account.
                       </div>
                       
                       {telegramCode ? (
                         <div className="text-center py-4">
                            <div className="text-3xl font-mono font-bold text-white tracking-widest mb-2 animate-pulse">{telegramCode}</div>
                            <p className="text-xs text-gray-500">Waiting for connection...</p>
                         </div>
                       ) : (
                         <button 
                            onClick={handleConnectTelegram}
                            className="w-full py-3 bg-brand-cyan hover:bg-brand-cyan/90 text-dark-950 font-bold rounded-xl transition-colors shadow-lg shadow-brand-cyan/20"
                         >
                           Connect Telegram
                         </button>
                       )}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                       <div className="inline-flex items-center gap-2 text-green-400 font-bold mb-2">
                         <CheckCircle size={20} /> Connected
                       </div>
                       <p className="text-sm text-gray-400">Your account is linked to @User123</p>
                       <button onClick={() => setIsTelegramConnected(false)} className="text-xs text-red-400 hover:text-red-300 mt-4 underline">Disconnect</button>
                    </div>
                  )}
                </div>
              </div>

              {/* Recent Alerts */}
              <div className="glass p-6 rounded-2xl">
                 <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Recent Alerts</h3>
                 <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/5 border border-green-500/10">
                       <CheckCircle size={16} className="text-green-500 mt-0.5" />
                       <div>
                          <div className="text-xs font-bold text-green-400">Proposal Success</div>
                          <div className="text-xs text-gray-500">Validator-01 proposed a block.</div>
                          <div className="text-[10px] text-gray-600 mt-1">2 hours ago</div>
                       </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-dark-900/50 border border-white/5 opacity-50">
                       <AlertCircle size={16} className="text-gray-500 mt-0.5" />
                       <div>
                          <div className="text-xs font-bold text-gray-400">System Update</div>
                          <div className="text-xs text-gray-500">Node client updated to v2.0.</div>
                          <div className="text-[10px] text-gray-600 mt-1">Yesterday</div>
                       </div>
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

export default Dashboard;
