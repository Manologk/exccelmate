"use client"

import { useState, useCallback } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

type Template = {
  id: string
  title: string
  description: string
  icon: string
}

const templates: Template[] = [
  {
    id: "1",
    title: "Data Cleaning",
    description: "Templates for cleaning and preparing data for analysis",
    icon: "🧹",
  },
  {
    id: "2",
    title: "Financial Modeling",
    description: "Templates for financial analysis and forecasting",
    icon: "📊",
  },
  {
    id: "3",
    title: "Project Management",
    description: "Templates for tracking projects and tasks",
    icon: "📋",
  },
  {
    id: "4",
    title: "Dashboard Creation",
    description: "Templates for creating interactive dashboards",
    icon: "📈",
  },
  {
    id: "5",
    title: "Data Visualization",
    description: "Templates for creating charts and graphs",
    icon: "📉",
  },
  {
    id: "6",
    title: "Budget Planning",
    description: "Templates for personal and business budgeting",
    icon: "💰",
  },
  {
    id: "7",
    title: "Inventory Management",
    description: "Templates for tracking inventory and stock",
    icon: "📦",
  },
  {
    id: "8",
    title: "Sales Tracking",
    description: "Templates for tracking sales and revenue",
    icon: "💼",
  },
]

export default function TemplatesPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredTemplates = templates.filter(
    (template) =>
      template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const useTemplate = useCallback(
    (template: Template) => {
      toast({
        title: `Template: ${template.title}`,
        description: "Template has been applied to your workspace.",
      })
    },
    [toast],
  )

  return (
    <div className="container mx-auto p-4 pt-16 md:pt-4">
      <h1 className="mb-6 text-2xl font-bold">Pre-Built Templates</h1>

      <div className="mb-6 flex items-center gap-2">
        <Search className="h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search templates..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="overflow-hidden">
            <CardHeader className="bg-primary/5 pb-2">
              <div className="mb-2 text-3xl">{template.icon}</div>
              <CardTitle>{template.title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-sm text-muted-foreground">{template.description}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => useTemplate(template)}>
                Use Template
              </Button>
            </CardFooter>
          </Card>
        ))}

        {filteredTemplates.length === 0 && (
          <div className="col-span-full text-center">
            <p className="text-muted-foreground">No templates found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}

