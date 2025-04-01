"use client"

import { useState } from "react"
import { Copy, Edit, Save, Check, User, Bot } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import ReactMarkdown from "react-markdown"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
}

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content)
    setCopied(true)
    toast({
      title: "Copied to clipboard",
      description: "The message has been copied to your clipboard.",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const saveResponse = () => {
    toast({
      title: "Response saved",
      description: "The response has been saved to your collection.",
    })
  }

  const editResponse = () => {
    toast({
      title: "Edit mode",
      description: "You can now edit the response.",
    })
  }

  return (
    <div className={cn(
      "group relative flex w-full gap-3 px-4 py-3",
      message.role === "user" ? "justify-end" : "justify-start"
    )}>
      {/* Avatar */}
      <div className={cn(
        "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full",
        message.role === "user" 
          ? "order-2 bg-blue-500 text-white" 
          : "order-1 bg-purple-500 text-white"
      )}>
        {message.role === "user" ? (
          <User className="h-4 w-4" />
        ) : (
          <Bot className="h-4 w-4" />
        )}
      </div>

      {/* Message Content */}
      <div className={cn(
        "relative flex max-w-[85%] flex-col gap-2 rounded-2xl px-4 py-2",
        message.role === "user" 
          ? "bg-blue-500 text-white" 
          : "bg-purple-100 dark:bg-purple-950 text-purple-900 dark:text-purple-100"
      )}>
        {/* Message Actions */}
        <div className={cn(
          "absolute -right-2 -top-2 flex items-center gap-1 rounded-full bg-background p-1 shadow-sm opacity-0 transition-opacity",
          "group-hover:opacity-100"
        )}>
          {message.role === "assistant" && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 hover:bg-muted"
                onClick={copyToClipboard}
                title="Copy to clipboard"
              >
                {copied ? (
                  <Check className="h-3 w-3 text-green-500" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 hover:bg-muted"
                onClick={editResponse}
                title="Edit response"
              >
                <Edit className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 hover:bg-muted"
                onClick={saveResponse}
                title="Save response"
              >
                <Save className="h-3 w-3" />
              </Button>
            </>
          )}
        </div>

        {/* Message Text */}
        <div className={cn(
          "prose prose-sm dark:prose-invert max-w-none",
          message.role === "user" ? "prose-invert" : ""
        )}>
          {message.role === "assistant" ? (
            <ReactMarkdown
              components={{
                pre: ({ node, ...props }) => (
                  <div className="my-2 overflow-auto rounded-md bg-purple-200/50 dark:bg-purple-900/50 p-2">
                    <pre {...props} />
                  </div>
                ),
                code: ({ node, ...props }) => (
                  <code className="rounded-md bg-purple-200/50 dark:bg-purple-900/50 px-1 py-0.5" {...props} />
                ),
                p: ({ node, ...props }) => (
                  <p className="leading-relaxed" {...props} />
                ),
                ul: ({ node, ...props }) => (
                  <ul className="my-2 ml-4 list-disc" {...props} />
                ),
                ol: ({ node, ...props }) => (
                  <ol className="my-2 ml-4 list-decimal" {...props} />
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          ) : (
            <p className="leading-relaxed">{message.content}</p>
          )}
        </div>

        {/* Timestamp */}
        <div className={cn(
          "text-xs opacity-70",
          message.role === "user" 
            ? "text-blue-100" 
            : "text-purple-600 dark:text-purple-400"
        )}>
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  )
}

