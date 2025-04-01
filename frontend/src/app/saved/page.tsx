"use client"

import { useState } from "react"
import { Copy, Eye, Search, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import { ChatMessage } from "@/components/chat-message"

type SavedQuery = {
  id: string
  query: string
  response: string
  date: string
  expanded?: boolean
}

const initialQueries: SavedQuery[] = [
  {
    id: "1",
    query: "How do I use VLOOKUP?",
    response: `# How to use VLOOKUP

VLOOKUP is a function that searches for a value in the first column of a table and returns a value in the same row from another column.

## Syntax

\`\`\`
=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])
\`\`\`

## Parameters

- **lookup_value**: The value to search for in the first column of the table.
- **table_array**: The range of cells that contains the data.
- **col_index_num**: The column number in the table from which to retrieve the value.
- **range_lookup**: [Optional] TRUE = approximate match (default), FALSE = exact match.

## Example

\`\`\`
=VLOOKUP("Smith", A2:C20, 3, FALSE)
\`\`\`

This will look for "Smith" in the first column of the range A2:C20 and return the value from the 3rd column in the same row.`,
    date: "2023-06-15",
  },
  {
    id: "2",
    query: "How to create a pivot table?",
    response: "Detailed instructions for creating a pivot table in Excel...",
    date: "2023-06-10",
  },
  {
    id: "3",
    query: "Excel conditional formatting examples",
    response: "Various examples of conditional formatting in Excel...",
    date: "2023-06-05",
  },
]

export default function SavedPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [savedQueries, setSavedQueries] = useState<SavedQuery[]>(initialQueries)

  const filteredQueries = savedQueries.filter((query) => query.query.toLowerCase().includes(searchTerm.toLowerCase()))

  const toggleExpand = (id: string) => {
    setSavedQueries((prev) => prev.map((query) => (query.id === id ? { ...query, expanded: !query.expanded } : query)))
  }

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content)
    toast({
      title: "Copied to clipboard",
      description: "The content has been copied to your clipboard.",
    })
  }

  const deleteQuery = (id: string) => {
    setSavedQueries((prev) => prev.filter((query) => query.id !== id))
    toast({
      title: "Query deleted",
      description: "The saved query has been deleted.",
    })
  }

  return (
    <div className="container mx-auto p-4 pt-16 md:pt-4">
      <h1 className="mb-6 text-2xl font-bold">Saved Queries & History</h1>

      <div className="mb-4 flex items-center gap-2">
        <Search className="h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search saved queries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Query</TableHead>
              <TableHead>Response Preview</TableHead>
              <TableHead className="w-[120px]">Date</TableHead>
              <TableHead className="w-[120px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredQueries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No saved queries found.
                </TableCell>
              </TableRow>
            ) : (
              filteredQueries.map((query) => (
                <>
                  <TableRow
                    key={query.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => toggleExpand(query.id)}
                  >
                    <TableCell className="font-medium">{query.query}</TableCell>
                    <TableCell>{query.response.substring(0, 60)}...</TableCell>
                    <TableCell>{query.date}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleExpand(query.id)
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation()
                            copyToClipboard(query.response)
                          }}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteQuery(query.id)
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  {query.expanded && (
                    <TableRow>
                      <TableCell colSpan={4} className="p-0">
                        <div className="p-4">
                          <ChatMessage
                            message={{
                              id: query.id,
                              role: "assistant",
                              content: query.response,
                            }}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

