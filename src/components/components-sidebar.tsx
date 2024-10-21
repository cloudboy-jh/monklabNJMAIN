'use client'

import React, { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

interface SidebarComponentProps {
  isOpen: boolean;
}

export function SidebarComponent({ isOpen }: SidebarComponentProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className={`flex h-screen ${isOpen ? 'w-64' : 'w-0'} transition-all duration-300 ease-in-out overflow-hidden`}>
      <div className="w-64 h-screen bg-background border-r flex flex-col">
        <div className="p-4">
          <Button
            variant="ghost"
            className="w-full justify-between text-left"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div>
              <h2 className="text-lg font-semibold">MonkLab</h2>
              <p className="text-sm text-muted-foreground">Enterprise</p>
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </Button>
          {isDropdownOpen && (
            <div className="mt-2 border-t pt-2">
              <Button variant="ghost" className="w-full justify-start px-4 py-2 hover:bg-accent hover:text-accent-foreground">
                Profile
              </Button>
              <Button variant="ghost" className="w-full justify-start px-4 py-2 hover:bg-accent hover:text-accent-foreground">
                Switch Account
              </Button>
              <Button variant="ghost" className="w-full justify-start px-4 py-2 hover:bg-accent hover:text-accent-foreground">
                Logout
              </Button>
            </div>
          )}
        </div>
        <nav className={`space-y-4 flex-grow overflow-y-auto ${isDropdownOpen ? 'mt-2' : ''}`}>
          <div>
            <h3 className="px-4 text-sm font-medium text-muted-foreground">Platform</h3>
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start">
                <span className="mr-2 text-xl">💻</span>
                Dashboard
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <span className="mr-2 text-xl">🧪</span>
                Playground
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <span className="mr-2 text-xl">🔨</span>
                Build Center
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <span className="mr-2 text-xl">📚</span>
                Documentation
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <span className="mr-2 text-xl">⚙️</span>
                Settings
              </Button>
            </div>
          </div>
          <div>
            <h3 className="px-4 text-sm font-medium text-muted-foreground">Projects</h3>
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start">
                <span className="mr-2 text-xl">🗂️</span>
                Your Projects
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <span className="mr-2 text-xl">🆕</span>
                Create New Project
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <span className="mr-2 text-xl">🛠️</span>
                Templates
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <span className="mr-2 text-xl">👥</span>
                Collaborations
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <span className="mr-2 text-xl">🔗</span>
                Integrations
              </Button>
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}
