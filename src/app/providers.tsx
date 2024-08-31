// app/providers.tsx
'use client'

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import {NextUIProvider} from '@nextui-org/react'
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import {ThemeProvider as NextThemesProvider} from "next-themes";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL as string);

console.log(process.env.NEXT_PUBLIC_CONVEX_URL as string)
console.log(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY)

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <NextUIProvider>
          <NextThemesProvider attribute="class" defaultTheme="dark">
            {children}
          </NextThemesProvider>
        </NextUIProvider>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  )
}