import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Github } from 'lucide-react';
import { useState } from 'react';
import Logo from './Logo';

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "text-secondary-400 font-bold" : "text-gray-300 hover:text-white transition-colors";
  };

  return (
    <div className="min-h-screen flex flex-col bg-primary-900 font-sans text-gray-100">
      {/* Header */}
      <header className="fixed w-full bg-primary-900/95 backdrop-blur-sm border-b border-primary-800 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Logo />

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link to="/" className={isActive('/')}>Home</Link>
              <Link to="/services" className={isActive('/services')}>Services</Link>
              <Link to="/monitoring" className={isActive('/monitoring')}>Monitoring</Link>
              <Link to="/contact" className={isActive('/contact')}>Contact</Link>
              <a 
                href="https://t.me/selfnodes" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary-600 hover:bg-secondary-500 text-white px-5 py-2 rounded-lg font-medium transition-colors"
              >
                Launch Node
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden bg-primary-800 border-t border-primary-700 p-4 flex flex-col gap-4">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className={isActive('/')}>Home</Link>
            <Link to="/services" onClick={() => setIsMenuOpen(false)} className={isActive('/services')}>Services</Link>
            <Link to="/monitoring" onClick={() => setIsMenuOpen(false)} className={isActive('/monitoring')}>Monitoring</Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)} className={isActive('/contact')}>Contact</Link>
            <a 
              href="https://t.me/selfnodes"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-secondary-600 text-white px-4 py-2 rounded-lg text-center"
            >
              Launch Node
            </a>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-primary-900 border-t border-primary-800 pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <Logo />
              <p className="mt-4 text-gray-400 text-sm">
                Secure, scalable, and non-custodial validator hosting services for the Web3 ecosystem. Based in Switzerland.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link to="/services" className="hover:text-secondary-400">Validator Hosting</Link></li>
                <li><Link to="/services" className="hover:text-secondary-400">RPC Nodes</Link></li>
                <li><Link to="/monitoring" className="hover:text-secondary-400">Monitoring</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link to="/contact" className="hover:text-secondary-400">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-secondary-400">Contact</Link></li>
                <li><a href="#" className="hover:text-secondary-400">Terms of Service</a></li>
                <li><a href="#" className="hover:text-secondary-400">Privacy Policy</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Connect</h4>
              <div className="flex gap-4">
                <a href="https://github.com/selfnodes" className="text-gray-400 hover:text-white transition-colors">
                  <Github size={24} />
                </a>
                <a href="https://t.me/selfnodes" className="text-gray-400 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-primary-800 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Selfnodes. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
