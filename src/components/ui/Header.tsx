"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from "./button";
import lightLogo from '@/assets/rainbowlab.png';
import darkLogo from '@/assets/lightrainbowlab (2).png';
import homeLogoLight from '@/assets/aiblacklogo.png';
import homeLogoDark from '@/assets/aiwhitelogo.png';
import buildLogoLight from '@/assets/hammerblackicon.png';
import buildLogoDark from '@/assets/hammerwhiteicon.png';
import checkinLogoLight from '@/assets/checkinblacklogo.png';
import checkinLogoDark from '@/assets/checkinwhitelogo.png';
import SimpleSheet from './simple-sheet';
import { ThemeToggle } from "./themetoggle";
import { useTheme } from "next-themes";

const Header: React.FC = () => {
  const router = useRouter();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (theme === 'system') {
      setTheme('dark');
    }
  }, []);

  const handleLogoClick = () => {
    setIsSheetOpen(true);
  };

  const buttonThemeClass = theme === 'light' ? 'bg-gray-200 hover:bg-gray-300' : 'bg-zinc-800 hover:bg-zinc-700';

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
            src={theme === 'dark' ? darkLogo.src : lightLogo.src}
            alt="Rainbow Lab Logo" 
            className="w-70 h-20"
          />
        </div>
        <nav className="flex space-x-8 items-center">
          {/* Home Button */}
          <Button asChild variant="ghost" className={buttonThemeClass}>
            <Link href="/" className="flex items-center space-x-3">
              <img 
                src={theme === 'dark' ? homeLogoDark.src : homeLogoLight.src}
                alt="Home" 
                className="w-8 h-8"
              />
              <span className="text-lg">Home</span>
            </Link>
          </Button>
          
          {/* Build Button */}
          <Button asChild variant="ghost" className={buttonThemeClass}>
            <Link href="/build" className="flex items-center space-x-3">
              <img 
                src={theme === 'dark' ? buildLogoDark.src : buildLogoLight.src}
                alt="Build" 
                className="w-8 h-8"
              />
              <span className="text-lg">Build</span>
            </Link>
          </Button>
          
          {/* Checkin Button */}
          <Button asChild variant="ghost" className={buttonThemeClass}>
            <Link href="/checkin" className="flex items-center space-x-3">
              <img 
                src={theme === 'dark' ? checkinLogoDark.src : checkinLogoLight.src}
                alt="Checkin" 
                className="w-8 h-8"
              />
              <span className="text-lg">Checkin</span>
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
