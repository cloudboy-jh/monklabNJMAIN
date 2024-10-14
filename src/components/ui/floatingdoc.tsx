import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTheme } from "next-themes";
import Lottie from 'lottie-web';

export default function FloatingDock() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const setupAnimation = (selector: string, lightPath: string, darkPath: string) => {
    const container = document.querySelector(selector);
    if (container) {
      const animationPath = theme === 'dark' ? darkPath : lightPath;

      const animation = Lottie.loadAnimation({
        container: container,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: animationPath
      });

      animation.goToAndStop(0, true);

      const handleMouseEnter = () => {
        animation.stop();
        animation.play();
      };

      container.addEventListener('mouseenter', handleMouseEnter);

      return () => {
        animation.destroy();
        container.removeEventListener('mouseenter', handleMouseEnter);
      };
    }
  };

  useEffect(() => {
    if (!mounted) return;

    const cleanupHome = setupAnimation('.home-animation', '/animations/homeicon.json', '/animations/homeiconwhite.json');
    const cleanupCheckin = setupAnimation('.checkin-animation', '/animations/calendaricon.json', '/animations/calendariconwhite.json');
    const cleanupBuild = setupAnimation('.build-animation', '/animations/wrench.json', '/animations/wrenchwhite.json');

    return () => {
      cleanupHome && cleanupHome();
      cleanupCheckin && cleanupCheckin();
      cleanupBuild && cleanupBuild();
    };
  }, [theme, mounted]);

  if (!mounted) {
    return null;
  }

  const dockItems = [
    { icon: 'home-animation', label: "Home", href: "/" },
    { icon: 'build-animation', label: "Build", href: "/build" },
    { icon: 'checkin-animation', label: "Check-In", href: "/checkin" },
  ];

  return (
    <nav className={`${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-200'} bg-opacity-90 rounded-full px-6 py-1 backdrop-blur-sm`}>
      <div className="flex items-center justify-center space-x-8">
        {dockItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={`group flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ease-in-out hover:bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 ${
              theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-300'
            }`}
            aria-label={item.label}
          >
            <div className={`${item.icon} w-5 h-5`}></div>
          </Link>
        ))}
      </div>
    </nav>
  );
}
