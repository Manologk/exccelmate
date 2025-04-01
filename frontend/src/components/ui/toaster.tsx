"use client"

import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

export function Toaster({ ...props }: ToasterProps) {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg animate-slide-in-right transition-all duration-200",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground transition-all duration-200 hover:scale-105 active:scale-95",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground transition-all duration-200 hover:scale-105 active:scale-95",
        },
      }}
      {...props}
    />
  )
} 