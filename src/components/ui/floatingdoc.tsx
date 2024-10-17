import React, { useState } from 'react';
import Link from 'next/link';
import { useTheme } from "next-themes";
import { Home, Wrench, RefreshCw, Settings } from 'lucide-react';

interface FloatingDockProps {
  onRestartChat: () => void;
}

export default function FloatingDock({ onRestartChat }: FloatingDockProps) {
  const { theme } = useTheme();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const dockItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Wrench, label: "Build", href: "/build" },
    { icon: RefreshCw, label: "Restart Chat", href: "#", onClick: onRestartChat },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <nav className={`${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-200'} bg-opacity-90 rounded-full px-4 py-2 backdrop-blur-sm`}>
      <div className="flex items-center justify-center">
        <button
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          className={`group flex items-center justify-center w-14 h-14 rounded-full transition-all duration-500 ease-in-out hover:bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 ${
            theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-300'
          }`}
          aria-label="Menu"
        >
          <img src="/brain-circuit (1).svg" alt="Menu" className="w-9 h-9" />
        </button>
        <div className={`flex overflow-hidden transition-all duration-500 ease-in-out ${isDrawerOpen ? 'max-w-xs' : 'max-w-0'}`}>
          {dockItems.map((item, index) => (
            <Link key={index} href={item.href} passHref>
              <button
                onClick={item.onClick}
                className={`group flex items-center justify-center w-10 h-10 rounded-full transition-all duration-500 ease-in-out hover:bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 ${
                  theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-300'
                }`}
                aria-label={item.label}
              >
                <item.icon className="w-5 h-5" />
              </button>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
