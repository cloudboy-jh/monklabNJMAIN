"use client"

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

const DropdownMenu = DropdownMenuPrimitive.Root
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => {
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
  const { theme } = useTheme();

  const handleCheckedChange = (item: string) => {
    setSelectedItems(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const iconClass = theme === 'dark' ? 'filter invert' : '';
  const textClass = theme === 'dark' ? 'text-white' : 'text-black';

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex justify-center space-x-20">
        {/* Front End dropdown */}
        <DropdownMenuPrimitive.Root>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="dropdown-trigger">
              Front End
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuPrimitive.Portal>
            <DropdownMenuPrimitive.Content
              ref={ref}
              sideOffset={sideOffset}
              className={cn(
                `dropdown-menu z-50 min-w-[16rem] overflow-hidden rounded-md border bg-white p-1 shadow-md ${textClass}`,
                className
              )}
              {...props}
            >
              {["React", "Vue", "Angular", "Svelte", "TailwindCSS"].map(item => (
                <DropdownMenuPrimitive.CheckboxItem
                  key={item}
                  checked={selectedItems.includes(item)}
                  onCheckedChange={() => handleCheckedChange(item)}
                  onSelect={(event) => event.preventDefault()} // Prevent closing
                  className="dropdown-menu-item flex items-center"
                >
                  <img
                    src={`/icons/${
                      item === "TailwindCSS"
                        ? "tailwindicon"
                        : item.toLowerCase() + "icon"
                    }.svg`}
                    alt={item}
                    className={`inline-block w-8 h-8 mr-4 ${iconClass}`}
                  />
                  <span className="ml-4">{item}</span>
                </DropdownMenuPrimitive.CheckboxItem>
              ))}
            </DropdownMenuPrimitive.Content>
          </DropdownMenuPrimitive.Portal>
        </DropdownMenuPrimitive.Root>

        {/* Back End dropdown */}
        <DropdownMenuPrimitive.Root>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="dropdown-trigger">
              Back End
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuPrimitive.Portal>
            <DropdownMenuPrimitive.Content
              ref={ref}
              sideOffset={sideOffset}
              className={cn(
                `dropdown-menu z-50 min-w-[12rem] overflow-hidden rounded-md border bg-white p-1 shadow-md ${textClass}`,
                className
              )}
              {...props}
            >
              {["Node.js", "Express", "Django", "Ruby on Rails", "Spring Boot"].map(item => (
                <DropdownMenuPrimitive.CheckboxItem
                  key={item}
                  checked={selectedItems.includes(item)}
                  onCheckedChange={() => handleCheckedChange(item)}
                  onSelect={(event) => event.preventDefault()} // Prevent closing
                  className="dropdown-menu-item flex items-center"
                >
                  <img
                    src={`/icons/${
                      item === "Node.js"
                        ? "nodejsicon"
                        : item === "Ruby on Rails"
                        ? "rubyicon"
                        : item.toLowerCase().replace(/\s+/g, '') + "icon"
                    }.svg`}
                    alt={item}
                    className={`inline-block w-8 h-8 mr-4 ${iconClass}`}
                  />
                  <span className="ml-4">{item}</span>
                </DropdownMenuPrimitive.CheckboxItem>
              ))}
            </DropdownMenuPrimitive.Content>
          </DropdownMenuPrimitive.Portal>
        </DropdownMenuPrimitive.Root>

        {/* Database dropdown */}
        <DropdownMenuPrimitive.Root>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="dropdown-trigger">
              Database
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuPrimitive.Portal>
            <DropdownMenuPrimitive.Content
              ref={ref}
              sideOffset={sideOffset}
              className={cn(
                `dropdown-menu z-50 min-w-[12rem] overflow-hidden rounded-md border bg-white p-1 shadow-md ${textClass}`,
                className
              )}
              {...props}
            >
              {["MongoDB", "PostgreSQL", "MySQL", "Redis"].map(item => (
                <DropdownMenuPrimitive.CheckboxItem
                  key={item}
                  checked={selectedItems.includes(item)}
                  onCheckedChange={() => handleCheckedChange(item)}
                  onSelect={(event) => event.preventDefault()} // Prevent closing
                  className="dropdown-menu-item flex items-center"
                >
                  <img src={`/icons/${item.toLowerCase().replace('postgresql', 'postgre')}icon.svg`} alt={item} className={`inline-block w-8 h-8 mr-4 ${iconClass}`} />
                  <span className="ml-4">{item}</span>
                </DropdownMenuPrimitive.CheckboxItem>
              ))}
            </DropdownMenuPrimitive.Content>
          </DropdownMenuPrimitive.Portal>
        </DropdownMenuPrimitive.Root>

        {/* Deploy dropdown */}
        <DropdownMenuPrimitive.Root>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="dropdown-trigger">
              Deploy
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuPrimitive.Portal>
            <DropdownMenuPrimitive.Content
              ref={ref}
              sideOffset={sideOffset}
              className={cn(
                `dropdown-menu z-50 min-w-[12rem] overflow-hidden rounded-md border bg-white p-1 shadow-md ${textClass}`,
                className
              )}
              {...props}
            >
              {["Vercel", "Netlify", "Digital Ocean", "Cloud Hosting"].map(item => (
                <DropdownMenuPrimitive.CheckboxItem
                  key={item}
                  checked={selectedItems.includes(item)}
                  onCheckedChange={() => handleCheckedChange(item)}
                  onSelect={(event) => event.preventDefault()} // Prevent closing
                  className="dropdown-menu-item flex items-center"
                >
                  <img
                    src={`/icons/${
                      item === "Vercel"
                        ? "vercelmainicon"
                        : item === "Netlify"
                        ? "netlify"
                        : item === "Cloud Hosting"
                        ? "cloudmainicon"
                        : item.toLowerCase().replace(/\s+/g, '') + "icon"
                    }.svg`}
                    alt={item}
                    className={`inline-block w-8 h-8 mr-4 ${iconClass}`}
                  />
                  <span className="ml-4">{item}</span>
                  {item === "Vercel" || item === "Netlify" || item === "Digital Ocean" ? (
                    <span className="italic ml-2">recommended</span>
                  ) : item === "Cloud Hosting" ? (
                    <span className="ml-2 bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 text-transparent bg-clip-text shine">Coming Soon</span>
                  ) : null}
                </DropdownMenuPrimitive.CheckboxItem>
              ))}
            </DropdownMenuPrimitive.Content>
          </DropdownMenuPrimitive.Portal>
        </DropdownMenuPrimitive.Root>
      </div>
    </div>
  );
});
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
}