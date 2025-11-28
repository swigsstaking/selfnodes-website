import { useState } from 'react';
import { Check, ChevronRight, Download, Upload, CreditCard, Shield, AlertCircle, Server, ArrowRight, Info, Key, LogIn } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { useAuth } from '../context/AuthContext';

// Wagyu Key Gen direct download URLs (v1.12.0 - latest stable)
const KEYGEN_DOWNLOADS = {
  ethereum: {
    mac: 'https://github.com/stake-house/wagyu-key-gen/releases/download/v1.12.0/Wagyu.Key.Gen-1.12.0-1208ef8.dmg',
    macArm: 'https://github.com/stake-house/wagyu-key-gen/releases/download/v1.12.0/Wagyu.Key.Gen-1.12.0-1208ef8-arm64.dmg',
    windows: 'https://github.com/stake-house/wagyu-key-gen/releases/download/v1.12.0/Wagyu.Key.Gen.1.12.0-1208ef8.exe',
    linux: 'https://github.com/stake-house/wagyu-key-gen/releases/download/v1.12.0/Wagyu.Key.Gen-1.12.0-1208ef8.AppImage',
    releases: 'https://github.com/stake-house/wagyu-key-gen/releases'
  }
};

const CHAINS = [
  { 
    id: 'Ethereum', 
    name: 'Ethereum', 
    logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
    price: 50,
    ticker: 'USD',
    color: 'from-indigo-500 to-purple-600',
    depositUrl: 'https://launchpad.ethereum.org/en/overview',
    keygenDownloads: KEYGEN_DOWNLOADS.ethereum,
    network: 'ethereum' // Must match backend enum: 'ethereum', 'lukso', 'gnosis'
  }
  // Future chains (keep for later):
  // { id: 'Lukso', name: 'Lukso', logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5625.png', price: 0.1, ticker: 'USD', color: 'from-pink-500 to-purple-600', depositUrl: 'https://deposit.mainnet.lukso.network/en/overview', keygenDownloads: KEYGEN_DOWNLOADS.ethereum },
  // { id: 'Gnosis', name: 'Gnosis', logo: 'https://cryptologos.cc/logos/gnosis-gno-logo.png', price: 1, ticker: 'USD', color: 'from-green-500 to-teal-600', depositUrl: 'https://deposit.gnosischain.com/', keygenDownloads: KEYGEN_DOWNLOADS.ethereum }
];

const Migrate = () => {
  const { site, isAuthenticated } = useAuth();
  const [mode, setMode] = useState(null); // 'create' or 'migrate'
  const [currentStep, setCurrentStep] = useState(0); // 0 = Selection
  const [selectedChain, setSelectedChain] = useState(null);
  const [files, setFiles] = useState([]);
  const [keystorePassword, setKeystorePassword] = useState('');
  const [provisioning, setProvisioning] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  
  const detectOS = () => {
    const platform = navigator.platform.toLowerCase();
    const userAgent = navigator.userAgent.toLowerCase();
    
    if (platform.includes('mac')) {
      // Check for Apple Silicon - multiple detection methods
      // Method 1: Check if running on ARM via userAgent
      // Method 2: Check screen/GPU hints (M1/M2 Macs have specific characteristics)
      // Method 3: Use navigator.userAgentData if available
      const isAppleSilicon = 
        userAgent.includes('arm64') ||
        userAgent.includes('aarch64') ||
        // Safari on M1/M2 doesn't always report ARM, but we can check via GPU
        (typeof navigator.gpu !== 'undefined') ||
        // Most M1/M2 Macs are newer, check for macOS 11+ indicators
        /mac os x 1[1-9]|mac os x 2/.test(userAgent) ||
        // Check userAgentData if available (Chrome/Edge)
        navigator.userAgentData?.platform === 'macOS';
      
      // Default to ARM for newer Macs (post-2020)
      return isAppleSilicon ? 'macArm' : 'mac';
    }
    if (platform.includes('win')) return 'windows';
    if (platform.includes('linux')) return 'linux';
    return 'windows';
  };

  const getKeygenDownloadUrl = () => {
    if (!selectedChain?.keygenDownloads) return '#';
    const os = detectOS();
    return selectedChain.keygenDownloads[os] || selectedChain.keygenDownloads.releases;
  };

  const getOSLabel = () => {
    const os = detectOS();
    switch(os) {
      case 'mac': return 'macOS (Intel)';
      case 'macArm': return 'macOS (Apple Silicon)';
      case 'windows': return 'Windows';
      case 'linux': return 'Linux';
      default: return 'your OS';
    }
  };

  const handleFileUpload = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles([...files, ...newFiles]);
  };

  // Read file content helper
  const readFileContent = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
           const json = JSON.parse(e.target.result);
           resolve(json);
        } catch (err) {
           reject(err);
        }
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };

  const handlePayment = async () => {
    if (!keystorePassword || files.length === 0) {
      setPaymentError('Please provide keystore files and password');
      return;
    }
    if (!isAuthenticated) {
      setPaymentError('Please login first');
      return;
    }

    setProvisioning(true);
    setPaymentError('');
    try {
      // 1. Read all files and extract pubkeys
      const keystoresContent = await Promise.all(files.map(async (file) => {
        const content = await readFileContent(file);
        return {
          ...content,
          filename: file.name,
          pubkey: content.pubkey || null // Extract pubkey from keystore
        };
      }));
      
      // 2. Create order with Stripe checkout
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/nodes/create-checkout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          keystores: keystoresContent,
          password: keystorePassword,
          mode: mode,
          network: selectedChain?.network || 'ethereum',
          validatorCount: files.length,
          pricePerValidator: selectedChain?.price || 1,
          currency: selectedChain?.ticker?.toLowerCase() || 'chf',
          siteId: site?._id
        })
      });

      const data = await response.json();
      
      if (data.success && data.checkoutUrl) {
        // Redirect to Stripe Checkout
        window.location.href = data.checkoutUrl;
      } else {
        setPaymentError(data.message || 'Failed to create checkout session');
      }

    } catch (error) {
      console.error('Payment Error:', error);
      setPaymentError('Failed to initiate payment. Please try again.');
    } finally {
      setProvisioning(false);
    }
  };

  const steps = mode === 'create' 
    ? [
        { id: 1, title: 'Select Chain' },
        { id: 2, title: 'Generate Keys' },
        { id: 3, title: 'Upload' },
        { id: 4, title: 'Payment' }
      ]
    : [
        { id: 1, title: 'Select Chain' },
        { id: 2, title: 'Migration Info' },
        { id: 3, title: 'Upload' },
        { id: 4, title: 'Payment' }
      ];

  // Render login required screen
  const renderLoginRequired = () => (
    <div className="max-w-lg mx-auto animate-fade-in text-center">
      <div className="w-20 h-20 bg-brand-purple/20 rounded-2xl flex items-center justify-center mx-auto mb-8">
        <LogIn size={40} className="text-brand-purple" />
      </div>
      <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
        Login Required
      </h1>
      <p className="text-lg text-gray-400 mb-8">
        You need to be logged in to launch or migrate a validator node. Create an account or sign in to continue.
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
      <p className="text-sm text-gray-500 mt-8">
        Already have keystores? You'll be able to upload them after logging in.
      </p>
    </div>
  );

  const renderSelectionScreen = () => (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <h1 className="text-4xl md:text-5xl font-display font-bold text-center text-white mb-6">
        Launch your Validator
      </h1>
      <p className="text-xl text-gray-400 text-center mb-16">
        Choose how you want to start your staking journey with SelfNodes.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Option 1: Create New */}
        <button 
          onClick={() => { setMode('create'); setCurrentStep(1); }}
          className="group relative p-8 rounded-2xl bg-dark-900/50 border border-white/10 hover:border-brand-purple/50 text-left transition-all hover:-translate-y-2 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative z-10">
            <div className="w-16 h-16 bg-brand-purple/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-brand-purple">
              <Key size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Create New Validator</h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              I have 32 ETH or more and want to start new validator nodes from scratch. Each 32 ETH = 1 validator.
            </p>
            <span className="inline-flex items-center gap-2 text-brand-purple font-bold group-hover:gap-4 transition-all">
              Start Fresh <ArrowRight size={20} />
            </span>
          </div>
        </button>

        {/* Option 2: Migrate */}
        <button 
          onClick={() => { setMode('migrate'); setCurrentStep(1); }}
          className="group relative p-8 rounded-2xl bg-dark-900/50 border border-white/10 hover:border-brand-cyan/50 text-left transition-all hover:-translate-y-2 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative z-10">
            <div className="w-16 h-16 bg-brand-cyan/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-brand-cyan">
              <Server size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Migrate Existing Node</h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              I already have a validator running elsewhere (AWS, home, other provider) and want to move it to SelfNodes.
            </p>
            <span className="inline-flex items-center gap-2 text-brand-cyan font-bold group-hover:gap-4 transition-all">
              Migrate Now <ArrowRight size={20} />
            </span>
          </div>
        </button>
      </div>
    </div>
  );

  return (
    <>
      <SEOHead page="services" />
      
      <div className="relative min-h-screen pt-24 pb-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-dark-950 -z-20"></div>
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-brand-purple/10 to-transparent -z-10"></div>

        <div className="container mx-auto px-4 relative z-10">
          
          {!isAuthenticated ? (
            renderLoginRequired()
          ) : currentStep === 0 ? (
            renderSelectionScreen()
          ) : (
            <>
              {/* Progress Bar */}
              <div className="max-w-4xl mx-auto mb-12">
                <button 
                  onClick={() => { setCurrentStep(0); setMode(null); }}
                  className="mb-8 text-gray-500 hover:text-white flex items-center gap-2 transition-colors"
                >
                  <ArrowRight size={16} className="rotate-180" /> Back to selection
                </button>

                <div className="flex justify-between items-center relative">
                  <div className="absolute left-0 top-1/2 w-full h-1 bg-dark-800 -z-10 rounded-full"></div>
                  <div 
                    className="absolute left-0 top-1/2 h-1 bg-gradient-to-r from-brand-orange to-brand-purple -z-10 rounded-full transition-all duration-500"
                    style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                  ></div>

                  {steps.map((step) => (
                    <div key={step.id} className="flex flex-col items-center gap-2 bg-dark-950 px-2">
                      <div 
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all border-2 ${
                          step.id <= currentStep 
                            ? 'bg-dark-900 border-brand-purple text-white shadow-[0_0_10px_rgba(139,92,246,0.5)]' 
                            : 'bg-dark-900 border-dark-700 text-gray-600'
                        }`}
                      >
                        {step.id < currentStep ? <Check size={20} className="text-brand-purple" /> : step.id}
                      </div>
                      <span className={`text-sm font-medium hidden md:block ${step.id <= currentStep ? 'text-white' : 'text-gray-600'}`}>
                        {step.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Wizard Content */}
              <div className="max-w-3xl mx-auto glass rounded-2xl p-8 md:p-12 min-h-[500px] animate-slide-up">
                
                {/* STEP 1: Select Chain (Common) */}
                {currentStep === 1 && (
                  <div className="animate-fade-in">
                    <h2 className="text-3xl font-display font-bold mb-8 text-center text-white">Select your Blockchain</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                      {CHAINS.map(chain => (
                        <button
                          key={chain.id}
                          onClick={() => {
                            setSelectedChain(chain);
                            setCurrentStep(2);
                          }}
                          className="group relative p-6 rounded-xl border border-white/10 hover:border-white/30 bg-dark-900/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                        >
                          <div className={`absolute inset-0 bg-gradient-to-br ${chain.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                          <img src={chain.logo} alt={chain.name} className="w-16 h-16 mx-auto mb-6 rounded-full group-hover:scale-110 transition-transform duration-300 shadow-lg" />
                          <h3 className="text-xl font-bold mb-2 text-white">{chain.name}</h3>
                          <p className="text-gray-400 font-mono">{chain.price} {chain.ticker} <span className="text-xs text-gray-600">/ val</span></p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 2: Keygen (CREATE MODE) */}
                {currentStep === 2 && mode === 'create' && (
                  <div className="animate-fade-in">
                    <h2 className="text-3xl font-display font-bold mb-6 text-white text-center">Generate Keys & Deposit</h2>
                    
                    {/* Calculator Info */}
                    <div className="bg-gradient-to-r from-brand-purple/10 to-brand-cyan/10 border border-brand-purple/20 rounded-xl p-5 mb-8">
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                          <p className="text-sm text-gray-400 mb-1">Staking Amount</p>
                          <p className="text-white font-bold">32 ETH = 1 Validator</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">Want to run multiple validators?</p>
                          <p className="text-sm text-brand-cyan">64 ETH = 2 validators, 96 ETH = 3, etc.</p>
                        </div>
                      </div>
                    </div>

                    {/* Two columns layout */}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      
                      {/* Step A: Generate Keys */}
                      <div className="bg-dark-900/50 border border-white/10 rounded-xl p-6 hover:border-brand-purple/30 transition-colors">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-purple to-brand-pink flex items-center justify-center font-bold text-white shadow-lg shadow-brand-purple/30">1</div>
                          <h3 className="text-lg font-bold text-white">Generate Keys</h3>
                        </div>
                        
                        <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                          Generate your validator keys <strong className="text-white">offline</strong> on your own machine for maximum security.
                        </p>

                        <div className="space-y-2 text-sm text-gray-500 mb-5">
                          <p className="flex items-start gap-2"><span className="text-brand-purple">•</span> Download the Key Gen tool</p>
                          <p className="flex items-start gap-2"><span className="text-yellow-400">•</span> <strong className="text-yellow-400">Turn off WiFi</strong></p>
                          <p className="flex items-start gap-2"><span className="text-brand-purple">•</span> Run tool & create mnemonic</p>
                          <p className="flex items-start gap-2"><span className="text-green-400">•</span> <strong className="text-green-400">Save mnemonic securely!</strong></p>
                        </div>

                        <a 
                          href={getKeygenDownloadUrl()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-white text-dark-950 rounded-lg font-bold hover:bg-gray-100 transition-colors text-sm"
                        >
                          <Download size={18} /> Download for {getOSLabel()}
                        </a>
                        <a 
                          href={selectedChain?.keygenDownloads?.releases || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-center text-xs text-gray-500 hover:text-brand-purple mt-2 transition-colors"
                        >
                          Other versions →
                        </a>
                      </div>

                      {/* Step B: Make Deposit */}
                      <div className="bg-dark-900/50 border border-white/10 rounded-xl p-6 hover:border-brand-orange/30 transition-colors">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-orange to-brand-pink flex items-center justify-center font-bold text-white shadow-lg shadow-brand-orange/30">2</div>
                          <h3 className="text-lg font-bold text-white">Deposit ETH</h3>
                        </div>
                        
                        <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                          Use the official Launchpad to deposit <strong className="text-white">32 ETH per validator</strong>.
                        </p>

                        <div className="space-y-2 text-sm text-gray-500 mb-5">
                          <p className="flex items-start gap-2"><span className="text-brand-orange">•</span> Go to Official Launchpad</p>
                          <p className="flex items-start gap-2"><span className="text-brand-orange">•</span> Connect wallet (MetaMask, Ledger...)</p>
                          <p className="flex items-start gap-2"><span className="text-brand-orange">•</span> Upload <code className="bg-dark-800 px-1.5 py-0.5 rounded text-xs">deposit_data.json</code></p>
                          <p className="flex items-start gap-2"><span className="text-brand-orange">•</span> Confirm deposit transaction</p>
                        </div>

                        <a 
                          href={selectedChain?.depositUrl || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-brand-orange to-brand-pink text-white rounded-lg font-bold hover:opacity-90 transition-colors text-sm"
                        >
                          <CreditCard size={18} /> Official Launchpad
                        </a>
                      </div>
                    </div>

                    {/* Files generated info */}
                    <div className="bg-dark-800/50 border border-white/5 rounded-lg p-4 mb-6">
                      <p className="text-xs text-gray-500 mb-2">Files generated by the Key Gen tool:</p>
                      <div className="flex flex-wrap gap-2">
                        <code className="bg-dark-900 px-3 py-1.5 rounded text-sm text-brand-cyan border border-brand-cyan/20">deposit_data.json</code>
                        <code className="bg-dark-900 px-3 py-1.5 rounded text-sm text-brand-purple border border-brand-purple/20">keystore-m_*.json</code>
                      </div>
                    </div>

                    {/* Info box */}
                    <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 mb-6">
                      <p className="text-sm text-green-400 flex items-start gap-2">
                        <Check size={18} className="mt-0.5 shrink-0" />
                        <span>Once you have your <strong>keystore files</strong> and have made your <strong>ETH deposit</strong>, continue to upload your keystores.</span>
                      </p>
                    </div>

                    <div className="flex justify-end border-t border-white/5 pt-6">
                       <button 
                        onClick={() => setCurrentStep(3)}
                        className="px-8 py-3 bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 text-white rounded-lg font-bold flex items-center gap-2 transition-all shadow-lg hover:-translate-y-0.5"
                      >
                        I have my key files <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: Migration Info (MIGRATE MODE) */}
                {currentStep === 2 && mode === 'migrate' && (
                  <div className="animate-fade-in">
                    <h2 className="text-3xl font-display font-bold mb-4 text-white text-center">Migration Safety</h2>
                    
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 mb-8">
                      <h4 className="flex items-center gap-2 text-red-400 font-bold mb-2">
                        <AlertCircle size={18} /> Crucial Warning: Slashing Risk
                      </h4>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        <strong>Never run the same validator keys on two machines at the same time.</strong> This will cause "Slashing" and you will lose ETH.
                      </p>
                    </div>

                    <div className="space-y-6 mb-8">
                      <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-dark-800 flex items-center justify-center font-bold text-gray-400 border border-white/10">1</div>
                        <div>
                          <h4 className="text-white font-bold">Stop your old node</h4>
                          <p className="text-gray-400 text-sm">Make sure your current validator client is completely stopped and disabled.</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-dark-800 flex items-center justify-center font-bold text-gray-400 border border-white/10">2</div>
                        <div>
                          <h4 className="text-white font-bold">Wait 2 Epochs (~15 min)</h4>
                          <p className="text-gray-400 text-sm">Check on a block explorer that your validator is missing attestations. This confirms it is offline.</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-dark-800 flex items-center justify-center font-bold text-gray-400 border border-white/10">3</div>
                        <div>
                          <h4 className="text-white font-bold">Upload Keystores</h4>
                          <p className="text-gray-400 text-sm">Proceed to upload your keystore files here. We will import them safely.</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end border-t border-white/5 pt-8">
                       <button 
                        onClick={() => setCurrentStep(3)}
                        className="px-8 py-3 bg-gradient-to-r from-brand-cyan to-blue-600 hover:opacity-90 text-white rounded-lg font-bold flex items-center gap-2 transition-all shadow-lg"
                      >
                        I understand, let's migrate <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: Upload (Common) */}
                {currentStep === 3 && (
                  <div className="animate-fade-in text-center">
                    <h2 className="text-3xl font-display font-bold mb-4 text-white">Upload Keystore Files</h2>
                    <p className="text-gray-400 mb-10">
                      Upload your <code>keystore-m_...json</code> files. <br/>
                      <span className="text-sm opacity-70">(We do NOT need the password yet, you will enter it securely in the Dashboard later)</span>
                    </p>

                    <div className="border-2 border-dashed border-white/10 rounded-2xl p-12 mb-8 hover:bg-white/5 hover:border-brand-purple/50 transition-colors relative group">
                      <input 
                        type="file" 
                        multiple 
                        accept=".json"
                        onChange={handleFileUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      <div className="w-20 h-20 bg-dark-800 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Upload size={32} className="text-brand-purple" />
                      </div>
                      <p className="font-bold text-xl text-white mb-2">Drag & Drop files here</p>
                      <p className="text-sm text-gray-500">or click to browse</p>
                    </div>

                    {files.length > 0 && (
                      <div className="mb-8 text-left bg-dark-900/50 p-4 rounded-xl border border-white/5">
                        <h4 className="font-bold mb-3 text-sm text-gray-400 uppercase tracking-wider">Selected Files ({files.length})</h4>
                        <ul className="space-y-2">
                          {files.map((f, i) => (
                            <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                              <Check size={14} className="text-green-500" /> {f.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Keystore Password Input */}
                    <div className="mb-8 text-left max-w-md mx-auto">
                      <label className="block text-gray-400 text-sm font-bold mb-2">Keystore Password</label>
                      <div className="relative">
                         <input 
                            type="password" 
                            value={keystorePassword}
                            onChange={(e) => setKeystorePassword(e.target.value)}
                            placeholder="Enter the password you used to generate these keys"
                            className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-purple focus:outline-none transition-colors"
                         />
                         <div className="absolute right-3 top-3 text-gray-500">
                           <Shield size={18} />
                         </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Required to import your keys into the validator client. Sent securely.
                      </p>
                    </div>

                    <div className="flex justify-between border-t border-white/5 pt-8">
                      <button onClick={() => setCurrentStep(2)} className="text-gray-500 hover:text-white transition-colors">Back</button>
                      <button 
                        onClick={() => setCurrentStep(4)}
                        disabled={files.length === 0 || !keystorePassword}
                        className={`px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition-all ${files.length > 0 && keystorePassword ? 'bg-gradient-to-r from-brand-purple to-brand-pink text-white shadow-lg' : 'bg-dark-800 text-gray-600 cursor-not-allowed'}`}
                      >
                        Review & Pay <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 4: Payment (Common) */}
                {currentStep === 4 && (
                  <div className="animate-fade-in">
                    <h2 className="text-3xl font-display font-bold mb-8 text-center text-white">Order Summary</h2>
                    
                    <div className="bg-dark-900/50 rounded-2xl p-8 mb-8 border border-white/5">
                      {/* ... Summary details ... */}
                      <div className="flex justify-between mb-6 border-b border-white/5 pb-6">
                        <span className="text-gray-400">Operation Type</span>
                        <span className="font-bold text-white capitalize">{mode === 'create' ? 'New Node Creation' : 'Node Migration'}</span>
                      </div>
                      <div className="flex justify-between mb-6 border-b border-white/5 pb-6">
                        <span className="text-gray-400">Blockchain</span>
                        <div className="flex items-center gap-3 font-bold text-white">
                          <img src={selectedChain.logo} className="w-6 h-6 rounded-full" /> {selectedChain.name}
                        </div>
                      </div>
                      <div className="flex justify-between mb-6 border-b border-white/5 pb-6">
                        <span className="text-gray-400">Validators Count</span>
                        <span className="font-bold text-white">{files.length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Total Monthly</span>
                        <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-purple">
                          {selectedChain.price * files.length} {selectedChain.ticker}
                        </span>
                      </div>
                    </div>

                    {paymentError && (
                      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6 flex items-start gap-3 text-red-400 text-sm">
                        <AlertCircle size={18} className="mt-0.5 shrink-0" />
                        <span>{paymentError}</span>
                      </div>
                    )}

                    {!isAuthenticated ? (
                      <div className="text-center">
                        <p className="text-gray-400 mb-4">Please login to continue with payment</p>
                        <a 
                          href="/login" 
                          className="inline-block px-8 py-3 bg-gradient-to-r from-brand-purple to-brand-pink text-white rounded-xl font-bold"
                        >
                          Login to Pay
                        </a>
                      </div>
                    ) : (
                      <button 
                        onClick={handlePayment}
                        disabled={provisioning}
                        className={`w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:to-emerald-500 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-3 shadow-xl shadow-green-500/20 transition-all hover:-translate-y-1 ${provisioning ? 'opacity-70 cursor-wait' : ''}`}
                      >
                        {provisioning ? (
                          <>Processing...</>
                        ) : (
                          <><CreditCard size={24} /> Pay with Stripe</>
                        )}
                      </button>
                    )}
                    
                    <p className="text-center text-xs text-gray-500 mt-6 flex items-center justify-center gap-2">
                      <Shield size={14} className="text-brand-cyan" /> Secure payment processed by Stripe
                    </p>

                    <div className="mt-8 text-center">
                       <button onClick={() => setCurrentStep(3)} className="text-gray-500 hover:text-white text-sm transition-colors">Back to upload</button>
                    </div>
                  </div>
                )}

              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Migrate;
