import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <div className="text-2xl font-bold tracking-tighter text-white">
        Self<span className="text-secondary-500">Nodes</span>
      </div>
    </Link>
  );
};

export default Logo;
