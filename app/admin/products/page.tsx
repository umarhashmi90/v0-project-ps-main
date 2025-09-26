"use client"
import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { File, ListFilter, MoreHorizontal, PlusCircle, Edit, Trash } from "lucide-react"
import Image from "next/image"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"

type Product = {
  id: number
  name: string
  price: number
  category: "Android" | "iOS" | "PC"
  status: "Active" | "Draft" | "Archived"
  stock: number
  description: string
  image_url: string
  ai_hint: string
  href: string
  features: string[]
}

const emptyProduct: Omit<Product, "id"> = {
  name: "",
  price: 0,
  category: "Android",
  status: "Draft",
  stock: 0,
  description: "",
  image_url: "",
  ai_hint: "product image",
  href: "",
  features: [],
}

export default function AdminProductsPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [statusFilter, setStatusFilter] = useState<Product["status"][]>(["Active", "Draft", "Archived"])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<Partial<Product> | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<Product | null>(null)

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false })

      if (error) {
        toast({ title: "Error fetching products", description: error.message, variant: "destructive" })
        return
      }
      setProducts(data || [])
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleAddNew = () => {
    setCurrentProduct(emptyProduct)
    setIsDialogOpen(true)
  }

  const handleEdit = (product: Product) => {
    const features = product.features ? [...product.features] : []
    setCurrentProduct({ ...product, features })
    setIsDialogOpen(true)
  }

  const addFeature = () => {
    if (currentProduct && currentProduct.features) {
      const newFeatures = [...currentProduct.features]
      newFeatures.push("")
      setCurrentProduct({ ...currentProduct, features: newFeatures })
    }
  }

  const handleDelete = (product: Product) => {
    setProductToDelete(product)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!productToDelete) return

    try {
      const { error } = await supabase.from("products").delete().eq("id", productToDelete.id)

      if (error) {
        toast({ title: "Error deleting product", description: error.message, variant: "destructive" })
        return
      }
      toast({ title: "Product Deleted", description: `"${productToDelete.name}" has been deleted.` })
      setProducts(products.filter((p) => p.id !== productToDelete.id))
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" })
    }
    setProductToDelete(null)
    setIsDeleteDialogOpen(false)
  }

  const handleSave = async () => {
    if (!currentProduct) return

    try {
      const productData = {
        name: currentProduct.name,
        price: currentProduct.price,
        category: currentProduct.category,
        status: currentProduct.status,
        stock: currentProduct.stock,
        description: currentProduct.description,
        image_url: currentProduct.image_url || "https://picsum.photos/seed/placeholder/64/64",
        ai_hint: currentProduct.ai_hint || "product image",
        href: currentProduct.href || `/products/${currentProduct.name?.toLowerCase().replace(/\s+/g, "-")}`,
        features: currentProduct.features?.filter((f) => f.trim() !== ""),
      }

      let error
      if ("id" in currentProduct && currentProduct.id) {
        const result = await supabase.from("products").update(productData).eq("id", currentProduct.id).select()
        error = result.error
      } else {
        const result = await supabase.from("products").insert(productData).select()
        error = result.error
      }

      if (error) {
        toast({ title: `Error saving product`, description: error.message, variant: "destructive" })
        return
      }
      toast({
        title: `Product ${currentProduct.id ? "Updated" : "Created"}`,
        description: `"${productData.name}" has been saved.`,
      })

      fetchProducts() // Refresh the list
      setIsDialogOpen(false)
      setCurrentProduct(null)
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" })
    }
  }

  const formatPrice = (price: number) => `$${price.toFixed(2)}`

  const filteredProducts = useMemo(() => {
    return products.filter((p) => statusFilter.includes(p.status))
  }, [products, statusFilter])

  const exportProducts = () => {
    if (filteredProducts.length === 0) {
      toast({ title: "No products to export", description: "Filter results in products to export." })
      return
    }

    const csvContent = [
      "ID,Name,Status,Category,Stock,Price",
      ...filteredProducts.map((p) => `${p.id},"${p.name}",${p.status},${p.category},${p.stock},${p.price}`),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", "products.csv")
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="archived" className="hidden sm:flex">
            Archived
          </TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1 bg-transparent">
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              {(["Active", "Draft", "Archived"] as const).map((status) => (
                <DropdownMenuItem
                  key={status}
                  onClick={() =>
                    setStatusFilter((prev) =>
                      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status],
                    )
                  }
                >
                  {statusFilter.includes(status) ? "✓ " : ""} {status}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" variant="outline" className="h-8 gap-1 bg-transparent" onClick={exportProducts}>
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Export</span>
          </Button>
          <Button size="sm" className="h-8 gap-1" onClick={handleAddNew}>
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Product</span>
          </Button>
        </div>
      </div>
      <TabsContent value="all">
        <Card>
          <CardHeader>
            <CardTitle>Products</CardTitle>
            <CardDescription>Manage your products and view their sales performance.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden w-[100px] sm:table-cell">
                    <span className="sr-only">Image</span>
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Category</TableHead>
                  <TableHead className="hidden md:table-cell">Stock</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="hidden sm:table-cell">
                        <Image
                          alt={product.name}
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src={product.image_url || "https://picsum.photos/64/64"}
                          width="64"
                          data-ai-hint={product.ai_hint}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>
                        <Badge
                          variant={product.status === "Active" ? "default" : "secondary"}
                          className={
                            product.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }
                        >
                          {product.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant="outline">{product.category}</Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{product.stock}</TableCell>
                      <TableCell>{formatPrice(product.price)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button aria-haspopup="true" size="icon" variant="ghost">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleEdit(product)}>
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Edit</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(product)}>
                              <Trash className="mr-2 h-4 w-4" />
                              <span>Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">
                      No products found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Product Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{currentProduct && "id" in currentProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
            <DialogDescription>Fill in the details for the product below.</DialogDescription>
          </DialogHeader>
          {currentProduct && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={currentProduct.name || ""}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image_url" className="text-right">
                  Image URL
                </Label>
                <Input
                  id="image_url"
                  placeholder="https://example.com/image.png"
                  value={currentProduct.image_url || ""}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, image_url: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price
                </Label>
                <Input
                  id="price"
                  type="number"
                  value={currentProduct.price || 0}
                  onChange={(e) =>
                    setCurrentProduct({ ...currentProduct, price: Number.parseFloat(e.target.value) || 0 })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="features" className="text-right">
                  Features
                </Label>
                <div className="col-span-3 space-y-2">
                  {currentProduct.features?.map((feature, index) => (
                    <Input
                      key={index}
                      value={feature}
                      onChange={(e) => {
                        const newFeatures = [...(currentProduct.features || [])]
                        newFeatures[index] = e.target.value
                        setCurrentProduct({ ...currentProduct, features: newFeatures })
                      }}
                      placeholder={`Feature ${index + 1}`}
                    />
                  ))}
                  <Button type="button" variant="outline" onClick={addFeature}>
                    Add Feature
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Why Choose [Product Name]..."
                  value={currentProduct.description || ""}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="stock" className="text-right">
                  Stock
                </Label>
                <Input
                  id="stock"
                  type="number"
                  value={currentProduct.stock || 0}
                  onChange={(e) =>
                    setCurrentProduct({ ...currentProduct, stock: Number.parseInt(e.target.value) || 0 })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Select
                  value={currentProduct.category}
                  onValueChange={(value: Product["category"]) =>
                    setCurrentProduct({ ...currentProduct, category: value })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Android">Android</SelectItem>
                    <SelectItem value="iOS">iOS</SelectItem>
                    <SelectItem value="PC">PC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select
                  value={currentProduct.status}
                  onValueChange={(value: Product["status"]) => setCurrentProduct({ ...currentProduct, status: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>Save Product</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the product "{productToDelete?.name}".
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Tabs>
  )
}
