"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Plus, MoreHorizontal, Edit, Trash2, Eye, ArrowLeft } from "lucide-react"

export default function ManageProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [gameFilter, setGameFilter] = useState("all")

  const products = [
    {
      id: "1",
      title: "Mobile Legends Account - Immortal",
      game: "Mobile Legends",
      category: "Account",
      price: "$139.9",
      status: "active",
      views: 2451,
      createdAt: "2025-01-15",
      image: "/ml.jpg",
    },
    {
      id: "2",
      title: "Oneiric Shard x8100",
      game: "Honkai Star Rail",
      category: "Currency",
      price: "$99.99",
      status: "sold",
      views: 7189,
      createdAt: "2025-01-14",
      image: "/one.jpeg",
    },
    {
      id: "3",
      title: "Express Supply Pass",
      game: "Honkai Star Rail",
      category: "Items",
      price: "$6.99",
      status: "pending",
      views: 6127,
      createdAt: "2025-01-13",
      image: "/name.jpeg",
    },
    {
      id: "4",
      title: "Genshin Impact AR60",
      game: "Genshin Impact",
      category: "Account",
      price: "Rp 300,000",
      status: "active",
      views: 3312,
      createdAt: "2025-01-12",
      image: "/gi.jpg",
    },
    {
      id: "5",
      title: "Nameless Glory",
      game: "Honkai Star Rail",
      category: "Account",
      price: "$14.99",
      status: "inactive",
      views: 1546,
      createdAt: "2024-01-11",
      image: "/nm.jpeg",
    },
  ]

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: "Active", className: "bg-green-600 text-white" },
      sold: { label: "Sold", className: "bg-blue-600 text-white" },
      pending: { label: "Pending", className: "bg-yellow-600 text-white" },
      inactive: { label: "Inactive", className: "bg-gray-600 text-white" },
    }
    const config = statusConfig[status as keyof typeof statusConfig]
    return <Badge className={config.className}>{config.label}</Badge>
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.game.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || product.status === statusFilter
    const matchesGame = gameFilter === "all" || product.game === gameFilter
    return matchesSearch && matchesStatus && matchesGame
  })

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link href="/dashboard">
                <Button type="button" className="bg-blue-500 hover:bg-blue-600">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Manage Products</h1>
              <p className="text-gray-400">Manage your product listings and inventory</p>
            </div>
            <Link href="/add-product">
              <Button className="bg-blue-500 hover:bg-blue-600">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </Link>
          </div>

          {/* Filters */}
          <Card className="mb-6 bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-40 bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="sold">Sold</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={gameFilter} onValueChange={setGameFilter}>
                  <SelectTrigger className="w-full md:w-40 bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Game" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="all">All Games</SelectItem>
                    <SelectItem value="Mobile Legends">Mobile Legends</SelectItem>
                    <SelectItem value="PUBG Mobile">PUBG Mobile</SelectItem>
                    <SelectItem value="Free Fire">Free Fire</SelectItem>
                    <SelectItem value="Genshin Impact">Genshin Impact</SelectItem>
                    <SelectItem value="Valorant">Valorant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Products Table */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Products ({filteredProducts.length})</CardTitle>
              <CardDescription>Your product listings and their performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-700">
                      <TableHead className="text-gray-300">Product</TableHead>
                      <TableHead className="text-gray-300">Game</TableHead>
                      <TableHead className="text-gray-300">Category</TableHead>
                      <TableHead className="text-gray-300">Price</TableHead>
                      <TableHead className="text-gray-300">Status</TableHead>
                      <TableHead className="text-gray-300">Views</TableHead>
                      <TableHead className="text-gray-300">Created</TableHead>
                      <TableHead className="text-gray-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((product) => (
                      <TableRow key={product.id} className="border-gray-700">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.title}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                              <p className="font-medium text-white">{product.title}</p>
                              <p className="text-sm text-gray-400">ID: {product.id}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-300">{product.game}</TableCell>
                        <TableCell className="text-gray-300">{product.category}</TableCell>
                        <TableCell className="text-white font-medium">{product.price}</TableCell>
                        <TableCell>{getStatusBadge(product.status)}</TableCell>
                        <TableCell className="text-gray-300">{product.views}</TableCell>
                        <TableCell className="text-gray-300">{product.createdAt}</TableCell>
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
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-white hover:bg-gray-600">
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-400 hover:bg-gray-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
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
        </div>
      </div>
    </div>
  )
}
