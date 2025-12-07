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
import { ImageIcon, X } from 'lucide-react'

// interface UpdateFormProps {
//   product: ProductsType;
//   state: any;
// }

const FormUpdate = ({ open, onOpenChange, product }: { open: boolean | undefined, onOpenChange: (open: boolean) => void; product: ProductsType | undefined }) => {

  const ref = useRef<HTMLFormElement>(null);
  const [category, setCategory] = useState<string>("");
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [state, formAction] = useActionState(updateProduct, {
    success: false,
    message: "",
    errors: {},
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setSelectedFile(file);
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(file);

    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(product?.image_url || null);
    }
  };

  const handleRemoveFile = () => {
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    const fileInput = ref.current?.querySelector('input[name="image_file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  useEffect(() => {
    if (open && product) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCategory(product.category);
      setPreviewUrl(product.image_url || null);
      setSelectedFile(null);
    } else {
      setSelectedFile(null);
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    }

  }, [open, product]);

  useEffect(() => {
    if (state?.success) {
      onOpenChange(false);
    }
  }, [state?.success, onOpenChange]);

  if (!product) return null;



  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[805px] overflow-y-scroll max-h-[90vh]"
        onEscapeKeyDown={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <form ref={ref} action={formAction}>
          <DialogHeader>
            <DialogTitle>Update Product</DialogTitle>
            <DialogDescription>
              Fill all form to make update product
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <Input type="hidden" name="id" value={product.id} />
            <Input type="hidden" name="existing_image_url" value={product.image_url || ''} />
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" defaultValue={product.name} />
              {state?.errors?.name && (
                <p className="text-red-600 text-sm">{state.errors.name}</p>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description-1">Description</Label>
              <Input id="description-1" name="description" defaultValue={product.description} />
              {state?.errors?.description && (
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
              {state?.errors?.category && (
                <p className="text-red-600 text-sm">{state.errors.category}</p>
              )}
            </div>

            <div className="grid gap-3">
              <Label htmlFor="price-1">Price</Label>
              <Input id="price-1" name="price" min={1} defaultValue={product.price} />
              {state?.errors?.price && (
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
                name="image_file"
              />
              {previewUrl && (
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
                    alt={`Pratinjau `}
                    className="w-full h-[200px] object-cover object-bottom rounded-sm"
                  />
                  <p className="text-xs text-muted-foreground mt-2 truncate">
                    {selectedFile
                      ? selectedFile.name
                      : `Gambar Lama: ${product.image_url ? product.image_url.substring(0, 50) + '...' : 'Tidak ada gambar lama'}`}
                  </p>
                </div>
              )}

              {!previewUrl && (
                <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-md text-center bg-gray-50/50">
                  <ImageIcon className="w-6 h-6 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Belum ada gambar dipilih</p>
                </div>
              )}
              {state?.errors?.image_file && (
                <p className="text-red-600 text-sm">{state.errors?.image_file}</p>
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