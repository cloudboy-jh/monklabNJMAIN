import React from 'react';
import Link from 'next/link';
import { useTheme } from "next-themes";
import { BrainCircuit, Home, Wrench } from 'lucide-react'; // Import BrainCircuit icon

export default function FloatingDock() {
  const { theme } = useTheme();

  const dockItems = [
    { icon: BrainCircuit, label: "Menu", href: "#" }, // Add BrainCircuit as the first item
    { icon: Home, label: "Home", href: "/" },
    { icon: Wrench, label: "Build", href: "/build" },
  ];

  return (
    <nav className={`${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-200'} bg-opacity-90 rounded-full px-4 py-2 backdrop-blur-sm`}>
      <div className="flex items-center justify-center space-x-4">
        {dockItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={`group flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ease-in-out hover:bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 ${
              theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-300'
            } ${index === 0 ? 'mr-2' : ''}`} // Add extra margin to the right of the BrainCircuit icon
            aria-label={item.label}
          >
            <item.icon className="w-5 h-5" />
          </Link>
        ))}
      </div>
    </nav>
  );
}
