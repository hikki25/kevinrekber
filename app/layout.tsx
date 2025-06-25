import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css" // Assuming this is your primary global CSS
import { ThemeProvider } from "@/components/theme-provider"
import { WishlistProvider } from "@/contexts/wishlist-context" // Import WishlistProvider
import { Toaster } from "@/components/ui/sonner" // For potential notifications

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "KevinRekber - Premium Gaming Marketplace",
  description: "Buy and sell gaming accounts safely.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <WishlistProvider>
            {" "}
            {/* Wrap with WishlistProvider */}
            {children}
            <Toaster richColors />
          </WishlistProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
