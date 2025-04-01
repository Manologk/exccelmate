"use client"

import { Button } from "@/components/ui/button"
import { Calculator, FileSpreadsheet, Table2, Terminal, Wand2 } from "lucide-react"

const actions = [
  {
    label: "Generate VBA Script",
    icon: Terminal,
    action: () => alert("Generate VBA Script action"),
  },
  {
    label: "Fix Formula Errors",
    icon: Calculator,
    action: () => alert("Fix Formula Errors action"),
  },
  {
    label: "Create Pivot Table",
    icon: Table2,
    action: () => alert("Create Pivot Table action"),
  },
  {
    label: "Data Cleaning",
    icon: Wand2,
    action: () => alert("Data Cleaning action"),
  },
  {
    label: "Excel Templates",
    icon: FileSpreadsheet,
    action: () => alert("Excel Templates action"),
  },
]

export function QuickActions() {
  return (
    <div className="space-y-2">
      <h2 className="text-sm font-medium text-muted-foreground">Quick Actions</h2>
      <div className="flex flex-wrap gap-2">
        {actions.map((action) => (
          <Button key={action.label} variant="outline" size="sm" className="h-9" onClick={action.action}>
            <action.icon className="mr-2 h-4 w-4" />
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  )
}

