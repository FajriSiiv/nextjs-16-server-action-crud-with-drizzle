"use client"
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { categoryProducts, productInterface } from '@/schema/products-schema'
import { Plus } from 'lucide-react'
import React, { useActionState, useRef, useState } from 'react'
import { createProduct } from '../create/actions'

const FormCreate = () => {
  const ref = useRef<HTMLFormElement>(null);
  const [category, setCategory] = useState("");
  const [openForm, setOpenForm] = useState(false)

  const [state, formAction] = useActionState(async (prev: productInterface, formData: FormData) => {
    const result = await createProduct(prev, formData);

    if (result.success) {
      setOpenForm(false);
    }

    return result;
  }, {
    success: false,
    message: "",
    errors: null,
  })



  return (
    <Dialog open={openForm} onOpenChange={(value) => setOpenForm(value)}>
      <DialogTrigger asChild className='absolute bottom-10 right-10'>
        <Button variant="outline" size="lg" aria-label="Submit" className='flex flex-row items-center justify-center'>
          <Plus /> Create
        </Button>
      </DialogTrigger>
      {state.success && (
        <p className="text-green-600 text-sm mb-2">{state.message}</p>
      )}
      <DialogContent className="sm:max-w-[425px] "
        onEscapeKeyDown={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <form ref={ref} action={formAction} className=''>
          <DialogHeader>
            <DialogTitle>Create New Product</DialogTitle>
            <DialogDescription>
              Fill all form to make new product
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" defaultValue="Jambu" />
              {state.errors?.name && (
                <p className="text-red-600 text-sm">{state.errors.name}</p>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description-1">Description</Label>
              <Input id="description-1" name="description" defaultValue="Description product" />
              {state.errors?.description && (
                <p className="text-red-600 text-sm">{state.errors.description}</p>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="Category-1">Cateogry</Label>
              <Select onValueChange={(value) => setCategory(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    {categoryProducts.map((category, index) => (
                      <SelectItem value={category} key={index} className='capitalize'>{category}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Input type="hidden" name="category" value={category} />

            </div>
            {state.errors?.category && (
              <p className="text-red-600 text-sm">{state.errors.category}</p>
            )}
            <div className="grid gap-3">
              <Label htmlFor="price-1">Price</Label>
              <Input id="price-1" name="price" min={1} />
              {state.errors?.price && (
                <p className="text-red-600 text-sm">{state.errors.price}</p>
              )}
            </div>
          </div>
          <DialogFooter className='pt-5'>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button className='bg-emerald-600 cursor-pointer' type="submit">Save Product</Button>
          </DialogFooter>
        </form>
      </DialogContent>

    </Dialog>
  )
}

export default FormCreate