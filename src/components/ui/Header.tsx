"use client";

import React from 'react';
import { useTheme } from 'next-themes';
import { ThemeToggle } from './themetoggle';
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import FloatingDock from './floatingdoc';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { theme } = useTheme();

  const handleRestartChat = () => {
    // Implement chat restart logic here
    console.log('Restarting chat...');
  };

  return (
    <header className="w-full py-4 flex justify-between items-center bg-background relative px-4 sm:px-6 lg:px-8">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleSidebar} 
        className="z-10"
      >
        <Menu className="h-6 w-6" />
      </Button>
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <FloatingDock onRestartChat={handleRestartChat} />
      </div>
      <div className="z-10">
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
