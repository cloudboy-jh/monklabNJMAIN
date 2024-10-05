import React from 'react';
import ChatBox from '@/components/ui/ChatBox';
import Header from '@/components/ui/Header';

const HomePage: React.FC = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-background text-foreground relative">
      <Header />
      <main className="flex-1 w-full max-w-5xl flex flex-col items-center justify-center p-6">
        <div className="w-full p-8 rounded-2xl shadow-lg">
          <ChatBox />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
