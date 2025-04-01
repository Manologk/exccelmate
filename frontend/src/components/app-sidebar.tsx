"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, FileSpreadsheet, History, Home, Save, Settings, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  useSidebar,
} from "@/components/ui/sidebar"
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

export function AppSidebar() {
  const pathname = usePathname()
  const { state, toggleSidebar } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex h-16 items-center justify-between border-b px-6">
        <div className="flex items-center">
          <BarChart3 className="mr-2 h-6 w-6 text-primary" />
          {!isCollapsed && <h1 className="text-xl font-bold">Excel Assistant</h1>}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={toggleSidebar}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {!isCollapsed && <SidebarGroupLabel>Navigation</SidebarGroupLabel>}
          <SidebarMenu>
            {routes.map((route) => (
              <SidebarMenuItem key={route.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === route.href}
                  tooltip={isCollapsed ? route.label : undefined}
                >
                  <Link href={route.href}>
                    <route.icon className={cn("h-5 w-5", route.color)} />
                    {!isCollapsed && <span className="ml-3">{route.label}</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
} 