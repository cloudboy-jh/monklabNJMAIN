"use client";

import React, { useState, useEffect } from "react";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from 'next-themes'
import { SidebarComponent } from "@/components/components-sidebar";
import Header from "@/components/ui/Header";
import Image from "next/image";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const onRestartChat = () => {
    // Implement the restart chat functionality here
    console.log("Restarting chat...");
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
        >
          {mounted && (
            <div className="flex flex-col h-screen">
              <Image
                src="/brainandcog.svg"
                alt="Brain and Cog"
                width={50}
                height={50}
                className="hidden"
              />
              <Header 
                toggleSidebar={toggleSidebar}
                isSidebarOpen={isSidebarOpen}
                onRestartChat={onRestartChat}
              />
              <div className="flex flex-1 overflow-hidden">
                <SidebarComponent isOpen={isSidebarOpen} />
                <main className="flex-1 overflow-auto w-full">
                  {children}
                </main>
              </div>
            </div>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
