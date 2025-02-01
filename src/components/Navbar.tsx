"use client";

import { Home, DollarSign, BookOpen } from "lucide-react";
import Link from "next/link";

const listItems=[
  {
    href:"/",
    icome:<Home size={20} />,
    label:"Home"
  },
  {
    href:"/centre",
    icome:<Home size={20} />,
    label:"Centre"
  },
  {
    href:"/state",
    icome:<Home size={20} />,
    label:"State"
  },
  {
    href:"/about",
    icome:<BookOpen size={20} />,
    label:"About Us"
  }
]

const Navbar = () => {
  return (
    <nav /*className="max-w-3xl mx-auto glass-card rounded-lg"*/>
      <ul className="flex items-center justify-between p-4 gap-x-8">
        {listItems.map((item,index)=>(
          <li key={index}>
            <Link 
              href={item.href} 
              className="flex items-center p-2 hover:bg-primary hover:text-white transition-colors rounded-sm"
            >
              {item.icome}
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;