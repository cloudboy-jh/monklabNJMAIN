import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from "next-themes";
import { Home, Wrench, RefreshCw, Settings } from 'lucide-react';
import BrainAndCogIcon from '../../assets/brainandcog.svg';

interface FloatingDockProps {
  onRestartChat: () => void;
}

export default function FloatingDock({ onRestartChat }: FloatingDockProps) {
  const { theme, systemTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<string | undefined>(undefined);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  useEffect(() => {
    setCurrentTheme(theme === 'system' ? systemTheme : theme);
  }, [theme, systemTheme]);

  const dockItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Wrench, label: "Build", href: "/build" },
    { icon: RefreshCw, label: "Restart Chat", href: "#", onClick: onRestartChat },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  const buttonClasses = `group flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ease-in-out hover:bg-opacity-50 focus:outline-none ${
    currentTheme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-200'
  }`;

  return (
    <nav className={`${currentTheme === 'dark' ? 'bg-zinc-800' : 'bg-slate-100'} bg-opacity-90 rounded-full px-4 py-2 backdrop-blur-sm`}>
      <div className="flex items-center justify-center">
        <button
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          className={`${buttonClasses} w-12 h-12`}
          aria-label="Menu"
        >
          <Image src={BrainAndCogIcon} alt="Menu" width={36} height={36} />
        </button>
        <div className={`flex overflow-hidden transition-all duration-500 ease-in-out ${isDrawerOpen ? 'max-w-xs' : 'max-w-0'}`}>
          {dockItems.map((item, index) => (
            item.onClick ? (
              <button
                key={index}
                onClick={item.onClick}
                className={buttonClasses}
                aria-label={item.label}
              >
                <item.icon className="w-6 h-6" />
              </button>
            ) : (
              <Link key={index} href={item.href} passHref>
                <button
                  className={buttonClasses}
                  aria-label={item.label}
                >
                  <item.icon className="w-6 h-6" />
                </button>
              </Link>
            )
          ))}
        </div>
      </div>
    </nav>
  );
}
