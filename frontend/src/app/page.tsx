"use client"
import { useEffect, useMemo, useState } from "react"
import axios from "axios"
import { Button } from "@/src/components/ui/button"
import type { User } from "@/src/application/populate-data"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table"
import Image from "next/image"
import { Skeleton } from "../components/ui/skeleton"
import { ProgressBar } from "../components/progress-bar"

const PAGE_SIZE = 10

export default function Home() {
  const formatPhone = (phone: string) => {
    const digits = phone.replace(/\D/g, "")
    if (digits.length !== 10) return phone
    const area = digits.slice(0, 3)
    const prefix = digits.slice(3, 6)
    const line = digits.slice(6)
    return `(${area}) ${prefix} ${line}`
  }

  const [users, setUsers] = useState<User[]>([])
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const fetchUsers = async () => {
    const { data } = await axios.post<User[]>("/api/execute")
    return data
  }

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(users.length / PAGE_SIZE)),
    [users.length]
  )

  const paginatedUsers = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    const end = start + PAGE_SIZE
    return users.slice(start, end)
  }, [users, page])

  useEffect(() => {
    let active = true

    const loadOnMount = async () => {
      setIsLoading(true)
      setPage(1)
      const users = await fetchUsers()
      if (!active) return
      setUsers(users)
      setIsLoading(false)
    }

    loadOnMount()

    return () => {
      active = false
    }
  }, [])

  const handleExecute = async () => {
    setIsLoading(true)
    setPage(1)
    const users = await fetchUsers()
    setUsers(users)
    setIsLoading(false)
  }

  const handleClear = async () => {
    setIsLoading(true)
    try {
      const { data } = await axios.post("/api/clear")
      if (data?.success) {
        setUsers([])
        setPage(1)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handlePreviousPage = () => {
    setPage((current) => Math.max(1, current - 1))
  }

  const handleNextPage = () => {
    setPage((current) => Math.min(totalPages, current + 1))
  }

  const handleSelectPage = (targetPage: number) => {
    setPage(targetPage)
  }

  const hasData = users.length > 0

  return (
    <main className="bg-white">
      <div className="container mx-auto py-8 px-6">
        <header className="flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between">
          <div>
            <Image
                src="/logo_2.svg"
                alt="evrly logo"
                width={120}
                height={48}
                className="w-[120px] h-[48px]"
              />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              type="button"
              variant="default"
              size="lg"
              onClick={handleExecute}
              className="min-w-[120px] rounded-full"
              disabled={isLoading}
            >
              Execute
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="lg"
              onClick={handleClear}
              className="min-w-[120px] rounded-full"
              disabled={isLoading && !hasData}
            >
              Clear
            </Button>
          </div>
        </header>

        <section className="space-y-4">

          <div className="space-y-2">
            <div className="w-full min-h-1.5">
              {isLoading && <ProgressBar />}
            </div>
            

            <div className="overflow-hidden rounded-2xl border border-border/60 bg-background/60">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-4">ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    Array.from({ length: 10 }).map((_, index) => (
                      <TableRow key={index}>
                        <TableCell className="pl-4">
                          <Skeleton className="h-4 w-12 my-[0.1rem]" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-24 my-[0.1em]" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-32 my-[0.1rem]" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-24 my-[0.1rem]" />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : paginatedUsers.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        className="h-24 text-center text-sm text-muted-foreground"
                      >
                        No users available. Click Execute to load workflow data.
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedUsers.map((contact) => (
                      <TableRow key={contact.id} className="text-gray-500 hover:text-foreground">
                        <TableCell className="pl-4">
                          {"#"+contact.id.toString()}
                        </TableCell>
                        <TableCell>{contact.nome}</TableCell>
                        <TableCell>
                          {contact.email}
                        </TableCell>
                        <TableCell>
                          {formatPhone(contact.phone)}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          <footer className="flex flex-col items-center justify-between gap-3 pt-1 text-xs text-muted-foreground md:flex-row md:text-sm">
            <div>
              Page{" "}
              <span className="font-medium text-foreground">{page}</span> of{" "}
              <span className="font-medium text-foreground">
                {totalPages}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handlePreviousPage}
                disabled={page === 1 || !hasData || isLoading}
                className="rounded-full px-3 py-1"
              >
                Previous
              </Button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, index) => {
                  const pageNumber = index + 1
                  const isActive = pageNumber === page

                  return (
                    <Button
                      key={pageNumber}
                      type="button"
                      variant={isActive ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleSelectPage(pageNumber)}
                      disabled={!hasData || isLoading}
                      className="size-8 rounded-full p-0 text-xs"
                    >
                      {pageNumber}
                    </Button>
                  )
                })}
              </div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={page === totalPages || !hasData || isLoading}
                className="rounded-full px-3 py-1"
              >
                Next
              </Button>
            </div>
          </footer>
        </section>
      </div>
    </main>
  )
}
