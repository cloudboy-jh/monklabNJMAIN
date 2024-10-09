"use client";

import React, { useEffect, useState } from 'react';
import Header from '@/components/ui/Header';
import { Progress } from '@/components/ui/Progress';
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

function BuildPage() {
  const [stackItems, setStackItems] = useState<string[]>([]);
  const [progress, setProgress] = useState<number>(0);
  const { theme } = useTheme();

  useEffect(() => {
    loadTechStack();
    simulateProgress();
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

    return () => clearInterval(interval);
  }

  function loadTechStack() {
    const items = [
      'Front-End: React, TailwindCSS',
      'Back-End: Node.js, Express',
      'DB/Deploy: MongoDB, AWS S3'
    ];

    items.forEach((item, index) => {
      setTimeout(() => {
        setStackItems(prevItems => [...prevItems, item]);
      }, index * 2000);
    });
  }

  const isDarkMode = theme === 'dark';

  return (
    <div className={`w-full min-h-screen flex flex-col ${isDarkMode ? 'bg-zinc-900' : 'bg-gray-100'}`}>
      <Header />
      <main className="flex flex-col items-center justify-start p-4 sm:p-6 mt-10">
        <h1 className={`text-2xl sm:text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Build Your Project</h1>
        <div className={`card w-full max-w-md sm:max-w-lg mb-6 p-4 ${isDarkMode ? 'bg-zinc-800' : 'bg-white'} rounded-md shadow-md`}>
          <h2 className={`text-xl sm:text-2xl font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Build Progress</h2>
          <Progress value={progress} className="w-full" />
          <p className={`mt-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>Progress: {progress}%</p>
        </div>
        <div className={`card w-full max-w-md sm:max-w-lg mb-6 p-4 ${isDarkMode ? 'bg-zinc-800' : 'bg-white'} rounded-md shadow-md`}>
          <h2 className={`text-xl sm:text-2xl font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Tech Stack</h2>
          <ul id="stack-list" className={isDarkMode ? 'text-white' : 'text-gray-700'}>
            {stackItems.map((item, index) => (
              <li key={index} className="stack-item">{item}</li>
            ))}
          </ul>
        </div>
        <div className={`card w-full max-w-md sm:max-w-lg mb-6 p-4 ${isDarkMode ? 'bg-zinc-800' : 'bg-white'} rounded-md shadow-md`}>
          <h2 className={`text-xl sm:text-2xl font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Build Configuration</h2>
          <p className={isDarkMode ? 'text-white' : 'text-gray-700'}>Customize your project settings and dependencies here.</p>
        </div>
        <Button 
          variant="destructive" 
          size="lg" 
          className="mt-4"
        >
          Start Building
        </Button>
      </main>
    </div>
  );
}

export default BuildPage;
