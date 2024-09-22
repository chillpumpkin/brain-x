"use client";

import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Unauthenticated, Authenticated } from "convex/react";
import Image from "next/image";
import { ThemeSwitcher } from "./theme-switcher";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Header() {
  const router = useRouter();

  return (
    <div className="py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center text-2xl">
          <Link href={'/dashboard'}>
            <Image
              src="/logo.png"
              alt="logo"
              width={120}
              height={120}
            />
          </Link>
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
  );
}
