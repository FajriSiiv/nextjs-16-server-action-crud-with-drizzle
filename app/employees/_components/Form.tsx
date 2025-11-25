"use client"
import React, { useActionState, useEffect, useRef, useState } from 'react'
import { createEmployee } from '../actions';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { SubmitButtonLoading } from '@/components/button/SubmitButton';
import { showToast } from '@/lib/toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const FormEmployee = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLFormElement>(null);


  const [state, formAction] = useActionState(createEmployee, {
    success: false,
    message: "",
    errors: null,
  });


  useEffect(() => {
    if (state.success) {
      showToast("Successfully created employee", "success");
    } else if (state.errors) {
      showToast("Failed to created employee", "error");
    }
  }, [state.success, state.errors]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Employee</Button>
      </DialogTrigger>

      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Add Employee</DialogTitle>
        </DialogHeader>
        <form
          ref={ref}
          action={formAction}
          className='flex flex-col gap-3 w-full'
        >
          <div className='flex flex-col gap-1.5'>
            <Label htmlFor="name">Your Name </Label>
            <Input placeholder='name..' name='name' type="text" />
          </div>
          <div className='flex flex-col gap-1.5'>
            <Label htmlFor="position">Your Position</Label>
            <Input placeholder='name..' name='position' type="text" />
          </div>
          <SubmitButtonLoading variants="default" text='Create Employee' type='submit' />
        </form>
      </DialogContent>
    </Dialog>

  )
}

export default FormEmployee