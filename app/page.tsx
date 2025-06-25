"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import Link from "next/link"
import Image from "next/image"
import { Shield, Users, Clock, Star, ArrowRight, Gamepad2, TrendingUp, Heart } from "lucide-react"
import { useWishlist } from "@/contexts/wishlist-context"
import { toast } from "sonner"

const features = [
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "All transactions are protected with our trusted escrow system",
  },
  {
    icon: Users,
    title: "Trusted Community",
    description: "Join thousands of satisfied gamers since 2021",
  },
  {
    icon: Clock,
    title: "Fast Processing",
    description: "Quick account verification and instant delivery",
  },
  {
    icon: Star,
    title: "Premium Quality",
    description: "Only verified and high-quality gaming accounts",
  },
]

const trendingGames = [
  {
    id: 1,
    name: "Mobile Legends",
    category: "MOBA",
    price: 139.9,
    originalPrice: 150,
    image: "/ml.jpg",
    badge: "Hot",
    seller: "Jelossy",
  },
  {
    id: 2,
    name: "Honkai Star Rail",
    category: "Turn Based",
    price: 99.9,
    image: "/hsr.jpg",
    badge: "New",
    seller: "GameMaster",
  },
  {
    id: 3,
    name: "PUBG Mobile",
    category: "Battle Royale",
    price: 490,
    image: "/pubg.jpg",
    badge: "Premium",
    seller: "ProGamer",
  },
  {
    id: 4,
    name: "Genshin Impact",
    category: "Adventure",
    price: 89,
    image: "/gi.jpg",
    badge: "Popular",
    seller: "Adventurer",
  },
]

export default function HomePage() {
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist()

  const handleWishlistToggle = (game: (typeof trendingGames)[0]) => {
    const productData = {
      id: game.id,
      name: game.name,
      image: game.image,
      price: game.price,
      category: game.category,
      originalPrice: game.originalPrice,
      seller: game.seller,
    }
    if (isWishlisted(game.id)) {
      removeFromWishlist(game.id)
      toast.success(`${game.name} removed from wishlist!`)
    } else {
      addToWishlist(productData)
      toast.success(`${game.name} added to wishlist!`)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <Header />

      {/* Hero Section - Adjusted for better dark theme contrast */}
      <section className="relative py-24 lg:py-40 overflow-hidden">
        <Image
          src="/bg.jpeg"
          alt="Hero Background"
          fill
          objectFit="cover"
          className="z-0 opacity-30" // Reduced opacity for darker feel
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/80 to-slate-900 z-0" />
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge
              variant="outline"
              className="px-4 py-2 text-sm border-primary/70 bg-slate-800/70 backdrop-blur-sm text-slate-200"
            >
              <TrendingUp className="w-4 h-4 mr-2 text-primary" />
              Trusted Since 2021
            </Badge>

            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-50">
              Premium Gaming
              <span className="text-primary block mt-2">Marketplace</span>
            </h1>

            <p className="text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto">
              Buy and sell gaming accounts safely with our trusted escrow system. Join thousands of satisfied gamers
              worldwide.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                className="px-8 py-6 text-base bg-primary hover:bg-primary/90 text-primary-foreground"
                asChild
              >
                <Link href="/products">
                  <Gamepad2 className="w-5 h-5 mr-2" />
                  Browse Games
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 text-base border-slate-600 hover:border-primary hover:bg-primary/10 text-slate-200"
                asChild
              >
                <Link href="/articles">
                  Learn More
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Adjusted for dark theme */}
      <section className="py-20 lg:py-24 bg-slate-800/30">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-100">Why Choose KevinRekber?</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              We provide the safest and most reliable platform for gaming account transactions. Authorized by @evos.kevin
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card
                  key={index}
                  className="text-center p-6 hover:shadow-xl transition-all duration-300 border border-slate-700 hover:border-primary/70 bg-slate-800 hover:bg-slate-700/50 backdrop-blur-sm"
                >
                  <CardContent className="space-y-5 pt-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-xl text-slate-100">{feature.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Trending Games Section - Adjusted for dark theme */}
      <section className="py-20 lg:py-24">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-4">
            <div className="space-y-2 text-center md:text-left">
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-100">Trending Games</h2>
              <p className="text-slate-400 text-lg">Most popular games this week</p>
            </div>
            <Button
              variant="outline"
              className="border-slate-600 hover:border-primary hover:bg-primary/10 text-slate-200"
              asChild
            >
              <Link href="/products">
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {trendingGames.map((game) => (
              <Card
                key={game.id}
                className="group overflow-hidden hover:shadow-xl transition-all duration-300 border border-slate-700 hover:border-primary/70 bg-slate-800 hover:bg-slate-700/50 backdrop-blur-sm"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={game.image || "/placeholder.svg?width=400&height=300"}
                    alt={game.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {game.badge && (
                    <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">{game.badge}</Badge>
                  )}
                  {game.originalPrice && (
                    <Badge variant="destructive" className="absolute top-3 left-3 bg-red-600 text-white">
                      SAVE ${(game.originalPrice - game.price).toFixed(0)}
                    </Badge>
                  )}
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute bottom-3 right-3 bg-slate-900/50 hover:bg-slate-900/80 text-white rounded-full backdrop-blur-sm"
                    onClick={() => handleWishlistToggle(game)}
                  >
                    <Heart
                      className={`w-5 h-5 ${isWishlisted(game.id) ? "fill-red-500 text-red-500" : "text-white"}`}
                    />
                    <span className="sr-only">Add to wishlist</span>
                  </Button>
                </div>
                <CardContent className="p-5 space-y-4">
                  <div className="space-y-1">
                    <p className="text-xs text-slate-400 uppercase tracking-wider">{game.category}</p>
                    <h3
                      className="font-semibold text-lg text-slate-100 group-hover:text-primary transition-colors truncate"
                      title={game.name}
                    >
                      {game.name}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="font-bold text-xl text-primary">${game.price.toFixed(2)}</span>
                      {game.originalPrice && (
                        <span className="text-sm text-slate-400 line-through">${game.originalPrice.toFixed(2)}</span>
                      )}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="w-full mt-2 bg-primary hover:bg-primary/90 text-primary-foreground"
                    asChild
                  >
                    <Link href={`/products/${game.id}`}>
                      View Details
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Reverted to simpler design, adapted for dark theme */}
      <section className="py-20 lg:py-24 bg-slate-800">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-100 tracking-tight">Ready to Start Trading?</h2>
            <p className="text-lg lg:text-xl text-slate-300">
              Join our community of trusted gamers and start buying or selling gaming accounts today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-base"
                asChild
              >
                <Link href="/products">Start Shopping</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-slate-200 border-slate-600 hover:bg-primary/10 hover:text-primary hover:border-primary px-8 py-6 text-base"
                asChild
              >
                <Link href="/contact">Contact Support</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
