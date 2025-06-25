"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"
import { CreditCard, Wallet, Smartphone, Shield, Lock } from "lucide-react"

const cartItems = [
  {
    id: 1,
    name: "Mobile Legends Account",
    price: 139.9,
    image: "/ml.jpg",
    seller: "Jelossy",
  },
  {
    id: 2,
    name: "Oneiric Shard",
    price: 89,
    image: "/one.jpeg",
    seller: "Jelossy",
  },
]

const paymentMethods = [
  {
    id: "credit-card",
    name: "Credit Card",
    icon: CreditCard,
    description: "Visa, Mastercard, American Express",
  },
  {
    id: "e-wallet",
    name: "E-Wallet",
    icon: Wallet,
    description: "GoPay, OVO, DANA",
  },
  {
    id: "bank-transfer",
    name: "Bank Transfer",
    icon: Smartphone,
    description: "BCA, Mandiri, BNI, BRI",
  },
]

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [agreeToTerms, setAgreeToTerms] = useState(false)

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0)
  const serviceFee = 5.99
  const total = subtotal + serviceFee

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-8">
        <div className="space-y-4 mb-8">
          <h1 className="text-3xl font-bold">Checkout</h1>
          <p className="text-muted-foreground">Complete your purchase securely</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Kevin" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Rekber" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="kevinrekber@gmail.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="+62 812 3456 7890" />
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  {paymentMethods.map((method) => {
                    const Icon = method.icon
                    return (
                      <div key={method.id} className="flex items-center space-x-3 p-4 border rounded-lg">
                        <RadioGroupItem value={method.id} id={method.id} />
                        <Icon className="w-5 h-5" />
                        <div className="flex-1">
                          <Label htmlFor={method.id} className="font-medium">
                            {method.name}
                          </Label>
                          <p className="text-sm text-muted-foreground">{method.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </RadioGroup>

                {/* Payment Details */}
                {paymentMethod === "credit-card" && (
                  <div className="space-y-4 pt-4 border-t">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" />
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Terms and Conditions */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="terms"
                    checked={agreeToTerms}
                    onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                  />
                  <div className="space-y-1">
                    <Label htmlFor="terms" className="text-sm font-medium">
                      I agree to the Terms and Conditions
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      By checking this box, you agree to our terms of service and privacy policy.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Items */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <p className="text-xs text-muted-foreground">by {item.seller}</p>
                      <p className="font-semibold">${item.price}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service Fee</span>
                    <span>${serviceFee.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Badge */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 text-sm">
                  <Shield className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="font-medium">Secure Payment</p>
                    <p className="text-muted-foreground">Your payment is protected</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Complete Order Button */}
            <Button size="lg" className="w-full" disabled={!agreeToTerms} asChild>
              <a href="/payment">
                <Lock className="w-4 h-4 mr-2" />
                Complete Order
              </a>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
