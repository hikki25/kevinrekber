"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Search,
  MoreHorizontal,
  Eye,
  Download,
  RefreshCw,
  DollarSign,
  TrendingUp,
  Users,
  Clock,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"

export default function ManageTransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const transactions = [
    {
      id: "TXN-001",
      orderId: "ORD-12345",
      buyer: "Januarta",
      seller: "Fikri Firmansyah",
      product: "ML Account Mythic Glory",
      amount: "$150",
      fee: "$2",
      status: "completed",
      type: "sale",
      date: "2025-01-20",
      paymentMethod: "Bank Transfer",
    },
    {
      id: "TXN-002",
      orderId: "ORD-12346",
      buyer: "Reynaldi",
      seller: "KevinRekber",
      product: "PUBG Mobile UC 8100",
      amount: "$99.99",
      fee: "-",
      status: "pending",
      type: "sale",
      date: "2025-01-20",
      paymentMethod: "E-Wallet",
    },
    {
      id: "TXN-003",
      orderId: "ORD-12347",
      buyer: "Asna",
      seller: "Kevin Rekber",
      product: "Free Fire Elite Pass",
      amount: "$3.99",
      fee: "-",
      status: "processing",
      type: "sale",
      date: "2025-01-19",
      paymentMethod: "Credit Card",
    },
    {
      id: "TXN-004",
      orderId: "REF-12348",
      buyer: "Alicia",
      seller: "Nerpheko",
      product: "Genshin Impact AR55",
      amount: "$150",
      fee: "$2",
      status: "refunded",
      type: "refund",
      date: "2025-01-18",
      paymentMethod: "Bank Transfer",
    },
    {
      id: "TXN-005",
      orderId: "ORD-12349",
      buyer: "Charlyy",
      seller: "Dianassy",
      product: "Valorant Account",
      amount: "$500",
      fee: "$3",
      status: "failed",
      type: "sale",
      date: "2025-01-17",
      paymentMethod: "E-Wallet",
    },
  ]

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: { label: "Completed", className: "bg-green-600 text-white" },
      pending: { label: "Pending", className: "bg-yellow-600 text-white" },
      processing: { label: "Processing", className: "bg-blue-600 text-white" },
      failed: { label: "Failed", className: "bg-red-600 text-white" },
      refunded: { label: "Refunded", className: "bg-gray-600 text-white" },
    }
    const config = statusConfig[status as keyof typeof statusConfig]
    return <Badge className={config.className}>{config.label}</Badge>
  }

  const getTypeBadge = (type: string) => {
    const typeConfig = {
      sale: { label: "Sale", className: "bg-green-600 text-white" },
      refund: { label: "Refund", className: "bg-orange-600 text-white" },
      withdrawal: { label: "Withdrawal", className: "bg-blue-600 text-white" },
    }
    const config = typeConfig[type as keyof typeof typeConfig]
    return (
      <Badge variant="outline" className={config.className}>
        {config.label}
      </Badge>
    )
  }

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.buyer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.product.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || transaction.status === statusFilter
    const matchesType = typeFilter === "all" || transaction.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const totalRevenue = transactions
    .filter((t) => t.status === "completed")
    .reduce((sum, t) => sum + Number.parseInt(t.fee.replace(/[^\d]/g, "")), 0)

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8 mt-20 flex-grow">
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
              <h1 className="text-3xl font-bold text-white">Manage Transactions</h1>
              <p className="text-gray-400">Monitor and manage all platform transactions</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-700">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-700">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Total Revenue</p>
                    <p className="text-2xl font-bold text-white">Rp {totalRevenue.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Total Transactions</p>
                    <p className="text-2xl font-bold text-white">{transactions.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Completed</p>
                    <p className="text-2xl font-bold text-white">
                      {transactions.filter((t) => t.status === "completed").length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Pending</p>
                    <p className="text-2xl font-bold text-white">
                      {transactions.filter((t) => t.status === "pending").length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="mb-6 bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search transactions..."
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
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="refunded">Refunded</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full md:w-40 bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="sale">Sale</SelectItem>
                    <SelectItem value="refund">Refund</SelectItem>
                    <SelectItem value="withdrawal">Withdrawal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Transactions Table */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Transactions ({filteredTransactions.length})</CardTitle>
              <CardDescription>All platform transactions and their details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-700">
                      <TableHead className="text-gray-300">Transaction ID</TableHead>
                      <TableHead className="text-gray-300">Order</TableHead>
                      <TableHead className="text-gray-300">Buyer</TableHead>
                      <TableHead className="text-gray-300">Seller</TableHead>
                      <TableHead className="text-gray-300">Product</TableHead>
                      <TableHead className="text-gray-300">Amount</TableHead>
                      <TableHead className="text-gray-300">Fee</TableHead>
                      <TableHead className="text-gray-300">Status</TableHead>
                      <TableHead className="text-gray-300">Type</TableHead>
                      <TableHead className="text-gray-300">Date</TableHead>
                      <TableHead className="text-gray-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.map((transaction) => (
                      <TableRow key={transaction.id} className="border-gray-700">
                        <TableCell className="font-mono text-white">{transaction.id}</TableCell>
                        <TableCell className="text-gray-300">{transaction.orderId}</TableCell>
                        <TableCell className="text-gray-300">{transaction.buyer}</TableCell>
                        <TableCell className="text-gray-300">{transaction.seller}</TableCell>
                        <TableCell className="text-gray-300">{transaction.product}</TableCell>
                        <TableCell className="text-white font-medium">{transaction.amount}</TableCell>
                        <TableCell className="text-green-400">{transaction.fee}</TableCell>
                        <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                        <TableCell>{getTypeBadge(transaction.type)}</TableCell>
                        <TableCell className="text-gray-300">{transaction.date}</TableCell>
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
                                <Download className="mr-2 h-4 w-4" />
                                Download Receipt
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
