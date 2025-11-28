import { useState, useMemo } from 'react';
import { Calculator as CalcIcon, TrendingUp, DollarSign, Server, Info } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const NETWORKS = [
  { 
    id: 'ethereum', 
    name: 'Ethereum', 
    ticker: 'ETH',
    logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
    stakeAmount: 32,
    aprRange: { min: 3.5, max: 5.0 },
    hostingCost: 50, // USD/month
    color: 'from-indigo-500 to-purple-600'
  },
  { 
    id: 'lukso', 
    name: 'Lukso', 
    ticker: 'LYX',
    logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5625.png',
    stakeAmount: 32,
    aprRange: { min: 8.0, max: 12.0 },
    hostingCost: 0.1, // USD/month
    color: 'from-pink-500 to-purple-600'
  },
  { 
    id: 'gnosis', 
    name: 'Gnosis', 
    ticker: 'GNO',
    logo: 'https://cryptologos.cc/logos/gnosis-gno-logo.png',
    stakeAmount: 1,
    aprRange: { min: 10.0, max: 15.0 },
    hostingCost: 1, // USD/month
    color: 'from-green-500 to-teal-600'
  }
];

const Calculator = () => {
  const [selectedNetwork, setSelectedNetwork] = useState(NETWORKS[0]);
  const [ethAmount, setEthAmount] = useState(32); // Amount in ETH (minimum 32)
  const [validatorCount, setValidatorCount] = useState(1); // Number of validator keystores
  const [tokenPrice, setTokenPrice] = useState(2000); // Default ETH price
  const [apr, setApr] = useState(4.0);

  // Calculate results
  // - Rewards are based on total ETH staked
  // - Hosting cost is based on number of validators (keystores), NOT ETH amount
  const results = useMemo(() => {
    const totalStaked = ethAmount; // User can stake any amount >= 32 ETH
    const yearlyRewardsTokens = totalStaked * (apr / 100);
    const yearlyRewardsUSD = yearlyRewardsTokens * tokenPrice;
    const monthlyRewardsUSD = yearlyRewardsUSD / 12;
    // Hosting is per validator (keystore), not per ETH
    const yearlyHostingCost = selectedNetwork.hostingCost * validatorCount * 12;
    const monthlyHostingCost = selectedNetwork.hostingCost * validatorCount;
    const netYearlyProfit = yearlyRewardsUSD - yearlyHostingCost;
    const netMonthlyProfit = monthlyRewardsUSD - monthlyHostingCost;
    const roi = yearlyHostingCost > 0 ? ((yearlyRewardsUSD - yearlyHostingCost) / yearlyHostingCost) * 100 : 0;

    return {
      totalStaked,
      yearlyRewardsTokens,
      yearlyRewardsUSD,
      monthlyRewardsUSD,
      yearlyHostingCost,
      monthlyHostingCost,
      netYearlyProfit,
      netMonthlyProfit,
      roi
    };
  }, [selectedNetwork, ethAmount, validatorCount, tokenPrice, apr]);

  return (
    <>
      <SEOHead page="calculator" />
      
      <div className="relative min-h-screen pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-dark-950 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-brand-purple/10 rounded-full blur-[120px]"></div>
        </div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-cyan/10 text-brand-cyan rounded-full text-sm font-bold mb-6 border border-brand-cyan/20">
                <CalcIcon size={16} /> Staking Calculator
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white">
                Estimate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-purple">Staking Rewards</span>
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Calculate potential rewards and costs for running validators with Selfnodes.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Input Panel */}
              <div className="glass p-8 rounded-2xl">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Server size={20} className="text-brand-purple" /> Configuration
                </h2>

                {/* Network Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-400 mb-3">Select Network</label>
                  <div className="grid grid-cols-3 gap-3">
                    {NETWORKS.map(network => (
                      <button
                        key={network.id}
                        onClick={() => {
                          setSelectedNetwork(network);
                          setApr((network.aprRange.min + network.aprRange.max) / 2);
                        }}
                        className={`p-4 rounded-xl border transition-all flex flex-col items-center gap-2 ${
                          selectedNetwork.id === network.id 
                            ? 'border-brand-purple bg-brand-purple/10' 
                            : 'border-white/10 hover:border-white/20 bg-dark-900/50'
                        }`}
                      >
                        <img src={network.logo} alt={network.name} className="w-8 h-8 rounded-full" />
                        <span className="text-white font-medium text-sm">{network.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Number of Validators */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-400 mb-3">
                    Number of Validators (Keystores)
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min={1}
                      max={100}
                      value={validatorCount}
                      onChange={(e) => {
                        const count = parseInt(e.target.value);
                        setValidatorCount(count);
                        setEthAmount(Math.max(ethAmount, count * selectedNetwork.stakeAmount));
                      }}
                      className="flex-1 h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer accent-brand-purple"
                    />
                    <input
                      type="number"
                      min={1}
                      max={1000}
                      value={validatorCount}
                      onChange={(e) => {
                        const count = Math.max(1, parseInt(e.target.value) || 1);
                        setValidatorCount(count);
                        setEthAmount(Math.max(ethAmount, count * selectedNetwork.stakeAmount));
                      }}
                      className="w-20 px-3 py-2 bg-dark-900 border border-white/10 rounded-lg text-white text-center font-mono"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Each validator = 1 keystore file = ${selectedNetwork.hostingCost}/month hosting
                  </p>
                </div>

                {/* ETH Amount */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-400 mb-3">
                    Total {selectedNetwork.ticker} to Stake
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min={validatorCount * selectedNetwork.stakeAmount}
                      max={validatorCount * selectedNetwork.stakeAmount * 10}
                      step={1}
                      value={ethAmount}
                      onChange={(e) => setEthAmount(parseInt(e.target.value))}
                      className="flex-1 h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer accent-brand-cyan"
                    />
                    <input
                      type="number"
                      min={validatorCount * selectedNetwork.stakeAmount}
                      step={1}
                      value={ethAmount}
                      onChange={(e) => setEthAmount(Math.max(validatorCount * selectedNetwork.stakeAmount, parseInt(e.target.value) || validatorCount * selectedNetwork.stakeAmount))}
                      className="w-24 px-3 py-2 bg-dark-900 border border-white/10 rounded-lg text-white text-center font-mono"
                    />
                  </div>
                  <div className="flex justify-between mt-2">
                    <p className="text-xs text-gray-500">
                      Min: {validatorCount * selectedNetwork.stakeAmount} {selectedNetwork.ticker} ({validatorCount} × {selectedNetwork.stakeAmount})
                    </p>
                    <p className="text-xs text-brand-cyan">
                      You can stake more per validator!
                    </p>
                  </div>
                </div>

                {/* Token Price */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-400 mb-3">
                    {selectedNetwork.ticker} Price (USD)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={tokenPrice}
                      onChange={(e) => setTokenPrice(parseFloat(e.target.value) || 0)}
                      className="w-full pl-8 pr-4 py-3 bg-dark-900 border border-white/10 rounded-lg text-white font-mono"
                    />
                  </div>
                </div>

                {/* APR */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-400 mb-3">
                    Expected APR (%)
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min={selectedNetwork.aprRange.min}
                      max={selectedNetwork.aprRange.max}
                      step="0.1"
                      value={apr}
                      onChange={(e) => setApr(parseFloat(e.target.value))}
                      className="flex-1 h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer accent-brand-cyan"
                    />
                    <span className="w-16 text-white font-mono text-right">{apr.toFixed(1)}%</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Typical range: {selectedNetwork.aprRange.min}% - {selectedNetwork.aprRange.max}%
                  </p>
                </div>

                {/* Hosting Cost Info */}
                <div className="p-4 bg-dark-900/50 rounded-lg border border-white/5">
                  <div className="flex items-start gap-3">
                    <Info size={18} className="text-brand-cyan mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-400">
                        Selfnodes hosting: <span className="text-white font-bold">${selectedNetwork.hostingCost}/month</span> per validator
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Results Panel */}
              <div className="space-y-6">
                {/* Main Results */}
                <div className="glass p-8 rounded-2xl">
                  <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <TrendingUp size={20} className="text-green-400" /> Estimated Returns
                  </h2>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 bg-dark-900/50 rounded-xl border border-white/5">
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Monthly Rewards</p>
                      <p className="text-2xl font-bold text-white">
                        ${results.monthlyRewardsUSD.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </p>
                      <p className="text-xs text-gray-400">
                        {(results.yearlyRewardsTokens / 12).toFixed(4)} {selectedNetwork.ticker}
                      </p>
                    </div>
                    <div className="p-4 bg-dark-900/50 rounded-xl border border-white/5">
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Yearly Rewards</p>
                      <p className="text-2xl font-bold text-white">
                        ${results.yearlyRewardsUSD.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </p>
                      <p className="text-xs text-gray-400">
                        {results.yearlyRewardsTokens.toFixed(4)} {selectedNetwork.ticker}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-white/5 pt-6">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-gray-400">Hosting Costs (yearly)</span>
                      <span className="text-red-400 font-mono">-${results.yearlyHostingCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-gray-400">Gross Rewards (yearly)</span>
                      <span className="text-green-400 font-mono">+${results.yearlyRewardsUSD.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-white/10">
                      <span className="text-white font-bold">Net Profit (yearly)</span>
                      <span className={`text-xl font-bold font-mono ${results.netYearlyProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        ${results.netYearlyProfit.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* ROI Card */}
                <div className={`p-6 rounded-2xl bg-gradient-to-br ${selectedNetwork.color} relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                  <div className="relative z-10">
                    <p className="text-white/80 text-sm mb-2">Return on Investment</p>
                    <p className="text-4xl font-bold text-white mb-2">
                      {results.roi > 0 ? '+' : ''}{results.roi.toFixed(0)}%
                    </p>
                    <p className="text-white/60 text-sm">
                      Based on hosting costs vs staking rewards
                    </p>
                  </div>
                </div>

                {/* Monthly Breakdown */}
                <div className="glass p-6 rounded-2xl">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <DollarSign size={18} className="text-brand-orange" /> Monthly Breakdown
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Staking Rewards</span>
                      <span className="text-green-400 font-mono">+${results.monthlyRewardsUSD.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Hosting Fee</span>
                      <span className="text-red-400 font-mono">-${results.monthlyHostingCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-white/10">
                      <span className="text-white font-medium">Net Monthly</span>
                      <span className={`font-bold font-mono ${results.netMonthlyProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        ${results.netMonthlyProfit.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-12 p-6 bg-dark-900/50 rounded-xl border border-white/5 text-center">
              <p className="text-sm text-gray-500">
                <strong className="text-gray-400">Disclaimer:</strong> These calculations are estimates based on current network conditions. 
                Actual rewards may vary due to network participation, MEV, and other factors. 
                Token prices are volatile and past performance does not guarantee future results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Calculator;
