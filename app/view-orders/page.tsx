"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, Eye, Download, MessageSquare, ArrowLeft } from "lucide-react"

export default function ViewOrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const orders = [
    {
      id: "01",
      customer: "Asep Solar",
      email: "asepso@gmail.com",
      product: "ML Account Mythic Glory",
      amount: "$150",
      status: "completed",
      date: "2025-01-15",
      paymentMethod: "Bank Transfer",
    },
    {
      id: "02",
      customer: "Mulyono",
      email: "kemul@gmail.com",
      product: "PUBG Mobile UC 81",
      amount: "$0.99",
      status: "processing",
      date: "2025-01-14",
      paymentMethod: "E-Wallet",
    },
    {
      id: "03",
      customer: "Bocah Epep",
      email: "epepboss@gmail.com",
      product: "Free Fire Elite Pass",
      amount: "$3.99",
      status: "pending",
      date: "2025-01-13",
      paymentMethod: "Credit Card",
    },
    {
      id: "04",
      customer: "Syahren",
      email: "syshren@gmail.com",
      product: "Genshin Impact AR55",
      amount: "$66.6",
      status: "cancelled",
      date: "2025-01-12",
      paymentMethod: "Bank Transfer",
    },
    {
      id: "#05",
      customer: "Teressa",
      email: "teressa@gmail.com",
      product: "Weekly Paass",
      amount: "$1.49",
      status: "completed",
      date: "2025-01-11",
      paymentMethod: "E-Wallet",
    },
  ]

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: { label: "Completed", className: "bg-green-600 text-white" },
      processing: { label: "Processing", className: "bg-blue-600 text-white" },
      pending: { label: "Pending", className: "bg-yellow-600 text-white" },
      cancelled: { label: "Cancelled", className: "bg-red-600 text-white" },
    }
    const config = statusConfig[status as keyof typeof statusConfig]
    return <Badge className={config.className}>{config.label}</Badge>
  }

  const filterOrdersByStatus = (status: string) => {
    if (status === "all") return orders
    return orders.filter((order) => order.status === status)
  }

  const filteredOrders = (status: string) => {
    const statusFiltered = filterOrdersByStatus(status)
    if (!searchTerm) return statusFiltered
    return statusFiltered.filter(
      (order) =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.product.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <div className="flex items-center gap-4 mb-8">
            <Link href="/dashboard">
                <Button type="button" className="bg-blue-500 hover:bg-blue-600">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>

          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">View Orders</h1>
              <p className="text-gray-400">Monitor and manage customer orders</p>
            </div>
            <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-700">
              <Download className="w-4 h-4 mr-2" />
              Export Orders
            </Button>
          </div>

          {/* Search */}
          <Card className="mb-6 bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search orders by ID, customer, or product..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </CardContent>
          </Card>

          {/* Orders Tabs */}
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 bg-gray-800">
              <TabsTrigger value="all">All Orders ({orders.length})</TabsTrigger>
              <TabsTrigger value="pending">Pending ({orders.filter((o) => o.status === "pending").length})</TabsTrigger>
              <TabsTrigger value="processing">
                Processing ({orders.filter((o) => o.status === "processing").length})
              </TabsTrigger>
              <TabsTrigger value="completed">
                Completed ({orders.filter((o) => o.status === "completed").length})
              </TabsTrigger>
              <TabsTrigger value="cancelled">
                Cancelled ({orders.filter((o) => o.status === "cancelled").length})
              </TabsTrigger>
            </TabsList>

            {["all", "pending", "processing", "completed", "cancelled"].map((status) => (
              <TabsContent key={status} value={status}>
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">
                      {status === "all" ? "All Orders" : `${status.charAt(0).toUpperCase() + status.slice(1)} Orders`} (
                      {filteredOrders(status).length})
                    </CardTitle>
                    <CardDescription>
                      {status === "all" ? "Complete list of all customer orders" : `Orders with ${status} status`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-gray-700">
                            <TableHead className="text-gray-300">Order ID</TableHead>
                            <TableHead className="text-gray-300">Customer</TableHead>
                            <TableHead className="text-gray-300">Product</TableHead>
                            <TableHead className="text-gray-300">Amount</TableHead>
                            <TableHead className="text-gray-300">Status</TableHead>
                            <TableHead className="text-gray-300">Payment</TableHead>
                            <TableHead className="text-gray-300">Date</TableHead>
                            <TableHead className="text-gray-300">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredOrders(status).map((order) => (
                            <TableRow key={order.id} className="border-gray-700">
                              <TableCell className="font-medium text-white">{order.id}</TableCell>
                              <TableCell>
                                <div>
                                  <p className="font-medium text-white">{order.customer}</p>
                                  <p className="text-sm text-gray-400">{order.email}</p>
                                </div>
                              </TableCell>
                              <TableCell className="text-gray-300">{order.product}</TableCell>
                              <TableCell className="text-white font-medium">{order.amount}</TableCell>
                              <TableCell>{getStatusBadge(order.status)}</TableCell>
                              <TableCell className="text-gray-300">{order.paymentMethod}</TableCell>
                              <TableCell className="text-gray-300">{order.date}</TableCell>
                              <TableCell>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-white">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end" className="bg-gray-700 border-gray-600">
                                    <DropdownMenuItem className="text-white hover:bg-gray-600">
                                      <Eye className="mr-2 h-4 w-4" />
                                      View Details
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-white hover:bg-gray-600">
                                      <MessageSquare className="mr-2 h-4 w-4" />
                                      Contact Customer
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-white hover:bg-gray-600">
                                      <Download className="mr-2 h-4 w-4" />
                                      Download Invoice
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  )
}
