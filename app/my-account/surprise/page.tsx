"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase"
import { Gift, Sparkles } from "lucide-react"

export default function SurprisePage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [surprise, setSurprise] = useState<any>(null)
  const [claimed, setClaimed] = useState(false)

  useEffect(() => {
    const fetchSurprise = async () => {
      if (user) {
        const { data, error } = await supabase
          .from("surprises")
          .select("*")
          .eq("user_id", user.id)
          .eq("claimed", false)
          .limit(1)
          .single()

        if (error) {
          console.error("Error fetching surprise:", error)
        } else if (data) {
          setSurprise(data)
        }
      }
    }

    fetchSurprise()
  }, [user])

  const claimSurprise = async () => {
    if (!surprise) return

    setLoading(true)

    try {
      const { error } = await supabase
        .from("surprises")
        .update({ claimed: true, claimed_at: new Date().toISOString() })
        .eq("id", surprise.id)

      if (error) throw error

      setClaimed(true)
      toast({
        title: "Surprise Claimed!",
        description: "Your surprise has been successfully claimed.",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to claim surprise. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (!surprise && !claimed) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-headline">Surprise</h1>
          <p className="mt-2 text-muted-foreground">No surprises available at the moment.</p>
        </div>
        <Card>
          <CardContent className="p-6 text-center">
            <Gift className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Check back later for special surprises!</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-headline">🎉 Surprise!</h1>
        <p className="mt-2 text-muted-foreground">You have a special surprise waiting for you!</p>
      </div>

      <Card className="glowing-card border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-4 bg-purple-100 rounded-full w-fit">
            <Sparkles className="h-8 w-8 text-purple-600" />
          </div>
          <CardTitle className="text-2xl text-purple-800">
            {claimed ? "Surprise Claimed!" : surprise?.title || "Special Surprise"}
          </CardTitle>
          <CardDescription className="text-purple-600">
            {claimed
              ? "Thank you for claiming your surprise!"
              : surprise?.description || "You've earned a special reward!"}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          {!claimed ? (
            <Button onClick={claimSurprise} disabled={loading} className="bg-purple-600 hover:bg-purple-700 text-white">
              {loading ? "Claiming..." : "Claim Your Surprise"}
            </Button>
          ) : (
            <div className="space-y-4">
              <p className="text-green-600 font-medium">✅ Your surprise has been claimed successfully!</p>
              <p className="text-sm text-muted-foreground">Check your downloads or account for your reward.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
