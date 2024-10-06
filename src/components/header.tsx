"use client";

import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Unauthenticated, Authenticated } from "convex/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Header() {
  const pathName = usePathname();

  return (
    <div className="py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center text-2xl">
          <Link href={"/dashboard"}>
            <Image src="/logo.png" alt="logo" width={120} height={120} />
          </Link>
          <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            brainX
          </span>
        </div>
        <div>
          <div className="flex items center gap-4">
            <Unauthenticated>
              <SignInButton />
            </Unauthenticated>
            <Authenticated>
              <header className="container mx-auto px-4 py-6 flex justify-between items-center">
                {pathName === "/" && (
                  <nav>
                    <ul className="flex space-x-6">
                      <li>
                        <a
                          href="/dashboard/search"
                          className="hover:text-purple-400 transition-colors"
                        >
                          Search
                        </a>
                      </li>
                      <li>
                        <a
                          href="/dashboard/documents"
                          className="hover:text-purple-400 transition-colors"
                        >
                          Documents
                        </a>
                      </li>
                      <li>
                        <a
                          href="/dashboard/notes"
                          className="hover:text-purple-400 transition-colors"
                        >
                          Notes
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="hover:text-purple-400 transition-colors"
                        >
                          Contact
                        </a>
                      </li>
                    </ul>
                  </nav>
                )}
              </header>
              <UserButton />
            </Authenticated>
          </div>
        </div>
      </div>
    </div>
  );
}
