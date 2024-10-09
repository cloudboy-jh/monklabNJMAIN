"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePickerWithRange({
  className,
  theme = 'default',
}: React.HTMLAttributes<HTMLDivElement> & { theme?: 'default' | 'red' | 'blue' | 'green' }) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  })
  const { resolvedTheme } = useTheme()
  const isDarkMode = resolvedTheme === 'dark'

  const themeStyles = {
    default: isDarkMode ? 'bg-zinc-800 text-white hover:bg-zinc-700' : 'bg-zinc-100 text-zinc-950 hover:bg-zinc-200',
    red: 'bg-red-500 text-white hover:bg-red-600',
    blue: 'bg-blue-500 text-white hover:bg-blue-600',
    green: 'bg-green-500 text-white hover:bg-green-600',
  }

  const calendarThemeStyles = {
    default: isDarkMode ? 'bg-zinc-800 text-white' : 'bg-zinc-100 text-zinc-950',
    red: 'bg-red-500 text-white',
    blue: 'bg-blue-500 text-white',
    green: 'bg-green-500 text-white',
  }

  const displayThemeStyles = {
    default: isDarkMode ? 'bg-zinc-900 text-zinc-100' : 'bg-zinc-50 text-zinc-950',
    red: 'bg-red-100 text-red-900',
    blue: 'bg-blue-100 text-blue-900',
    green: 'bg-green-100 text-green-900',
  }

  return (
    <div className={cn("flex flex-col h-full", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              themeStyles[theme],
              !date && `text-${theme === 'default' ? (isDarkMode ? 'zinc-400' : 'zinc-500') : `${theme}-200`}`
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className={`w-auto p-0 ${calendarThemeStyles[theme]}`} align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            className={calendarThemeStyles[theme]}
          />
        </PopoverContent>
      </Popover>
      <div className={cn(
        "flex-1 mt-4 overflow-y-auto p-4 rounded-lg text-center",
        displayThemeStyles[theme]
      )}>
        <p className="font-semibold mb-2">Selected date range:</p>
        <p>{date?.from ? format(date.from, "PP") : "Start date"}</p>
        <p className="mt-1">{date?.to ? format(date.to, "PP") : "End date"}</p>
      </div>
    </div>
  )
}
