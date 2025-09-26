"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Download } from "lucide-react"

// Mock data - replace with real data from your database
const orders = [
  {
    id: "ORD-001",
    date: "2024-01-15",
    status: "completed",
    total: "$99.00",
    items: ["Premium License Key", "Support Package"],
  },
  {
    id: "ORD-002",
    date: "2024-01-10",
    status: "processing",
    total: "$49.00",
    items: ["Basic License Key"],
  },
]

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-headline">Order History</h1>
        <p className="mt-2 text-muted-foreground">View and manage your order history and downloads.</p>
      </div>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">You haven't placed any orders yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Order {order.id}</CardTitle>
                    <CardDescription>Placed on {order.date}</CardDescription>
                  </div>
                  <div className="text-right">
                    <Badge variant={order.status === "completed" ? "default" : "secondary"} className="mb-2">
                      {order.status}
                    </Badge>
                    <p className="font-semibold">{order.total}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-medium">Items:</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                    {order.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  {order.status === "completed" && (
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
