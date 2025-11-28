import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Loader2, XCircle } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const Success = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [status, setStatus] = useState('loading');
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    if (sessionId) {
      verifyPayment();
    } else {
      setStatus('error');
    }
  }, [sessionId]);

  const verifyPayment = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/nodes/verify-payment?session_id=${sessionId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      const data = await response.json();
      
      if (data.success) {
        setStatus('success');
        setOrderDetails(data.order);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Verification error:', error);
      setStatus('error');
    }
  };

  return (
    <>
      <SEOHead page="success" />
      
      <div className="relative min-h-screen pt-24 pb-20 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-dark-950 -z-20"></div>
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-green-500/10 to-transparent -z-10"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-lg mx-auto glass p-8 md:p-10 rounded-2xl border border-white/10 shadow-2xl animate-fade-in text-center">
            
            {status === 'loading' && (
              <>
                <div className="w-20 h-20 bg-brand-purple/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Loader2 size={40} className="text-brand-purple animate-spin" />
                </div>
                <h1 className="text-3xl font-display font-bold text-white mb-4">Verifying Payment...</h1>
                <p className="text-gray-400">Please wait while we confirm your payment.</p>
              </>
            )}

            {status === 'success' && (
              <>
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={40} className="text-green-500" />
                </div>
                <h1 className="text-3xl font-display font-bold text-white mb-4">Payment Successful!</h1>
                <p className="text-gray-400 mb-8">Your validator is being provisioned. You'll receive a notification once it's ready.</p>
                
                {orderDetails && (
                  <div className="bg-dark-900/50 rounded-xl p-6 mb-8 text-left">
                    <h3 className="text-sm text-gray-500 uppercase mb-4">Order Details</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Order ID</span>
                        <span className="text-white font-mono text-sm">{orderDetails.orderId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Validators</span>
                        <span className="text-white">{orderDetails.validatorCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Amount</span>
                        <span className="text-green-400 font-bold">${orderDetails.amount}</span>
                      </div>
                    </div>
                  </div>
                )}

                <Link 
                  to="/dashboard"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-brand-purple to-brand-pink text-white rounded-xl font-bold text-lg shadow-lg shadow-brand-purple/20 transition-all hover:-translate-y-1"
                >
                  Go to Dashboard <ArrowRight size={20} />
                </Link>
              </>
            )}

            {status === 'error' && (
              <>
                <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <XCircle size={40} className="text-red-500" />
                </div>
                <h1 className="text-3xl font-display font-bold text-white mb-4">Payment Issue</h1>
                <p className="text-gray-400 mb-8">We couldn't verify your payment. Please contact support if you were charged.</p>
                
                <div className="flex flex-col gap-4">
                  <Link 
                    to="/dashboard"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-brand-purple to-brand-pink text-white rounded-xl font-bold"
                  >
                    Go to Dashboard
                  </Link>
                  <Link 
                    to="/contact"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contact Support
                  </Link>
                </div>
              </>
            )}

          </div>
        </div>
      </div>
    </>
  );
};

export default Success;
