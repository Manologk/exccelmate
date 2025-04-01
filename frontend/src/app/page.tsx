"use client"

import type React from "react"

import { useState } from "react"
import { FileUp, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { QuickActions } from "@/components/quick-actions"
import { ChatMessage } from "@/components/chat-message"
import { FileSpreadsheet } from "lucide-react"
import { excelApi } from "@/lib/api"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
}

export default function Home() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() === "") return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setError(null)

    try {
      const response = await excelApi.query(input)
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
      }
      
      setMessages((prev) => [...prev, assistantMessage])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process query')
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I apologize, but I encountered an error processing your query. Please try again.",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileUpload = () => {
    // File upload logic would go here
    alert("File upload functionality would be implemented here")
  }

  return (
    <div className="container mx-auto flex h-screen flex-col p-4 pt-16 md:pt-4">
      <div className="mb-4">
        <QuickActions />
      </div>

      <div className="flex-1 overflow-y-auto rounded-lg border p-4">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <FileSpreadsheet className="mb-4 h-16 w-16 text-muted-foreground" />
            <h2 className="mb-2 text-2xl font-bold">Excel Assistant</h2>
            <p className="mb-4 max-w-md text-muted-foreground">
              Ask anything about Excel formulas, data analysis, VBA scripts, or any other Excel-related questions.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && (
              <Card className="p-4">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 animate-pulse rounded-full bg-primary"></div>
                  <div className="h-3 w-3 animate-pulse rounded-full bg-primary"></div>
                  <div className="h-3 w-3 animate-pulse rounded-full bg-primary"></div>
                  <span className="text-sm text-muted-foreground">Generating response...</span>
                </div>
              </Card>
            )}
            {error && (
              <Card className="p-4 bg-red-50 border-red-200">
                <p className="text-sm text-red-600">{error}</p>
              </Card>
            )}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything about Excel (e.g., 'How do I use VLOOKUP?')"
          className="flex-1"
        />
        <Button type="button" variant="outline" onClick={handleFileUpload}>
          <FileUp className="h-4 w-4" />
        </Button>
        <Button type="submit" disabled={isLoading}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  )
}

