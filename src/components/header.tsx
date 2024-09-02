'use client'

import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Unauthenticated, Authenticated } from "convex/react";
import Image from "next/image";
import { ThemeSwitcher } from "./theme-switcher";

export default function Header() {

  return (
    <div className="bg-gray-800 py-4">
    <div className="container mx-auto flex items-center justify-between">
      <div className="flex items-center text-2xl">
        <Image src="/logo.png" alt="logo" width={120} height={120} />
          brainX
      </div>
      <div>
      <div className="flex items center gap-4">
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>
      <Authenticated>
        <UserButton />
      </Authenticated>
      <ThemeSwitcher />
      </div>
      </div>
    </div>
    </div>
  )
}