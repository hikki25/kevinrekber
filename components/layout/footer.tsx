import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, Youtube, Send, Phone, Mail, MapPin, Heart } from "lucide-react"
import type { LucideIcon } from "lucide-react"

  type FooterNavItem = {
    href: string
    name: string
    icon?: LucideIcon
  }

  type FooterNav = {
    label: string
    items: FooterNavItem[]
  }

const footerNavs: FooterNav[] = [
  {
    label: "Company",
    items: [
      { href: "/about", name: "About Us" },
      { href: "/careers", name: "Careers" },
      { href: "/blog", name: "Blog/Articles" },
      { href: "/contact", name: "Contact Us" },
    ],
  },
  {
    label: "Support",
    items: [
      { href: "/", name: "FAQ" },
      { href: "/", name: "Terms of Service" },
      { href: "/", name: "Privacy Policy" },
      { href: "/", name: "Sitemap" },
    ],
  },
  {
    label: "Connect",
    items: [
      { href: "", name: "Facebook", icon: Facebook },
      { href: "#", name: "Instagram", icon: Instagram },
      { href: "#", name: "Twitter", icon: Twitter },
      { href: "#", name: "YouTube", icon: Youtube },
    ],
  },
]

export function Footer() {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // Optional: Tambahkan logika subscribe email di sini
  }

  return (
    <footer className="bg-slate-800 text-slate-300 border-t border-slate-700">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Branding & Newsletter */}
          <div className="space-y-6 md:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 group">
              <div>
                <img src="/logo.png" alt="Logo" className="h-6 w-6 object-contain" />
              </div>
              <span className="font-bold text-2xl tracking-tight text-slate-100 group-hover:text-primary transition-colors">
                KevinRekber
              </span>
            </Link>
            <p className="text-sm leading-relaxed">
              Your trusted marketplace for premium gaming accounts. Safe, secure, and fast transactions since 2021.
            </p>
            <div>
              <h4 className="font-semibold text-slate-100 mb-3">Stay Updated</h4>
              <form className="flex gap-2" onSubmit={handleSubscribe}>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="bg-slate-700 border-slate-600 text-slate-200 placeholder-slate-400 focus:border-primary"
                />
                <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground px-3">
                  <Send className="w-5 h-5" aria-label="Send" />
                </Button>
              </form>
            </div>
          </div>

          {/* Navigation Links */}
          {footerNavs.map((nav) => (
            <div key={nav.label} className="space-y-4">
              <h4 className="font-semibold text-slate-100 text-lg">{nav.label}</h4>
              <ul className="space-y-2">
                {nav.items.map((item) => (
                  <li key={`${nav.label}-${item.name}`}>
                    <Link
                      href={item.href}
                      className="text-sm hover:text-primary transition-colors flex items-center gap-2"
                    >
                      {item.icon ? <item.icon className="w-4 h-4" aria-hidden="true" /> : null}
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-700 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-primary" />
              <span>+62 83150599998</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-primary" />
              <span>kevinrekber@gmail.com</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary" />
              <span>Surabaya, Indonesia</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 py-6 border-t border-slate-700/50">
        <div className="container text-center text-sm text-slate-400">
          &copy; {new Date().getFullYear()} KevinRekber. All Rights Reserved. Designed with{" "}
          <Heart className="inline w-4 h-4 text-red-500 fill-current" aria-label="love" /> by Jelossy.
        </div>
      </div>
    </footer>
  )
}