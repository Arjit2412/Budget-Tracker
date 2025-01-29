"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
// import MapComponent from "./MapComponent";


const PageLayout = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
  if (typeof window !== 'undefined') {
    const savedPreference = localStorage.getItem('isDark');
    if (savedPreference) {
      setIsDark(JSON.parse(savedPreference));
    }
  }
}, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem('isDark', 'true'); // Save preference
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem('isDark', 'false'); // Save preference
    }
  }, [isDark]);

  return (
    <div className="min-h-screen p-6 animate-fadeIn">
      <header className="max-w-7xl mx-auto flex justify-between items-center mb-8">
        <Link href="/" className="text-2xl font-bold text-primary">
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
    
      
      {/* {pathname !== "/" && (
        <div className="max-w-7xl mx-auto mb-8">
          <Link href="/" className="text-primary hover:underline">
            ← Back to Home
          </Link>
        </div>
      )} */}

      <main className="max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
};

export default PageLayout;