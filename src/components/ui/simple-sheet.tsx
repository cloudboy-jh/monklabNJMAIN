"use client"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet"
import { Home, RefreshCw, Settings } from "lucide-react"
import Link from 'next/link'

interface SimpleSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onRestartChat: () => void;
}

export default function SimpleSheet({ isOpen, onOpenChange, onRestartChat }: SimpleSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="bg-[#1c1c1e] text-red-500 border-r border-gray-700">
        <h2 className="text-lg font-semibold mb-4 text-red-500">Menu</h2>
        <div className="flex flex-col gap-4">
          <Button asChild variant="ghost" className="justify-start hover:bg-gray-800">
            <Link href="/">
              <Home className="mr-2 h-4 w-4 text-red-500" />
              <span className="text-red-500">Home</span>
            </Link>
          </Button>
          <Button 
            variant="ghost" 
            className="justify-start hover:bg-gray-800"
            onClick={() => {
              onRestartChat();
              onOpenChange(false);
            }}
          >
            <RefreshCw className="mr-2 h-4 w-4 text-red-500" />
            <span className="text-red-500">Restart Chat</span>
          </Button>
          <Button variant="ghost" className="justify-start hover:bg-gray-800">
            <Settings className="mr-2 h-4 w-4 text-red-500" />
            <span className="text-red-500">Settings</span>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}