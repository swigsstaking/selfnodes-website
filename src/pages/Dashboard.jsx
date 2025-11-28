import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Activity, 
  Server, 
  DollarSign, 
  Clock, 
  AlertCircle, 
  ChevronRight, 
  ChevronLeft,
  Settings, 
  Send, 
  CheckCircle,
  Trash2,
  X,
  Bell,
  AlertTriangle,
  LogIn
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { useAuth } from '../context/AuthContext';

// Network ticker mapping
const NETWORK_TICKERS = {
  ethereum: 'ETH',
  lukso: 'LYX',
  gnosis: 'GNO'
};

// Reusable Modal Component
const Modal = ({ show, onClose, title, children, icon: Icon, iconColor = 'text-brand-cyan', iconBg = 'bg-brand-cyan/20' }) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="glass w-full max-w-md rounded-2xl p-6 border border-white/10 shadow-2xl animate-fade-in">
        <div className="flex items-start gap-4 mb-6">
          {Icon && (
            <div className={`w-12 h-12 ${iconBg} ${iconColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
              <Icon size={24} />
            </div>
          )}
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-bold text-white">{title}</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { isAuthenticated } = useAuth();
  
  // Telegram Connection State
  const [isTelegramConnected, setIsTelegramConnected] = useState(false);
  const [telegramInput, setTelegramInput] = useState('');
  const [connectedTelegramId, setConnectedTelegramId] = useState('');

  // Settings State
  const [showSettings, setShowSettings] = useState(false);
  
  // Confirmation Modal State
  const [confirmModal, setConfirmModal] = useState({ show: false, id: null, name: '' });
  
  // Notification Modal State
  const [notifModal, setNotifModal] = useState({ show: false, type: 'success', title: '', message: '' });
  
  const showNotification = (type, title, message) => {
    setNotifModal({ show: true, type, title, message });
  };

  // Real Data State
  const [validators, setValidators] = useState([]);
  const [stats, setStats] = useState([
    { label: 'Total Staked', value: '0 ETH', icon: Server, color: 'text-brand-purple', bg: 'bg-brand-purple/10' },
    { label: 'Total Rewards', value: '0 ETH', icon: DollarSign, color: 'text-green-400', bg: 'bg-green-500/10' },
    { label: 'Avg. Effectiveness', value: '0%', icon: Activity, color: 'text-brand-cyan', bg: 'bg-brand-cyan/10' },
    { label: 'Validator Count', value: '0', icon: Server, color: 'text-brand-orange', bg: 'bg-brand-orange/10' },
  ]);
  const [loading, setLoading] = useState(true);
  
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const VALIDATORS_PER_PAGE = 25;
  
  const paginatedValidators = useMemo(() => {
    const startIndex = (currentPage - 1) * VALIDATORS_PER_PAGE;
    return validators.slice(startIndex, startIndex + VALIDATORS_PER_PAGE);
  }, [validators, currentPage]);
  
  const totalPages = Math.ceil(validators.length / VALIDATORS_PER_PAGE);

  // Fetch Data Helper
  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token'); 
      if (!token) return;

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/nodes/dashboard`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.status === 401) {
         console.error("Unauthorized access to dashboard");
         return;
      }

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

        // Check Telegram status
        if (data.data.user && data.data.user.telegramUserId) {
            setIsTelegramConnected(true);
            setConnectedTelegramId(data.data.user.telegramUserId);
            setNotificationsEnabled(true);
        } else {
            setIsTelegramConnected(false);
            setNotificationsEnabled(false);
        }
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
  }, []);

  const handleConnectTelegram = async () => {
    if (!telegramInput) return;
    
    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/nodes/telegram/connect`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify({ telegramId: telegramInput })
        });
        const data = await res.json();
        if(data.success) {
            setIsTelegramConnected(true);
            setConnectedTelegramId(telegramInput);
            setNotificationsEnabled(true);
            setTelegramInput('');
            showNotification('success', 'Connected', 'Telegram connected successfully. You will now receive alerts.');
        } else {
            showNotification('error', 'Connection Failed', data.message || 'Failed to connect Telegram.');
        }
    } catch(e) { 
        console.error(e);
        showNotification('error', 'Connection Error', 'Unable to connect to the server. Please try again.');
    }
  };

  const handleDisconnectTelegram = async () => {
      try {
        const token = localStorage.getItem('token');
        await fetch(`${import.meta.env.VITE_API_URL}/api/nodes/telegram/connect`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify({ telegramId: null }) // Send null to disconnect
        });
        setIsTelegramConnected(false);
        setConnectedTelegramId('');
        setNotificationsEnabled(false);
        setTelegramInput('');
      } catch(e) { console.error(e); }
  };

  const handleTestAlert = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/nodes/telegram/test`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        }
      });
      const data = await res.json();
      if (data.success) {
        showNotification('success', 'Test Alert Sent', 'Check your Telegram for the test notification.');
      } else {
        showNotification('error', 'Alert Failed', data.message || 'Failed to send test alert.');
      }
    } catch (e) {
      console.error(e);
      showNotification('error', 'Connection Error', 'Unable to connect to the server.');
    }
  };

  const handleDeleteClick = (node) => {
    setConfirmModal({ show: true, id: node._id, name: node.name });
  };

  const [cancelModal, setCancelModal] = useState({ show: false, id: null, name: '' });

  const handleCancelService = (node) => {
    setCancelModal({ show: true, id: node._id, name: node.name });
  };

  const confirmCancelService = async () => {
    if (!cancelModal.id) return;
    
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/nodes/validators/${cancelModal.id}/cancel`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ reason: 'User requested cancellation from dashboard' })
      });
      
      const data = await res.json();
      if (res.ok && data.success) {
        showNotification('success', 'Cancellation Requested', 'Your cancellation request has been submitted. Our team will process it shortly.');
        fetchData(); // Reload list
      } else {
        showNotification('error', 'Cancellation Failed', data.message || 'Failed to request cancellation');
      }
    } catch(e) { 
      console.error(e);
      showNotification('error', 'Connection Error', 'Unable to connect to the server.');
    }
    
    setCancelModal({ show: false, id: null, name: '' });
  };

  const confirmDelete = async () => {
     if (!confirmModal.id) return;
     
     try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/nodes/validators/${confirmModal.id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if(res.ok) {
            fetchData(); // Reload list
        } else {
            console.error('Failed to delete validator');
        }
     } catch(e) { console.error(e); }
     
     setConfirmModal({ show: false, id: null, name: '' });
  };

  // Login required screen
  if (!isAuthenticated) {
    return (
      <>
        <SEOHead page="monitoring" />
        <div className="relative min-h-screen pt-24 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-dark-950 -z-10">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-purple/5 rounded-full blur-[120px]"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-lg mx-auto text-center animate-fade-in">
              <div className="w-20 h-20 bg-brand-purple/20 rounded-2xl flex items-center justify-center mx-auto mb-8">
                <LogIn size={40} className="text-brand-purple" />
              </div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                Login Required
              </h1>
              <p className="text-lg text-gray-400 mb-8">
                You need to be logged in to access your validator dashboard.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/login"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-brand-purple to-brand-pink text-white rounded-xl font-bold hover:opacity-90 transition-all"
                >
                  <LogIn size={20} /> Sign In
                </Link>
                <Link 
                  to="/register"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-dark-800 border border-white/10 text-white rounded-xl font-bold hover:border-brand-purple/50 transition-all"
                >
                  Create Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

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
            <button 
                onClick={() => setShowSettings(true)}
                className="px-6 py-2 bg-dark-800 hover:bg-dark-700 border border-white/10 rounded-lg text-white font-medium transition-colors flex items-center gap-2"
            >
              <Settings size={18} /> Settings
            </button>
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
                        <th className="p-4 text-sm font-medium text-gray-400">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {paginatedValidators.map((node, i) => (
                        <tr key={i} className="hover:bg-white/5 transition-colors group">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                                node.network === 'lukso' ? 'bg-gradient-to-br from-pink-500 to-purple-600' :
                                node.network === 'gnosis' ? 'bg-gradient-to-br from-green-500 to-teal-600' :
                                'bg-gradient-to-br from-brand-orange to-brand-purple'
                              }`}>
                                {node.name.substring(0, 2)}
                              </div>
                              <div>
                                <div className="font-bold text-white">{node.name}</div>
                                <div className="text-xs text-gray-500 font-mono">
                                  {node.id} • <span className="text-gray-400 capitalize">{node.network || 'ethereum'}</span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            {(() => {
                              const status = node.status.toLowerCase();
                              let colorClass = 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20';
                              let dotClass = 'bg-yellow-400 animate-pulse';
                              let displayStatus = node.status.replace('_', ' ');
                              
                              if (status === 'pending') {
                                colorClass = 'bg-blue-500/10 text-blue-400 border border-blue-500/20';
                                dotClass = 'bg-blue-400 animate-pulse';
                                displayStatus = 'Awaiting Activation';
                              } else if (status.includes('offline')) {
                                colorClass = 'bg-red-500/10 text-red-400 border border-red-500/20';
                                dotClass = 'bg-red-400 animate-pulse';
                              } else if (status.includes('active') && (status.includes('online') || !status.includes('offline'))) {
                                colorClass = 'bg-green-500/10 text-green-400 border border-green-500/20';
                                dotClass = 'bg-green-400';
                              } else if (status.includes('exited')) {
                                colorClass = 'bg-orange-500/10 text-orange-400 border border-orange-500/20';
                                dotClass = 'bg-orange-400';
                              }
                              
                              return (
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium capitalize ${colorClass}`}>
                                  <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`}></span>
                                  {displayStatus}
                                </span>
                              );
                            })()}
                          </td>
                          <td className="p-4 text-white font-mono">
                            {typeof node.effectiveness === 'number' 
                              ? `${(node.effectiveness > 1 ? node.effectiveness : node.effectiveness * 100).toFixed(1)}%` 
                              : node.effectiveness}
                          </td>
                          <td className="p-4 text-white font-mono">
                            {typeof node.rewards === 'object' 
                              ? `${Number(node.rewards.total || 0).toFixed(4)} ${NETWORK_TICKERS[node.network] || 'ETH'}` 
                              : node.rewards}
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              {/* Service type badge */}
                              {node.serviceType === 'managed' ? (
                                <span className="px-2 py-0.5 bg-brand-purple/20 text-brand-purple text-xs rounded-full font-medium">
                                  Selfnodes
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 bg-gray-500/20 text-gray-400 text-xs rounded-full font-medium">
                                  Monitoring
                                </span>
                              )}
                              
                              {/* Actions based on service type */}
                              {node.serviceType === 'managed' ? (
                                node.cancellationRequested ? (
                                  <span className="text-xs text-orange-400">Cancellation pending</span>
                                ) : (
                                  <button 
                                    onClick={() => handleCancelService(node)}
                                    className="px-2 py-1 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors"
                                    title="Cancel Selfnodes Service"
                                  >
                                    Cancel Service
                                  </button>
                                )
                              ) : (
                                <button 
                                  onClick={() => handleDeleteClick(node)}
                                  className="p-1 text-gray-500 hover:text-red-400 transition-colors"
                                  title="Remove from monitoring"
                                >
                                  <Trash2 size={16} />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between p-4 border-t border-white/5">
                    <div className="text-sm text-gray-400">
                      Showing {((currentPage - 1) * VALIDATORS_PER_PAGE) + 1} - {Math.min(currentPage * VALIDATORS_PER_PAGE, validators.length)} of {validators.length} validators
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg bg-dark-800 border border-white/10 text-gray-400 hover:text-white hover:border-brand-purple/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      
                      <div className="flex items-center gap-1">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }
                          
                          return (
                            <button
                              key={pageNum}
                              onClick={() => setCurrentPage(pageNum)}
                              className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${
                                currentPage === pageNum
                                  ? 'bg-brand-purple text-white'
                                  : 'bg-dark-800 border border-white/10 text-gray-400 hover:text-white hover:border-brand-purple/50'
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        })}
                      </div>
                      
                      <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg bg-dark-800 border border-white/10 text-gray-400 hover:text-white hover:border-brand-purple/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                )}
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
                       {/* QR Code */}
                       <div className="flex justify-center mb-4">
                         <a href="https://t.me/selfnodeBot?start=selfnodes" target="_blank" rel="noopener noreferrer">
                           <img 
                             src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://t.me/selfnodeBot?start=selfnodes&format=png&qzone=2`}
                             alt="Scan to open Telegram Bot"
                             className="rounded-xl bg-white p-2"
                           />
                         </a>
                       </div>
                       
                       <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-xs text-blue-300 leading-relaxed">
                          <strong className="block mb-1">Instructions:</strong>
                          1. Scan QR or open <a href="https://t.me/selfnodeBot?start=selfnodes" target="_blank" className="underline hover:text-white">@selfnodeBot</a> on Telegram.<br/>
                          2. Click "Start".<br/>
                          3. Copy your User ID (the bot will show it).<br/>
                          4. Paste it below.
                       </div>
                       
                       <div className="flex gap-2">
                           <input 
                             type="text" 
                             value={telegramInput}
                             onChange={(e) => setTelegramInput(e.target.value)}
                             placeholder="Telegram User ID"
                             className="flex-1 bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-brand-cyan outline-none"
                           />
                           <button 
                              onClick={handleConnectTelegram}
                              className="px-4 py-2 bg-brand-cyan hover:bg-brand-cyan/90 text-dark-950 font-bold rounded-lg transition-colors"
                           >
                             Connect
                           </button>
                       </div>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                       <div className="inline-flex items-center gap-2 text-green-400 font-bold mb-2">
                         <CheckCircle size={20} /> Connected
                       </div>
                       <p className="text-sm text-gray-400 mb-4">Linked to ID: {connectedTelegramId}</p>
                       
                       <button 
                          onClick={handleTestAlert}
                          className="w-full px-4 py-2 bg-brand-purple hover:bg-brand-purple/90 text-white font-medium rounded-lg transition-colors mb-3 flex items-center justify-center gap-2"
                       >
                         <Bell size={16} /> Send Test Alert
                       </button>
                       
                       <button onClick={handleDisconnectTelegram} className="text-xs text-red-400 hover:text-red-300 underline">Disconnect</button>
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
                 </div>
              </div>

            </div>
          </div>
        </div>

        {/* Settings Modal */}
        {showSettings && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                <div className="glass w-full max-w-md rounded-2xl p-6 border border-white/10 shadow-2xl animate-fade-in">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-white">Settings</h2>
                        <button onClick={() => setShowSettings(false)} className="text-gray-400 hover:text-white">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="space-y-6">
                        {/* Notifications Toggle */}
                        <div>
                             <label className="block text-sm font-medium text-gray-400 mb-2">Notifications</label>
                             <div className="flex items-center justify-between p-4 bg-dark-900 rounded-lg border border-white/5">
                                <div className="flex items-center gap-3">
                                    <Send size={18} className="text-brand-cyan" />
                                    <span className="text-white text-sm">Telegram Alerts</span>
                                </div>
                                <div 
                                    className={`relative inline-block w-10 h-6 transition-colors duration-200 ease-in-out rounded-full cursor-pointer ${notificationsEnabled ? 'bg-green-500' : 'bg-dark-700 border border-white/10'}`}
                                    onClick={() => notificationsEnabled && handleDisconnectTelegram()}
                                >
                                    <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full shadow transform transition-transform duration-200 ease-in-out ${notificationsEnabled ? 'translate-x-4' : 'translate-x-0'}`}></span>
                                </div>
                             </div>
                             <p className="text-xs text-gray-500 mt-2">
                                Enabled by connecting the bot. Disconnect to disable.
                             </p>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/5 flex justify-end">
                        <button 
                            onClick={() => setShowSettings(false)}
                            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        )}

        {/* Delete Confirmation Modal */}
        <Modal
          show={confirmModal.show}
          onClose={() => setConfirmModal({ show: false, id: null, name: '' })}
          title="Remove Validator"
          icon={Trash2}
          iconColor="text-red-400"
          iconBg="bg-red-500/20"
        >
          <p className="text-gray-400 mb-6 ml-16">
            Are you sure you want to stop monitoring <span className="text-white font-semibold">{confirmModal.name}</span>? 
            This will remove it from your dashboard.
          </p>
          <div className="flex justify-end gap-3">
            <button 
              onClick={() => setConfirmModal({ show: false, id: null, name: '' })}
              className="px-4 py-2 bg-dark-800 hover:bg-dark-700 border border-white/10 text-white rounded-lg transition-colors text-sm font-medium"
            >
              Cancel
            </button>
            <button 
              onClick={confirmDelete}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors text-sm font-medium"
            >
              Remove Validator
            </button>
          </div>
        </Modal>

        {/* Cancel Service Modal */}
        <Modal
          show={cancelModal.show}
          onClose={() => setCancelModal({ show: false, id: null, name: '' })}
          title="Cancel Selfnodes Service"
          icon={AlertTriangle}
          iconColor="text-orange-400"
          iconBg="bg-orange-500/20"
        >
          <div className="ml-16">
            <p className="text-gray-400 mb-4">
              Are you sure you want to cancel the Selfnodes hosting service for <span className="text-white font-semibold">{cancelModal.name}</span>?
            </p>
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3 mb-6">
              <p className="text-orange-400 text-sm">
                <strong>Important:</strong> Cancelling will stop your validator hosting. Make sure to withdraw your funds and backup your keys before proceeding.
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button 
              onClick={() => setCancelModal({ show: false, id: null, name: '' })}
              className="px-4 py-2 bg-dark-800 hover:bg-dark-700 border border-white/10 text-white rounded-lg transition-colors text-sm font-medium"
            >
              Keep Service
            </button>
            <button 
              onClick={confirmCancelService}
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors text-sm font-medium"
            >
              Request Cancellation
            </button>
          </div>
        </Modal>

        {/* Notification Modal */}
        <Modal
          show={notifModal.show}
          onClose={() => setNotifModal({ ...notifModal, show: false })}
          title={notifModal.title}
          icon={notifModal.type === 'success' ? CheckCircle : AlertTriangle}
          iconColor={notifModal.type === 'success' ? 'text-green-400' : 'text-red-400'}
          iconBg={notifModal.type === 'success' ? 'bg-green-500/20' : 'bg-red-500/20'}
        >
          <p className="text-gray-400 mb-6 ml-16">{notifModal.message}</p>
          <div className="flex justify-end">
            <button 
              onClick={() => setNotifModal({ ...notifModal, show: false })}
              className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                notifModal.type === 'success' 
                  ? 'bg-green-500 hover:bg-green-600 text-white' 
                  : 'bg-dark-800 hover:bg-dark-700 border border-white/10 text-white'
              }`}
            >
              {notifModal.type === 'success' ? 'Done' : 'Close'}
            </button>
          </div>
        </Modal>

      </div>
    </>
  );
};

export default Dashboard;
