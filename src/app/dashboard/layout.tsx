import { FileStack, NotebookPen, Settings } from "lucide-react";
import Link from "next/link";
import SideNav from "./side-nav";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex gap-24 px-10 justify-self-end mx-auto pt-12">
      <SideNav />
      <div className="flex-1 flex justify-center">{children}</div>
    </div>
  );
}
