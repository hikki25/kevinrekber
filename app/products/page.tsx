"use client"

import { Label } from "@/components/ui/label"

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
import { Search, Grid, List, Heart, X, Star } from "lucide-react"
import { useWishlist } from "@/contexts/wishlist-context"
import { toast } from "sonner"

const initialProducts = [
  // Renamed to initialProducts to avoid conflict
  {
    id: 1,
    name: "Mobile Legends - Immortal",
    category: "MOBA",
    price: 139.9,
    originalPrice: 150,
    image: "/ml.jpg",
    seller: "Jelossy",
    rating: 4.8,
    status: "Available",
  },
  {
    id: 2,
    name: "Honkai Star Rail - End Game ",
    category: "Turn Based",
    price: 99.9,
    image: "/hsr.jpg",
    seller: "Veloss",
    rating: 4.9,
    status: "Available",
  },
  {
    id: 3,
    name: "PUBG Mobile - Conqueror",
    category: "Battle Royale",
    price: 490,
    image: "/pubg.jpg",
    seller: "Kenza",
    rating: 4.7,
    status: "Available",
  },
  {
    id: 4,
    name: "Genshin Impact - AR 60",
    category: "Adventure",
    price: 89,
    image: "/gi.jpg",
    seller: "Aleron",
    rating: 4.6,
    status: "Available",
  },
]

const categories = ["All", "MOBA", "Adventure", "Battle Royale", "Turn Based", "RPG", "FPS", "Strategy"]

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("name")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist()

  const handleWishlistToggle = (product: (typeof initialProducts)[0]) => {
    const productData = {
      // Ensure all necessary fields for wishlist are included
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      category: product.category,
      originalPrice: product.originalPrice,
      seller: product.seller,
    }
    if (isWishlisted(product.id)) {
      removeFromWishlist(product.id)
      toast.success(`${product.name} removed from wishlist!`)
    } else {
      addToWishlist(productData)
      toast.success(`${product.name} added to wishlist!`)
    }
  }

  const filteredProducts = initialProducts
    .filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.seller.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price
      if (sortBy === "price-high") return b.price - a.price
      if (sortBy === "rating") return b.rating - a.rating // Higher rating first
      if (sortBy === "name") return a.name.localeCompare(b.name)
      return 0
    })

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <Header />

      <div className="container py-12">
        <div className="space-y-3 mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-50">Explore Gaming Accounts</h1>
          <p className="text-lg text-slate-400">Discover premium gaming accounts from trusted sellers.</p>
        </div>

        <Card className="mb-8 p-6 bg-slate-800 border-slate-700 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div className="relative lg:col-span-2">
              <Label htmlFor="search-products" className="text-sm font-medium text-slate-300 mb-1 block">
                Search
              </Label>
              <Search className="absolute left-3 top-1/2 mt-2.5 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                id="search-products"
                placeholder="Search by name or seller..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-700 border-slate-600 text-slate-100 focus:border-primary h-11"
              />
            </div>

            <div>
              <Label htmlFor="category-select" className="text-sm font-medium text-slate-300 mb-1 block">
                Category
              </Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger
                  id="category-select"
                  className="w-full bg-slate-700 border-slate-600 text-slate-100 focus:border-primary h-11"
                >
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-slate-200">
                  {categories.map((category) => (
                    <SelectItem key={category} value={category} className="hover:!bg-slate-700 focus:!bg-slate-700">
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end gap-2">
              <div className="flex-1">
                <Label htmlFor="sort-select" className="text-sm font-medium text-slate-300 mb-1 block">
                  Sort by
                </Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger
                    id="sort-select"
                    className="w-full bg-slate-700 border-slate-600 text-slate-100 focus:border-primary h-11"
                  >
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-slate-200">
                    <SelectItem value="name" className="hover:!bg-slate-700 focus:!bg-slate-700">
                      Name
                    </SelectItem>
                    <SelectItem value="price-low" className="hover:!bg-slate-700 focus:!bg-slate-700">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high" className="hover:!bg-slate-700 focus:!bg-slate-700">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="rating" className="hover:!bg-slate-700 focus:!bg-slate-700">
                      Rating
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-1 mt-auto">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className={`h-11 w-11 ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600"}`}
                >
                  <Grid className="w-5 h-5" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className={`h-11 w-11 ${viewMode === "list" ? "bg-primary text-primary-foreground" : "bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600"}`}
                >
                  <List className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {filteredProducts.length > 0 ? (
          <div
            className={`grid gap-6 lg:gap-8 ${
              viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
            }`}
          >
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className={`group overflow-hidden hover:shadow-xl transition-all duration-300 border border-slate-700 hover:border-primary/70 bg-slate-800 hover:bg-slate-700/50 ${viewMode === "list" ? "flex flex-col sm:flex-row" : ""}`}
              >
                <div
                  className={`relative overflow-hidden ${viewMode === "list" ? "sm:w-48 sm:h-auto aspect-square sm:aspect-auto" : "aspect-[4/3]"}`}
                >
                  <Image
                    src={product.image || "/placeholder.svg?width=400&height=300"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.originalPrice && (
                    <Badge variant="destructive" className="absolute top-3 left-3 bg-red-600 text-white">
                      SAVE ${(product.originalPrice - product.price).toFixed(0)}
                    </Badge>
                  )}
                  <Badge
                    className={`absolute top-3 right-3 ${product.status === "Available" ? "bg-green-600 text-white" : "bg-slate-600 text-slate-200"}`}
                  >
                    {product.status}
                  </Badge>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute bottom-3 right-3 bg-slate-900/50 hover:bg-slate-900/80 text-white rounded-full backdrop-blur-sm z-10"
                    onClick={() => handleWishlistToggle(product)}
                  >
                    <Heart
                      className={`w-5 h-5 ${isWishlisted(product.id) ? "fill-red-500 text-red-500" : "text-white"}`}
                    />
                  </Button>
                </div>

                <CardContent
                  className={`p-5 space-y-3 flex flex-col justify-between ${viewMode === "list" ? "flex-1" : ""}`}
                >
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider">{product.category}</p>
                    <h3
                      className="font-semibold text-lg text-slate-100 group-hover:text-primary transition-colors truncate"
                      title={product.name}
                    >
                      {product.name}
                    </h3>
                    <p className="text-sm text-slate-400">by {product.seller}</p>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-baseline gap-2">
                      <span className="font-bold text-xl text-primary">${product.price.toFixed(2)}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-slate-400 line-through">${product.originalPrice.toFixed(2)}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-amber-400">
                      <Star className="w-4 h-4 fill-amber-400" />
                      <span>{product.rating}</span>
                    </div>
                  </div>

                  <div
                    className={`flex gap-2 mt-3 ${viewMode === "list" ? "sm:flex-row flex-col" : "flex-col sm:flex-row"}`}
                  >
                    <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                      <Link href={`/products/${product.id}`}>View Details</Link>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-slate-100"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <X className="w-16 h-16 mx-auto text-slate-500 mb-4" />
            <h2 className="text-2xl font-semibold text-slate-200 mb-2">No Products Found</h2>
            <p className="text-slate-400">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
