// src/app/admin/page.tsx
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { CreditCard, Users, Activity, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";

type DashboardStats = {
    totalSubscriptions: number;
    newSubscriptions: number;
    totalSales: number;
    newSales: number;
};

export default function AdminDashboardPage() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [
                    { data: totalSubscriptions, error: subError },
                    { data: newSubscriptions, error: newSubError },
                    { data: totalSales, error: salesError },
                    { data: newSales, error: newSalesError }
                ] = await Promise.all([
                    supabase.rpc('get_total_subscriptions'),
                    supabase.rpc('get_new_subscriptions_last_month'),
                    supabase.rpc('get_total_sales'),
                    supabase.rpc('get_new_sales_last_month')
                ]);

                if (subError || newSubError || salesError || newSalesError) {
                    console.error("Error fetching stats:", subError || newSubError || salesError || newSalesError);
                    throw new Error("Could not fetch dashboard statistics.");
                }

                setStats({
                    totalSubscriptions: totalSubscriptions || 0,
                    newSubscriptions: newSubscriptions || 0,
                    totalSales: totalSales || 0,
                    newSales: newSales || 0,
                });
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);
    
    if (loading) {
        return (
             <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-2">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <Loader2 className="h-6 w-6 animate-spin" />
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Sales</CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                       <Loader2 className="h-6 w-6 animate-spin" />
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-2">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    Subscriptions
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">+{stats?.totalSubscriptions}</div>
                <p className="text-xs text-muted-foreground">
                    +{stats?.newSubscriptions} from last month
                </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sales</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">+{stats?.totalSales}</div>
                <p className="text-xs text-muted-foreground">
                    +{stats?.newSales} from last month
                </p>
                </CardContent>
            </Card>
        </div>
    );
}
