"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useRef, useState } from 'react'
import { searchProduct } from '../update/actions'
import { useRouter, useSearchParams } from 'next/navigation'

const SearchBar = () => {
  const ref = useRef(null)
  const [query, setQuery] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()

  const hasQuery = Boolean(searchParams.get("q"))

  const handleReset = () => {
    setQuery("")
    router.replace('/product')
  }

  return (
    <form ref={ref} onSubmit={(e) => {
      e.preventDefault()
      searchProduct(new FormData(e.currentTarget))
    }} className="flex w-full max-w-sm items-center gap-2">
      <Input name='query' type="text" placeholder="Search product.." value={query} onChange={e => setQuery(e.target.value)} />
      {hasQuery ? (
        <Button type="button" onClick={handleReset} variant="outline">
          Reset
        </Button>
      ) : (
        <Button type="submit" variant="outline">
          Submit
        </Button>
      )}
    </form>
  )
}

export default SearchBar