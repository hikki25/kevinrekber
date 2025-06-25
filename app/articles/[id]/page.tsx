 "use client"


 import { Header } from "@/components/layout/header"
  import { Footer } from "@/components/layout/footer"
  import { Button } from "@/components/ui/button"
  import { Badge } from "@/components/ui/badge"
  import { Separator } from "@/components/ui/separator"
  import Link from "next/link"
  import Image from "next/image"
  import { Calendar, User, Clock, ArrowLeft, Share2, Bookmark } from "lucide-react"

  const article = {
    id: 1,
    title: "How to Safely Buy Gaming Accounts Online",
    content: `
      <p>In the rapidly growing world of gaming account trading, safety should always be your top priority. Whether you're looking to purchase a high-level Mobile Legends account or a rare Genshin Impact profile, following these guidelines will help protect you from scams and ensure a smooth transaction.</p>

      <h2>1. Choose Reputable Platforms</h2>
      <p>Always use established marketplaces with built-in protection systems. Look for platforms that offer:</p>
      <ul>
        <li>Escrow services to hold funds until delivery</li>
        <li>Verified seller programs</li>
        <li>Customer support and dispute resolution</li>
        <li>User reviews and ratings</li>
      </ul>

      <h2>2. Verify Account Details</h2>
      <p>Before making any purchase, ensure you can verify all account details:</p>
      <ul>
        <li>Request screenshots of account stats</li>
        <li>Ask for video proof of account access</li>
        <li>Verify the account's creation date and history</li>
        <li>Check for any restrictions or bans</li>
      </ul>

      <h2>3. Use Secure Payment Methods</h2>
      <p>Never use payment methods that don't offer buyer protection. Recommended options include:</p>
      <ul>
        <li>Credit cards with chargeback protection</li>
        <li>PayPal Goods & Services</li>
        <li>Platform-specific escrow services</li>
        <li>Bank transfers through verified escrow</li>
      </ul>

      <h2>4. Red Flags to Avoid</h2>
      <p>Be wary of sellers who:</p>
      <ul>
        <li>Refuse to use escrow services</li>
        <li>Ask for payment through untraceable methods</li>
        <li>Have no reviews or negative feedback</li>
        <li>Pressure you to complete the transaction quickly</li>
        <li>Cannot provide adequate proof of account ownership</li>
      </ul>

      <h2>5. Post-Purchase Security</h2>
      <p>After receiving your account:</p>
      <ul>
        <li>Immediately change all passwords</li>
        <li>Update security questions and recovery email</li>
        <li>Enable two-factor authentication if available</li>
        <li>Check for any linked payment methods and remove them</li>
      </ul>

      <p>Remember, if a deal seems too good to be true, it probably is. Take your time, do your research, and prioritize security over savings. A legitimate seller will always be willing to work with proper safety measures.</p>
    `,
    category: "Safety Guide",
    author: "Kevin Admin",
    date: "2025-01-15",
    readTime: "5 min read",
    image: "/artikel01.png",
  }

  export default function ArticleDetailPage() {
    return (
      <div className="min-h-screen bg-background">
        <Header />

        <div className="container py-8">
          {/* Back Button */}
          <div className="flex items-center gap-4 mb-8">
            <Link href="/articles">
                <Button type="button" className="bg-blue-500 hover:bg-blue-600">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Articles
              </Button>
            </Link>
          </div>

          <article className="max-w-4xl mx-auto">
            {/* Article Header */}
            <div className="space-y-6 mb-8">
              <Badge variant="outline">{article.category}</Badge>

              <h1 className="text-4xl font-bold leading-tight">{article.title}</h1>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(article.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{article.readTime}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Bookmark className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
              <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
            </div>

            {/* Article Content */}
            <div
              className="prose prose-gray dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            <Separator className="my-12" />

            {/* Article Footer */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold">Was this article helpful?</h3>
                  <p className="text-sm text-muted-foreground">Let us know if you found this information useful</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    👍 Yes
                  </Button>
                  <Button variant="outline" size="sm">
                    👎 No
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-4">
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Article
                  </Button>
                  <Button variant="outline" size="sm">
                    <Bookmark className="w-4 h-4 mr-2" />
                    Save for Later
                  </Button>
                </div>
                <Button asChild>
                  <Link href="/articles">More Articles</Link>
                </Button>
              </div>
            </div>
          </article>
        </div>

        <Footer />
      </div>
    )
  }
