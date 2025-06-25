"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import Image from "next/image"
import { Search, Calendar, User, ArrowRight, TrendingUp } from "lucide-react"

const articles = [
  {
    id: 1,
    title: "How to Safely Buy Gaming Accounts Online",
    excerpt:
      "Learn the essential tips and tricks to avoid scams when purchasing gaming accounts from online marketplaces.",
    category: "Safety Guide",
    author: "Kevin Admin",
    date: "2025-01-15",
    readTime: "5 min read",
    image: "/artikel01.png",
    featured: false,
  },
  {
    id: 2,
    title: "Mobile Legends Account Valuation Guide",
    excerpt: "Understand how to properly value your Mobile Legends account based on rank, skins, and other factors.",
    category: "Valuation",
    author: "Kevin Admin",
    date: "2025-01-12",
    readTime: "8 min read",
    image: "/artikel03.jpeg",
    featured: false,
  },
  {
    id: 3,
    title: "Genshin Impact Trading Tips",
    excerpt: "Everything you need to know about trading Genshin Impact accounts safely and profitably.",
    category: "Trading Tips",
    author: "Kevin Admin",
    date: "2025-01-10",
    readTime: "6 min read",
    image: "/artikel02.jpeg",
    featured: false,
  },
  {
    id: 4,
    title: "Understanding Escrow Services",
    excerpt: "Learn how escrow services protect both buyers and sellers in gaming account transactions.",
    category: "Education",
    author: "Kevin Admin",
    date: "2024-01-08",
    readTime: "4 min read",
    image: "/artikel04.png",
    featured: false,
  },
]

const categories = ["All", "Safety Guide", "Valuation", "Trading Tips", "Education", "News"]

export default function ArticlesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("date")

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredArticle = articles.find((article) => article.featured)
  const regularArticles = filteredArticles.filter((article) => !article.featured)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-8">
        {/* Page Header */}
        <div className="space-y-3 mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-50">Knowledge Base</h1>
          <p className="text-muted-foreground">Learn everything about safe gaming account trading</p>
        </div>
        

        {/* Featured Article */}
        {featuredArticle && (
          <Card className="mb-12 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative aspect-video lg:aspect-auto">
                <Image
                  src={featuredArticle.image || "/placeholder.svg"}
                  alt={featuredArticle.title}
                  fill
                  className="object-cover"
                />
                <Badge className="absolute top-4 left-4">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Featured
                </Badge>
              </div>
              <CardContent className="p-8 flex flex-col justify-center">
                <Badge variant="outline" className="w-fit mb-4">
                  {featuredArticle.category}
                </Badge>
                <h2 className="text-2xl font-bold mb-4">{featuredArticle.title}</h2>
                <p className="text-muted-foreground mb-6">{featuredArticle.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{featuredArticle.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(featuredArticle.date).toLocaleDateString()}</span>
                  </div>
                  <span>{featuredArticle.readTime}</span>
                </div>
                <Button asChild>
                  <Link href={`/articles/${featuredArticle.id}`}>
                    Read Article
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </div>
          </Card>
        )}

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full lg:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full lg:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Latest</SelectItem>
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="category">Category</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularArticles.map((article) => (
            <Card key={article.id} className="group overflow-hidden hover:shadow-lg transition-all">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge variant="secondary" className="absolute top-3 right-3">
                  {article.category}
                </Badge>
              </div>
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-3">{article.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <span>{article.author}</span>
                    <span>{new Date(article.date).toLocaleDateString()}</span>
                  </div>
                  <span>{article.readTime}</span>
                </div>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href={`/articles/${article.id}`}>Read More</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No articles found matching your criteria.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
