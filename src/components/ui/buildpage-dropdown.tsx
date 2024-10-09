"use client"

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

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
      <div className="flex justify-center space-x-4">
        <DropdownMenuPrimitive.Root>
          <DropdownMenuTrigger className="dropdown-trigger">
            Front End
          </DropdownMenuTrigger>
          <DropdownMenuPrimitive.Portal>
            <DropdownMenuPrimitive.Content
              ref={ref}
              sideOffset={sideOffset}
              className={cn(
                `dropdown-menu z-50 min-w-[8rem] overflow-hidden rounded-md border bg-white p-1 shadow-md ${textClass}`,
                className
              )}
              {...props}
            >
              <DropdownMenuPrimitive.CheckboxItem
                checked={selectedItems.includes("React")}
                onCheckedChange={() => handleCheckedChange("React")}
                className="dropdown-menu-item"
              >
                <img src="/icons/reacticon.svg" alt="React" className={`inline-block w-8 h-8 mr-2 ${iconClass}`} />
                React
              </DropdownMenuPrimitive.CheckboxItem>
              <DropdownMenuPrimitive.CheckboxItem
                checked={selectedItems.includes("Vue")}
                onCheckedChange={() => handleCheckedChange("Vue")}
                className="dropdown-menu-item"
              >
                <img src="/icons/vueicon.svg" alt="Vue" className={`inline-block w-8 h-8 mr-2 ${iconClass}`} />
                Vue
              </DropdownMenuPrimitive.CheckboxItem>
              <DropdownMenuPrimitive.CheckboxItem
                checked={selectedItems.includes("Angular")}
                onCheckedChange={() => handleCheckedChange("Angular")}
                className="dropdown-menu-item"
              >
                <img src="/icons/angularicon.svg" alt="Angular" className={`inline-block w-8 h-8 mr-2 ${iconClass}`} />
                Angular
              </DropdownMenuPrimitive.CheckboxItem>
              <DropdownMenuPrimitive.CheckboxItem
                checked={selectedItems.includes("Svelte")}
                onCheckedChange={() => handleCheckedChange("Svelte")}
                className="dropdown-menu-item"
              >
                <img src="/icons/svelteicon.svg" alt="Svelte" className={`inline-block w-8 h-8 mr-2 ${iconClass}`} />
                Svelte
              </DropdownMenuPrimitive.CheckboxItem>
              <DropdownMenuPrimitive.CheckboxItem
                checked={selectedItems.includes("TailwindCSS")}
                onCheckedChange={() => handleCheckedChange("TailwindCSS")}
                className="dropdown-menu-item"
              >
                <img src="/icons/tailwindicon.svg" alt="TailwindCSS" className={`inline-block w-8 h-8 mr-2 ${iconClass}`} />
                TailwindCSS
              </DropdownMenuPrimitive.CheckboxItem>
            </DropdownMenuPrimitive.Content>
          </DropdownMenuPrimitive.Portal>
        </DropdownMenuPrimitive.Root>

        {/* Placeholder dropdowns */}
        <DropdownMenuPrimitive.Root>
          <DropdownMenuTrigger className="dropdown-trigger">
            Placeholder 1
          </DropdownMenuTrigger>
          <DropdownMenuPrimitive.Portal>
            <DropdownMenuPrimitive.Content
              ref={ref}
              sideOffset={sideOffset}
              className={cn(
                `dropdown-menu z-50 min-w-[8rem] overflow-hidden rounded-md border bg-white p-1 shadow-md ${textClass}`,
                className
              )}
              {...props}
            >
              {/* Placeholder content */}
            </DropdownMenuPrimitive.Content>
          </DropdownMenuPrimitive.Portal>
        </DropdownMenuPrimitive.Root>

        <DropdownMenuPrimitive.Root>
          <DropdownMenuTrigger className="dropdown-trigger">
            Placeholder 2
          </DropdownMenuTrigger>
          <DropdownMenuPrimitive.Portal>
            <DropdownMenuPrimitive.Content
              ref={ref}
              sideOffset={sideOffset}
              className={cn(
                `dropdown-menu z-50 min-w-[8rem] overflow-hidden rounded-md border bg-white p-1 shadow-md ${textClass}`,
                className
              )}
              {...props}
            >
              {/* Placeholder content */}
            </DropdownMenuPrimitive.Content>
          </DropdownMenuPrimitive.Portal>
        </DropdownMenuPrimitive.Root>

        <DropdownMenuPrimitive.Root>
          <DropdownMenuTrigger className="dropdown-trigger">
            Placeholder 3
          </DropdownMenuTrigger>
          <DropdownMenuPrimitive.Portal>
            <DropdownMenuPrimitive.Content
              ref={ref}
              sideOffset={sideOffset}
              className={cn(
                `dropdown-menu z-50 min-w-[8rem] overflow-hidden rounded-md border bg-white p-1 shadow-md ${textClass}`,
                className
              )}
              {...props}
            >
              {/* Placeholder content */}
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