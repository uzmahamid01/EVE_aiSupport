'use client';

import { SignIn, useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push('/dashboard');
    }
  }, [isSignedIn, router]);

  // if (isSignedIn) {
  //   return null; // or a loading spinner
  // }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignIn />
    </div>
  );
}