// src/components/require-admin.tsx
"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Skeleton } from "./ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { AlertTriangle } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function RequireAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
        <div className="flex flex-col space-y-3 p-8">
            <Skeleton className="h-[125px] w-full rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
        </div>
    );
  }

  if (user && !user.user_metadata?.is_admin) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-md text-center p-8">
                <CardHeader>
                    <div className="mx-auto bg-red-100 p-3 rounded-full w-fit">
                        <AlertTriangle className="h-8 w-8 text-red-600" />
                    </div>
                    <CardTitle className="mt-4 text-2xl font-bold">Access Denied</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">You do not have permission to view this page. This area is restricted to administrators only.</p>
                    <Button asChild className="mt-6">
                        <Link href="/my-account">Go to My Account</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
  }


  return <>{children}</>;
}
