import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface SideNavItemProps {
  url: string;
  title: string;
  isActive: boolean;
  icon: LucideIcon;
}

export const SideNavItem = ({
  url,
  title,
  isActive,
  icon: Icon,
}: SideNavItemProps) => {
  const activeTabColor = "bg-purple-500";
  const hoverColor = "hover:bg-purple-500";
  const textColor = "text-white";

  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group
            ${isActive ? `${activeTabColor}` : `${hoverColor} ${textColor}`}`}
    >
      <Link
        className={`text-xl font-light flex gap-2 items-center ${textColor}`}
        href={url}
      >
        <Icon size={24} />
        {title}
      </Link>
    </li>
  );
};
