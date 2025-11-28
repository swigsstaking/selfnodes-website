import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import SEOHead from '../components/SEOHead';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login, loginWithGoogle, googleClientId } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleSuccess = async (credentialResponse) => {
    setError('');
    setLoading(true);
    try {
      await loginWithGoogle(credentialResponse.credential);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Google login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError('Google login failed. Please try again.');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Connection error. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEOHead page="login" />
      
      <div className="relative min-h-screen pt-24 pb-20 flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-dark-950 -z-20"></div>
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-brand-purple/10 to-transparent -z-10"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-cyan/5 rounded-full blur-[120px] -z-10"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-md mx-auto glass p-8 md:p-10 rounded-2xl border border-white/10 shadow-2xl animate-fade-in">
            
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-brand-purple/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-brand-purple border border-brand-purple/20">
                <LogIn size={32} />
              </div>
              <h1 className="text-3xl font-display font-bold text-white mb-2">Welcome Back</h1>
              <p className="text-gray-400">Sign in to manage your validators</p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6 flex items-start gap-3 text-red-400 text-sm animate-shake">
                <AlertCircle size={18} className="mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Google Login Button */}
            {googleClientId && (
              <div className="mb-6">
                <div className="flex justify-center">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                    theme="filled_black"
                    size="large"
                    width="100%"
                    text="signin_with"
                    shape="rectangular"
                  />
                </div>
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-dark-900 text-gray-500">or continue with email</span>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-400 text-sm font-bold mb-2 pl-1">Email Address</label>
                <div className="relative">
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-dark-900 border border-white/10 rounded-xl px-5 py-3 pl-12 text-white focus:border-brand-purple focus:outline-none transition-colors"
                    placeholder="name@example.com"
                    required
                  />
                  <Mail className="absolute left-4 top-3.5 text-gray-500" size={20} />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-sm font-bold mb-2 pl-1">Password</label>
                <div className="relative">
                  <input 
                    type="password" 
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full bg-dark-900 border border-white/10 rounded-xl px-5 py-3 pl-12 text-white focus:border-brand-purple focus:outline-none transition-colors"
                    placeholder="••••••••"
                    required
                  />
                  <Lock className="absolute left-4 top-3.5 text-gray-500" size={20} />
                </div>
                <div className="flex justify-end mt-2">
                  <a href="#" className="text-xs text-brand-purple hover:text-brand-light-purple transition-colors">Forgot password?</a>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className={`w-full py-4 bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-brand-purple/20 transition-all hover:-translate-y-1 ${loading ? 'opacity-70 cursor-wait' : ''}`}
              >
                {loading ? 'Signing In...' : <>Sign In <ArrowRight size={20} /></>}
              </button>
            </form>

            <div className="mt-8 text-center pt-6 border-t border-white/5">
              <p className="text-gray-400 text-sm">
                Don't have an account?{' '}
                <Link to="/register" className="text-white font-bold hover:text-brand-purple transition-colors">
                  Sign up
                </Link>
              </p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
