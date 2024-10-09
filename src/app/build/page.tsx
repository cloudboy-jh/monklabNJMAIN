"use client";

import React, { useEffect, useState } from 'react';
import Header from '@/components/ui/Header';
import { Progress } from '@/components/ui/Progress';
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from '@/components/ui/buildpage-dropdown';

function BuildPage() {
  const [stackItems, setStackItems] = useState<string[]>([]);
  const [progress, setProgress] = useState<number>(0);
  const { theme } = useTheme();
  const [startBuild, setStartBuild] = useState(false);

  useEffect(() => {
    loadTechStack();
  }, []);

  function simulateProgress() {
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 10;
      });
    }, 1000);
  }

  function loadTechStack() {
    const items = [
      'Front-End: React, TailwindCSS',
      'Back-End: Node.js, Express',
      'DB/Deploy: MongoDB, AWS S3'
    ];

    items.forEach((item, index) => {
      setTimeout(() => {
        setStackItems(prevItems => {
          return prevItems.includes(item) ? prevItems : [...prevItems, item];
        });
      }, index * 2000);
    });
  }

  function startBuilding() {
    setStartBuild(true);
    simulateProgress();
  }

  const isDarkMode = theme === 'dark';

  return (
    <div className={`w-full min-h-screen flex flex-col ${isDarkMode ? 'bg-zinc-900' : 'bg-gray-100'}`}>
      <Header />
      <main className="flex flex-col items-center justify-start p-4 sm:p-6 mt-4">
        <div 
          className={`card w-full max-w-3xl sm:max-w-4xl mb-80 p-8 ${isDarkMode ? 'bg-zinc-800' : 'bg-white'} rounded-md shadow-md`} 
          style={{ minHeight: '500px', width: '900px' }} // Adjust width and maxWidth
        >
          <h2 className="text-center text-2xl font-bold mb-4">Select Tech Stack</h2>
          <DropdownMenu>
            <DropdownMenuTrigger className="btn mb-6"></DropdownMenuTrigger>
            <DropdownMenuContent />
          </DropdownMenu>
        </div>

        <div 
          className={`card w-full max-w-md sm:max-w-lg mb-6 p-4 ${isDarkMode ? 'bg-zinc-800' : 'bg-white'} rounded-md shadow-md`} 
        >
          <h2 className={`text-xl sm:text-2xl font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Build Progress</h2>
          <Progress value={progress} className="w-full" />
          <p className={`mt-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>Progress: {progress}%</p>
        </div>
        
        <Button 
          variant="destructive" 
          size="lg" 
          className="mt-4"
          onClick={startBuilding}
        >
          Start Building
        </Button>
      </main>
    </div>
  );
}

export default BuildPage;