"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/components/ui/Header';
import { useTheme } from "next-themes";
import { SchedulerComponent } from '@/components/ui/scheduler';
<<<<<<< HEAD
import TechStackSelector from '@/components/tech-stack-selector';
=======
import { TechStackSelector } from '@/components/tech-stack-selector'; // Ensure this is a named import
>>>>>>> 5a9069a8006a4f01daa5bc76cad7566014428bd2

function BuildPage() {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
<<<<<<< HEAD
    setIsVisible(true);
  }, []);

  const handleSelectionChange = (selection: any) => {
    // Handle the selection change
    console.log('Tech stack selection changed:', selection);
  };

  const handleBuildStart = () => {
    // Handle the build start action
    console.log('Build started');
  };

=======
    setIsVisible(true); // Trigger the fade-in effect
  }, []);

>>>>>>> 5a9069a8006a4f01daa5bc76cad7566014428bd2
  return (
    <div
      className={`w-full min-h-screen flex flex-col ${theme === 'dark' ? 'bg-zinc-900' : 'bg-gray-100'} transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <Header />
<<<<<<< HEAD
      <main className="flex flex-col items-center justify-start p-4 sm:p-6 mt-4">
        <TechStackSelector 
          onSelectionChange={handleSelectionChange}
          onBuildStart={handleBuildStart}
        />
=======
      <main className="flex-1 flex flex-col items-center justify-start p-4 sm:p-6 mt-4">
        <TechStackSelector />
>>>>>>> 5a9069a8006a4f01daa5bc76cad7566014428bd2
      </main>
      <SchedulerComponent />
    </div>
  );
}

export default BuildPage;
