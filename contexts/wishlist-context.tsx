"use client"

import type { ReactNode } from "react"
import { createContext, useContext, useState, useCallback } from "react"

// Define a basic product type, ensure it matches your product structure
// You might need to expand this based on what you display on the wishlist page
interface Product {
  id: number
  name: string
  image: string
  price: number
  category: string
  // Add other relevant fields you want to show on wishlist page
  originalPrice?: number
  seller?: string
}

interface WishlistContextType {
  wishlistItems: Product[]
  addToWishlist: (product: Product) => void
  removeFromWishlist: (productId: number) => void
  isWishlisted: (productId: number) => boolean
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([])

  const addToWishlist = useCallback((product: Product) => {
    setWishlistItems((prevItems) => {
      if (!prevItems.find((item) => item.id === product.id)) {
        return [...prevItems, product]
      }
      return prevItems
    })
  }, [])

  const removeFromWishlist = useCallback((productId: number) => {
    setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== productId))
  }, [])

  const isWishlisted = useCallback(
    (productId: number) => {
      return wishlistItems.some((item) => item.id === productId)
    },
    [wishlistItems],
  )

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}
