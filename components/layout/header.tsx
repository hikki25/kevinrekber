"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Menu,
  ShoppingCart,
  User,
  Home,
  Package,
  FileText,
  LayoutDashboard,
  LogIn,
  UserPlus,
  Settings,
  LogOut,
  Heart,
  Briefcase,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useWishlist } from "@/contexts/wishlist-context" 

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Products", href: "/products", icon: Package },
  { name: "Articles", href: "/articles", icon: FileText },
]

// Mock user state
interface MockUser {
  name: string
  email: string
  avatar: string
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { wishlistItems } = useWishlist()

  // Mock authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState<MockUser | null>(null)

  // Simulate checking auth state on mount (e.g., from localStorage)
  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn") === "true"
    setIsLoggedIn(loggedInStatus)
    if (loggedInStatus) {
      setCurrentUser({
        name: localStorage.getItem("userName") || "KevinRekber",
        email: localStorage.getItem("userEmail") || "kevinrekber@gmail.com",
        avatar: localStorage.getItem("userAvatar") || "/placeholder.svg?width=100&height=100",
      })
    }
  }, [])

  const handleLogin = () => {
    const mockUserData = {
      name: "KevinRekber",
      email: "kevinrekber@gmail.com",
      avatar: "/placeholder.svg?width=100&height=100",
    }
    setIsLoggedIn(true)
    setCurrentUser(mockUserData)
    localStorage.setItem("isLoggedIn", "true")
    localStorage.setItem("userName", mockUserData.name)
    localStorage.setItem("userEmail", mockUserData.email)
    localStorage.setItem("userAvatar", mockUserData.avatar)
    // Potentially redirect to dashboard or previous page
    // router.push('/dashboard');
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentUser(null)
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userName")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("userAvatar")
    // Potentially redirect to home
    // router.push('/');
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-lg supports-[backdrop-filter]:bg-slate-900/60">
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-6 lg:gap-8">
          <Link href="/" className="flex items-center space-x-2 group">
          <div>
              <img src="/logo.png" alt="Logo" className="h-6 w-6 object-contain" />
            </div>
            <span className="font-bold text-2xl tracking-tight group-hover:text-primary transition-colors text-slate-100">
              KevinRekber
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-base font-medium transition-colors hover:text-primary",
                  pathname === item.href ? "text-primary" : "text-slate-300 hover:text-primary/90",
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2 lg:gap-3">
          <Button variant="ghost" size="icon" className="relative text-slate-300 hover:text-primary" asChild>
            <Link href="/wishlist">
              <Heart className="h-6 w-6" />
              {wishlistItems.length > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs rounded-full bg-red-500 text-white"
                >
                  {wishlistItems.length}
                </Badge>
              )}
              <span className="sr-only">View Wishlist</span>
            </Link>
          </Button>

          <Button variant="ghost" size="icon" className="relative text-slate-300 hover:text-primary" asChild>
            <Link href="/cart">
              <ShoppingCart className="h-6 w-6" />
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs rounded-full bg-primary text-primary-foreground"
              >
                2 {/* Replace with actual cart count if available */}
              </Badge>
              <span className="sr-only">View Cart</span>
            </Link>
          </Button>

          {isLoggedIn && currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Image
                    src={currentUser.avatar || "/placeholder.svg"}
                    alt={currentUser.name}
                    fill
                    className="rounded-full object-cover"
                  />
                  <span className="sr-only">Open user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 bg-slate-800 border-slate-700 text-slate-200">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1 p-2">
                    <p className="text-sm font-medium leading-none text-slate-50">{currentUser.name}</p>
                    <p className="text-xs leading-none text-slate-400">{currentUser.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-slate-700" />
                <DropdownMenuItem asChild className="hover:bg-slate-700/70 focus:bg-slate-700/70">
                  <Link href="/dashboard" className="flex items-center">
                    <LayoutDashboard className="mr-2 h-4 w-4 text-primary" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="hover:bg-slate-700/70 focus:bg-slate-700/70">
                  <Link href="/profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4 text-primary" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="hover:bg-slate-700/70 focus:bg-slate-700/70">
                  <Link href="/add-product" className="flex items-center">
                    <Briefcase className="mr-2 h-4 w-4 text-primary" />
                    My Products
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="hover:bg-slate-700/70 focus:bg-slate-700/70">
                  <Link href="/view-orders" className="flex items-center">
                    <Package className="mr-2 h-4 w-4 text-primary" />
                    My Orders
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-slate-700" />
                <DropdownMenuItem asChild className="hover:bg-slate-700/70 focus:bg-slate-700/70">
                  <Link href="/settings" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4 text-primary" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-slate-700" />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-400 hover:!text-red-300 hover:!bg-red-500/20 focus:bg-red-500/20 cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" className="text-slate-300 hover:text-primary" onClick={handleLogin}>
                {" "}
                {/* Simulate login */}
                <LogIn className="mr-2 h-4 w-4" /> Login
              </Button>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                <Link href="/register">
                  <UserPlus className="mr-2 h-4 w-4" /> Register
                </Link>
              </Button>
            </div>
          )}

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden text-slate-300 hover:text-primary">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open mobile menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full max-w-xs sm:max-w-sm bg-slate-900 border-l border-slate-700 text-slate-200 p-0"
            >
              <div className="p-6">
                <Link href="/" className="flex items-center space-x-2 mb-8" onClick={() => setIsOpen(false)}>
                  <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-lg">KR</span>
                  </div>
                  <span className="font-bold text-2xl text-slate-100">KevinRekber</span>
                </Link>
                <nav className="flex flex-col gap-2">
                  {navigation.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors",
                          pathname === item.href
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-slate-700/70 text-slate-300",
                        )}
                      >
                        <Icon className="h-5 w-5" />
                        {item.name}
                      </Link>
                    )
                  })}
                </nav>
                <div className="border-t border-slate-700 pt-6 mt-6">
                  {isLoggedIn ? (
                    <>
                      <Link
                        href="/dashboard"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium hover:bg-slate-700/70 text-slate-300"
                      >
                        <LayoutDashboard className="h-5 w-5 text-primary" />
                        Dashboard
                      </Link>
                      <Link
                        href="/profile"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium hover:bg-slate-700/70 text-slate-300"
                      >
                        <User className="h-5 w-5 text-primary" />
                        Profile
                      </Link>
                      <div
                        onClick={() => {
                          handleLogout()
                          setIsOpen(false)
                        }}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-red-400 hover:bg-red-500/20 cursor-pointer"
                      >
                        <LogOut className="h-5 w-5" />
                        Logout
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        onClick={() => {
                          handleLogin()
                          setIsOpen(false)
                        }}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium hover:bg-slate-700/70 text-slate-300 cursor-pointer"
                      >
                        <LogIn className="h-5 w-5" />
                        Login
                      </div>
                      <Link
                        href="/register"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 mt-2"
                      >
                        <UserPlus className="h-5 w-5" />
                        Register
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
