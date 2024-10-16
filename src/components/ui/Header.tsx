"use client";

import React, { useState, useEffect } from 'react';
import { useTheme } from "next-themes";
import SimpleSheet from './simple-sheet';
import { ThemeToggle } from "./themetoggle";
import FloatingDock from './floatingdoc';
import { ChevronRight } from 'lucide-react';

const Header: React.FC = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (theme === 'system') {
      const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDarkScheme ? 'dark' : 'light');
    }
  }, []);

  const handleSheetOpen = () => {
    setIsSheetOpen(true);
  };

  const handleRestartChat = () => {
    // Implement the logic for restarting the chat
    console.log("Restarting chat...");
    // You may want to add more functionality here, such as clearing chat history or resetting state
  };

  if (!mounted) return null;

  return (
    <header className={`w-full py-4 relative ${theme === 'light' ? 'bg-white text-gray-900' : 'bg-zinc-900 text-white'}`}>
      <button
        onClick={handleSheetOpen}
        className="absolute top-4 left-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
        aria-label="Open menu"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="flex flex-col items-center justify-center">
        <SimpleSheet 
          isOpen={isSheetOpen} 
          onOpenChange={setIsSheetOpen}
        />
        <div className="mt-2">
          <FloatingDock onRestartChat={handleRestartChat} />
        </div>
      </div>
    </header>
  );
};

export default Header;
