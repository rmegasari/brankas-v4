"use client"
import { Moon, Sun, Palette, Heart, Droplets, Leaf, Square } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  const themes = [
    { value: "light", label: "Light", icon: Sun, description: "Yellow & Blue" },
    { value: "dark", label: "Dark", icon: Moon, description: "Dark Mode" },
    { value: "pink", label: "Pink", icon: Heart, description: "Pink Theme" },
    { value: "blue", label: "Blue", icon: Droplets, description: "Blue Theme" },
    { value: "green", label: "Green", icon: Leaf, description: "Green Theme" },
    { value: "blackwhite", label: "B&W", icon: Square, description: "Pure Neobrutalist" },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="neobrutalism-button bg-transparent">
          <Palette className="h-4 w-4" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="neobrutalism-card w-48">
        {themes.map((themeOption) => {
          const Icon = themeOption.icon
          return (
            <DropdownMenuItem
              key={themeOption.value}
              onClick={() => setTheme(themeOption.value)}
              className={`cursor-pointer flex items-center justify-between ${
                theme === themeOption.value ? "bg-accent text-accent-foreground" : ""
              }`}
            >
              <div className="flex items-center">
                <Icon className="mr-2 h-4 w-4" />
                <span className="font-medium">{themeOption.label}</span>
              </div>
              <span className="text-xs text-muted-foreground">{themeOption.description}</span>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
