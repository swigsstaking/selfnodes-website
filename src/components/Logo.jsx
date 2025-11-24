import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-3 group">
      <img 
        src="https://swigs.online/uploads/selfnodes/1763796105493-777618822.svg" 
        alt="SelfNodes" 
        className="h-10 w-auto transition-transform duration-300 group-hover:scale-105" 
      />
    </Link>
  );
};

export default Logo;
