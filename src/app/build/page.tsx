"use client";

import React, { useState, useEffect } from 'react';
import { useTheme } from "next-themes";
import { SchedulerComponent } from '@/components/ui/scheduler';
import { TechStackSelector } from '@/components/tech-stack-selector';

function BuildPage() {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true); // Trigger the fade-in effect
  }, []);

  const handleSelectionChange = (selection: any) => {
    // Handle the selection change
    console.log('Tech stack selection changed:', selection);
  };

  const handleBuildStart = () => {
    // Handle the build start action
    console.log('Build started');
  };

  return (
    <div
      className={`w-full min-h-screen flex flex-col bg-background text-foreground transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <main className="flex-1 flex flex-col items-center justify-start p-4 sm:p-6 md:p-8">
        <TechStackSelector 
          onSelectionChange={handleSelectionChange}
          onBuildStart={handleBuildStart}
        />
      </main>
      <SchedulerComponent theme={theme} />
    </div>
  );
}
export default BuildPage;

