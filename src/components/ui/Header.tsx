"use client";

import React, { useState, useEffect } from 'react';
import { useTheme } from "next-themes";
import logo from '@/assets/monklabmainicon.svg';
import SimpleSheet from './simple-sheet';
import { ThemeToggle } from "./themetoggle";
import FloatingDock from './floatingdoc';

const Header: React.FC = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Determine system theme if theme is set to 'system'
    if (theme === 'system') {
      const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDarkScheme ? 'dark' : 'light');
    }
  }, []);

  const handleLogoClick = () => {
    setIsSheetOpen(true);
  };

  if (!mounted) {
    return null;
  }

  return (
    <header className={`w-full py-4 relative ${theme === 'light' ? 'bg-white text-gray-900' : 'bg-zinc-900 text-white'}`}>
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="flex flex-col items-center justify-center">
        <SimpleSheet 
          isOpen={isSheetOpen} 
          onOpenChange={setIsSheetOpen}
        />
        <div className="logo-container cursor-pointer mb-4" onClick={handleLogoClick}>
          <img 
            src={logo.src}
            alt="Monk Lab Main Icon" 
            className={`w-60 h-50 ${theme === 'dark' ? 'invert' : ''}`}
          />
        </div>
        <div className="mt-2">
          <FloatingDock />
        </div>
      </div>
    </header>
  );
};

export default Header;
