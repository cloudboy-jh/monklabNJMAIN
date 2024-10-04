"use client";

import React, { useEffect, useState } from 'react';
import Header from '@/components/ui/Header';
import { Progress } from '@/components/ui/Progress';

function BuildPage() {
  const [stackItems, setStackItems] = useState<string[]>([]);
  const [progress, setProgress] = useState<number>(0);

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

  return (
    <div className="w-full h-screen flex flex-col bg-zinc-900">
      <Header />
      <main className="flex flex-col items-center justify-start p-6 mt-10">
        <h1 className="text-3xl font-bold mb-6 text-white">Build Your Project</h1>
        <div className="card w-full max-w-lg mb-6 p-4 bg-zinc-800 rounded-md">
          <h2 className="text-2xl font-semibold mb-3 text-white">Build Progress</h2>
          <Progress value={progress} className="w-full" />
          <p className="mt-2 text-white">Progress: {progress}%</p>
        </div>
        <div className="card w-full max-w-lg mb-6 p-4 bg-zinc-800 rounded-md">
          <h2 className="text-2xl font-semibold mb-3 text-white">Tech Stack</h2>
          <ul id="stack-list" className="text-white">
            {stackItems.map((item, index) => (
              <li key={index} className="stack-item">{item}</li>
            ))}
          </ul>
        </div>
        <div className="card w-full max-w-lg mb-6 p-4 bg-zinc-800 rounded-md">
          <h2 className="text-2xl font-semibold mb-3 text-white">Build Configuration</h2>
          <p className="text-white">Customize your project settings and dependencies here.</p>
        </div>
        <button className="nav-button nav-button-large">
          <span className="nav-text-large text-white">Start Building</span>
        </button>
      </main>
    </div>
  );
}

export default BuildPage;
