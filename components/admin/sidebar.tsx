"use client"

import Link from "next/link"
import {
  Home,
  Package,
  Settings,
  ShoppingCart,
  Users2,
  MessageSquareWarning,
  Lightbulb,
  Bell,
  Megaphone,
} from "lucide-react"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar"
import { useAuth } from "@/hooks/use-auth"
import { Logo } from "../logo"
import { cn } from "@/lib/utils"
import React from "react"

const mainNav = [
  { href: "/admin", label: "Dashboard", icon: <Home className="h-6 w-6" /> },
  { href: "/admin/products", label: "Products", icon: <Package className="h-6 w-6" /> },
  { href: "/admin/orders", label: "Orders", icon: <ShoppingCart className="h-6 w-6" /> },
  { href: "/admin/customers", label: "Customers", icon: <Users2 className="h-6 w-6" /> },
]

const secondaryNav = [
  {
    href: "/admin/reports",
    label: "Reports",
    icon: <MessageSquareWarning className="h-6 w-6" />,
    notificationCount: 1,
  },
  { href: "/admin/suggestions", label: "Suggestions", icon: <Lightbulb className="h-6 w-6" />, notificationCount: 1 },
  { href: "/admin/banner", label: "Banner", icon: <Megaphone className="h-6 w-6" /> },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const { user } = useAuth()
  const { isMobile } = useSidebar()

  // In a real app, this would come from a global state or an API call
  const [newReportsCount, setNewReportsCount] = React.useState(1)
  const [newSuggestionsCount, setNewSuggestionsCount] = React.useState(1)

  return (
    <Sidebar
      collapsible="icon"
      className={cn(isMobile ? "flex" : "hidden sm:flex", "bg-card text-card-foreground border-r")}
    >
      <div className="flex h-14 items-center px-4 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-2 border-b">
        <div className="flex items-center gap-2 group-data-[collapsible=icon]:hidden">
          <Logo />
        </div>
        <div className="hidden items-center gap-2 group-data-[collapsible=icon]:flex">
          <span className="font-bold text-lg">PS</span>
        </div>
      </div>

      <SidebarContent className="flex flex-col">
        <SidebarMenu className="flex-1 gap-2 pt-2">
          {mainNav.map((link) => (
            <SidebarMenuItem key={link.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === link.href}
                tooltip={link.label}
                className="justify-start gap-4 px-4"
              >
                <Link href={link.href}>
                  {link.icon}
                  <span className="group-data-[collapsible=icon]:hidden">{link.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          <hr className="my-2 border-border" />
          {secondaryNav.map((link) => {
            const count =
              link.label === "Reports" ? newReportsCount : link.label === "Suggestions" ? newSuggestionsCount : 0
            return (
              <SidebarMenuItem key={link.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === link.href}
                  tooltip={link.label}
                  className="justify-start gap-4 px-4"
                >
                  <Link href={link.href}>
                    {link.icon}
                    <span className="group-data-[collapsible=icon]:hidden">{link.label}</span>
                    {link.notificationCount && count > 0 && (
                      <span className="ml-auto group-data-[collapsible=icon]:hidden h-5 w-5 flex items-center justify-center rounded-full bg-red-500 text-white text-xs">
                        {count}
                      </span>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "/admin/notifications"}
              tooltip={"Notifications"}
              className="justify-start gap-4 px-4"
            >
              <Link href="/admin/notifications">
                <Bell className="h-6 w-6" />
                <span className="group-data-[collapsible=icon]:hidden">Notifications</span>
                <span className="ml-auto group-data-[collapsible=icon]:hidden h-2 w-2 rounded-full bg-green-500"></span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-2 border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname.startsWith("/admin/settings")}
              tooltip="Settings"
              className="justify-start gap-4 px-4"
            >
              <Link href="/admin/settings">
                <Settings className="h-6 w-6" />
                <span className="group-data-[collapsible=icon]:hidden">Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
