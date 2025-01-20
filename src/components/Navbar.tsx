import { Home, DollarSign, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="max-w-3xl mx-auto mb-8 glass-card rounded-lg">
      <ul className="flex items-center justify-between p-4">
        <li>
          <Link 
            to="/" 
            className="flex items-center gap-2 hover:text-primary transition-colors"
          >
            <Home size={20} />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link 
            to="/revenue" 
            className="flex items-center gap-2 hover:text-primary transition-colors"
          >
            <DollarSign size={20} />
            <span>Revenue</span>
          </Link>
        </li>
        <li>
          <Link 
            to="/expenditure" 
            className="flex items-center gap-2 hover:text-primary transition-colors"
          >
            <DollarSign size={20} />
            <span>Expenditure</span>
          </Link>
        </li>
        <li>
          <Link 
            to="/about" 
            className="flex items-center gap-2 hover:text-primary transition-colors"
          >
            <BookOpen size={20} />
            <span>About Us</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;