// src/app/admin/products/page.tsx
'use client';
import React, { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuCheckboxItem, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Edit, MoreHorizontal, PlusCircle, Trash, EyeOff, ListFilter, File, Loader2 } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useCurrency } from "@/hooks/use-currency";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

type Product = {
    id: number;
    name: string;
    price: number;
    image_url: string;
    ai_hint: string;
    href: string;
    category: 'PC' | 'iOS' | 'Android';
    status: 'Active' | 'Draft';
    stock: number;
    description?: string;
    features?: string[];
};

const emptyProduct: Omit<Product, 'id'> = {
    name: '',
    price: 0,
    image_url: 'https://picsum.photos/seed/placeholder/64/64',
    ai_hint: 'product image',
    href: '',
    category: 'PC',
    status: 'Draft',
    stock: 0,
    description: '',
    features: Array(8).fill(''),
};

export default function AdminProductsPage() {
    const { formatPrice } = useCurrency();
    const { toast } = useToast();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<Partial<Product> | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState<Product | null>(null);
    const [statusFilter, setStatusFilter] = useState<('Active' | 'Draft')[]>(['Active', 'Draft']);

    const fetchProducts = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('id', { ascending: false });

        if (error) {
            toast({ title: "Error fetching products", description: error.message, variant: "destructive" });
        } else {
            setProducts(data || []);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleAddNew = () => {
        setCurrentProduct(emptyProduct);
        setDialogOpen(true);
    };

    const handleEdit = (product: Product) => {
        const features = product.features ? [...product.features] : [];
        while (features.length < 8) {
            features.push('');
        }
        setCurrentProduct({ ...product, features });
        setDialogOpen(true);
    };
    
    const handleFeatureChange = (index: number, value: string) => {
        if (currentProduct && currentProduct.features) {
            const newFeatures = [...currentProduct.features];
            newFeatures[index] = value;
            setCurrentProduct({ ...currentProduct, features: newFeatures });
        }
    };

    const handleDelete = (product: Product) => {
        setProductToDelete(product);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        if (!productToDelete) return;

        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', productToDelete.id);

        if (error) {
            toast({ title: "Error deleting product", description: error.message, variant: "destructive" });
        } else {
            toast({ title: "Product Deleted", description: `"${productToDelete.name}" has been deleted.` });
            setProducts(products.filter(p => p.id !== productToDelete.id));
        }
        setDeleteDialogOpen(false);
        setProductToDelete(null);
    };
    
     const handleSave = async () => {
        if (!currentProduct) return;
        setIsSubmitting(true);

        const productData = {
            name: currentProduct.name,
            price: currentProduct.price,
            category: currentProduct.category,
            status: currentProduct.status,
            stock: currentProduct.stock,
            description: currentProduct.description,
            image_url: currentProduct.image_url || 'https://picsum.photos/seed/placeholder/64/64',
            ai_hint: currentProduct.ai_hint || 'product image',
            href: currentProduct.href || `/products/${currentProduct.name?.toLowerCase().replace(/\s+/g, '-')}`,
            features: currentProduct.features?.filter(f => f.trim() !== ''),
        };

        let error;
        // Bypassing RLS by using the .rpc() method which can be configured to run with admin privileges
        if ('id' in currentProduct && currentProduct.id) {
            // This assumes you have an RPC function `update_product`
            const { error: updateError } = await supabase
                .from('products')
                .update(productData)
                .eq('id', currentProduct.id)
                .select();
            error = updateError;
        } else {
            // This assumes you have an RPC function `insert_product`
            const { error: insertError } = await supabase
                .from('products')
                .insert(productData)
                .select();
            error = insertError;
        }

        if (error) {
            toast({ title: `Error saving product`, description: error.message, variant: "destructive" });
        } else {
            toast({ title: `Product ${currentProduct.id ? 'Updated' : 'Created'}`, description: `"${productData.name}" has been saved.` });
            setDialogOpen(false);
            fetchProducts(); // Refresh the list
        }
        setIsSubmitting(false);
    };

    const handleStatusToggle = (status: 'Active' | 'Draft') => {
        setStatusFilter(prev => 
            prev.includes(status) 
                ? prev.filter(s => s !== status)
                : [...prev, status]
        );
    };

    const filteredProducts = useMemo(() => {
        return products.filter(p => statusFilter.includes(p.status));
    }, [products, statusFilter]);
    
    const handleExport = () => {
        if (filteredProducts.length === 0) {
            toast({ title: "No products to export", description: "Filter results in products to export."});
            return;
        }
        const csvContent = [
            "ID,Name,Status,Category,Stock,Price",
            ...filteredProducts.map(p => `${p.id},"${p.name}",${p.status},${p.category},${p.stock},${p.price}`)
        ].join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", "products.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


    return (
        <div>
            <div className="flex items-center mb-4">
                <div className="ml-auto flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-8 gap-1">
                                <ListFilter className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Filter</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuCheckboxItem checked={statusFilter.includes('Active')} onCheckedChange={() => handleStatusToggle('Active')}>Active</DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem checked={statusFilter.includes('Draft')} onCheckedChange={() => handleStatusToggle('Draft')}>Draft</DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button size="sm" variant="outline" className="h-8 gap-1" onClick={handleExport}>
                        <File className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Export</span>
                    </Button>
                    <Button size="sm" className="h-8 gap-1" onClick={handleAddNew}>
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Product</span>
                    </Button>
                </div>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Products</CardTitle>
                    <CardDescription>Manage your products and view their sales performance.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="hidden w-[100px] sm:table-cell"><span className="sr-only">Image</span></TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead className="hidden md:table-cell">Stock</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead><span className="sr-only">Actions</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow><TableCell colSpan={7} className="text-center py-10"><Loader2 className="mx-auto h-8 w-8 animate-spin text-muted-foreground" /></TableCell></TableRow>
                            ) : filteredProducts.length > 0 ? filteredProducts.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell className="hidden sm:table-cell">
                                        <Image alt={product.name} className="aspect-square rounded-md object-cover" height="64" src={product.image_url || 'https://picsum.photos/64/64'} width="64" data-ai-hint={product.ai_hint} />
                                    </TableCell>
                                    <TableCell className="font-medium">{product.name}</TableCell>
                                    <TableCell>
                                        <Badge variant={product.status === 'Active' ? 'default' : 'secondary'} className={product.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>{product.status}</Badge>
                                    </TableCell>
                                    <TableCell><Badge variant="outline">{product.category}</Badge></TableCell>
                                    <TableCell className="hidden md:table-cell">{product.stock}</TableCell>
                                    <TableCell>{formatPrice(product.price)}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button aria-haspopup="true" size="icon" variant="ghost"><MoreHorizontal className="h-4 w-4" /><span className="sr-only">Toggle menu</span></Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => handleEdit(product)}><Edit className="mr-2 h-4 w-4" /><span>Edit</span></DropdownMenuItem>
                                                <DropdownMenuItem><EyeOff className="mr-2 h-4 w-4" /><span>Archive</span></DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(product)}><Trash className="mr-2 h-4 w-4" /><span>Delete</span></DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow><TableCell colSpan={7} className="text-center">No products found.</TableCell></TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter>
                    <div className="text-xs text-muted-foreground">Showing <strong>{filteredProducts.length}</strong> of <strong>{products.length}</strong> products</div>
                </CardFooter>
            </Card>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="sm:max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>{currentProduct && 'id' in currentProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
                        <DialogDescription>Fill in the details for the product below.</DialogDescription>
                    </DialogHeader>
                    {currentProduct && (
                    <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-6">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Name</Label>
                            <Input id="name" value={currentProduct.name || ''} onChange={(e) => setCurrentProduct({...currentProduct, name: e.target.value})} className="col-span-3" />
                        </div>
                         <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="image_url" className="text-right pt-2">Image URL</Label>
                            <div className="col-span-3">
                                <Input id="image_url" placeholder="https://example.com/image.png" value={currentProduct.image_url || ''} onChange={(e) => setCurrentProduct({...currentProduct, image_url: e.target.value})} />
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="price" className="text-right">Price</Label>
                            <Input id="price" type="number" value={currentProduct.price || 0} onChange={(e) => setCurrentProduct({...currentProduct, price: parseFloat(e.target.value) || 0})} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label className="text-right pt-2">Bullet Points</Label>
                            <div className="col-span-3 space-y-2">
                                {currentProduct.features?.map((feature, index) => (
                                    <Input 
                                        key={index}
                                        placeholder={`Feature ${index + 1}`}
                                        value={feature}
                                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="description" className="text-right pt-2">Description</Label>
                            <Textarea id="description" placeholder="Why Choose [Product Name]..." value={currentProduct.description || ''} onChange={(e) => setCurrentProduct({...currentProduct, description: e.target.value})} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="stock" className="text-right">Stock</Label>
                            <Input id="stock" type="number" value={currentProduct.stock || 0} onChange={(e) => setCurrentProduct({...currentProduct, stock: parseInt(e.target.value) || 0})} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="category" className="text-right">Category</Label>
                            <Select value={currentProduct.category} onValueChange={(value: Product['category']) => setCurrentProduct({...currentProduct, category: value})}>
                                <SelectTrigger className="col-span-3"><SelectValue placeholder="Select a category" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="PC">PC</SelectItem>
                                    <SelectItem value="iOS">iOS</SelectItem>
                                    <SelectItem value="Android">Android</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="status" className="text-right">Status</Label>
                            <Select value={currentProduct.status} onValueChange={(value: Product['status']) => setCurrentProduct({...currentProduct, status: value})}>
                                <SelectTrigger className="col-span-3"><SelectValue placeholder="Select a status" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Active">Active</SelectItem>
                                    <SelectItem value="Draft">Draft</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleSave} disabled={isSubmitting}>
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                        <DialogDescription>This action cannot be undone. This will permanently delete the product "{productToDelete?.name}".</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
