// app/providers.tsx
'use client'

import {NextUIProvider} from '@nextui-org/react'
import { ConvexProvider, ConvexReactClient } from 'convex/react';

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <ConvexProvider client={convex}>
      <NextUIProvider>
        {children}
      </NextUIProvider>
    </ConvexProvider>
  )
}