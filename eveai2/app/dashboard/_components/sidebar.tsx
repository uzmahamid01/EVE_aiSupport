'use client';

import { Home, Settings, Text, Video } from 'lucide-react';
import React, { useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

function Sidebar() {
  const MenuLists = [
    {
      name: 'Home',
      icon: Home,
      path: '/dashboard',
    },
    {
      name: 'Text Generation',
      icon: Text,
      path: '/dashboard/text',
    },
    {
      name: 'Image Generation',
      icon: Video,
      path: '/dashboard/image',
    },
    {
      name: 'Settings',
      icon: Settings,
      path: '/dashboard/settings',
    },
  ];

  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, [path]); // Add path as a dependency to re-run the effect when it changes

  return (
    <div className="h-screen p-5 shadow-sm border">
      {/* Add logo */}
      <div className="flex justify-center">
        <Image src="/eve.svg" alt="Eve Logo" width={140} height={150} />
      </div>
      <div className="mt-5">
        {MenuLists.map((menu, index) => (
          <div
            key={index} // Add key for each list item
            className={`flex gap-2 mb-2 p-3 hover:text-blue-500 rounded-lg cursor-pointer items-center ${
              path === menu.path && 'bg-secondary text-blue-500'
            }`}
          >
            <menu.icon className="h-6 w-6" />
            <h2 className="text-lg">{menu.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
