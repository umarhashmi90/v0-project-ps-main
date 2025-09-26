// src/app/admin/banner/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, Edit, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Banner } from '@/context/BannerContext';
import { supabase } from '@/lib/supabase';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function AdminBannerPage() {
    const [banners, setBanners] = useState<Banner[]>([]);
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(true);

    const [newBannerText, setNewBannerText] = useState('');
    const [newBannerType, setNewBannerType] = useState<'info' | 'discount' | 'warning'>('info');
    const [isCreating, setIsCreating] = useState(false);
    
    const fetchBanners = async () => {
        setIsLoading(true);
        const { data, error } = await supabase.from('banners').select('*').order('created_at', { ascending: false });
        if (error) {
            toast({ title: "Error", description: `Could not fetch banners: ${error.message}`, variant: "destructive" });
        } else {
            setBanners(data);
        }
        setIsLoading(false);
    };
    
    useEffect(() => {
        fetchBanners();
    }, []);

    const handleAddBanner = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsCreating(true);

        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                throw new Error("You must be logged in to create a banner.");
            }
        
            const { data, error } = await supabase.functions.invoke('create-banner', {
                headers: {
                    'Authorization': `Bearer ${session.access_token}`,
                },
                body: {
                    text: newBannerText,
                    type: newBannerType,
                },
            });

            if (error) {
                 const errorData = await error.context.json();
                 throw new Error(errorData.error || error.message);
            }
            
            if (data.error) {
                throw new Error(data.error);
            }

            setBanners(prevBanners => [data.banner, ...prevBanners]);
            setNewBannerText('');
            setNewBannerType('info');
            toast({ title: "Banner Created", description: "The new banner has been added successfully." });
        } catch (error: any) {
            toast({ title: "Error Creating Banner", description: error.message, variant: "destructive" });
        } finally {
            setIsCreating(false);
        }
    };
    
    const handleDeleteBanner = async (id: number) => {
        const originalBanners = banners;
        setBanners(banners.filter(b => b.id !== id));
        
        const { error } = await supabase.from('banners').delete().eq('id', id);
        
        if (error) {
            toast({ title: "Error", description: `Could not delete banner: ${error.message}`, variant: "destructive" });
            setBanners(originalBanners);
        } else {
            toast({ title: "Banner Deleted", variant: "default" });
        }
    };

    const handleToggleActive = async (id: number) => {
        const banner = banners.find(b => b.id === id);
        if (!banner) return;

        const originalBanners = banners;
        const newStatus = !banner.active;
        setBanners(banners.map(b => b.id === id ? { ...b, active: newStatus } : b));
        
        const { error } = await supabase
            .from('banners')
            .update({ active: newStatus })
            .eq('id', id);

        if (error) {
            toast({ title: "Error", description: `Could not update status: ${error.message}`, variant: "destructive" });
            setBanners(originalBanners);
        } else {
             toast({
                title: "Status Updated",
                description: `Banner status has been changed.`,
            });
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Banner Management</h2>
                <p className="text-muted-foreground">Manage sitewide announcement banners.</p>
            </div>

             <Card>
                <CardHeader>
                    <CardTitle>Create New Banner</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleAddBanner} className="flex flex-col sm:flex-row items-end gap-4">
                        <div className="flex-1 w-full">
                            <label htmlFor="banner-text" className="text-sm font-medium">Banner Text</label>
                            <Input
                                id="banner-text"
                                value={newBannerText}
                                onChange={(e) => setNewBannerText(e.target.value)}
                                placeholder="E.g., Special 20% discount this week!"
                                required
                                className="mt-1"
                            />
                        </div>
                        <div className="w-full sm:w-48">
                            <label htmlFor="banner-type" className="text-sm font-medium">Type</label>
                            <Select onValueChange={(value: 'info' | 'discount' | 'warning') => setNewBannerType(value)} defaultValue={newBannerType}>
                                <SelectTrigger id="banner-type" className="mt-1">
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="info">Info</SelectItem>
                                    <SelectItem value="discount">Discount</SelectItem>
                                    <SelectItem value="warning">Warning</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button type="submit" disabled={isCreating} className="w-full sm:w-auto">
                            {isCreating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Add Banner
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Current Banners</CardTitle>
                    <CardDescription>Manage your existing banners here. You can activate or deactivate them. Multiple active banners will rotate on the website.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Text</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                             {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={4}>
                                        <div className="flex justify-center items-center py-8">
                                            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : banners.length > 0 ? (
                                banners.map((banner) => (
                                    <TableRow key={banner.id}>
                                        <TableCell className="font-medium max-w-sm truncate">{banner.text}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={cn(
                                                "font-semibold",
                                                banner.type === 'info' && 'bg-blue-100 text-blue-800 border-blue-200',
                                                banner.type === 'discount' && 'bg-green-100 text-green-800 border-green-200',
                                                banner.type === 'warning' && 'bg-yellow-100 text-yellow-800 border-yellow-200',
                                            )}>
                                                {banner.type}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Switch
                                                checked={banner.active}
                                                onCheckedChange={() => handleToggleActive(banner.id)}
                                                aria-label={`Activate banner: ${banner.text}`}
                                            />
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="icon" disabled>
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => handleDeleteBanner(banner.id)} className="text-red-500 hover:text-red-600">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center">
                                        No banners found. Add one above to get started.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
