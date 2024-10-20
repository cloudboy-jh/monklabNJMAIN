'use client'

import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { Button } from "./button"
import { Calendar } from "./calendar"
import { Input } from "./input"
import { Label } from "./label"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu"
import { ScrollArea } from "./scroll-area"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import Lottie from 'lottie-web'
import { useTheme } from "next-themes"
import { AnimationItem } from 'lottie-web'

type Appointment = {
  date: Date;
  time: string;
  notificationMethod: 'email' | 'text';
  contactInfo: string;
}

interface SchedulerComponentProps {
  theme?: string;
}

export const SchedulerComponent: React.FC<SchedulerComponentProps> = ({ theme }) => {
  const { theme: currentTheme } = useTheme();
  const animationContainer = useRef(null);
  const [animation, setAnimation] = useState<AnimationItem | null>(null);
  const [isOpen, setIsOpen] = useState(false)
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState<string>()
  const [notificationMethod, setNotificationMethod] = useState<'email' | 'text'>('email')
  const [contactInfo, setContactInfo] = useState('')
  const [appointments, setAppointments] = useState<Appointment[]>([])

  useEffect(() => {
    if (animationContainer.current) {
      const anim = Lottie.loadAnimation({
        container: animationContainer.current,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: theme === 'dark' ? '/animations/calendariconwhite.json' : '/animations/calendaricon.json'
      });

      setAnimation(anim);

      return () => anim.destroy();
    }
  }, [theme]);

  const handleMouseEnter = () => {
    if (animation) {
      animation.goToAndPlay(0);
    }
  };

  const handleSchedule = () => {
    if (date && time && contactInfo) {
      const newAppointment: Appointment = {
        date,
        time,
        notificationMethod,
        contactInfo
      }
      setAppointments([...appointments, newAppointment])
      setDate(undefined)
      setTime(undefined)
      setContactInfo('')
      // In a real application, you would send this data to your backend
      console.log('Scheduled appointment:', newAppointment)
    }
  }

  const timeSlots = [
    "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"
  ]

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            size="icon"
            className={`rounded-full h-12 w-12 ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'}`}
            onMouseEnter={handleMouseEnter}
          >
            <div ref={animationContainer} className="w-6 h-6" />
            <span className="sr-only">Open scheduler</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className={`w-80 p-4 ${theme === 'dark' ? 'bg-[#1e1e1e] text-white border-gray-800' : 'bg-white text-black'}`} 
          align="end"
          side="top"
        >
          <h2 className="text-lg font-semibold mb-4">Schedule an Appointment</h2>
          <div className="space-y-4">
            {/* Date picker */}
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    className={`w-full justify-start text-left font-normal ${
                      !date && "text-muted-foreground"
                    } ${theme === 'dark' ? 'bg-[#2d2d2d] text-white border-gray-700' : 'bg-white text-black'}`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Time picker */}
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    className={`w-full justify-start ${theme === 'dark' ? 'bg-[#2d2d2d] text-white border-gray-700' : 'bg-white text-black'}`}
                  >
                    {time || "Select a time"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {timeSlots.map((slot) => (
                    <DropdownMenuItem key={slot} onSelect={() => setTime(slot)}>
                      {slot}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Notification method */}
            <div className="space-y-2">
              <Label>Notification Method</Label>
              <div className="flex space-x-4">
                <Button
                  variant={notificationMethod === 'email' ? 'default' : 'outline'}
                  onClick={() => setNotificationMethod('email')}
                  className={theme === 'dark' ? 'border-gray-700' : ''}
                >
                  Email
                </Button>
                <Button
                  variant={notificationMethod === 'text' ? 'default' : 'outline'}
                  onClick={() => setNotificationMethod('text')}
                  className={theme === 'dark' ? 'border-gray-700' : ''}
                >
                  Text Message
                </Button>
              </div>
            </div>

            {/* Contact info */}
            <div className="space-y-2">
              <Label htmlFor="contactInfo">
                {notificationMethod === 'email' ? 'Email Address' : 'Phone Number'}
              </Label>
              <Input
                id="contactInfo"
                type={notificationMethod === 'email' ? 'email' : 'tel'}
                placeholder={notificationMethod === 'email' ? 'you@example.com' : '+1 (555) 000-0000'}
                value={contactInfo}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContactInfo(e.target.value)}
                className={theme === 'dark' ? 'bg-[#2d2d2d] text-white border-gray-700' : 'bg-white text-black'}
              />
            </div>

            {/* Schedule button */}
            <Button 
              className="w-full" 
              onClick={handleSchedule} 
              disabled={!date || !time || !contactInfo}
            >
              Schedule
            </Button>
          </div>

          {/* Scheduled appointments */}
          <ScrollArea className="h-[100px] w-full mt-4">
            <h3 className="font-semibold mb-2">Scheduled Appointments:</h3>
            {appointments.map((apt, index) => (
              <div key={index} className="text-sm mb-1">
                {format(apt.date, "PPP")} at {apt.time} - Notify via {apt.notificationMethod}
              </div>
            ))}
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </div>
  )
}
