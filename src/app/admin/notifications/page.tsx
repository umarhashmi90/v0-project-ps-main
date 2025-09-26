// src/app/admin/notifications/page.tsx
'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from '@/lib/supabase';
import { Loader2, UserPlus, ShoppingCart, MessageSquareWarning, Lightbulb } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

type Notification = {
  id: string;
  type: 'new_user' | 'new_order' | 'new_report' | 'new_suggestion';
  data: {
    message: string;
    user_name?: string;
    user_email?: string;
    avatar_url?: string;
  };
  created_at: string;
};

const NotificationIcon = ({ type }: { type: Notification['type'] }) => {
    switch (type) {
        case 'new_user':
            return <UserPlus className="h-5 w-5 text-blue-500" />;
        case 'new_order':
            return <ShoppingCart className="h-5 w-5 text-green-500" />;
        case 'new_report':
            return <MessageSquareWarning className="h-5 w-5 text-red-500" />;
        case 'new_suggestion':
            return <Lightbulb className="h-5 w-5 text-yellow-500" />;
        default:
            return null;
    }
};

export default function AdminNotificationsPage() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    const fetchNotifications = useCallback(async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('notifications')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching notifications:', error);
            toast({
                title: "Error",
                description: "Could not fetch notifications.",
                variant: "destructive"
            });
        } else {
            setNotifications(data as Notification[]);
        }
        setLoading(false);
    }, [toast]);

    useEffect(() => {
        fetchNotifications();

        const channel = supabase.channel('realtime-notifications')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notifications' }, (payload) => {
                setNotifications(currentNotifications => [payload.new as Notification, ...currentNotifications]);
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [fetchNotifications]);

    return (
        <div>
            <div className="mb-4">
                <h2 className="text-2xl font-bold tracking-tight">Notifications</h2>
                <p className="text-muted-foreground">Real-time updates from your website.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Activity Feed</CardTitle>
                    <CardDescription>A live feed of all user activities.</CardDescription>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex justify-center items-center py-8">
                            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                        </div>
                    ) : notifications.length > 0 ? (
                        <div className="space-y-4">
                            {notifications.map((notification) => (
                                <div key={notification.id} className="flex items-start gap-4 p-3 bg-gray-50/50 rounded-lg border">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                                        <NotificationIcon type={notification.type} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-foreground">{notification.data.message}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-muted-foreground">
                            <p>No notifications yet.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
