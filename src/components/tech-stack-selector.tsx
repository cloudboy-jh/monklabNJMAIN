'use client'

<<<<<<< HEAD
import React, { useState, useEffect } from 'react'
import { useTheme } from "next-themes"
=======
import { useState, useEffect } from 'react'
import { RotateCcw } from 'lucide-react'
>>>>>>> 5a9069a8006a4f01daa5bc76cad7566014428bd2
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
<<<<<<< HEAD
import { ChevronDown, RotateCcw } from 'lucide-react'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from '@/components/ui/buildpage-dropdown'
=======
import { useTheme } from "next-themes"
>>>>>>> 5a9069a8006a4f01daa5bc76cad7566014428bd2

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

<<<<<<< HEAD
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
=======
export function TechStackSelector() {
  const [selected, setSelected] = useState<Record<keyof typeof techOptions, string | undefined>>({
    'Front End': undefined,
    'Back End': undefined,
    'Database': undefined,
    'Deploy': undefined,
  })
  const [progress, setProgress] = useState(0)
  const [isBuilding, setIsBuilding] = useState(false)
  const [cliCommands, setCliCommands] = useState<string[]>([])
  const { theme } = useTheme()

  const handleSelect = (category: keyof typeof techOptions, value: string) => {
    setSelected(prev => ({ ...prev, [category]: value }))
    updateProgress()
  }

  const handleReset = () => {
    setSelected({
      'Front End': undefined,
      'Back End': undefined,
      'Database': undefined,
      'Deploy': undefined,
    })
    setProgress(0)
    setIsBuilding(false)
    setCliCommands([])
  }

  const updateProgress = () => {
    const totalCategories = Object.keys(techOptions).length
    const selectedCategories = Object.values(selected).filter(Boolean).length
    setProgress((selectedCategories / totalCategories) * 100)
  }

  const handleStartBuilding = () => {
    setIsBuilding(true)
    generateCliCommands()
  }

  const generateCliCommands = () => {
    const commands = []
    if (selected['Front End'] === 'React') {
      commands.push('npx create-react-app my-app')
    } else if (selected['Front End'] === 'Vue') {
      commands.push('npm init vue@latest my-app')
    }
    if (selected['Back End'] === 'Node.js') {
      commands.push('npm init -y')
      commands.push('npm install express')
    }
    if (selected['Database'] === 'MongoDB') {
      commands.push('npm install mongodb')
    }
    if (selected['Deploy'] === 'Vercel') {
      commands.push('npm install -g vercel')
      commands.push('vercel')
    }
    setCliCommands(commands)
  }

  useEffect(() => {
    if (isBuilding) {
      const timer = setInterval(() => {
        setCliCommands(prev => {
          if (prev.length < 5) {
            setProgress(prevProgress => Math.min(prevProgress + 20, 100))
            return [...prev, `# Generating command ${prev.length + 1}...`]
          } else {
            clearInterval(timer)
            return prev
          }
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [isBuilding])

  return (
    <div className={`max-w-[1600px] mx-auto p-8 rounded-xl shadow-xl ${theme === 'dark' ? 'bg-zinc-700 text-white' : 'bg-white text-gray-900'}`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Select Tech Stack</h1>
        <Button variant="outline" size="lg" onClick={handleReset}>
          <RotateCcw className="mr-2 h-5 w-5" />
          RESET
        </Button>
      </div>
      
      <div className="flex">
        <motion.div 
          className="grid grid-cols-2 gap-6 mb-8"
          animate={isBuilding ? { width: '50%' } : { width: '100%' }}
        >
          {Object.entries(techOptions).map(([category, options]) => (
            <div key={category}>
              <label className={`block text-xl font-medium mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{category}</label>
              <Select onValueChange={(value: string) => handleSelect(category as keyof typeof techOptions, value)}>
                <SelectTrigger className={`w-full text-lg py-4 ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}>
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {options.map((option) => (
                      <SelectItem key={option} value={option} className={`text-lg py-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        <span className="flex items-center">
                          {techIcons[option as keyof typeof techIcons] && <span className="mr-4 text-2xl">{techIcons[option as keyof typeof techIcons]}</span>}
                          {option}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          ))}
        </motion.div>

        <AnimatePresence>
          {isBuilding && (
            <motion.div 
              className="w-1/2 ml-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h2 className="text-3xl font-semibold mb-5">Generated CLI Commands</h2>
              <div className={`p-8 rounded-xl font-mono text-lg ${theme === 'dark' ? 'bg-gray-900 text-green-400' : 'bg-gray-100 text-green-600'}`}>
                {cliCommands.map((command, index) => (
                  <div key={index} className="mb-3">{command}</div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="mb-12">
        <h2 className="text-3xl font-semibold mb-5">Build Progress</h2>
        <Progress value={progress} className={`w-full h-6 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
          <div
            className="h-full bg-lime-300 transition-all duration-500 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </Progress>
        <p className={`text-xl mt-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Progress: {progress.toFixed(0)}%</p>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Selected Stack</h2>
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          {Object.entries(selected).map(([category, value]) => (
            <div key={category} className="bg-opacity-10 bg-gray-500 rounded-lg p-4">
              <h3 className="font-medium mb-2">{category}</h3>
              <p>{value || 'Not selected'}</p>
            </div>
          ))}
        </div>
      </div>
      
      <Button 
        className={`w-full text-white text-lg py-3 ${
          theme === 'dark' 
            ? 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600' 
            : 'bg-gradient-to-r from-orange-400 to-yellow-400 hover:from-orange-500 hover:to-yellow-500'
        }`}
        onClick={handleStartBuilding}
        disabled={isBuilding}
      >
        {isBuilding ? 'Building...' : 'Start Building'}
      </Button>
    </div>
  )
}
>>>>>>> 5a9069a8006a4f01daa5bc76cad7566014428bd2
