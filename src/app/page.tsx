import React from 'react';
import ChatBox from '@/components/ui/ChatBox';
import Header from '@/components/ui/Header';

const HomePage: React.FC = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-background text-foreground">
      <Header />
      <main className="flex-1 w-full flex flex-col items-center justify-center">
        <div className="w-full max-w-4xl p-0 rounded-2xl"> {/* Adjusted padding */}
          <ChatBox />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
