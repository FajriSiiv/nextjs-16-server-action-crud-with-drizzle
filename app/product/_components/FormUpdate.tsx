"use client"
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { categoryProducts } from '@/schema/products-schema'
import React, { useActionState, useEffect, useRef, useState } from 'react'
import { updateProduct } from '../update/actions'
import { ProductsType } from '@/lib/type'

const FormUpdate = ({ open, onOpenChange, product }: { open: boolean | undefined, onOpenChange: (open: boolean) => void; product: ProductsType | undefined }) => {


  const ref = useRef<HTMLFormElement>(null);
  const [category, setCategory] = useState<string>("");
  const [state, formAction] = useActionState(updateProduct, {
    success: false,
    message: "",
    errors: [],
  })

  useEffect(() => {
    if (open && product) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCategory(product.category);
      // console.log("Product category:", product.category)

    }

  }, [open, product]);


  useEffect(() => {

    if (state.success) {
      onOpenChange(false)
    }
  }, [state.success])

  if (!product) return null;

  return (
    <Dialog key={product?.id} open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] "
        onEscapeKeyDown={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <form ref={ref} action={formAction} className=''>
          <DialogHeader>
            <DialogTitle>Update Product</DialogTitle>
            <DialogDescription>
              Fill all form to make update product
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <Input type="hidden" name="id" value={product.id} />
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" defaultValue={product.name} />
              {state.errors?.name && (
                <p className="text-red-600 text-sm">{state.errors.name}</p>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description-1">Description</Label>
              <Input id="description-1" name="description" defaultValue={product.description} />
              {state.errors?.description && (
                <p className="text-red-600 text-sm">{state.errors.description}</p>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="Category-1">Cateogry</Label>
              <Select value={category} onValueChange={(value) => setCategory(value)} >
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
              <Input type="hidden" name="category" value={category ?? ""} />
              {state.errors?.category && (
                <p className="text-red-600 text-sm">{state.errors.category}</p>
              )}
            </div>

            <div className="grid gap-3">
              <Label htmlFor="price-1">Price</Label>
              <Input id="price-1" name="price" min={1} defaultValue={product.price} />
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

export default FormUpdate