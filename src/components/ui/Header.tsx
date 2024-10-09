"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from "./button";
import lightLogo from '@/assets/rainbowlab.png';
import darkLogo from '@/assets/lightrainbowlab (2).png';
import SimpleSheet from './simple-sheet';
import { ThemeToggle } from "./themetoggle";
import { useTheme } from "next-themes";
import Lottie from 'lottie-web';

const Header: React.FC = () => {
  const router = useRouter();
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

  const setupAnimation = (selector: string, lightPath: string, darkPath: string) => {
    const container = document.querySelector(selector);
    if (container) {
      const animationPath = theme === 'dark' ? darkPath : lightPath;

      const animation = Lottie.loadAnimation({
        container: container,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: animationPath
      });

      // Set initial frame based on theme
      animation.goToAndStop(0, true);

      const handleMouseEnter = () => {
        animation.stop();
        animation.play();
      };

      container.addEventListener('mouseenter', handleMouseEnter);

      return () => {
        animation.destroy();
        container.removeEventListener('mouseenter', handleMouseEnter);
      };
    }
  };

  useEffect(() => {
    if (!mounted) return; // Ensure component is mounted

    const cleanupHome = setupAnimation('.home-animation', '/animations/homeicon.json', '/animations/homeiconwhite.json');
    const cleanupCheckin = setupAnimation('.checkin-animation', '/animations/calendaricon.json', '/animations/calendariconwhite.json');
    const cleanupBuild = setupAnimation('.build-animation', '/animations/wrench.json', '/animations/wrenchwhite.json');

    return () => {
      cleanupHome && cleanupHome();
      cleanupCheckin && cleanupCheckin();
      cleanupBuild && cleanupBuild();
    };
  }, [theme, mounted]); // Add 'mounted' as a dependency

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
            className="w-30 h-20" // Adjusted size for responsiveness
          />
        </div>
        <nav className="flex flex-wrap justify-center space-x-4 sm:space-x-8 items-center">
          {/* Home Button with Lottie Animation */}
          <Button asChild variant="ghost" className={buttonThemeClass}>
            <Link href="/" className="flex items-center space-x-3">
              <div className="home-animation w-6 h-6"></div> {/* Lottie container */}
              <span className="text-md font-bold">Home</span> {/* Added font-bold */}
            </Link>
          </Button>
          
          {/* Build Button with Lottie Animation */}
          <Button asChild variant="ghost" className={buttonThemeClass}>
            <Link href="/build" className="flex items-center space-x-3">
              <div className="build-animation w-6 h-6"></div> {/* Lottie container */}
              <span className="text-md font-bold">Build</span> {/* Added font-bold */}
            </Link>
          </Button>
          
          {/* Checkin Button with Lottie Animation */}
          <Button asChild variant="ghost" className={buttonThemeClass}>
            <Link href="/checkin" className="flex items-center space-x-3">
              <div className="checkin-animation w-6 h-6"></div> {/* Lottie container */}
              <span className="text-md font-bold">Checkin</span> {/* Added font-bold */}
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
