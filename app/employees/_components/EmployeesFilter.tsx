import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useParams, usePathname, useRouter } from 'next/navigation'
import React from 'react'

type EmployeeFilterType = {
  search: string;
  sort: string;
}

const EmployeesFilter = ({ search, sort }: EmployeeFilterType) => {
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()

  function updateParams(key: string, value: string) {
    const newParams = new URLSearchParams(params.toString())
    newParams.set(key, value);
    router.push(`${pathname}?${newParams.toString()}`)
  }

  return (
    <div className="flex items-center gap-3">
      <Input
        placeholder="Search name..."
        defaultValue={search}
        onChange={(e) => updateParams("search", e.target.value)}
        className="w-64"
      />

      <Select defaultValue={sort} onValueChange={(v) => updateParams("sort", v)}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name-asc">Name ↑</SelectItem>
          <SelectItem value="name-desc">Name ↓</SelectItem>
          <SelectItem value="date-desc">Newest</SelectItem>
          <SelectItem value="date-asc">Oldest</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export default EmployeesFilter