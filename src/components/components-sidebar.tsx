'use client'

import * as React from "react"
import { ChevronDown, ChevronRight, MoreHorizontal, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

const sidebarItems = [
  {
    title: "Platform",
    items: [
      {
        icon: "🖼️",
        title: "Playground",
        items: ["History", "Starred", "Settings"],
      },
      { icon: "🤖", title: "Models" },
      { icon: "📚", title: "Documentation" },
      { icon: "⚙️", title: "Settings" },
    ],
  },
  {
    title: "Projects",
    items: [
      { icon: "🎨", title: "Design Engineering" },
      { icon: "📊", title: "Sales & Marketing" },
      { icon: "✈️", title: "Travel" },
      { icon: <MoreHorizontal className="h-4 w-4" />, title: "More" },
    ],
  },
]

interface SidebarComponentProps {
  isOpen: boolean;
}

export function SidebarComponent({ isOpen }: SidebarComponentProps) {
  return (
    <div className={`flex h-screen ${isOpen ? 'w-64' : 'w-0'} transition-all duration-300 ease-in-out overflow-hidden`}>
      <div className="flex h-screen w-64 flex-col bg-zinc-900 text-white">
        <div className="flex items-center gap-3 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-600">
            <span className="text-xl">📁</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold">Acme Inc</h1>
            <p className="text-sm text-zinc-400">Enterprise</p>
          </div>
          <Button variant="ghost" size="icon" className="ml-auto">
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
        <nav className="flex-1 overflow-y-auto p-2">
          {sidebarItems.map((section) => (
            <div key={section.title} className="mb-4">
              <h2 className="mb-2 px-4 text-sm font-semibold text-zinc-400">{section.title}</h2>
              {section.items.map((item) => (
                <SidebarItem key={item.title} item={item} />
              ))}
            </div>
          ))}
        </nav>
      </div>
    </div>
  )
}

function SidebarItem({ item }: { item: { icon: React.ReactNode; title: string; items?: string[] } }) {
  const [isOpen, setIsOpen] = React.useState(false)

  if (item.items) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "flex w-full items-center justify-between px-4 py-2 text-left text-sm font-medium",
              isOpen && "bg-zinc-800"
            )}
          >
            <span className="flex items-center gap-3">
              <span className="text-lg">{item.icon}</span>
              {item.title}
            </span>
            <ChevronRight className={cn("h-4 w-4 transition-transform", isOpen && "rotate-90")} />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          {item.items.map((subItem) => (
            <Button
              key={subItem}
              variant="ghost"
              className="w-full justify-start pl-12 text-left text-sm font-normal"
            >
              {subItem}
            </Button>
          ))}
        </CollapsibleContent>
      </Collapsible>
    )
  }

  return (
    <Button
      variant="ghost"
      className="flex w-full items-center justify-between px-4 py-2 text-left text-sm font-medium"
    >
      <span className="flex items-center gap-3">
        <span className="text-lg">{item.icon}</span>
        {item.title}
      </span>
      {item.title === "Settings" && <Settings className="h-4 w-4" />}
    </Button>
  )
}
