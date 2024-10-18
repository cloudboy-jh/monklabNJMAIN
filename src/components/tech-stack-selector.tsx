'use client'

import React, { useState, useEffect } from 'react'
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/Progress"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, RotateCcw } from 'lucide-react'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from '@/components/ui/buildpage-dropdown'

const techOptions = {
  'Front End': ['React', 'Vue', 'Angular', 'Svelte', 'TailwindCSS'],
  'Back End': ['Node.js', 'Python', 'Ruby', 'Java', 'Go'],
  'Database': ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Elasticsearch'],
  'Deploy': ['Vercel', 'AWS', 'Google Cloud', 'Heroku', 'DigitalOcean'],
}

const techIcons = {
  'React': '⚛️',
  'Vue': '🖖',
  'Angular': '🅰️',
  'Svelte': '🔥',
  'TailwindCSS': '💨',
  'Node.js': '🟩',
  'Python': '🐍',
  'Ruby': '💎',
  'Java': '☕',
  'Go': '🐹',
  'PostgreSQL': '🐘',
  'MongoDB': '🍃',
  'MySQL': '🐬',
  'Redis': '🔴',
  'Elasticsearch': '🔍',
  'Vercel': '▲',
  'AWS': '☁️',
  'Google Cloud': '☁️',
  'Heroku': '🟣',
  'DigitalOcean': '🌊',
}

interface TechStackSelectorProps {
  onSelectionChange: (selectedStack: string[]) => void;
  onBuildStart: () => void;
}

function TechStackSelector({ onSelectionChange, onBuildStart }: TechStackSelectorProps) {
  const { theme } = useTheme();
  const [startBuild, setStartBuild] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (startBuild) {
      simulateProgress();
    }
  }, [startBuild]);

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
  }

  function handleStartBuild() {
    setStartBuild(true);
    setProgress(0);
    onBuildStart();
  }

  function handleReset() {
    setStartBuild(false);
    setProgress(0);
    onSelectionChange([]);
  }

  return (
    <div className="flex flex-col items-center space-y-4 w-full max-w-3xl">
      <div 
        className={`card w-full p-8 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'} rounded-xl shadow-md`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Select Tech Stack</h2>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleReset}
            className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
          >
            RESET
          </Button>
        </div>
        <DropdownMenu onSelectionChange={onSelectionChange} theme={theme}>
          <DropdownMenuTrigger className="btn mb-6"></DropdownMenuTrigger>
          <DropdownMenuContent />
        </DropdownMenu>
      </div>

      <div 
        className={`card w-full p-4 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'} rounded-xl shadow-md`}
      >
        <h2 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Build Progress</h2>
        <Progress value={progress} className="w-full" />
        <p className={`mt-2 ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>Progress: {progress}%</p>
      </div>

      <Button 
        variant="destructive" 
        size="lg" 
        className="mt-4 rainbow-button"
        onClick={handleStartBuild}
        disabled={startBuild}
      >
        <span className="font-bold">Start Building</span>
      </Button>
    </div>
  );
}

export default TechStackSelector;
