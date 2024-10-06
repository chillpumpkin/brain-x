"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  BarChart2,
  Users,
  FileText,
  Settings,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "#dashboard" },
  { icon: BarChart2, label: "Analytics", href: "#analytics" },
  { icon: Users, label: "Customers", href: "#customers" },
  { icon: FileText, label: "Reports", href: "#reports" },
  { icon: Settings, label: "Settings", href: "#settings" },
];

export default function SideBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("Dashboard");

  return (
    <div
      className={cn(
        "flex flex-col h-screen transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4">
        {!isCollapsed && <h1 className="text-2xl font-bold">Logo</h1>}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="text-white hover:bg-white/10"
        >
          {isCollapsed ? <Menu /> : <X />}
        </Button>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-2 p-2">
          {navItems.map((item) => (
            <li key={item.label}>
              <Button
                variant={activeItem === item.label ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start text-white",
                  activeItem === item.label
                    ? "bg-white/20 hover:bg-white/30"
                    : "hover:bg-white/10",
                  isCollapsed ? "px-2" : "px-4"
                )}
                onClick={() => setActiveItem(item.label)}
              >
                <item.icon className="h-5 w-5" />
                {!isCollapsed && <span className="ml-2">{item.label}</span>}
              </Button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center space-x-4">
          <img
            src="/placeholder.svg?height=40&width=40"
            alt="User avatar"
            className="rounded-full bg-white/20"
          />
          {!isCollapsed && (
            <div>
              <p className="font-medium">John Doe</p>
              <p className="text-xs text-gray-300">john@example.com</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
