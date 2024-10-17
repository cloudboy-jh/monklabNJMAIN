"use client";

import React, { useEffect, useState } from 'react';
import Header from '@/components/ui/Header';
import { useTheme } from "next-themes";
import { SchedulerComponent } from '@/components/ui/scheduler';
import { TechStackSelector } from '@/components/tech-stack-selector'; // Ensure this is a named import

function BuildPage() {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true); // Trigger the fade-in effect
  }, []);

  return (
    <div
      className={`w-full min-h-screen flex flex-col ${theme === 'dark' ? 'bg-zinc-900' : 'bg-gray-100'} transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <Header />
      <main className="flex-1 flex flex-col items-center justify-start p-4 sm:p-6 mt-4">
        <TechStackSelector />
      </main>
      <SchedulerComponent />
    </div>
  );
}

export default BuildPage;
