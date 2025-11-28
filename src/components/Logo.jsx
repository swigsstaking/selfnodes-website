import { Link } from 'react-router-dom';
import { useSiteInfo } from '../hooks/useSiteInfo';

const Logo = ({ className = '' }) => {
  const siteInfo = useSiteInfo();
  
  // Si un logo existe dans l'API, l'afficher
  const logoUrl = siteInfo?.logo?.url || 'https://swigs.online/uploads/selfnodes/1763796105493-777618822.svg';
  const logoAlt = siteInfo?.logo?.alt || siteInfo?.name || 'SelfNodes';
  
  return (
    <Link to="/" className={`flex items-center gap-3 group ${className}`}>
      <img 
        src={logoUrl} 
        alt={logoAlt} 
        className="h-10 w-auto transition-transform duration-300 group-hover:scale-105" 
      />
      <span className="text-xl font-display font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brand-orange group-hover:to-brand-purple transition-all">
        Selfnodes
      </span>
    </Link>
  );
};

export default Logo;
