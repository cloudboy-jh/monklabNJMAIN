"use client";

import React, { useEffect, useState } from 'react';
import ChatBox from '@/components/ui/ChatBox';
import { SchedulerComponent } from '@/components/ui/scheduler';
import { useTheme } from 'next-themes';

const HomePage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setIsVisible(true); // Trigger the fade-in effect
  }, []);

  return (
    <div
      className={`w-full min-h-screen flex flex-col bg-background text-foreground transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-4xl mx-auto rounded-2xl">
          <ChatBox />
        </div>
      </main>
      <SchedulerComponent theme={theme} />
    </div>
  );
};

export default HomePage;
