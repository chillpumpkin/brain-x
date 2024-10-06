"use client";
import { Authenticated } from "convex/react";
import SideNav from "./side-nav";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex gap-24 px-10 justify-self-end mx-auto pt-12">
      <SideNav />
      <div className="flex-1 flex justify-center">
        <Authenticated>{children}</Authenticated>
      </div>
    </div>
  );
}
