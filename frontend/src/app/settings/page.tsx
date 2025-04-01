"use client"

import { useState } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "next-themes"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()
  const [fontSize, setFontSize] = useState("medium")
  const [excelAddin, setExcelAddin] = useState(false)
  const [autoSave, setAutoSave] = useState(true)
  const [notifications, setNotifications] = useState(true)

  const saveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated.",
    })
  }

  return (
    <div className="container mx-auto p-4 pt-16 md:pt-4">
      <h1 className="mb-6 text-2xl font-bold">Settings & Customization</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Customize how the Excel Assistant looks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="theme">Theme</Label>
              <div className="flex items-center space-x-2">
                <Button
                  variant={theme === "light" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setTheme("light")}
                  className="h-10 w-10"
                >
                  <Sun className="h-5 w-5" />
                </Button>
                <Button
                  variant={theme === "dark" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setTheme("dark")}
                  className="h-10 w-10"
                >
                  <Moon className="h-5 w-5" />
                </Button>
                <Button
                  variant={theme === "system" ? "default" : "outline"}
                  onClick={() => setTheme("system")}
                  className="h-10"
                >
                  System
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="font-size">Font Size</Label>
              <RadioGroup value={fontSize} onValueChange={setFontSize} className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="small" id="small" />
                  <Label htmlFor="small">Small</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="medium" />
                  <Label htmlFor="medium">Medium</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="large" id="large" />
                  <Label htmlFor="large">Large</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Integration</CardTitle>
            <CardDescription>Configure Excel Assistant integration options</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="excel-addin">Excel Add-in</Label>
                <p className="text-sm text-muted-foreground">Enable Excel add-in integration</p>
              </div>
              <Switch id="excel-addin" checked={excelAddin} onCheckedChange={setExcelAddin} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-save">Auto-save Responses</Label>
                <p className="text-sm text-muted-foreground">Automatically save all assistant responses</p>
              </div>
              <Switch id="auto-save" checked={autoSave} onCheckedChange={setAutoSave} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notifications">Notifications</Label>
                <p className="text-sm text-muted-foreground">Enable desktop notifications</p>
              </div>
              <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 flex justify-end">
        <Button onClick={saveSettings}>Save Settings</Button>
      </div>
    </div>
  )
}

