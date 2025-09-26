'use client';
import React, { useEffect, useState } from 'react';
import Footer from "@/components/landing/footer";
import Header from "@/components/landing/header";
import RequireAuth from "@/components/require-auth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
    PanelLeft, 
    LayoutDashboard, 
    ShoppingCart, 
    Download, 
    User, 
    CreditCard, 
    LogOut,
    Settings,
    MessageSquareWarning,
    Lightbulb,
    Search,
    Heart,
    Gift
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Logo } from "@/components/logo";
import { Input } from '@/components/ui/input';

const baseNavItems = [
  { href: "/my-account", label: "Dashboard", icon: <LayoutDashboard /> },
  { href: "/my-account/orders", label: "Orders", icon: <ShoppingCart /> },
  { href: "/my-account/downloads", label: "Downloads", icon: <Download /> },
  { href: "/my-account/favorites", label: "Favorites", icon: <Heart /> },
  { href: "/my-account/reporting", label: "Reporting", icon: <MessageSquareWarning /> },
  { href: "/my-account/suggestions", label: "Suggestions", icon: <Lightbulb /> },
  { href: "/my-account/account-details", label: "Settings", icon: <Settings /> },
];

function SidebarNav({ hasSurprise }: { hasSurprise: boolean }) {
    const pathname = usePathname();
    const { user } = useAuth();
    const { toast } = useToast();
    const router = useRouter();

    const handleLogout = async () => {
        try {
          await supabase.auth.signOut();
          toast({
            title: "Success!",
            description: "You have successfully logged out.",
          });
          router.push("/");
        } catch (error: any) {
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
          });
        }
    };
    
    const navItems = [
        ...baseNavItems,
        ...(hasSurprise ? [{ href: "/my-account/surprise", label: "Surprise", icon: <Gift /> }] : []),
    ];

    const isSettingsActive = pathname.startsWith('/my-account/account-details') || pathname.startsWith('/my-account/billing');

    return (
        <aside className="hidden md:flex flex-col w-64 lg:w-72 border-r bg-white shrink-0">
            <div className="p-4 border-b h-16 flex items-center">
                <Logo />
            </div>
             <div className="flex items-center gap-3 p-4 border-b">
                 <Avatar className="h-10 w-10">
                    <AvatarImage src={user?.user_metadata.avatar_url ?? ""} alt={user?.user_metadata.full_name ?? ""} />
                    <AvatarFallback>{user?.email?.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 truncate">
                    <p className="font-semibold text-sm text-gray-800 truncate">{user?.user_metadata.full_name || user?.email}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                  </div>
            </div>

            <div className="p-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input placeholder="Search..." className="pl-9 bg-gray-100 border-gray-200 h-9" />
                </div>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                {navItems.map((item) => {
                    const isActive = item.href === '/my-account/account-details' 
                        ? pathname.startsWith('/my-account/account-details') || pathname === '/my-account/billing'
                        : pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-md font-medium text-gray-600 transition-colors text-sm",
                                 isActive
                                    ? "bg-primary/10 text-primary"
                                    : "hover:bg-gray-100 hover:text-gray-900",
                                item.label === "Surprise" && "glowing-card text-purple-600"
                            )}
                        >
                            {React.cloneElement(item.icon, { className: "h-5 w-5" })}
                            <span>{item.label}</span>
                        </Link>
                    )
                })}
            </nav>
            <div className="p-4 border-t">
                <Button variant="ghost" className="w-full justify-start gap-3 text-gray-600 hover:bg-gray-100 hover:text-gray-900 text-sm" onClick={handleLogout}>
                    <LogOut className="h-5 w-5" />
                    Log Out
                </Button>
            </div>
      </aside>
    )
}

const settingsNavItems = [
    { href: "/my-account/account-details", label: "My Profile" },
    { href: "/my-account/account-details/password", label: "Password" },
    { href: "/my-account/billing", label: "Billing" },
    { href: "/my-account/account-details/notifications", label: "Notifications" },
];


export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [hasSurprise, setHasSurprise] = useState(false);

  useEffect(() => {
    const checkSurprise = async () => {
        if (user) {
            const { data, error } = await supabase
                .from('surprises')
                .select('id')
                .eq('user_id', user.id)
                .eq('claimed', false)
                .limit(1);

            if (error) {
                console.error("Error checking for surprises:", error);
            } else if (data && data.length > 0) {
                setHasSurprise(true);
            } else {
                setHasSurprise(false);
            }
        }
    };
    checkSurprise();
  }, [user, pathname]); // Re-check on user change or navigation


  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Success!",
        description: "You have successfully logged out.",
      });
      router.push("/");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };
  
  const navItems = [
    ...baseNavItems,
    ...(hasSurprise ? [{ href: "/my-account/surprise", label: "Surprise", icon: <Gift /> }] : []),
  ];

  const isSettingsPage = pathname.startsWith('/my-account/account-details') || pathname.startsWith('/my-account/billing');

  return (
    <RequireAuth>
      <div className="flex min-h-[100dvh] flex-col bg-gray-50">
        <Header />
        <main className="flex-1 pt-24 md:pt-32">
          <div className="container py-8">
             <div className="md:hidden mb-6 flex items-center justify-between">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon">
                            <PanelLeft className="h-5 w-5" />
                            <span className="sr-only">Toggle Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="pt-12 w-72 bg-white/80 backdrop-blur-sm p-0">
                         <div className="p-4 border-b h-16 flex items-center">
                            <Logo />
                        </div>
                        <div className="p-4 flex flex-col items-center text-center border-b">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src={user?.user_metadata.avatar_url ?? ""} alt={user?.user_metadata.full_name ?? ""} />
                                <AvatarFallback>{user?.email?.charAt(0).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <h3 className="mt-4 font-bold font-headline">{user?.user_metadata.full_name || user?.email}</h3>
                        </div>
                        <nav className="grid gap-2 p-4">
                            {navItems.map((item) => (
                                <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-base",
                                    pathname === item.href
                                    ? "bg-primary/10 text-primary font-semibold"
                                    : "text-muted-foreground hover:bg-gray-200 hover:text-foreground",
                                    item.label === "Surprise" && "glowing-card text-purple-600"
                                )}
                                >
                                {React.cloneElement(item.icon, { className: "h-5 w-5" })}
                                {item.label}
                                </Link>
                            ))}
                        </nav>
                        <div className="p-4 mt-auto border-t">
                           <Button variant="ghost" className="w-full justify-start gap-3" onClick={handleLogout}>
                                <LogOut className="h-5 w-5" />
                                Log Out
                           </Button>
                        </div>
                    </SheetContent>
                </Sheet>
                {isSettingsPage && (
                    <div className="text-2xl font-bold font-headline">Settings</div>
                )}
            </div>
            <div className="bg-white rounded-xl border flex">
                <SidebarNav hasSurprise={hasSurprise} />
                <div className="flex-1 p-6 md:p-8 min-w-0">
                    {isSettingsPage && (
                        <>
                            <div className="hidden md:block">
                                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-headline">
                                    Settings
                                </h1>
                            </div>
                             <nav className="mt-6 border-b overflow-x-auto">
                                <div className="flex items-center gap-4 -mb-px">
                                    {settingsNavItems.map((item) => (
                                        <Link 
                                            key={item.href}
                                            href={item.href}
                                            className={cn(
                                                "py-3 px-1 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                                                pathname === item.href
                                                    ? "border-primary text-primary"
                                                    : "border-transparent text-muted-foreground hover:text-foreground"
                                            )}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            </nav>
                        </>
                    )}
                    <div className={cn(isSettingsPage ? "mt-8" : "")}>
                        {children}
                    </div>
                </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </RequireAuth>
  );
}
