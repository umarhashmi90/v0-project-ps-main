"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { createClient } from "@/lib/supabase/client"
import { Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Message {
  id: string
  content: string
  user: {
    id: string
    full_name: string
    avatar_url?: string
  }
  created_at: string
}

interface TeamChatProps {
  className?: string
  channelId?: string
}

export function TeamChat({ className, channelId = "general" }: TeamChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSending, setIsSending] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()
  const supabase = createClient()

  useEffect(() => {
    fetchMessages()
    // In a real app, you would set up real-time subscriptions here
  }, [channelId])

  const fetchMessages = async () => {
    try {
      // Simulate messages for now since we don't have a messages table
      const mockMessages: Message[] = [
        {
          id: "1",
          content: "Welcome to the team chat! 👋",
          user: {
            id: "1",
            full_name: "System",
            avatar_url: undefined,
          },
          created_at: new Date(Date.now() - 3600000).toISOString(),
        },
        {
          id: "2",
          content: "Great work on the latest project updates!",
          user: {
            id: "2",
            full_name: "John Doe",
            avatar_url: undefined,
          },
          created_at: new Date(Date.now() - 1800000).toISOString(),
        },
        {
          id: "3",
          content: "Thanks! The new features are looking good.",
          user: {
            id: "3",
            full_name: "Jane Smith",
            avatar_url: undefined,
          },
          created_at: new Date(Date.now() - 900000).toISOString(),
        },
      ]

      setMessages(mockMessages)
    } catch (error) {
      console.error("Error fetching messages:", error)
      toast({
        title: "Error",
        description: "Failed to load messages",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || isSending) return

    setIsSending(true)
    try {
      const { data: user } = await supabase.auth.getUser()
      if (!user.user) throw new Error("Not authenticated")

      // Get user profile
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, avatar_url")
        .eq("id", user.user.id)
        .single()

      // In a real app, you would save to a messages table
      const newMsg: Message = {
        id: Date.now().toString(),
        content: newMessage,
        user: {
          id: user.user.id,
          full_name: profile?.full_name || "Unknown User",
          avatar_url: profile?.avatar_url,
        },
        created_at: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, newMsg])
      setNewMessage("")

      // Scroll to bottom
      setTimeout(() => {
        if (scrollAreaRef.current) {
          scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
        }
      }, 100)
    } catch (error) {
      console.error("Error sending message:", error)
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      })
    } finally {
      setIsSending(false)
    }
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">Team Chat</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-80 px-6" ref={scrollAreaRef}>
          {isLoading ? (
            <div className="space-y-4 py-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-start gap-3 animate-pulse">
                  <div className="w-8 h-8 bg-muted rounded-full" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded w-1/4" />
                    <div className="h-4 bg-muted rounded w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4 py-4">
              {messages.map((message) => (
                <div key={message.id} className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={message.user.avatar_url || "/placeholder.svg"} />
                    <AvatarFallback className="text-xs">{message.user.full_name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">{message.user.full_name}</span>
                      <span className="text-xs text-muted-foreground">{formatTime(message.created_at)}</span>
                    </div>
                    <div className="text-sm text-foreground break-words">{message.content}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        <div className="border-t p-4">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              disabled={isSending}
              className="flex-1"
            />
            <Button type="submit" size="sm" disabled={!newMessage.trim() || isSending}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  )
}
