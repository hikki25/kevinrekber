"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { User, Bell, Palette, ShieldCheck, LogOut } from "lucide-react"
import { useState } from "react"

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    emailOffers: true,
    appUpdates: false,
    newMessages: true,
  })
  const [darkMode, setDarkMode] = useState(true) // Assuming default is dark

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  // In a real app, this would interact with ThemeProvider context
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    // This is a mock. Actual theme switching needs ThemeProvider integration.
    // document.documentElement.classList.toggle('dark', !darkMode)
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <Header />
      <div className="container py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10">
            <h1 className="text-4xl font-bold tracking-tight text-slate-50 mb-2">Settings</h1>
            <p className="text-lg text-slate-400">Manage your account preferences and settings.</p>
          </div>

          <div className="space-y-8">
            {/* Account Settings */}
            <Card className="bg-slate-800 border-slate-700 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <User className="w-6 h-6 text-primary" />
                  <CardTitle className="text-slate-100 text-xl">Account Information</CardTitle>
                </div>
                <CardDescription className="text-slate-400">Update your personal details.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-slate-300">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      defaultValue="Kevin Rekber"
                      className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-slate-300">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue="kevinrekber@gmail.com"
                      className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="username" className="text-slate-300">
                    Username
                  </Label>
                  <Input
                    id="username"
                    defaultValue="kevinrekber21"
                    className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
                  />
                </div>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Save Changes</Button>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card className="bg-slate-800 border-slate-700 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Bell className="w-6 h-6 text-primary" />
                  <CardTitle className="text-slate-100 text-xl">Notifications</CardTitle>
                </div>
                <CardDescription className="text-slate-400">Choose how you receive notifications.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { id: "emailOffers", label: "Promotional Offers via Email" },
                  { id: "appUpdates", label: "In-App Product Updates" },
                  { id: "newMessages", label: "Notifications for New Messages" },
                ].map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-md">
                    <Label htmlFor={item.id} className="text-slate-300 cursor-pointer">
                      {item.label}
                    </Label>
                    <Switch
                      id={item.id}
                      checked={notifications[item.id as keyof typeof notifications]}
                      onCheckedChange={() => handleNotificationChange(item.id as keyof typeof notifications)}
                      className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-slate-600"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Appearance Settings */}
            <Card className="bg-slate-800 border-slate-700 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Palette className="w-6 h-6 text-primary" />
                  <CardTitle className="text-slate-100 text-xl">Appearance</CardTitle>
                </div>
                <CardDescription className="text-slate-400">Customize the look and feel.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-md">
                  <Label htmlFor="darkModeToggle" className="text-slate-300 cursor-pointer">
                    Dark Mode
                  </Label>
                  <Switch
                    id="darkModeToggle"
                    checked={darkMode}
                    onCheckedChange={toggleDarkMode}
                    className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-slate-600"
                  />
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Note: Actual theme switching requires ThemeProvider integration.
                </p>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card className="bg-slate-800 border-slate-700 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                  <CardTitle className="text-slate-100 text-xl">Security</CardTitle>
                </div>
                <CardDescription className="text-slate-400">Manage your account security.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="currentPassword" className="text-slate-300">
                    Current Password
                  </Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="newPassword" className="text-slate-300">
                    New Password
                  </Label>
                  <Input
                    id="newPassword"
                    type="password"
                    className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
                  />
                </div>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Update Password</Button>
                <Separator className="my-4 bg-slate-700" />
                <Button
                  variant="outline"
                  className="w-full border-red-500/50 text-red-400 hover:bg-red-500/10 hover:text-red-300"
                >
                  <LogOut className="w-4 h-4 mr-2" /> Deactivate Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
