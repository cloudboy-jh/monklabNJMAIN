"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from "./button";
import monkLogo from '@/assets/ModernMonkLablogo.svg';
import homeLogo from '@/assets/home-logo-removebg-preview.png';
import buildLogo from '@/assets/hammer-crash.png';
import checkinLogo from '@/assets/calendar-clock.png';
import SimpleSheet from './simple-sheet';
import { ThemeToggle } from "./themetoggle";
import { useTheme } from "next-themes";

const Header: React.FC = () => {
  const router = useRouter();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { theme } = useTheme();

  const handleLogoClick = () => {
    setIsSheetOpen(true);
  };

  const handleRestartChat = () => {
    console.log('Restart chat triggered');
  };

  return (
    <header className={`w-full py-4 relative ${theme === 'dark' ? 'bg-zinc-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="flex flex-col items-center justify-center">
        <SimpleSheet 
          isOpen={isSheetOpen} 
          onOpenChange={setIsSheetOpen} 
          onRestartChat={handleRestartChat}
        />
        <div className="logo-container cursor-pointer mb-4" onClick={handleLogoClick}>
          <img 
            src={monkLogo.src} 
            alt="Monk Logo" 
            className="w-32 h-32"
          />
        </div>
        <nav className="flex space-x-8 items-center">
          {/* Home Button */}
          <Button asChild variant="ghost">
            <Link href="/" className={`flex items-center space-x-3 ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'}`}>
              <img src={homeLogo.src} alt="Home" className="w-8 h-8" />
              <span className="text-lg">Home</span>
            </Link>
          </Button>
          
          {/* Build Button */}
          <Button asChild variant="ghost">
            <Link href="/build" className={`flex items-center space-x-3 ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'}`}>
              <img src={buildLogo.src} alt="Build" className="w-8 h-8" />
              <span className="text-lg">Build</span>
            </Link>
          </Button>
          
          {/* Checkin Button */}
          <Button asChild variant="ghost">
            <Link href="/checkin" className={`flex items-center space-x-3 ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'}`}>
              <img src={checkinLogo.src} alt="Checkin" className="w-8 h-8" />
              <span className="text-lg">Checkin</span>
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
