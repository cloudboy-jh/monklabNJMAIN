"use client";

import React, { useState } from "react";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
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
  const [shouldRestartChat, setShouldRestartChat] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleRestartChat = () => {
    setShouldRestartChat(true);
    // Reset the flag after a short delay
    setTimeout(() => setShouldRestartChat(false), 100);
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col h-screen">
            <Image
              src="/brainandcog.svg"
              alt="Brain and Cog"
              width={50}
              height={50}
            />
            <Header 
              toggleSidebar={toggleSidebar} 
              isSidebarOpen={isSidebarOpen} 
              onRestartChat={handleRestartChat}
            />
            <div className="flex flex-1 overflow-hidden">
              <SidebarComponent isOpen={isSidebarOpen} />
              <main className="flex-1 overflow-auto w-full">
                {React.Children.map(children, child =>
                  React.isValidElement(child)
                    ? React.cloneElement(child as React.ReactElement<any>, { shouldRestartChat })
                    : child
                )}
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
