"use client"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet"
import { Home, RefreshCw, Settings } from "lucide-react"
import Link from 'next/link'
import { useTheme } from "next-themes"

interface SimpleSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onRestartChat: () => void;
}

export default function SimpleSheet({ isOpen, onOpenChange, onRestartChat }: SimpleSheetProps) {
  const { theme } = useTheme()

  const bgColor = theme === 'dark' ? 'bg-zinc-800' : 'bg-white';
  const textColor = theme === 'dark' ? 'text-white' : 'text-black';
  const hoverBgColor = theme === 'dark' ? 'hover:bg-zinc-700' : 'hover:bg-gray-100';
  const borderColor = theme === 'dark' ? 'border-zinc-700' : 'border-gray-200';

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="left" className={`${bgColor} ${textColor} border-r ${borderColor}`}>
        <h2 className={`text-lg font-semibold mb-4 ${textColor}`}>Menu</h2>
        <div className="flex flex-col gap-4">
          <Button asChild variant="ghost" className={`justify-start ${hoverBgColor}`}>
            <Link href="/">
              <Home className={`mr-2 h-4 w-4 ${textColor}`} />
              <span>Home</span>
            </Link>
          </Button>
          <Button 
            variant="ghost" 
            className={`justify-start ${hoverBgColor}`}
            onClick={() => {
              onRestartChat();
              onOpenChange(false);
            }}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${textColor}`} />
            <span>Restart Chat</span>
          </Button>
          <Button variant="ghost" className={`justify-start ${hoverBgColor}`}>
            <Settings className={`mr-2 h-4 w-4 ${textColor}`} />
            <span>Settings</span>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}