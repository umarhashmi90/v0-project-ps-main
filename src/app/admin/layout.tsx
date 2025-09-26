// src/app/admin/layout.tsx
'use client';
import AdminHeader from '@/components/admin/header';
import AdminSidebar from '@/components/admin/sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useSidebar } from '@/components/ui/sidebar';

function MobileSidebar() {
    const { openMobile, setOpenMobile } = useSidebar();
    return (
        <Sheet open={openMobile} onOpenChange={setOpenMobile}>
            <SheetContent side="left" className="w-72 p-0">
                 <SheetHeader className="sr-only">
                    <SheetTitle>Admin Menu</SheetTitle>
                </SheetHeader>
                <AdminSidebar />
            </SheetContent>
        </Sheet>
    )
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <SidebarProvider defaultOpen>
        <div className="flex min-h-screen w-full flex-row bg-muted/40">
          <AdminSidebar />
          <MobileSidebar />
          <div className={cn(
              "flex flex-col flex-1 sm:py-4 transition-all duration-300 ease-in-out",
              "md:group-data-[state=expanded]/sidebar-wrapper:pl-72",
              "md:group-data-[state=collapsed]/sidebar-wrapper:pl-20"
            )}>
            <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
              <AdminHeader />
            </header>
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
  );
}
