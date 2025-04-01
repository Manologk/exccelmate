"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, FileSpreadsheet, History, Home, Menu, Save, Settings, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const routes = [
  {
    label: "Home",
    icon: Home,
    href: "/",
    color: "text-sky-500",
  },
  {
    label: "Saved Queries",
    icon: Save,
    href: "/saved",
    color: "text-emerald-500",
  },
  {
    label: "Templates",
    icon: FileSpreadsheet,
    href: "/templates",
    color: "text-violet-500",
  },
  {
    label: "History",
    icon: History,
    href: "/history",
    color: "text-pink-500",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
    color: "text-gray-500",
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed left-4 top-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X /> : <Menu />}
      </Button>
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform border-r bg-background transition-transform duration-200 ease-in-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center border-b px-6">
          <BarChart3 className="mr-2 h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">Excel Assistant</h1>
        </div>
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <div className="space-y-1">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent",
                    pathname === route.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <route.icon className={cn("mr-3 h-5 w-5", route.color)} />
                  {route.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

