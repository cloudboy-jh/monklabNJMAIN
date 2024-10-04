import React from 'react';
import ChatBox from '@/components/ui/ChatBox';
import Header from '@/components/ui/Header';

const HomePage: React.FC = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center" style={{ backgroundColor: '#1c1c1e' }}>
      <Header />
      <main className="flex-1 w-full max-w-5xl flex items-center justify-center p-6">
        <div className="w-full bg-zinc-800 p-8 rounded-2xl shadow-lg"> {/* Lighter gray */}
          <ChatBox />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
