"use client";

import React, { useEffect, useState } from 'react';
import Header from '@/components/ui/Header';
import { Progress } from '@/components/ui/Progress';
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from '@/components/ui/buildpage-dropdown';
import CodeBox from '@/components/ui/CodeBox';
import { SchedulerComponent } from '@/components/ui/scheduler';

function BuildPage() {
  const [stackItems, setStackItems] = useState<string[]>([]);
  const [progress, setProgress] = useState<number>(0);
  const { theme } = useTheme();
  const [startBuild, setStartBuild] = useState(false);
  const [selectedTechStack, setSelectedTechStack] = useState<string[]>([]);
  const [showCodeBox, setShowCodeBox] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    loadTechStack();
    setIsVisible(true); // Trigger the fade-in effect
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
    setShowCodeBox(true);
    setProgress(0); // Ensure progress starts at 0 when building starts
    simulateProgress();
  }

  function resetBuild() {
    setStartBuild(false);
    setProgress(0); // Reset progress to 0
    setShowCodeBox(false);
    setSelectedTechStack([]);
  }

  return (
    <div
      className={`w-full min-h-screen flex flex-col ${theme === 'dark' ? 'bg-zinc-900' : 'bg-gray-100'} transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <Header />
      <main className="flex flex-col items-center justify-start p-4 sm:p-6 mt-4">
        <div className="flex flex-col items-center space-y-4">
          <div 
            className={`card w-full max-w-3xl sm:max-w-4xl p-8 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'} rounded-xl shadow-md transition-transform duration-500 ${startBuild ? 'transform -translate-x-1/2' : ''}`} 
            style={{ minHeight: '500px', width: '900px' }}
          >
            <div className="flex justify-center items-center mb-4 relative">
              <h2 className="text-center text-2xl font-bold">Select Tech Stack</h2>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={resetBuild}
                className={`absolute right-0 font-bold transition-transform duration-500 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
              >
                RESET
              </Button>
            </div>
            <DropdownMenu onSelectionChange={setSelectedTechStack} theme={theme}>
              <DropdownMenuTrigger className="btn mb-6"></DropdownMenuTrigger>
              <DropdownMenuContent />
            </DropdownMenu>
          </div>

          <div 
            className={`card w-full max-w-3xl sm:max-w-4xl p-4 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'} rounded-xl shadow-md transition-transform duration-500 ${startBuild ? 'transform -translate-x-1/2' : ''}`} 
            style={{ width: '900px' }}
          >
            <h2 className={`text-xl sm:text-2xl font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Build Progress</h2>
            <Progress value={progress} className="w-full" />
            <p className={`mt-2 ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>Progress: {progress}%</p>
          </div>

          <div className="flex justify-center w-full">
            <Button 
              variant="destructive" 
              size="lg" 
              className={`mt-4 transition-transform duration-500 ${startBuild ? 'transform -translate-x-1/2' : ''} rainbow-button`}
              onClick={startBuilding}
            >
              <span className="font-bold">Start Building</span>
            </Button>
          </div>
        </div>

        {showCodeBox && (
          <div className="code-box w-full max-w-md sm:max-w-lg p-4 bg-white rounded-md shadow-md transition-transform duration-500 transform translate-x-full mt-[-760px]">
            <CodeBox selectedTechStack={selectedTechStack} />
          </div>
        )}
      </main>
      <SchedulerComponent />
    </div>
  );
}

export default BuildPage;
