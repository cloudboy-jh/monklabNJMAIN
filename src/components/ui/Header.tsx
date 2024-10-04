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

const Header: React.FC = () => {
  const router = useRouter();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleLogoClick = () => {
    setIsSheetOpen(true);
  };

  const handleRestartChat = () => {
    // This function will be passed down to ChatBox
    // You might want to use a state management solution or context
    // to handle this more elegantly in a real application
    console.log('Restart chat triggered');
  };

  return (
    <header className="w-full py-4 flex flex-col items-center justify-center" style={{ backgroundColor: '#1c1c1e' }}>
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
      <nav className="flex space-x-8">
        {/* Home Button */}
        <Button asChild variant="ghost">
          <Link href="/" className="flex items-center space-x-3 text-red-50 hover:text-white">
            <img src={homeLogo.src} alt="Home" className="w-8 h-8" />
            <span className="text-lg">Home</span>
          </Link>
        </Button>
        
        {/* Build Button */}
        <Button asChild variant="ghost">
          <Link href="/build" className="flex items-center space-x-3 text-red-50 hover:text-white">
            <img src={buildLogo.src} alt="Build" className="w-8 h-8" />
            <span className="text-lg">Build</span>
          </Link>
        </Button>
        
        {/* Checkin Button */}
        <Button asChild variant="ghost">
          <Link href="/checkin" className="flex items-center space-x-3 text-red-50 hover:text-white">
            <img src={checkinLogo.src} alt="Checkin" className="w-8 h-8" />
            <span className="text-lg">Checkin</span>
          </Link>
        </Button>
      </nav>
    </header>
  );
};

export default Header;
