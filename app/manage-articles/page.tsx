"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Plus, MoreHorizontal, Edit, Trash2, Eye, FileText, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ManageArticlesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const articles = [
    {
      id: "1",
      title: "How to Safely Buy Gaming Accounts",
      category: "Guide",
      status: "published",
      author: "Admin",
      views: 6245,
      publishDate: "2025-01-15",
      lastModified: "2025-01-16",
      excerpt: "A comprehensive guide on safely purchasing gaming accounts...",
    },
    {
      id: "2",
      title: "Mobile Legends Meta Update 2024",
      category: "News",
      status: "published",
      author: "Admin",
      views: 4892,
      publishDate: "2025-01-14",
      lastModified: "2025-01-14",
      excerpt: "Latest meta changes and hero updates in Mobile Legends...",
    },
    {
      id: "3",
      title: "PUBG Mobile Season 30 Review",
      category: "Review",
      status: "draft",
      author: "Admin",
      views: 0,
      publishDate: null,
      lastModified: "2025-01-13",
      excerpt: "Complete review of PUBG Mobile's latest season...",
    },
    {
      id: "4",
      title: "Free Fire vs Mobile Legends: Which is Better?",
      category: "Comparison",
      status: "published",
      author: "Admin",
      views: 2156,
      publishDate: "2025-01-12",
      lastModified: "2025-01-12",
      excerpt: "Detailed comparison between two popular mobile games...",
    },
    {
      id: "5",
      title: "Top 10 Gaming Accounts to Buy in 2024",
      category: "List",
      status: "scheduled",
      author: "Admin",
      views: 0,
      publishDate: "2025-01-25",
      lastModified: "2025-01-10",
      excerpt: "Our curated list of the best gaming accounts available...",
    },
  ]

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      published: { label: "Published", className: "bg-green-600 text-white" },
      draft: { label: "Draft", className: "bg-gray-600 text-white" },
      scheduled: { label: "Scheduled", className: "bg-blue-600 text-white" },
      archived: { label: "Archived", className: "bg-yellow-600 text-white" },
    }
    const config = statusConfig[status as keyof typeof statusConfig]
    return <Badge className={config.className}>{config.label}</Badge>
  }

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || article.status === statusFilter
    const matchesCategory = categoryFilter === "all" || article.category === categoryFilter
    return matchesSearch && matchesStatus && matchesCategory
  })

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8 mt-20 flex-grow">
        <div className="max-w-7xl mx-auto">
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
              <h1 className="text-3xl font-bold text-white">Manage Articles</h1>
              <p className="text-gray-400">Create and manage blog articles and content</p>
            </div>
            <Button className="bg-blue-500 hover:bg-blue-600">
              <Plus className="w-4 h-4 mr-2" />
              New Article
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Total Articles</p>
                    <p className="text-2xl font-bold text-white">{articles.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Published</p>
                    <p className="text-2xl font-bold text-white">
                      {articles.filter((a) => a.status === "published").length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Drafts</p>
                    <p className="text-2xl font-bold text-white">
                      {articles.filter((a) => a.status === "draft").length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center">
                    <Edit className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Total Views</p>
                    <p className="text-2xl font-bold text-white">
                      {articles.reduce((sum, a) => sum + a.views, 0).toLocaleString()}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
                    <Eye className="w-6 h-6 text-white" />
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
                      placeholder="Search articles..."
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
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full md:w-40 bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Guide">Guide</SelectItem>
                    <SelectItem value="News">News</SelectItem>
                    <SelectItem value="Review">Review</SelectItem>
                    <SelectItem value="Comparison">Comparison</SelectItem>
                    <SelectItem value="List">List</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Articles Table */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Articles ({filteredArticles.length})</CardTitle>
              <CardDescription>Manage your blog articles and content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-700">
                      <TableHead className="text-gray-300">Title</TableHead>
                      <TableHead className="text-gray-300">Category</TableHead>
                      <TableHead className="text-gray-300">Status</TableHead>
                      <TableHead className="text-gray-300">Author</TableHead>
                      <TableHead className="text-gray-300">Views</TableHead>
                      <TableHead className="text-gray-300">Published</TableHead>
                      <TableHead className="text-gray-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredArticles.map((article) => (
                      <TableRow key={article.id} className="border-gray-700">
                        <TableCell>
                          <div>
                            <p className="font-medium text-white">{article.title}</p>
                            <p className="text-sm text-gray-400 mt-1">{article.excerpt}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="border-gray-600 text-gray-300">
                            {article.category}
                          </Badge>
                        </TableCell>
                        <TableCell>{getStatusBadge(article.status)}</TableCell>
                        <TableCell className="text-gray-300">{article.author}</TableCell>
                        <TableCell className="text-gray-300">{article.views.toLocaleString()}</TableCell>
                        <TableCell className="text-gray-300">{article.publishDate || "Not published"}</TableCell>
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
