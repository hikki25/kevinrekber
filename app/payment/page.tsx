"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { CheckCircle, Clock, Copy, CreditCard, ArrowRight, Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function PaymentPage() {
  const [paymentStatus, setPaymentStatus] = useState<"pending" | "processing" | "completed">("pending")
  const [timeLeft, setTimeLeft] = useState(15 * 60) // 15 minutes in seconds
  const { toast } = useToast()

  const paymentDetails = {
    orderId: "KR-2025-001234",
    amount: 234.89,
    method: "Bank Transfer",
    bankAccount: "1234567890",
    bankName: "Bank Central Asia (BCA)",
    accountName: "KevinRekber Official",
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: "Account number copied to clipboard",
    })
  }

  const simulatePayment = () => {
    setPaymentStatus("processing")
    setTimeout(() => {
      setPaymentStatus("completed")
    }, 3000)
  }

  if (paymentStatus === "completed") {
    return (
      <div className="min-h-screen bg-background">
        <Header />

        <div className="container py-16">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl font-bold">Payment Successful!</h1>
              <p className="text-muted-foreground">Your order has been confirmed and is being processed.</p>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Order ID</span>
                    <span className="font-mono">{paymentDetails.orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Amount Paid</span>
                    <span className="font-semibold">${paymentDetails.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment Method</span>
                    <span>{paymentDetails.method}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="/transactions">
                  View Transaction History
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download Receipt
              </Button>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold">Complete Your Payment</h1>
            <p className="text-muted-foreground">Follow the instructions below to complete your order</p>
          </div>

          {/* Payment Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Payment Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Time Remaining</span>
                <Badge variant={timeLeft < 300 ? "destructive" : "default"}>{formatTime(timeLeft)}</Badge>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Payment Progress</span>
                  <span>{paymentStatus === "pending" ? "0%" : "50%"}</span>
                </div>
                <Progress value={paymentStatus === "pending" ? 0 : 50} />
              </div>

              <div className="flex items-center gap-2">
                {paymentStatus === "pending" && (
                  <>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                    <span className="text-sm">Waiting for payment</span>
                  </>
                )}
                {paymentStatus === "processing" && (
                  <>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                    <span className="text-sm">Processing payment...</span>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Payment Instructions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Instructions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-semibold mb-2">Transfer Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Bank</span>
                      <span className="font-medium">{paymentDetails.bankName}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Account Number</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-medium">{paymentDetails.bankAccount}</span>
                        <Button size="sm" variant="ghost" onClick={() => copyToClipboard(paymentDetails.bankAccount)}>
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span>Account Name</span>
                      <span className="font-medium">{paymentDetails.accountName}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span>Amount</span>
                      <span className="font-bold text-lg">${paymentDetails.amount}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold">Steps to Complete Payment:</h3>
                  <ol className="space-y-2 text-sm">
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs">
                        1
                      </span>
                      <span>Open your banking app or visit the nearest ATM</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs">
                        2
                      </span>
                      <span>Transfer the exact amount to the account number above</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs">
                        3
                      </span>
                      <span>
                        Use order ID <code className="bg-muted px-1 rounded">{paymentDetails.orderId}</code> as the
                        transfer description
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs">
                        4
                      </span>
                      <span>Wait for payment confirmation (usually within 5-10 minutes)</span>
                    </li>
                  </ol>
                </div>
              </div>

              <div className="flex gap-4">
                <Button onClick={simulatePayment} className="flex-1">
                  I've Made the Payment
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/cart">Cancel Order</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Important Notes */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <h3 className="font-semibold text-yellow-600">Important Notes:</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Transfer the exact amount including cents</li>
                  <li>• Payment must be completed within 15 minutes</li>
                  <li>• Include the order ID in your transfer description</li>
                  <li>• Contact support if you encounter any issues</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
