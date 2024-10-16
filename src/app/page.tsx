"use client";

import React, { useEffect, useState } from 'react';
import ChatBox from '@/components/ui/ChatBox';
import Header from '@/components/ui/Header';
import { SchedulerComponent } from '@/components/ui/scheduler';

const HomePage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true); // Trigger the fade-in effect
  }, []);

  return (
    <div
      className={`w-full min-h-screen flex flex-col items-center bg-background text-foreground transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <Header />
      <main className="flex-1 w-full flex flex-col items-center justify-center">
        <div className="w-full max-w-4xl p-4 sm:p-6 md:p-8 rounded-2xl">
          <ChatBox />
        </div>
      </main>
      <SchedulerComponent />
    </div>
  );
};

export default HomePage;
