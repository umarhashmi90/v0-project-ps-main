"use client"
import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Logo } from "../logo"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { Monitor, Smartphone, Bot, Menu, X, ShoppingCart, User, LogOut } from "lucide-react"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const pageLinks = [
  {
    title: "About Us",
    href: "/about",
    description: "Learn more about our company, mission, and values.",
  },
  {
    title: "Contact Us",
    href: "/contact",
    description: "Get in touch with our team for support or inquiries.",
  },
]

const policyLinks = [
  {
    title: "Terms of Use",
    href: "/policies/terms-of-use",
    description: "Read the terms and conditions of using our site.",
  },
  {
    title: "Privacy Policy",
    href: "/policies/privacy-policy",
    description: "Understand how we handle your personal data.",
  },
  {
    title: "Refund Policy",
    href: "/policies/refund-policy",
    description: "Learn about our policy on refunds and returns.",
  },
  {
    title: "User Agreement",
    href: "/policies/user-agreement",
    description: "Read our user agreement.",
  },
  {
    title: "Disclaimer",
    href: "/policies/disclaimer",
    description: "Read our disclaimer.",
  },
  {
    title: "Cookies Policy",
    href: "/policies/cookies-policy",
    description: "Learn about our use of cookies.",
  },
  {
    title: "Shipping Policy",
    href: "/policies/shipping-policy",
    description: "Learn about our shipping policy.",
  },
]

const courseLinks = [
  {
    title: "CSS",
    href: "/courses/css",
    description: "Master the art of styling web pages.",
  },
  {
    title: "HTML",
    href: "/courses/html",
    description: "Learn the fundamental structure of the web.",
  },
  {
    title: "Gen AI",
    href: "/courses/gen-ai",
    description: "Explore the world of generative AI.",
  },
  {
    title: "TikTok",
    href: "/courses/tiktok",
    description: "Create engaging short-form video content.",
  },
  {
    title: "Shopify",
    href: "/courses/shopify",
    description: "Build your own e-commerce empire.",
  },
  {
    title: "AI Money",
    href: "/courses/ai-money",
    description: "Monetize your AI skills and projects.",
  },
  {
    title: "AI Coding",
    href: "/courses/ai-coding",
    description: "Leverage AI to accelerate your coding.",
  },
  {
    title: "Deepseek",
    href: "/courses/deepseek",
    description: "Advanced search and data analysis.",
  },
  {
    title: "JavaScript",
    href: "/courses/javascript",
    description: "Bring interactivity to your websites.",
  },
  {
    title: "After Effects",
    href: "/courses/after-effects",
    description: "Create stunning motion graphics.",
  },
  {
    title: "Premiere Pro",
    href: "/courses/premiere-pro",
    description: "Professional video editing mastery.",
  },
]

const productLinks = [
  {
    title: "PC Products",
    href: "/products/pc",
    description: "Unlock premium features for PC gaming.",
    icon: <Monitor />,
  },
  {
    title: "iOS Products",
    href: "/products/ios",
    description: "Enhance your gameplay on iOS devices.",
    icon: <Smartphone />,
  },
  {
    title: "Android Products",
    href: "/products/android",
    description: "Get the edge on Android with our tools.",
    icon: <Smartphone />,
  },
  {
    title: "More Coming Soon...",
    href: "#",
    description: "Exciting new products are on the way. Stay tuned!",
    icon: <Bot />,
    disabled: true,
  },
]

export default function Header() {
  const [expanded, setExpanded] = React.useState(false)
  const [user, setUser] = React.useState<any>(null)
  const [loading, setLoading] = React.useState(true)
  const router = useRouter()
  const { toast } = useToast()

  React.useEffect(() => {
    const supabase = createClient()

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()

    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: "You have been signed out",
      })
      router.push("/")
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full">
      <div className="relative top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-6xl">
        <div className="relative flex items-center justify-between h-16 bg-white/80 backdrop-blur-sm rounded-2xl px-4 sm:px-6 border">
          <div className="flex items-center">
            <Logo />
          </div>

          <div className="hidden md:flex items-center justify-center">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/free-tools"
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent text-gray-700 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black data-[active]:text-black flex items-center gap-2",
                      )}
                    >
                      Free Tools
                      <span className="relative inline-flex overflow-hidden rounded-full p-[1px]">
                        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"></span>
                        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-background px-2 py-0.5 text-xs font-bold text-primary backdrop-blur-3xl">
                          NEW
                        </span>
                      </span>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-gray-700 hover:bg-gray-100 hover:text-black data-[state=open]:bg-gray-100 data-[state=open]:text-black focus:bg-gray-100 focus:text-black data-[active]:text-black">
                    Products
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid grid-cols-[1fr_2fr] w-[600px] lg:w-[700px] p-4">
                      <div className="relative h-full">
                        <NavigationMenuLink asChild>
                          <Link
                            href="/products"
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted no-underline outline-none focus:shadow-md"
                          >
                            <Image
                              src="https://i.postimg.cc/dVWzSn8J/steptodown-com648422.jpg"
                              alt="Products promotion"
                              fill
                              className="object-cover rounded-md"
                              data-ai-hint="gaming abstract"
                            />
                            <div className="absolute inset-0 bg-black/40 rounded-md" />
                            <div className="relative p-4 text-white">
                              <h3 className="text-lg font-bold font-headline">All Products</h3>
                              <p className="text-sm mt-1">Explore our full range of digital keys and services.</p>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                      <ul className="grid grid-cols-2 gap-3 p-2">
                        {productLinks.map((product) => (
                          <ListItem
                            key={product.title}
                            title={product.title}
                            href={product.href}
                            icon={product.icon}
                            className={cn("text-gray-700", product.disabled && "opacity-50 cursor-not-allowed")}
                          >
                            {product.description}
                          </ListItem>
                        ))}
                      </ul>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/ai-tools"
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent text-gray-700 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black data-[active]:text-black",
                    )}
                  >
                    AI Tools
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-gray-700 hover:bg-gray-100 hover:text-black data-[state=open]:bg-gray-100 data-[state=open]:text-black focus:bg-gray-100 focus:text-black data-[active]:text-black">
                    Courses
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[600px] gap-3 p-4 md:grid-cols-2 lg:w-[800px] lg:grid-cols-2 bg-white">
                      {courseLinks.map((course) => (
                        <ListItem key={course.title} title={course.title} href={course.href} className="text-gray-700">
                          {course.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-gray-700 hover:bg-gray-100 hover:text-black data-[state=open]:bg-gray-100 data-[state=open]:text-black focus:bg-gray-100 focus:text-black data-[active]:text-black">
                    Pages
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[600px] grid-cols-[1fr_2fr] gap-4 p-4 bg-white">
                      <div className="relative">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted no-underline outline-none focus:shadow-md"
                            href="https://chat.whatsapp.com/BpPeom8JaHvKak8aVx51Vv?mode=ems_copy_t"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Image
                              src="https://i.postimg.cc/2ymc5B4H/White-and-Black-Modern-New-Graduate-Professional-Resume-2.jpg"
                              alt="Header promotion"
                              fill
                              className="object-cover w-full h-full rounded-md"
                              data-ai-hint="gaming items abstract"
                            />
                          </Link>
                        </NavigationMenuLink>
                      </div>
                      <div className="flex flex-col">
                        <ul className="flex flex-col gap-3">
                          {pageLinks.map((component) => (
                            <ListItem
                              key={component.title}
                              title={component.title}
                              href={component.href}
                              className="text-gray-700"
                            >
                              {component.description}
                            </ListItem>
                          ))}
                        </ul>
                        <div className="mt-4">
                          <h3 className="font-medium text-sm text-gray-900 px-3">Policies</h3>
                          <ul className="grid grid-cols-2 gap-2 mt-2">
                            {policyLinks.slice(0, 4).map((component) => (
                              <ListItem
                                key={component.title}
                                title={component.title}
                                href={component.href}
                                className="text-xs text-gray-700"
                              />
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex md:hidden">
            <button
              type="button"
              className="text-gray-700"
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
            >
              {!expanded ? <Menu className="w-7 h-7" /> : <X className="w-7 h-7" />}
            </button>
          </div>

          <div className="hidden md:flex items-center justify-end gap-2">
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative text-gray-700 hover:bg-gray-100 hover:text-black">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Cart</span>
              </Button>
            </Link>
            {loading ? (
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative text-gray-700 hover:bg-gray-100 hover:text-black"
                  >
                    <User className="h-5 w-5" />
                    <span className="sr-only">User menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user.email}</p>
                    <p className="text-xs text-muted-foreground">{user.user_metadata?.full_name || "User"}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/my-account">My Account</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/my-account/orders">Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/my-account/favorites">Favorites</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" asChild className="text-gray-700 hover:bg-gray-100 hover:text-black">
                  <Link href="/login">Sign in</Link>
                </Button>
                <Button asChild className="bg-black text-white hover:bg-gray-800">
                  <Link href="/signup">Sign up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
        {expanded && (
          <nav className="bg-white/80 backdrop-blur-sm rounded-2xl mt-2 p-4 border">
            <div className="grid gap-y-2">
              <Link
                href="/free-tools"
                onClick={() => setExpanded(false)}
                title="Free Tools"
                className="flex items-center justify-between p-3 text-base font-medium transition-all duration-200 rounded-md hover:bg-gray-100 text-gray-700"
              >
                Free Tools
                <span className="relative inline-flex overflow-hidden rounded-full p-[1px]">
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"></span>
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-background px-2 py-0.5 text-xs font-bold text-primary backdrop-blur-3xl">
                    NEW
                  </span>
                </span>
              </Link>
              <Link
                href="/products"
                onClick={() => setExpanded(false)}
                title="Products"
                className="flex items-center p-3 text-base font-medium transition-all duration-200 rounded-md hover:bg-gray-100 text-gray-700"
              >
                Products
              </Link>
              <Link
                href="/ai-tools"
                onClick={() => setExpanded(false)}
                title="AI Tools"
                className="flex items-center p-3 text-base font-medium transition-all duration-200 rounded-md hover:bg-gray-100 text-gray-700"
              >
                AI Tools
              </Link>
              <Link
                href="/courses"
                onClick={() => setExpanded(false)}
                title="Courses"
                className="flex items-center p-3 text-base font-medium transition-all duration-200 rounded-md hover:bg-gray-100 text-gray-700"
              >
                Courses
              </Link>
              <Link
                href="/about"
                onClick={() => setExpanded(false)}
                title="About Us"
                className="flex items-center p-3 text-base font-medium transition-all duration-200 rounded-md hover:bg-gray-100 text-gray-700"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                onClick={() => setExpanded(false)}
                title="Contact Us"
                className="flex items-center p-3 text-base font-medium transition-all duration-200 rounded-md hover:bg-gray-100 text-gray-700"
              >
                Contact Us
              </Link>
              {loading ? (
                <div className="w-full h-10 rounded-md bg-gray-200 animate-pulse" />
              ) : user ? (
                <>
                  <Link
                    href="/my-account"
                    onClick={() => setExpanded(false)}
                    className="flex items-center p-3 text-base font-medium transition-all duration-200 rounded-md hover:bg-gray-100 text-gray-700"
                  >
                    My Account
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout()
                      setExpanded(false)
                    }}
                    className="flex items-center p-3 text-base font-medium transition-all duration-200 rounded-md hover:bg-gray-100 text-red-600 text-left w-full"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setExpanded(false)}
                    className="flex items-center p-3 text-base font-medium transition-all duration-200 rounded-md hover:bg-gray-100 text-gray-700"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setExpanded(false)}
                    className="flex items-center p-3 text-base font-medium transition-all duration-200 rounded-md bg-black text-white hover:bg-gray-800"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon?: React.ReactNode }
>(({ className, title, children, icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100",
            className,
          )}
          {...props}
        >
          <div className="flex items-center gap-2">
            {icon && <div className="p-2 bg-gray-100 rounded-lg shadow-inner text-gray-900">{icon}</div>}
            <div className="text-sm font-medium leading-none text-gray-900">{title}</div>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-gray-500">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
