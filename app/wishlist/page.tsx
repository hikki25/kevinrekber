"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingCart, ArrowRight, XCircle } from "lucide-react"
import { useWishlist } from "@/contexts/wishlist-context"
import { toast } from "sonner"

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist, isWishlisted } = useWishlist()

  const handleRemoveFromWishlist = (product: any) => {
    removeFromWishlist(product.id)
    toast.error(`${product.name} removed from wishlist.`)
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <Header />

      <div className="container py-12">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-50 mb-3">My Wishlist</h1>
          <p className="text-lg text-slate-400">Your favorite gaming accounts, all in one place.</p>
        </div>

        {wishlistItems.length === 0 ? (
          <Card className="bg-slate-800 border-slate-700 shadow-lg">
            <CardContent className="p-10 text-center">
              <Heart className="w-20 h-20 mx-auto text-slate-500 mb-6" />
              <h2 className="text-2xl font-semibold text-slate-200 mb-3">Your Wishlist is Empty</h2>
              <p className="text-slate-400 mb-6">
                Looks like you haven't added any products to your wishlist yet.
                <br />
                Start exploring and add items you love!
              </p>
              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/products">
                  Explore Products
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {wishlistItems.map((item) => (
              <Card
                key={item.id}
                className="group overflow-hidden hover:shadow-xl transition-all duration-300 border border-slate-700 hover:border-primary/70 bg-slate-800 hover:bg-slate-700/50"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg?width=400&height=300"}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {item.originalPrice && (
                    <Badge variant="destructive" className="absolute top-3 left-3 bg-red-600 text-white">
                      SAVE ${(item.originalPrice - item.price).toFixed(0)}
                    </Badge>
                  )}
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-3 right-3 bg-slate-900/70 hover:bg-red-500/80 text-white hover:text-white rounded-full backdrop-blur-sm z-10 p-2"
                    onClick={() => handleRemoveFromWishlist(item)}
                    title="Remove from wishlist"
                  >
                    <XCircle className="w-5 h-5" />
                  </Button>
                </div>
                <CardContent className="p-5 space-y-3">
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider">{item.category}</p>
                    <h3
                      className="font-semibold text-lg text-slate-100 group-hover:text-primary transition-colors truncate"
                      title={item.name}
                    >
                      {item.name}
                    </h3>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold text-xl text-primary">${item.price.toFixed(2)}</span>
                    {item.originalPrice && (
                      <span className="text-sm text-slate-400 line-through">${item.originalPrice.toFixed(2)}</span>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 mt-2">
                    <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                      <Link href={`/products/${item.id}`}>View Details</Link>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-slate-100"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
