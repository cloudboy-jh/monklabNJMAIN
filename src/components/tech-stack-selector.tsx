'use client'

import { useState, useEffect } from 'react'
import { RotateCcw } from 'lucide-react'
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
import { useTheme } from "next-themes"

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
