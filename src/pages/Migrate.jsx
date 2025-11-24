import { useState } from 'react';
import { Check, ChevronRight, Download, Upload, CreditCard, Shield, AlertCircle, Server, ArrowRight, Info, Key } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const CHAINS = [
  { 
    id: 'Ethereum', 
    name: 'Ethereum', 
    logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
    price: 50,
    ticker: 'USD',
    color: 'from-indigo-500 to-purple-600'
  }
];

const Migrate = () => {
  const [mode, setMode] = useState(null); // 'create' or 'migrate'
  const [currentStep, setCurrentStep] = useState(0); // 0 = Selection
  const [selectedChain, setSelectedChain] = useState(null);
  const [files, setFiles] = useState([]);
  
  const detectOS = () => {
    const platform = navigator.platform.toLowerCase();
    if (platform.includes('mac')) return 'mac';
    if (platform.includes('win')) return 'windows';
    if (platform.includes('linux')) return 'linux';
    return 'windows';
  };

  const handleFileUpload = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles([...files, ...newFiles]);
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
              I have 32 ETH (or equivalent) and want to start a new validator node from scratch. I need to generate keys.
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
          
          {currentStep === 0 ? (
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
                    <h2 className="text-3xl font-display font-bold mb-4 text-white text-center">Generate Keys</h2>
                    
                    {/* Educational Box */}
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 mb-8">
                      <h4 className="flex items-center gap-2 text-blue-400 font-bold mb-2">
                        <Info size={18} /> What is this step?
                      </h4>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        To run a validator, you need to generate cryptographic keys. This must be done <strong>offline</strong> on your own machine to ensure no one else (including us) ever sees your withdrawal key (the key that controls your funds).
                      </p>
                    </div>

                    <div className="text-center mb-8">
                      <p className="text-gray-400 mb-6">
                        1. Download the Wagyu Key Gen tool below.<br/>
                        2. Turn off your internet (WiFi).<br/>
                        3. Run the tool and follow instructions to create a new mnemonic.<br/>
                        4. The tool will generate a folder with <code>deposit_data.json</code> and <code>keystore.json</code> files.
                      </p>
                      
                      <a 
                        href="#" // Should link to real Wagyu releases
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-dark-950 rounded-lg font-bold hover:bg-gray-100 transition-colors mb-4"
                      >
                        <Download size={20} /> Download Wagyu Key Gen for {detectOS()}
                      </a>
                      <p className="text-xs text-gray-500">Official Tool from StakeHouse / Ethereum Foundation</p>
                    </div>

                    <div className="flex justify-end border-t border-white/5 pt-8">
                       <button 
                        onClick={() => setCurrentStep(3)}
                        className="px-8 py-3 bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 text-white rounded-lg font-bold flex items-center gap-2 transition-all shadow-lg"
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

                    <div className="flex justify-between border-t border-white/5 pt-8">
                      <button onClick={() => setCurrentStep(2)} className="text-gray-500 hover:text-white transition-colors">Back</button>
                      <button 
                        onClick={() => setCurrentStep(4)}
                        disabled={files.length === 0}
                        className={`px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition-all ${files.length > 0 ? 'bg-gradient-to-r from-brand-purple to-brand-pink text-white shadow-lg' : 'bg-dark-800 text-gray-600 cursor-not-allowed'}`}
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

                    <button className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:to-emerald-500 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-3 shadow-xl shadow-green-500/20 transition-all hover:-translate-y-1">
                      <CreditCard size={24} /> Pay Now
                    </button>
                    
                    <p className="text-center text-xs text-gray-500 mt-6 flex items-center justify-center gap-2">
                      <Shield size={14} className="text-brand-cyan" /> Secure payment processed by Swigs
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
