'use client';
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";

// Dummy data has been removed. This page will be ready to display real orders when fetched.
const orders: any[] = []

export default function OrdersPage() {
  return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-headline">
                    Your Orders
                </h1>
                <p className="mt-2 text-muted-foreground">
                    Here is a list of your past orders.
                </p>
            </div>
            {orders.length > 0 ? (
                <div className="border rounded-lg bg-gray-50/50">
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Order</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {orders.map((order) => (
                        <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>
                            <Badge variant="outline" className={cn(
                                "font-semibold",
                                order.status === 'Completed' && 'bg-green-100 text-green-800 border-green-200',
                                order.status === 'Pending' && 'bg-yellow-100 text-yellow-800 border-yellow-200',
                                order.status === 'Cancelled' && 'bg-red-100 text-red-800 border-red-200',
                            )}>
                                {order.status}
                            </Badge>
                        </TableCell>
                        <TableCell className="text-right">{order.total}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </div>
            ) : (
                <div className="text-center py-12 border-2 border-dashed rounded-lg">
                    <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900">No Orders Yet</h3>
                    <p className="mt-2 text-sm text-gray-500">You have not placed any orders yet.</p>
                </div>
            )}
        </div>
  );
}
