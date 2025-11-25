
"use client"
import React, { useActionState, useEffect, useOptimistic, useState, useTransition } from 'react'
import { deleteEmployee, updateEmployee } from '../actions'
import { Input } from '@/components/ui/input';
import { SubmitButtonLoading } from '@/components/button/SubmitButton';
import { EmployeesType } from '@/lib/type';
import { SubmitButtonDelete } from './SubmitButtonDelete';
import { showToast } from '@/lib/toast';


const GetEmployee = ({ employees }: { employees: EmployeesType[] }) => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [state, formAction] = useActionState(updateEmployee, {
    success: false,
    message: "",
    errors: null,
  })
  const [isPending, startTransition] = useTransition()

  const [optimisticEmployees, updateOptimistic] = useOptimistic(employees, (state, deleteId: number) => state.filter((emp: EmployeesType) => emp.id !== deleteId))

  return (
    <div className='flex flex-col gap-2'>
      {optimisticEmployees.map((employee: EmployeesType) => (
        <div key={employee.id} className='flex flex-row gap-2'>
          <form action={formAction} className="flex gap-2">
            <Input type="hidden" name="id" value={employee.id} />

            <Input
              name="name"
              defaultValue={employee.name}
              className=" px-2 py-1"
            />
            <SubmitButtonLoading className='bg-emerald-600' text='Save' />

          </form>
          <Input type="hidden" name="id" value={employee.id} />
          <SubmitButtonDelete onclick={async () => {
            setActiveId(employee.id);

            try {
              startTransition(() => { updateOptimistic(employee.id); deleteEmployee(employee.id); });
              showToast("Successfully deleted employee", "error");
            } catch (err) {
              showToast("Failed to delete employee", "error");
            }
          }
          } text='Delete' variants='destructive' loading={activeId === employee.id && isPending} />
        </div>

      ))}

    </div>
  )
}

export default GetEmployee