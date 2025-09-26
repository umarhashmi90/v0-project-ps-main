// src/app/admin/customers/page.tsx
'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Eye, Edit, Trash2, File, Search, Calendar as CalendarIcon, Loader2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { useCurrency } from '@/hooks/use-currency';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';
import type { DateRange } from 'react-day-picker';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

type Order = {
    id: string;
    order_number: string;
    created_at: string;
    items: { name: string; qty: number }[];
    amount: number;
    status: 'COMPLETED' | 'PENDING' | 'CANCELLED';
};

type Customer = {
    id: string;
    email: string;
    created_at: string;
    profiles: {
        full_name: string;
        avatar_url: string;
    } | null;
    orders: Order[];
    total_spent: number;
};

export default function AdminCustomersPage() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const { formatPrice } = useCurrency();
    const { toast } = useToast();
    const [dateRange, setDateRange] = React.useState<DateRange | undefined>();

    useEffect(() => {
        const fetchCustomers = async () => {
            setLoading(true);
            try {
                // Step 1: Fetch all users and their profiles in one go
                const { data: usersData, error: usersError } = await supabase
                    .from('users')
                    .select(`
                        id,
                        email,
                        created_at,
                        profiles (
                            full_name,
                            avatar_url
                        )
                    `);

                if (usersError) throw usersError;

                // Step 2: Fetch all orders
                const { data: ordersData, error: ordersError } = await supabase
                    .from('orders')
                    .select('id, user_id, order_number, created_at, items, amount, status');

                if (ordersError) {
                    toast({ title: "Warning", description: "Could not fetch all order data.", variant: "default" });
                }

                // Step 3: Combine the data in the frontend
                const customersWithOrders = usersData.map((user: any) => {
                    const userOrders = ordersData?.filter(order => order.user_id === user.id) || [];
                    const totalSpent = userOrders.reduce((acc, order) => acc + (order.amount || 0), 0);
                    return {
                        ...user,
                        orders: userOrders,
                        total_spent: totalSpent,
                    };
                });
                
                setCustomers(customersWithOrders);
            } catch (error: any) {
                 toast({ title: "Error fetching customers", description: error.message, variant: "destructive" });
            } finally {
                setLoading(false);
            }
        };

        fetchCustomers();
    }, [toast]);


    const filteredCustomers = useMemo(() => {
        let filtered = customers;

        if (dateRange?.from) {
            filtered = filtered.filter(customer => {
                const registeredDate = parseISO(customer.created_at);
                const fromDate = dateRange.from!;
                const toDate = dateRange.to ?? fromDate;
                return registeredDate >= fromDate && registeredDate <= toDate;
            });
        }
        
        if (searchQuery) {
            filtered = filtered.filter(customer =>
                customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                customer.profiles?.full_name?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        return filtered;
    }, [searchQuery, dateRange, customers]);

    const handleExport = () => {
        const csvContent = [
            "Name,Email,Registered On",
            ...filteredCustomers.map(c => `${c.profiles?.full_name || 'N/A'},${c.email},${new Date(c.created_at).toLocaleDateString()}`)
        ].join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", "customers.csv");
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };
    
    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Customers</h2>
                    <p className="text-muted-foreground">Manage your customers and view their purchase history.</p>
                </div>
                 <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto items-center">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                id="date"
                                variant={"outline"}
                                className={cn(
                                    "w-full sm:w-64 justify-start text-left font-normal",
                                    !dateRange && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {dateRange?.from ? (
                                    dateRange.to ? (
                                        <>
                                            {format(dateRange.from, "LLL dd, y")} -{" "}
                                            {format(dateRange.to, "LLL dd, y")}
                                        </>
                                    ) : (
                                        format(dateRange.from, "LLL dd, y")
                                    )
                                ) : (
                                    <span>Pick a date range</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="end">
                            <Calendar
                                initialFocus
                                mode="range"
                                defaultMonth={dateRange?.from}
                                selected={dateRange}
                                onSelect={setDateRange}
                                numberOfMonths={2}
                            />
                        </PopoverContent>
                    </Popover>
                    <div className="relative w-full sm:w-auto">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search by name or email..."
                            className="w-full sm:w-64 pl-8"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Button onClick={handleExport} variant="outline" className="w-full sm:w-auto">
                        <File className="mr-2 h-4 w-4" />
                        Export
                    </Button>
                </div>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Customer List</CardTitle>
                    <CardDescription>A list of all registered users in your store.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Customer</TableHead>
                                <TableHead className="hidden sm:table-cell">Total Orders</TableHead>
                                <TableHead className="hidden sm:table-cell">Total Spent</TableHead>
                                <TableHead className="hidden md:table-cell">Registered On</TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-10">
                                        <Loader2 className="mx-auto h-8 w-8 animate-spin text-muted-foreground" />
                                    </TableCell>
                                </TableRow>
                            ) : filteredCustomers.length > 0 ? (
                                filteredCustomers.map((customer) => (
                                    <TableRow key={customer.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-4">
                                                <Avatar className="hidden h-9 w-9 sm:flex">
                                                    <AvatarImage src={customer.profiles?.avatar_url} alt={customer.profiles?.full_name} data-ai-hint="person portrait" />
                                                    <AvatarFallback>{customer.profiles?.full_name?.charAt(0) || customer.email.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div className="grid gap-1">
                                                    <p className="text-sm font-medium leading-none">{customer.profiles?.full_name || 'N/A'}</p>
                                                    <p className="text-sm text-muted-foreground">{customer.email}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell text-center">{customer.orders.length}</TableCell>
                                        <TableCell className="hidden sm:table-cell">{formatPrice(customer.total_spent)}</TableCell>
                                        <TableCell className="hidden md:table-cell">{format(parseISO(customer.created_at), "dd LLL, yyyy")}</TableCell>
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
                                                        <DropdownMenuSeparator />
                                                        <DialogTrigger asChild>
                                                            <DropdownMenuItem>
                                                                <Eye className="mr-2 h-4 w-4" />
                                                                View Details
                                                            </DropdownMenuItem>
                                                        </DialogTrigger>
                                                        <DropdownMenuItem>
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="text-red-600">
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>

                                                <DialogContent className="sm:max-w-3xl">
                                                    <DialogHeader>
                                                        <DialogTitle>Customer Details</DialogTitle>
                                                        <DialogDescription>
                                                            Viewing full details for {customer.profiles?.full_name}.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="grid gap-6 py-4">
                                                        <div className="flex items-center gap-4">
                                                            <Avatar className="h-16 w-16">
                                                                <AvatarImage src={customer.profiles?.avatar_url} alt={customer.profiles?.full_name} />
                                                                <AvatarFallback>{customer.profiles?.full_name?.charAt(0) || customer.email.charAt(0)}</AvatarFallback>
                                                            </Avatar>
                                                            <div>
                                                                <h3 className="font-bold text-lg">{customer.profiles?.full_name}</h3>
                                                                <p className="text-sm text-muted-foreground">{customer.email}</p>
                                                                <p className="text-xs text-muted-foreground">Registered on: {format(parseISO(customer.created_at), "dd LLL, yyyy")}</p>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <h4 className="font-semibold mb-2">Purchase History</h4>
                                                            {customer.orders.length > 0 ? (
                                                                <Table>
                                                                    <TableHeader>
                                                                        <TableRow>
                                                                            <TableHead>Order ID</TableHead>
                                                                            <TableHead>Date</TableHead>
                                                                            <TableHead>Items</TableHead>
                                                                            <TableHead>Status</TableHead>
                                                                            <TableHead className="text-right">Total</TableHead>
                                                                        </TableRow>
                                                                    </TableHeader>
                                                                    <TableBody>
                                                                        {customer.orders.map(order => (
                                                                            <TableRow key={order.order_number}>
                                                                                <TableCell>{order.order_number}</TableCell>
                                                                                <TableCell>{format(parseISO(order.created_at), "dd LLL, yyyy")}</TableCell>
                                                                                <TableCell>{order.items?.map((i: any) => `${i.name} (x${i.quantity})`).join(', ') || 'N/A'}</TableCell>
                                                                                <TableCell>
                                                                                    <Badge variant={order.status === 'COMPLETED' ? 'default' : 'secondary'}
                                                                                        className={order.status === 'COMPLETED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                                                                                        {order.status}
                                                                                    </Badge>
                                                                                </TableCell>
                                                                                <TableCell className="text-right">{formatPrice(order.amount)}</TableCell>
                                                                            </TableRow>
                                                                        ))}
                                                                    </TableBody>
                                                                </Table>
                                                            ) : (
                                                                <p className="text-sm text-muted-foreground text-center py-4">No purchase history found.</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center">No customers found.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
