"use client"
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { categoryProducts, productInterface } from '@/schema/products-schema'
import { ImageIcon, Plus, X } from 'lucide-react'
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

  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      // Membuat URL sementara untuk ditampilkan di <img>
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  };

  const handleRemoveFile = () => {
    if (previewUrl) {
      // Membersihkan URL objek agar tidak membebani memori browser
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
  };



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
      <DialogContent className="sm:max-w-[425px] overflow-y-scroll max-h-[90vh]"
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
            <div className="grid gap-3">
              <Label>Your product image</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="p-2"
                name="image_url"
              />
              {previewUrl && selectedFile && (
                <div className="relative border rounded-md p-1">
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    className="absolute top-1 right-1 h-6 w-6 z-10 opacity-80"
                    onClick={handleRemoveFile}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={previewUrl}
                    alt={`Pratinjau ${selectedFile.name}`}
                    className="w-full h-[200px] object-cover object-bottom rounded-sm"
                  />
                  <p className="text-xs text-muted-foreground mt-2 truncate">
                    {selectedFile.name}
                  </p>
                </div>
              )}

              {!previewUrl && (
                <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-md text-center bg-gray-50/50">
                  <ImageIcon className="w-6 h-6 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Belum ada gambar dipilih</p>
                </div>
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