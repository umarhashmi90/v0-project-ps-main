// src/app/admin/reports/page.tsx
'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Eye, Trash2, Pencil, CheckCircle, Star, Loader2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

type Report = {
  id: string;
  subject: string;
  description: string;
  created_at: string;
  status: 'New' | 'In Progress' | 'Resolved';
  user_id: string;
  profiles: {
    full_name: string | null;
    avatar_url: string | null;
  } | null;
};

export default function AdminReportsPage() {
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    const fetchReports = useCallback(async () => {
        setLoading(true);
        try {
            // Step 1: Fetch all reports
            const { data: reportsData, error: reportsError } = await supabase
                .from('reports')
                .select('*')
                .order('created_at', { ascending: false });

            if (reportsError) throw reportsError;
            if (!reportsData) {
                setReports([]);
                setLoading(false);
                return;
            }

            // Step 2: Get all unique user IDs from the reports
            const userIds = [...new Set(reportsData.map(report => report.user_id))];

            // Step 3: Fetch profiles for those user IDs
            const { data: profilesData, error: profilesError } = await supabase
                .from('profiles')
                .select('id, full_name, avatar_url')
                .in('id', userIds);

            if (profilesError) throw profilesError;

            // Step 4: Map profiles to their respective reports
            const reportsWithProfiles = reportsData.map(report => {
                const profile = profilesData.find(p => p.id === report.user_id);
                return {
                    ...report,
                    profiles: profile ? { full_name: profile.full_name, avatar_url: profile.avatar_url } : null
                };
            });
            
            setReports(reportsWithProfiles);

        } catch (error: any) {
            console.error('Error fetching reports:', error);
            toast({
                title: "Error",
                description: "Could not fetch reports. " + error.message,
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    }, [toast]);

    useEffect(() => {
        fetchReports();
    }, [fetchReports]);

    const handleStatusChange = async (id: string, newStatus: 'In Progress' | 'Resolved') => {
        const { error } = await supabase
            .from('reports')
            .update({ status: newStatus })
            .eq('id', id);

        if (error) {
            toast({
                title: "Error Updating Status",
                description: error.message,
                variant: "destructive"
            });
        } else {
            setReports(prevReports =>
                prevReports.map(report =>
                    report.id === id ? { ...report, status: newStatus } : report
                )
            );
            toast({
                title: "Status Updated",
                description: `Report has been marked as ${newStatus}.`,
            });
        }
    };
    
    const handleDelete = async (id: string) => {
        const { error } = await supabase
            .from('reports')
            .delete()
            .eq('id', id);
        
        if (error) {
             toast({
                title: "Error Deleting Report",
                description: error.message,
                variant: "destructive"
            });
        } else {
            setReports(prevReports => prevReports.filter(report => report.id !== id));
            toast({
                title: "Report Deleted",
                description: `Report has been successfully deleted.`,
                variant: "destructive"
            });
        }
    }

    return (
        <div>
            <div className="mb-4">
                <h2 className="text-2xl font-bold tracking-tight">Reports</h2>
                <p className="text-muted-foreground">View and manage user-submitted reports.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>User Reports</CardTitle>
                    <CardDescription>A list of all submitted reports from your users.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Subject</TableHead>
                                <TableHead className="hidden md:table-cell">Date</TableHead>
                                <TableHead className="hidden sm:table-cell">Status</TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center">
                                        <div className="flex justify-center items-center py-8">
                                            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : reports.length > 0 ? (
                                reports.map((report) => {
                                    const userFullName = report.profiles?.full_name;
                                    const userAvatarUrl = report.profiles?.avatar_url;
                                    
                                    return (
                                        <TableRow key={report.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="hidden h-9 w-9 sm:flex">
                                                        <AvatarImage src={userAvatarUrl ?? undefined} alt={userFullName ?? ''} data-ai-hint="person portrait" />
                                                        <AvatarFallback>{userFullName?.charAt(0) ?? 'U'}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="font-medium">{userFullName ?? 'N/A'}</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="font-medium max-w-xs truncate">{report.subject}</TableCell>
                                            <TableCell className="hidden md:table-cell">{new Date(report.created_at).toLocaleDateString()}</TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                <Badge variant={
                                                    report.status === 'Resolved' ? 'default' : report.status === 'In Progress' ? 'secondary' : 'destructive'
                                                } className={
                                                    report.status === 'Resolved' ? 'bg-green-100 text-green-800' : report.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                                                }>
                                                    {report.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Dialog>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button aria-haspopup="true" size="icon" variant="ghost">
                                                                <MoreHorizontal className="h-4 w-4" />
                                                                <span className="sr-only">Toggle menu</span>
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                            <DialogTrigger asChild>
                                                                <DropdownMenuItem>
                                                                    <Eye className="mr-2 h-4 w-4" />
                                                                    View Details
                                                                </DropdownMenuItem>
                                                            </DialogTrigger>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem>
                                                                <Star className="mr-2 h-4 w-4" />
                                                                Important
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => handleStatusChange(report.id, 'In Progress')}>
                                                                <Pencil className="mr-2 h-4 w-4" />
                                                                Process
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => handleStatusChange(report.id, 'Resolved')}>
                                                                <CheckCircle className="mr-2 h-4 w-4" />
                                                                Complete
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(report.id)}>
                                                                <Trash2 className="mr-2 h-4 w-4" />
                                                                Delete
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>{report.subject}</DialogTitle>
                                                            <DialogDescription>
                                                                Full report details from {userFullName}.
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <div className="py-4 space-y-4">
                                                            <div className="flex items-center gap-4">
                                                                <Avatar>
                                                                    <AvatarImage src={userAvatarUrl ?? undefined} alt={userFullName ?? ''} />
                                                                    <AvatarFallback>{userFullName?.charAt(0) ?? 'U'}</AvatarFallback>
                                                                </Avatar>
                                                                <div>
                                                                    <p className="font-semibold">{userFullName}</p>
                                                                </div>
                                                            </div>
                                                            <div className="text-sm text-muted-foreground">
                                                                <p><strong>Date:</strong> {new Date(report.created_at).toLocaleString()}</p>
                                                                <p><strong>Status:</strong> {report.status}</p>
                                                            </div>
                                                            <div className="p-4 bg-gray-50 rounded-md border">
                                                                <h4 className="font-semibold mb-2">Description</h4>
                                                                <p className="text-sm text-gray-700">{report.description}</p>
                                                            </div>
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center">No reports found.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
