"use client"

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface DropdownMenuProps {
  onSelectionChange: (selected: string[]) => void;
  theme?: string;
  children: React.ReactNode;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ onSelectionChange, theme, children }) => {
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);

  const handleCheckedChange = (item: string) => {
    setSelectedItems(prev => {
      const newSelection = prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item];
      onSelectionChange?.(newSelection);
      return newSelection;
    });
  };

  return (
    <DropdownMenuPrimitive.Root>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { handleCheckedChange, selectedItems, theme } as React.PropsWithChildren<{ handleCheckedChange?: Function; selectedItems?: any[]; theme?: string }>);
        }
        return child;
      })}
    </DropdownMenuPrimitive.Root>
  );
};

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content> & { handleCheckedChange?: (item: string) => void, selectedItems?: string[], theme?: string }
>(({ className, sideOffset = 4, handleCheckedChange, selectedItems = [], theme, ...props }, ref) => {
  const iconClass = theme === 'dark' ? 'filter invert' : '';
  const textClass = theme === 'dark' ? 'text-white' : 'text-black';
  const bgClass = theme === 'dark' ? 'bg-zinc-800' : 'bg-white';

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
                `dropdown-menu z-50 min-w-[16rem] overflow-hidden rounded-md border ${bgClass} p-1 shadow-md ${textClass}`,
                className
              )}
              {...props}
            >
              {["React", "Vue", "Angular", "Svelte", "TailwindCSS"].map(item => (
                <DropdownMenuPrimitive.CheckboxItem
                  key={item}
                  checked={selectedItems.includes(item)}
                  onCheckedChange={() => handleCheckedChange?.(item)}
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
                `dropdown-menu z-50 min-w-[12rem] overflow-hidden rounded-md border ${bgClass} p-1 shadow-md ${textClass}`,
                className
              )}
              {...props}
            >
              {["Node.js", "Express", "Django", "Ruby on Rails", "Spring Boot"].map(item => (
                <DropdownMenuPrimitive.CheckboxItem
                  key={item}
                  checked={selectedItems.includes(item)}
                  onCheckedChange={() => handleCheckedChange?.(item)}
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
                `dropdown-menu z-50 min-w-[12rem] overflow-hidden rounded-md border ${bgClass} p-1 shadow-md ${textClass}`,
                className
              )}
              {...props}
            >
              {["MongoDB", "PostgreSQL", "MySQL", "Redis"].map(item => (
                <DropdownMenuPrimitive.CheckboxItem
                  key={item}
                  checked={selectedItems.includes(item)}
                  onCheckedChange={() => handleCheckedChange?.(item)}
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
                `dropdown-menu z-50 min-w-[12rem] overflow-hidden rounded-md border ${bgClass} p-1 shadow-md ${textClass}`,
                className
              )}
              {...props}
            >
              {["Vercel", "Netlify", "Digital Ocean", "Large Scale Host"].map(item => (
                <DropdownMenuPrimitive.CheckboxItem
                  key={item}
                  checked={selectedItems.includes(item)}
                  onCheckedChange={() => handleCheckedChange?.(item)}
                  onSelect={(event) => event.preventDefault()} // Prevent closing
                  className="dropdown-menu-item flex items-center"
                >
                  <img
                    src={`/icons/${
                      item === "Vercel"
                        ? "vercelmainicon"
                        : item === "Netlify"
                        ? "netlify"
                        : item === "Large Scale Host"
                        ? "cloudmainicon"
                        : item.toLowerCase().replace(/\s+/g, '') + "icon"
                    }.svg`}
                    alt={item}
                    className={`inline-block w-8 h-8 mr-4 ${iconClass}`}
                  />
                  <span className="ml-4">{item}</span>
                  {item === "Vercel" || item === "Netlify" || item === "Digital Ocean" ? (
                    <span className="italic ml-2">recommended</span>
                  ) : item === "Large Scale Host" ? (
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
