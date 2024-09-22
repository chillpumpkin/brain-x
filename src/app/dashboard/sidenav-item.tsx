import { useTheme } from "next-themes";
import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface SideNavItemProps {
  url: string;
  title: string;
  isActive: boolean;
  icon: LucideIcon; // To accept any Lucide icon component
}

export const SideNavItem = ({ url, title, isActive, icon: Icon }: SideNavItemProps) => {
  const { theme } = useTheme();

  const activeTabColor = theme === "dark" ? "bg-purple-500" : "bg-gray-400";
  const hoverColor = theme === "dark" ? "hover:bg-purple-500" : "hover:bg-gray-200";
  const textColor = theme === "dark" ? "text-white" : "text-black";

  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group
        ${isActive ? `${activeTabColor}` : `${hoverColor} ${textColor}`}`}
    >
      <Link className={`text-xl font-light flex gap-2 items-center ${textColor}`} href={url}>
        <Icon size={24} /> {/* Rendering the passed icon here */}
        {title}
      </Link>
    </li>
  );
};
