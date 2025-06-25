"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import Link from "next/link"
import { Search, Download, Eye, CheckCircle, Clock, XCircle, Package } from "lucide-react"

const transactions = [
  {
    id: "KR-2025-001234",
    date: "2025-01-15",
    items: [
      {
        name: "Mobile Legends Account",
        image: "/ml.jpg",
        price: 139.9,
      },
    ],
    total: 145.89,
    status: "completed",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "KR-2025-001233",
    date: "2025-01-12",
    items: [
      {
        name: "Oneiric Shard",
        image: "/one.jpeg",
        price: 89,
      },
    ],
    total: 94.99,
    status: "processing",
    paymentMethod: "Credit Card",
  },
  {
    id: "KR-2025-001232",
    date: "2025-01-10",
    items: [
      {
        name: "Nameless Glory",
        image: "/name.jpeg",
        price: 490,
      },
    ],
    total: 495.99,
    status: "cancelled",
    paymentMethod: "E-Wallet",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "default"
    case "processing":
      return "secondary"
    case "cancelled":
      return "destructive"
    default:
      return "outline"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return CheckCircle
    case "processing":
      return Clock
    case "cancelled":
      return XCircle
    default:
      return Package
  }
}

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.items.some((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = statusFilter === "all" || transaction.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-8">
        <div className="space-y-4 mb-8">
          <h1 className="text-3xl font-bold">Transaction History</h1>
          <p className="text-muted-foreground">View and manage your purchase history</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full lg:w-48">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>

          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-full lg:w-48">
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>

        {/* Transactions List */}
        <div className="space-y-4">
          {filteredTransactions.map((transaction) => {
            const StatusIcon = getStatusIcon(transaction.status)
            return (
              <Card key={transaction.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold">{transaction.id}</h3>
                        <Badge variant={getStatusColor(transaction.status)}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {transaction.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {new Date(transaction.date).toLocaleDateString()} • {transaction.paymentMethod}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">${transaction.total}</p>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {transaction.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">${item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-24 h-24 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No transactions found</h3>
            <p className="text-muted-foreground mb-6">
              You haven't made any purchases yet or no transactions match your filters.
            </p>
            <Button asChild>
              <Link href="/products">Start Shopping</Link>
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
