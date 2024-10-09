"use client";

import { usePathname } from "next/navigation";
import { SideNavItem } from "./sidenav-item";
import { FileStack, NotebookPen, Search } from "lucide-react";
export default function SideNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-4">
      <ul>
        <SideNavItem
          icon={Search}
          isActive={pathname.endsWith("/dashboard/search")}
          url={"/dashboard/search"}
          title={"Search"}
        />
      </ul>
      <ul className="space-y-4">
        <SideNavItem
          icon={FileStack}
          isActive={pathname.endsWith("/dashboard/documents")}
          url={"/dashboard/documents"}
          title={"Documents"}
        />
      </ul>
      <ul>
        <SideNavItem
          icon={NotebookPen}
          isActive={pathname.endsWith("/dashboard/notes")}
          url={"/dashboard/notes"}
          title={"Notes"}
        />
      </ul>
    </nav>
  );
}
