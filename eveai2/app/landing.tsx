// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';

// export default function LandingPage() {
//   return (
//     <div className="relative flex flex-col h-screen w-screen overflow-hidden">
//       {/* Header */}
//       <header className="flex items-center justify-between p-4 bg-gray-900 text-white">
//         {/* Logo */}
//         <div className="flex items-center">
//           <Image
//             src="/eve4.png"
//             alt="Logo"
//             width={90} 
//             height={50} 
//             priority
//           />
//         </div>

//         {/* Navigation Links */}
//         <nav className="flex space-x-4">
//           <Link href="/about">
//             About
//           </Link>
//           <Link href="/tech-used">
//             Tech
//           </Link>
//         </nav>
//       </header>

//       {/* Background Image */}
//       <div
//         className="absolute z-[-1]"
//         style={{
//           height: '100%',
//           width: '50%',
//           left: '8%',
//           top: '10%',
//         }}
//       >
//         <Image
//           src="/eve.png" 
//           alt="Background Image"
//           layout="fill" 
//           objectFit="cover" 
//           priority 
//         />
//       </div>

//       {/* Content */}
//       <div className="relative z-10 flex flex-col items-center justify-center h-full text-black ml-80">
//       <h1 className="text-xl font-bold mb-2 typing-animation">hello this is eVe!</h1>
//         <p className="text-lg mb-6">for assistance</p>
//         <Link href="/sign-in">
//           <div className="px-20 py-3 bg-blue-500 text-white rounded-lg cursor-pointer">
//             get started
//           </div>
//         </Link>
//       </div>
//     </div>
//   );
// }
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useAuth, useUser, UserButton } from '@clerk/nextjs';

export default function LandingPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="relative flex flex-col h-screen w-screen overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-gray-900 text-white">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/eve4.png"
            alt="Logo"
            width={90} 
            height={50} 
            priority
          />
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center space-x-4">
          <Link href="/about">
            About
          </Link>
          <Link href="/tech-used">
            Tech
          </Link>
          {isLoaded && isSignedIn && (
            <div className="flex items-center space-x-3">
              {/* <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {user?.fullName ? getInitials(user.fullName) : ''}
              </div> */}
              <UserButton afterSignOutUrl="/" />
            </div>
          )}
        </nav>
      </header>

      {/* Background Image */}
      <div
        className="absolute z-[-1]"
        style={{
          height: '100%',
          width: '50%',
          left: '8%',
          top: '10%',
        }}
      >
        <Image
          src="/eve.png" 
          alt="Background Image"
          layout="fill" 
          objectFit="cover" 
          priority 
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-black ml-80">
        <h1 className="text-xl font-bold mb-2 typing-animation">hello this is eVe!</h1>
        <p className="text-lg mb-6">for assistance</p>
        {isLoaded && (
          isSignedIn ? (
            <Link href="/dashboard">
              <div className="px-20 py-3 bg-blue-500 text-black rounded-lg cursor-pointer">
                Go to Dashboard
              </div>
            </Link>
          ) : (
            <Link href="/sign-in">
              <div className="px-20 py-3 bg-blue-500 text-black rounded-lg cursor-pointer">
                Get Started
              </div>
            </Link>
          )
        )}
      </div>
    </div>
  );
}