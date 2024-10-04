import React from 'react';
import ChatBox from '@/components/ui/ChatBox';
import Header from '@/components/ui/Header';
// Updated import path for DatePickerWithRange
import { DatePickerWithRange } from '@/components/ui/date-range-picker'; // Updated path

const HomePage: React.FC = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center" style={{ backgroundColor: '#1c1c1e' }}>
      <Header />
      <main className="flex-1 w-full max-w-7xl flex items-stretch justify-center p-6 gap-6">
        <div className="w-1/2 bg-zinc-800 p-8 rounded-2xl shadow-lg flex flex-col">
          <DatePickerWithRange className="w-full flex-1 flex flex-col" />
        </div>
        <div className="w-1/2 bg-zinc-800 p-8 rounded-2xl shadow-lg h-full"> {/* Added h-full to make it taller */}
          <ChatBox />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
