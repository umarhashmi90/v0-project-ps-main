// src/app/admin/suggestions/page.tsx
'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Eye, Trash2, Pencil, CheckCircle, Lightbulb, Loader2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

type Suggestion = {
  id: string;
  title: string;
  details: string;
  created_at: string;
  status: 'New' | 'Under Review' | 'Implemented';
  user_id: string;
  profiles: {
    full_name: string | null;
    avatar_url: string | null;
  } | null;
};

export default function AdminSuggestionsPage() {
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    const fetchSuggestions = useCallback(async () => {
        setLoading(true);
        try {
            // Step 1: Fetch all suggestions
            const { data: suggestionsData, error: suggestionsError } = await supabase
                .from('suggestions')
                .select('*')
                .order('created_at', { ascending: false });

            if (suggestionsError) throw suggestionsError;
            if (!suggestionsData) {
                setSuggestions([]);
                setLoading(false);
                return;
            }

            // Step 2: Get all unique user IDs from the suggestions
            const userIds = [...new Set(suggestionsData.map(suggestion => suggestion.user_id))];

            // Step 3: Fetch profiles for those user IDs
            const { data: profilesData, error: profilesError } = await supabase
                .from('profiles')
                .select('id, full_name, avatar_url')
                .in('id', userIds);
            
            if (profilesError) throw profilesError;

            // Step 4: Map profiles to their respective suggestions
            const suggestionsWithProfiles = suggestionsData.map(suggestion => {
                const profile = profilesData.find(p => p.id === suggestion.user_id);
                return {
                    ...suggestion,
                    profiles: profile ? { full_name: profile.full_name, avatar_url: profile.avatar_url } : null
                };
            });

            setSuggestions(suggestionsWithProfiles);

        } catch (error: any) {
            console.error('Error fetching suggestions:', error);
            toast({
                title: "Error",
                description: "Could not fetch suggestions. " + error.message,
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    }, [toast]);

    useEffect(() => {
        fetchSuggestions();
    }, [fetchSuggestions]);

    const handleStatusChange = async (id: string, newStatus: 'Under Review' | 'Implemented') => {
        const { error } = await supabase
            .from('suggestions')
            .update({ status: newStatus })
            .eq('id', id);

        if (error) {
            toast({
                title: "Error Updating Status",
                description: error.message,
                variant: "destructive"
            });
        } else {
            setSuggestions(prevSuggestions =>
                prevSuggestions.map(suggestion =>
                    suggestion.id === id ? { ...suggestion, status: newStatus } : suggestion
                )
            );
            toast({
                title: "Status Updated",
                description: `Suggestion has been marked as ${newStatus}.`,
            });
        }
    };
    
    const handleDelete = async (id: string) => {
        const { error } = await supabase
            .from('suggestions')
            .delete()
            .eq('id', id);

        if (error) {
            toast({
                title: "Error Deleting Suggestion",
                description: error.message,
                variant: "destructive"
            });
        } else {
            setSuggestions(prevSuggestions => prevSuggestions.filter(suggestion => suggestion.id !== id));
            toast({
                title: "Suggestion Deleted",
                description: `Suggestion has been successfully deleted.`,
                variant: "destructive"
            });
        }
    }

    return (
        <div>
            <div className="mb-4">
                <h2 className="text-2xl font-bold tracking-tight">Suggestions</h2>
                <p className="text-muted-foreground">View and manage user-submitted suggestions.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>User Suggestions</CardTitle>
                    <CardDescription>A list of all submitted suggestions from your users.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Title</TableHead>
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
                            ) : suggestions.length > 0 ? (
                                suggestions.map((suggestion) => {
                                    const userFullName = suggestion.profiles?.full_name;
                                    const userAvatarUrl = suggestion.profiles?.avatar_url;

                                    return (
                                        <TableRow key={suggestion.id}>
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
                                            <TableCell className="font-medium max-w-xs truncate">{suggestion.title}</TableCell>
                                            <TableCell className="hidden md:table-cell">{new Date(suggestion.created_at).toLocaleDateString()}</TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                <Badge variant={
                                                    suggestion.status === 'Implemented' ? 'default' : suggestion.status === 'Under Review' ? 'secondary' : 'destructive'
                                                } className={
                                                    suggestion.status === 'Implemented' ? 'bg-green-100 text-green-800' : suggestion.status === 'Under Review' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                                                }>
                                                    {suggestion.status}
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
                                                            <DropdownMenuItem onClick={() => handleStatusChange(suggestion.id, 'Under Review')}>
                                                                <Pencil className="mr-2 h-4 w-4" />
                                                                Under Review
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => handleStatusChange(suggestion.id, 'Implemented')}>
                                                                <CheckCircle className="mr-2 h-4 w-4" />
                                                                Implemented
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(suggestion.id)}>
                                                                <Trash2 className="mr-2 h-4 w-4" />
                                                                Delete
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>{suggestion.title}</DialogTitle>
                                                            <DialogDescription>
                                                                Full suggestion details from {userFullName}.
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
                                                                <p><strong>Date:</strong> {new Date(suggestion.created_at).toLocaleString()}</p>
                                                                <p><strong>Status:</strong> {suggestion.status}</p>
                                                            </div>
                                                            <div className="p-4 bg-gray-50 rounded-md border">
                                                                <h4 className="font-semibold mb-2">Details</h4>
                                                                <p className="text-sm text-gray-700">{suggestion.details}</p>
                                                            </div>
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center">No suggestions found.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
