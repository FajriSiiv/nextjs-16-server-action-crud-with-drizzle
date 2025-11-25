"use client"
import GetEmployee from './_components/GetEmployee'
import FormEmployee from './_components/Form'
import { EmployeesType } from '@/lib/type'

type EmployeeType = {
  employees: EmployeesType[];
  page: number;
  totalPages: number;
  limit: number;
}


const EmployeesData = ({ employees, page, totalPages, limit }: EmployeeType) => {
  const prevPage = page > 1 ? page - 1 : 1;
  const nextPage = page < totalPages ? page + 1 : totalPages;


  return (
    <div className="flex flex-col items-center gap-5 justify-center h-screen w-full">
      <GetEmployee employees={employees} />
      <div className="flex gap-2">
        <a
          href={`?page=${prevPage}&limit=${limit}`}
          className={`px-3 py-1 border rounded ${page === 1 ? "opacity-50 pointer-events-none" : ""}`}
        >
          Prev
        </a>

        <span className="px-3 py-1 border rounded">{page}</span>

        <a
          href={`?page=${nextPage}&limit=${limit}`}
          className={`px-3 py-1 border rounded ${page === totalPages ? "opacity-50 pointer-events-none" : ""}`}
        >
          Next
        </a>
      </div>

      <div className="flex flex-col gap-2">
        <FormEmployee />
      </div>
    </div>
  )
}

export default EmployeesData