"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import { TrendingUp, TrendingDown, DollarSign, Users, ShoppingCart, Eye, Download, ArrowLeft } from "lucide-react"

export default function AnalyticsPage() {
  // Sample data for charts
  const revenueData = [
    { month: "Jan", revenue: 12700, orders: 45 },
    { month: "Feb", revenue: 29100, orders: 52 },
    { month: "Mar", revenue: 15400, orders: 61 },
    { month: "Apr", revenue: 22500, orders: 73 },
    { month: "May", revenue: 27700, orders: 84 },
    { month: "Jun", revenue: 18900, orders: 92 },
  ]

  const gameData = [
    { name: "Mobile Legends", value: 35, color: "#ff6b35" },
    { name: "PUBG Mobile", value: 25, color: "#f7931e" },
    { name: "Free Fire", value: 20, color: "#ffd700" },
    { name: "Genshin Impact", value: 12, color: "#00d4ff" },
    { name: "Others", value: 8, color: "#6366f1" },
  ]

  const userGrowthData = [
    { month: "Jan", users: 1320 },
    { month: "Feb", users: 2145 },
    { month: "Mar", users: 1768 },
    { month: "Apr", users: 1192 },
    { month: "May", users: 1715 },
    { month: "Jun", users: 1238 },
  ]

  const topProducts = [
    { name: "Account", sales: 336, revenue: "$2300" },
    { name: "PUBG Mobile UC ", sales: 134, revenue: "$2680" },
    { name: "Free Fire Elite Pass", sales: 898, revenue: "$2255" },
    { name: "Welkin Bless", sales: 671, revenue: "$2210" },
    { name: "Nameless Glory", sales: 450, revenue: "$2250" },
  ]

  const stats = [
    {
      title: "Total Revenue",
      value: "$12000",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-500",
    },
    {
      title: "Total Users",
      value: "2,380",
      change: "+8.2%",
      trend: "up",
      icon: Users,
      color: "text-blue-500",
    },
    {
      title: "Total Orders",
      value: "407",
      change: "+15.3%",
      trend: "up",
      icon: ShoppingCart,
      color: "text-orange-500",
    },
    {
      title: "Page Views",
      value: "45,678",
      change: "-2.1%",
      trend: "down",
      icon: Eye,
      color: "text-purple-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8 mt-20">
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
              <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
              <p className="text-gray-400">Monitor your business performance and insights</p>
            </div>
            <div className="flex gap-2">
              <Select defaultValue="30days">
                <SelectTrigger className="w-40 bg-gray-700 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="7days">Last 7 days</SelectItem>
                  <SelectItem value="30days">Last 30 days</SelectItem>
                  <SelectItem value="90days">Last 90 days</SelectItem>
                  <SelectItem value="1year">Last year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-700">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">{stat.title}</p>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                      <div className="flex items-center mt-2">
                        {stat.trend === "up" ? (
                          <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                        )}
                        <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>{stat.change}</span>
                      </div>
                    </div>
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color === "text-green-500" ? "bg-green-600" : stat.color === "text-blue-500" ? "bg-blue-600" : stat.color === "text-orange-500" ? "bg-orange-600" : "bg-purple-600"}`}
                    >
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Revenue Chart */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Revenue Overview</CardTitle>
                <CardDescription>Monthly revenue and order trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    revenue: {
                      label: "Revenue",
                      color: "#ff6b35",
                    },
                    orders: {
                      label: "Orders",
                      color: "#00d4ff",
                    },
                  }}
                  className="h-80"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area type="monotone" dataKey="revenue" stroke="#ff6b35" fill="#ff6b35" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Game Distribution */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Game Distribution</CardTitle>
                <CardDescription>Sales by game category</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    value: {
                      label: "Percentage",
                    },
                  }}
                  className="h-80"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={gameData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {gameData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* User Growth */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">User Growth</CardTitle>
                <CardDescription>Monthly user registration trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    users: {
                      label: "Users",
                      color: "#00d4ff",
                    },
                  }}
                  className="h-80"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={userGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="users"
                        stroke="#00d4ff"
                        strokeWidth={3}
                        dot={{ fill: "#00d4ff", strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Top Products */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Top Products</CardTitle>
                <CardDescription>Best performing products this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-white">{product.name}</p>
                        <p className="text-sm text-gray-400">{product.sales} sales</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-white">{product.revenue}</p>
                        <Badge variant="secondary" className="bg-orange-600 text-white">
                          #{index + 1}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Metrics */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Performance Metrics</CardTitle>
              <CardDescription>Key performance indicators for your business</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Conversion Rate</span>
                    <span className="text-white">3.2%</span>
                  </div>
                  <Progress value={32} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Customer Satisfaction</span>
                    <span className="text-white">4.8/5</span>
                  </div>
                  <Progress value={96} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Return Rate</span>
                    <span className="text-white">1.2%</span>
                  </div>
                  <Progress value={12} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Market Share</span>
                    <span className="text-white">15.7%</span>
                  </div>
                  <Progress value={15.7} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
