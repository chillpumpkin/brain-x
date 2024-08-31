// app/components/ThemeSwitcher.tsx
"use client";

import { Switch } from "@nextui-org/react";
import { MoonIcon, SunIcon } from "lucide-react";
import {useTheme} from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleTheme = () => {
    if (theme == "light")  {
        setTheme("dark")
    } else {
        setTheme("light")
    }    
}

  if(!mounted) return null

  return (
    <div>
        <Switch defaultSelected 
        size="lg" 
        color="success" 
        onClick={handleTheme} 
        startContent={<MoonIcon />} 
        endContent={<SunIcon/>}>
        </Switch>
    </div>
  )
};