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
    <header className="w-full py-4 px-6 flex justify-between items-center bg-background">
      <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-4">
        <Menu className="h-6 w-6" />
      </Button>
      <div className="flex-grow flex justify-center">
        <FloatingDock onRestartChat={handleRestartChat} />
      </div>
      <div className="flex items-center space-x-4">
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
