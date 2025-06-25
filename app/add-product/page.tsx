"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Upload, X, Plus, Save, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function AddProductPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    game: "",
    category: "",
    price: "",
    description: "",
    features: [] as string[],
    images: [] as string[],
    accountDetails: {
      level: "",
      rank: "",
      heroes: "",
      skins: "",
      diamonds: "",
    },
  })

  const [newFeature, setNewFeature] = useState("")

  const games = [
    "Mobile Legends",
    "PUBG Mobile",
    "Free Fire",
    "Genshin Impact",
    "Valorant",
    "Another",
  ]

  const categories = ["Account", "Items", "Currency", "Boost Service", "Top Up"]

  const addFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData({
        ...formData,
        features: [...formData.features, newFeature.trim()],
      })
      setNewFeature("")
    }
  }

  const removeFeature = (feature: string) => {
    setFormData({
      ...formData,
      features: formData.features.filter((f) => f !== feature),
    })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log("Product data:", formData)
    // Simulate successful creation
    alert("Product created successfully!")
    router.push("/manage-products")
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header with Back Button */}
          <div className="flex items-center gap-4 mb-8">
            <Link href="/dashboard">
                <Button type="button" className="bg-blue-500 hover:bg-blue-600">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Add a New Product</CardTitle>
                <CardDescription>Enter product details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title" className="text-white">
                      Product Title
                    </Label>
                    <Input
                      id="title"
                      placeholder="Mobile Legends - 001"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="bg-gray-700 border-gray-600 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="price" className="text-white">
                      Price
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="$"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="bg-gray-700 border-gray-600 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="game" className="text-white">
                      Game
                    </Label>
                    <Select onValueChange={(value) => setFormData({ ...formData, game: value })}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select Game" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        {games.map((game) => (
                          <SelectItem key={game} value={game}>
                            {game}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="category" className="text-white">
                      Category
                    </Label>
                    <Select onValueChange={(value) => setFormData({ ...formData, category: value })}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="description" className="text-white">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe product details.."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                    rows={4}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Account Details */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Account Details</CardTitle>
                <CardDescription>Specific details about the gaming account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="level" className="text-white">
                      Level
                    </Label>
                    <Input
                      id="level"
                      value={formData.accountDetails.level}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          accountDetails: { ...formData.accountDetails, level: e.target.value },
                        })
                      }
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="rank" className="text-white">
                      Rank
                    </Label>
                    <Input
                      id="rank"
                      value={formData.accountDetails.rank}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          accountDetails: { ...formData.accountDetails, rank: e.target.value },
                        })
                      }
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="heroes" className="text-white">
                      Heroes
                    </Label>
                    <Input
                      id="heroes"
                      value={formData.accountDetails.heroes}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          accountDetails: { ...formData.accountDetails, heroes: e.target.value },
                        })
                      }
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="skins" className="text-white">
                      Skins
                    </Label>
                    <Input
                      id="skins"
                      value={formData.accountDetails.skins}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          accountDetails: { ...formData.accountDetails, skins: e.target.value },
                        })
                      }
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="diamonds" className="text-white">
                      Currency
                    </Label>
                    <Input
                      id="diamonds"
                      value={formData.accountDetails.diamonds}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          accountDetails: { ...formData.accountDetails, diamonds: e.target.value },
                        })
                      }
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Features & Highlights</CardTitle>
                <CardDescription>Add key features and selling points</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a feature..."
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
                  />
                  <Button type="button" onClick={addFeature} className="bg-blue-500 hover:bg-blue-600">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.features.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="bg-gray-700 text-white">
                      {feature}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="ml-2 h-auto p-0 text-gray-400 hover:text-white"
                        onClick={() => removeFeature(feature)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Images */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Product Images</CardTitle>
                <CardDescription>Upload screenshots and images of the product</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400 mb-2">Drag and drop images here, or click to browse</p>
                  <p className="text-sm text-gray-500">PNG, JPG up to 10MB each</p>
                  <Button type="button" variant="outline" className="mt-4 border-gray-600 text-white hover:bg-gray-700">
                    Choose Files
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex gap-4">
              <Link href="/dashboard">
                <Button type="button" variant="outline" className="border-gray-600 text-white hover:bg-gray-700">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
                <Save className="w-4 h-4 mr-2" />
                Create Product
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
