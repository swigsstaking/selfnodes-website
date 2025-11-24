import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Github } from 'lucide-react';
import { useState } from 'react';
import Logo from './Logo';

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path 
      ? "text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-purple font-bold" 
      : "text-gray-400 hover:text-white transition-colors";
  };

  return (
    <div className="min-h-screen flex flex-col bg-dark-950 font-sans text-gray-100 selection:bg-brand-purple selection:text-white">
      {/* Header */}
      <header className="fixed w-full top-0 left-0 z-50 border-b border-white/5 bg-dark-950/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Logo />

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link to="/" className={isActive('/')}>Home</Link>
              <Link to="/services" className={isActive('/services')}>Services</Link>
              <Link to="/monitoring" className={isActive('/monitoring')}>Monitoring</Link>
              <Link to="/dashboard" className={isActive('/dashboard')}>Dashboard</Link>
              <Link to="/contact" className={isActive('/contact')}>Contact</Link>
              <Link 
                to="/migrate" 
                className="bg-white text-dark-950 hover:bg-gray-100 px-5 py-2 rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg shadow-white/5"
              >
                Launch Node
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden bg-dark-900 border-t border-white/10 p-4 flex flex-col gap-4 animate-fade-in">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className={isActive('/')}>Home</Link>
            <Link to="/services" onClick={() => setIsMenuOpen(false)} className={isActive('/services')}>Services</Link>
            <Link to="/monitoring" onClick={() => setIsMenuOpen(false)} className={isActive('/monitoring')}>Monitoring</Link>
            <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className={isActive('/dashboard')}>Dashboard</Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)} className={isActive('/contact')}>Contact</Link>
            <Link 
              to="/migrate"
              onClick={() => setIsMenuOpen(false)}
              className="bg-white text-dark-950 font-bold px-4 py-3 rounded-lg text-center mt-4"
            >
              Launch Node
            </Link>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-dark-900 border-t border-white/5 pt-20 pb-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <Logo />
              <p className="mt-6 text-gray-500 text-sm leading-relaxed">
                Secure, scalable, and non-custodial validator hosting services for the Web3 ecosystem. Based in Switzerland.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">Services</h4>
              <ul className="space-y-4 text-gray-500 text-sm">
                <li><Link to="/services" className="hover:text-brand-cyan transition-colors">Validator Hosting</Link></li>
                <li><Link to="/services" className="hover:text-brand-cyan transition-colors">RPC Nodes</Link></li>
                <li><Link to="/monitoring" className="hover:text-brand-cyan transition-colors">Monitoring</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Company</h4>
              <ul className="space-y-4 text-gray-500 text-sm">
                <li><Link to="/contact" className="hover:text-brand-cyan transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-brand-cyan transition-colors">Contact</Link></li>
                <li><a href="#" className="hover:text-brand-cyan transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-brand-cyan transition-colors">Privacy Policy</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Connect</h4>
              <div className="flex gap-4">
                <a href="https://github.com/selfnodes" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-all">
                  <Github size={20} />
                </a>
                <a href="https://t.me/selfnodes" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/5 pt-8 text-center text-gray-600 text-sm">
            <p>&copy; {new Date().getFullYear()} Selfnodes. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
