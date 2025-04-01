"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"

type HistoryItem = {
  id: string
  query: string
  date: string
  time: string
}

const historyItems: HistoryItem[] = [
  {
    id: "1",
    query: "How do I use VLOOKUP?",
    date: "2023-06-15",
    time: "14:30",
  },
  {
    id: "2",
    query: "How to create a pivot table?",
    date: "2023-06-15",
    time: "10:15",
  },
  {
    id: "3",
    query: "Excel conditional formatting examples",
    date: "2023-06-14",
    time: "16:45",
  },
  {
    id: "4",
    query: "How to use INDEX MATCH instead of VLOOKUP",
    date: "2023-06-14",
    time: "09:20",
  },
  {
    id: "5",
    query: "Excel shortcuts for productivity",
    date: "2023-06-13",
    time: "11:05",
  },
  {
    id: "6",
    query: "How to create a dynamic chart in Excel",
    date: "2023-06-12",
    time: "15:30",
  },
  {
    id: "7",
    query: "Excel data validation examples",
    date: "2023-06-11",
    time: "13:45",
  },
  {
    id: "8",
    query: "How to use SUMIFS function",
    date: "2023-06-10",
    time: "10:00",
  },
]

export default function HistoryPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [history, setHistory] = useState<HistoryItem[]>(historyItems)

  const filteredHistory = history.filter((item) => item.query.toLowerCase().includes(searchTerm.toLowerCase()))

  const clearHistory = () => {
    setHistory([])
    toast({
      title: "History cleared",
      description: "Your search history has been cleared.",
    })
  }

  const repeatQuery = (query: string) => {
    toast({
      title: "Query repeated",
      description: `"${query}" has been sent to the assistant.`,
    })
    // In a real app, this would navigate to the chat page and submit the query
  }

  return (
    <div className="container mx-auto p-4 pt-16 md:pt-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Search History</h1>
        <Button variant="outline" onClick={clearHistory}>
          Clear History
        </Button>
      </div>

      <div className="mb-4 flex items-center gap-2">
        <Search className="h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search history..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60%]">Query</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredHistory.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No history found.
                </TableCell>
              </TableRow>
            ) : (
              filteredHistory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.query}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.time}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => repeatQuery(item.query)}>
                      Repeat Query
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

