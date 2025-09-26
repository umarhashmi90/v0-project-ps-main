"use client"
import { useState } from "react"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export default function NotificationsPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [notifications, setNotifications] = useState({
    emailMarketing: true,
    emailUpdates: true,
    emailSecurity: true,
    pushMarketing: false,
    pushUpdates: true,
    pushSecurity: true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Here you would typically save to your database
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call

      toast({
        title: "Success!",
        description: "Your notification preferences have been updated.",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update notification preferences.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
          <CardDescription>Choose what email notifications you'd like to receive.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="emailMarketing">Marketing emails</Label>
              <p className="text-sm text-muted-foreground">Receive emails about new products and features.</p>
            </div>
            <Switch
              id="emailMarketing"
              checked={notifications.emailMarketing}
              onCheckedChange={(checked) => setNotifications({ ...notifications, emailMarketing: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="emailUpdates">Product updates</Label>
              <p className="text-sm text-muted-foreground">Receive emails about product updates and changes.</p>
            </div>
            <Switch
              id="emailUpdates"
              checked={notifications.emailUpdates}
              onCheckedChange={(checked) => setNotifications({ ...notifications, emailUpdates: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="emailSecurity">Security alerts</Label>
              <p className="text-sm text-muted-foreground">Receive emails about security and account changes.</p>
            </div>
            <Switch
              id="emailSecurity"
              checked={notifications.emailSecurity}
              onCheckedChange={(checked) => setNotifications({ ...notifications, emailSecurity: checked })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Push Notifications</CardTitle>
          <CardDescription>Choose what push notifications you'd like to receive.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="pushMarketing">Marketing notifications</Label>
              <p className="text-sm text-muted-foreground">Receive push notifications about new products.</p>
            </div>
            <Switch
              id="pushMarketing"
              checked={notifications.pushMarketing}
              onCheckedChange={(checked) => setNotifications({ ...notifications, pushMarketing: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="pushUpdates">Product updates</Label>
              <p className="text-sm text-muted-foreground">Receive push notifications about product updates.</p>
            </div>
            <Switch
              id="pushUpdates"
              checked={notifications.pushUpdates}
              onCheckedChange={(checked) => setNotifications({ ...notifications, pushUpdates: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="pushSecurity">Security alerts</Label>
              <p className="text-sm text-muted-foreground">Receive push notifications about security changes.</p>
            </div>
            <Switch
              id="pushSecurity"
              checked={notifications.pushSecurity}
              onCheckedChange={(checked) => setNotifications({ ...notifications, pushSecurity: checked })}
            />
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? "Saving..." : "Save Preferences"}
      </Button>
    </div>
  )
}
