import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className="min-h-screen p-6 animate-fadeIn">
      <header className="max-w-7xl mx-auto flex justify-between items-center mb-8">
        <Link to="/" className="text-2xl font-bold text-primary">
          Government Portal
        </Link>
        <button
          onClick={() => setIsDark(!isDark)}
          className="p-2 rounded-full hover:bg-secondary/50 transition-colors"
        >
          {isDark ? <SunIcon /> : <MoonIcon />}
        </button>
      </header>
      
      <Navbar />
      
      {location.pathname !== "/" && (
        <div className="max-w-7xl mx-auto mb-8">
          <Link to="/" className="text-primary hover:underline">
            ← Back to Home
          </Link>
        </div>
      )}

      <main className="max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
};

export default PageLayout;