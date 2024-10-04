"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from "./button";
import monkLogo from '@/assets/ModernMonkLablogo.svg';
import homeLogo from '@/assets/home-logo-removebg-preview.png';
import buildLogo from '@/assets/hammer-crash.png';
import checkinLogo from '@/assets/calendar-clock.png';

const Header: React.FC = () => {
  const router = useRouter();

  const handleLogoClick = () => {
    console.log('Chat has been reset');
    router.push('/');
  };

  return (
    <header className="w-full py-4 flex flex-col items-center justify-center" style={{ backgroundColor: '#1c1c1e' }}>
      <div className="logo-container cursor-pointer mb-4" onClick={handleLogoClick}>
        <img 
          src={monkLogo.src} 
          alt="Monk Logo" 
          className="w-24 h-24" // Logo size remains the same
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
