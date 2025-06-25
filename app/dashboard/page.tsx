"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ShoppingBag, Package, Users, DollarSign, Edit, Plus, BarChart3 } from "lucide-react"

const stats = [
  {
    title: "Total Sales",
    value: "$67345",
    change: "+12.5%",
    icon: DollarSign,
    color: "text-green-600",
  },
  {
    title: "Active Products",
    value: "4",
    change: "",
    icon: Package,
    color: "text-blue-600",
  },
  {
    title: "Total Users",
    value: "5097",
    change: "+8.2%",
    icon: Users,
    color: "text-purple-600",
  },
  {
    title: "Transactions",
    value: "15621",
    change: "+15.3%",
    icon: ShoppingBag,
    color: "text-orange-600",
  },
]

const recentTransactions = [
  {
    id: "KR-2025-001234",
    customer: "Arlan Naufal",
    product: "Mobile Legends Account",
    amount: 139.9,
    status: "completed",
    date: "2025-01-15",
  },
  {
    id: "KR-2024-001233",
    customer: "Jeanne",
    product: "Genshin Impact - Welkin Bless",
    amount: 89,
    status: "processing",
    date: "2025-01-14",
  },
  {
    id: "KR-2024-001232",
    customer: "Asep Solar",
    product: "PUBG Mobile Account",
    amount: 490,
    status: "pending",
    date: "2025-01-13",
  },
]

const topProducts = [
  {
    name: "Mobile Legends - Epic Account",
    sales: 45,
    revenue: 6297.5,
    trend: "+12%",
  },
  {
    name: "Genshin Impact - AR 55",
    sales: 32,
    revenue: 2848,
    trend: "+8%",
  },
  {
    name: "PUBG Mobile - Conqueror",
    sales: 18,
    revenue: 8820,
    trend: "+25%",
  },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-8">
        <div className="space-y-4 mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your marketplace.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className={`text-sm ${stat.color}`}>{stat.change}</p>
                    </div>
                    <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button asChild className="h-20 flex-col">
                    <Link href="/add-product">
                      <Plus className="w-6 h-6 mb-2" />
                      Add Product
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="h-20 flex-col">
                    <Link href="/manage-products">
                      <Package className="w-6 h-6 mb-2" />
                      Manage Products
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="h-20 flex-col">
                    <Link href="/view-orders">
                      <ShoppingBag className="w-6 h-6 mb-2" />
                      View Orders
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="h-20 flex-col">
                    <Link href="/analytics">
                      <BarChart3 className="w-6 h-6 mb-2" />
                      Analytics
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Transactions</CardTitle>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/manage-transactions">View All</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">{transaction.id}</p>
                        <p className="text-sm text-muted-foreground">{transaction.customer}</p>
                        <p className="text-sm text-muted-foreground">{transaction.product}</p>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="font-semibold">${transaction.amount}</p>
                        <Badge
                          variant={
                            transaction.status === "completed"
                              ? "default"
                              : transaction.status === "processing"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {transaction.status}
                        </Badge>
                        <p className="text-xs text-muted-foreground">{transaction.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Top Products */}
            <Card>
              <CardHeader>
                <CardTitle>Top Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm">{product.name}</p>
                        <span className="text-xs text-green-600">{product.trend}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{product.sales} sales</span>
                        <span>${product.revenue}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Management Links */}
            <Card>
              <CardHeader>
                <CardTitle>Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/manage-articles">
                    <Edit className="w-4 h-4 mr-2" />
                    Manage Articles
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/manage-users">
                    <Users className="w-4 h-4 mr-2" />
                    Manage Users
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/manage-products">
                    <Package className="w-4 h-4 mr-2" />
                    Manage Products
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/manage-transactions">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Manage Transactions
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
