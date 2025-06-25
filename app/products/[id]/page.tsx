"use client"
import {use} from "react";
import { useState, useEffect } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Heart, Share2, Star, Shield, Clock, MessageCircle, ChevronLeft } from "lucide-react"
import { useWishlist } from "@/contexts/wishlist-context"
import { toast } from "sonner"

// Mock product data - in a real app, this would come from an API via params.id
const mockProductsData: { [key: string]: any } = {
  "1": {
    id: 1,
    name: "Mobile Legends - Immortal",
    category: "MOBA",
    price: 139.9,
    originalPrice: 150,
    image: "/ml.jpg", // Main image
    seller: {
      name: "Jelossy",
      rating: 4.8,
      totalSales: 156,
      joinDate: "2021",
      avatar: "/placeholder.svg?width=100&height=100",
    },
    gameDetails: {
      gameId: "202707419 (4019)",
      rank: "Epic",
      level: 85,
      heroes: 120,
      skins: 45,
    },
    description: `Premium Mobile Legends account with Epic rank and extensive collection. 
This account features rare skins, high-level heroes, and excellent win rate. 
Perfect for players looking to jump into competitive gameplay immediately.`,
    features: [
      "Immortal Rank Achievement",
      "Rare Limited Skins",
      "High Win Rate",
      "All Heroes Unlocked",
      "Premium Battle Pass History",
    ],
    images: [
      "/ml.jpg",
      "/ml1.jpeg",
      "/ml2.jpeg", // Example additional image
      "/ml3.jpeg", // Example additional image
    ],
  },
  default: {
    // Fallback if ID not found
    id: 0,
    name: "Product Not Found",
    category: "N/A",
    price: 0,
    image: "/placeholder.svg?width=600&height=600&text=Not+Found",
    seller: { name: "N/A", rating: 0, totalSales: 0, joinDate: "N/A", avatar: "/placeholder.svg?width=100&height=100" },
    gameDetails: {},
    description: "The product you are looking for does not exist or has been removed.",
    features: [],
    images: ["/placeholder.svg?width=600&height=600&text=Not+Found"],
  },
}

const reviews = [
  {
    id: 1,
    user: "Aysel",
    avatar: "/placeholder.svg?width=40&height=40&text=GP",
    rating: 5,
    comment: "Amazing account! Exactly as described. Fast delivery and great communication.",
    date: "2025-01-15",
  },
  {
    id: 2,
    user: "Fanzy",
    avatar: "/placeholder.svg?width=40&height=40&text=MF",
    rating: 4,
    comment: "Good account with nice skins. Seller was very helpful throughout the process.",
    date: "2025-01-10",
  },
]

  export default function ProductDetailPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise);
  const { id } = params;
  const [product, setProduct] = useState<any | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist()

  useEffect(() => {
  const fetchedProduct = mockProductsData[id] || mockProductsData["default"];
  setProduct(fetchedProduct);
  setSelectedImageIndex(0);
}, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center">
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-slate-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9M4 12h5.5M20 12h-5.5m-1.418-9H12M9 2.5V6m3-3.5V6M9 18v3.5m3-3.5V21.5m-3-5.5H12m0 0H9m3 5.5h2.582m0 0H20M9 12a3 3 0 11-6 0 3 3 0 016 0zm12 0a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-slate-300">Loading product...</h3>
        </div>
      </div>
    )
  }

  if (product.id === 0) {
    // Product not found state
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100">
        <Header />
        <div className="container py-12 text-center">
          <h1 className="text-3xl font-bold mb-4 text-slate-100">{product.name}</h1>
          <p className="text-slate-400 mb-8">{product.description}</p>
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={300}
            height={300}
            className="mx-auto rounded-lg shadow-md mb-8"
          />
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/products">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Products
            </Link>
          </Button>
        </div>
        <Footer />
      </div>
    )
  }

  const handleWishlistToggle = () => {
    const productData = {
      // Ensure all necessary fields for wishlist are included
      id: product.id,
      name: product.name,
      image: product.images[0], // Use main image for wishlist
      price: product.price,
      category: product.category,
      originalPrice: product.originalPrice,
      seller: product.seller.name,
    }
    if (isWishlisted(product.id)) {
      removeFromWishlist(product.id)
      toast.error(`${product.name} removed from wishlist!`)
    } else {
      addToWishlist(productData)
      toast.success(`${product.name} added to wishlist!`)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <Header />

      <div className="container py-8 lg:py-12">
        <nav className="flex items-center space-x-2 text-sm text-slate-400 mb-8">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-primary">
            Products
          </Link>
          <span>/</span>
          <span className="text-slate-200">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          <div className="space-y-4">
            <div className="aspect-square relative overflow-hidden rounded-lg border border-slate-700 shadow-lg">
              <Image
                src={product.images[selectedImageIndex] || "/placeholder.svg?width=600&height=600"}
                alt={`${product.name} - Image ${selectedImageIndex + 1}`}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
                priority={selectedImageIndex === 0}
              />
              {product.originalPrice && (
                <Badge variant="destructive" className="absolute top-4 left-4 bg-red-600 text-white text-sm px-3 py-1">
                  SAVE ${(product.originalPrice - product.price).toFixed(0)}
                </Badge>
              )}
            </div>

            {product.images.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                {product.images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative aspect-square rounded-md overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index
                        ? "border-primary shadow-md scale-105"
                        : "border-slate-700 hover:border-slate-500"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg?width=100&height=100"}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <Badge variant="outline" className="mb-2 border-primary/50 text-primary bg-primary/10 text-xs px-2 py-1">
                {product.category}
              </Badge>
              <h1 className="text-3xl lg:text-4xl font-bold mb-2 text-slate-50">{product.name}</h1>
              <div className="flex items-center gap-4 text-sm text-slate-400">
                <span>
                  by{" "}
                  <Link href="#" className="text-primary hover:underline">
                    {product.seller.name}
                  </Link>
                </span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{product.seller.rating}</span>
                </div>
                <span>{product.seller.totalSales} sales</span>
              </div>
            </div>

            <div className="flex items-end gap-3">
              <span className="text-4xl font-bold text-primary">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-xl text-slate-500 line-through">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>

            <p className="text-slate-300 leading-relaxed">{product.description}</p>

            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 text-slate-100">Game Details</h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  {Object.entries(product.gameDetails).map(([key, value]) => (
                    <div key={key}>
                      <span className="text-slate-400 capitalize">{key.replace(/([A-Z])/g, " $1")}: </span>
                      <span className="font-medium text-slate-200">{String(value)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {product.features && product.features.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3 text-slate-100">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-slate-300">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button size="lg" className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleWishlistToggle}
                className={`flex-1 border-slate-600 hover:bg-slate-700 ${isWishlisted(product.id) ? "text-red-500 border-red-500 hover:bg-red-500/10 hover:text-red-400" : "text-slate-300 hover:text-slate-100"}`}
              >
                <Heart className={`w-5 h-5 mr-2 ${isWishlisted(product.id) ? "fill-current" : ""}`} />
                {isWishlisted(product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-slate-100"
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex items-center gap-6 pt-4 border-t border-slate-700">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Shield className="w-5 h-5 text-green-500" />
                <span>Secure Transaction</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Clock className="w-5 h-5 text-sky-500" />
                <span>Fast Delivery</span>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="seller" className="mb-12">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 bg-slate-800 border border-slate-700 rounded-lg p-1">
            <TabsTrigger
              value="seller"
              className="data-[state=active]:bg-slate-700 data-[state=active]:text-primary data-[state=active]:shadow-sm text-slate-300"
            >
              Seller Info
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="data-[state=active]:bg-slate-700 data-[state=active]:text-primary data-[state=active]:shadow-sm text-slate-300"
            >
              Reviews ({reviews.length})
            </TabsTrigger>
            <TabsTrigger
              value="contact"
              className="data-[state=active]:bg-slate-700 data-[state=active]:text-primary data-[state=active]:shadow-sm text-slate-300 hidden sm:block"
            >
              Contact
            </TabsTrigger>
          </TabsList>

          <TabsContent value="seller" className="mt-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row items-start gap-6">
                  <Image
                    src={product.seller.avatar || "/placeholder.svg?width=100&height=100"}
                    alt={product.seller.name}
                    width={80}
                    height={80}
                    className="rounded-full border-2 border-primary"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-slate-100">{product.seller.name}</h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-slate-400">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span>{product.seller.rating} rating</span>
                      </div>
                      <span>{product.seller.totalSales} total sales</span>
                      <span>Member since {product.seller.joinDate}</span>
                    </div>
                    <p className="mt-4 text-slate-300 text-sm leading-relaxed">
                      Trusted seller with years of experience in gaming account trading. All accounts are verified and
                      come with lifetime support. Feel free to reach out for any inquiries.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4 border-primary text-primary hover:bg-primary/10 hover:text-primary"
                      asChild
                    >
                      <Link href="#">View Seller Profile</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-6">
              {reviews.map((review) => (
                <Card key={review.id} className="bg-slate-800 border-slate-700">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Image
                        src={review.avatar || "/placeholder.svg"}
                        alt={review.user}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-slate-100">{review.user}</h4>
                          <span className="text-xs text-slate-500">{review.date}</span>
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating ? "fill-amber-400 text-amber-400" : "text-slate-600"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed">{review.comment}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {reviews.length === 0 && (
                <p className="text-slate-400 text-center py-4">No reviews yet for this product.</p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="contact" className="mt-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-slate-100">Contact Seller</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 mb-4 text-sm">
                  Get in touch with {product.seller.name} for more information or to negotiate the price.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground flex-1">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                  <Button
                    variant="outline"
                    className="border-green-500 text-green-400 hover:bg-green-500/10 hover:text-green-300 flex-1"
                    asChild
                  >
                    <a
                      href={`https://wa.me/6283150577899?text=Hi%20${product.seller.name},%20I'm%20interested%20in%20your%20product:%20${encodeURIComponent(product.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      WhatsApp
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  )
}
