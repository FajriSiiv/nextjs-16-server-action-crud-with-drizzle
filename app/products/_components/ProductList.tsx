"use client"
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React, { useState } from 'react'
import { deleteProduct } from '../delete/actions'
import Link from 'next/link'
import { ProductsType } from '@/lib/type'
import { Edit } from 'lucide-react'
import FormUpdate from './FormUpdate'

const CardProduct = ({ product, handleOpen }: { product: ProductsType, handleOpen: () => void }) => {
  if (!product) return <p>Product undefined</p>;

  return (
    <Card className='relative'>
      <Button className='absolute top-2 right-2 cursor-pointer rounded-full bg-amber-600' size="icon-sm" onClick={handleOpen}>
        <Edit />
      </Button>
      <CardHeader className='flex flex-col gap-2'>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription className='flex flex-col gap-1'>
          <b>Rp.{product.price}</b>
          <span>
            {product.description}
          </span>
        </CardDescription>
        <CardAction className='flex flex-row gap-2'>
          <Button className='bg-emerald-600 cursor-pointer p-0 h-fit'>
            <Link className='py-2 px-3' href={`/products/${product.slug_product}?id=${product.id}`} >Detail</Link>
          </Button>
          <Button variant="destructive" className='cursor-pointer' onClick={() => deleteProduct(product.id)}>Delete</Button>
        </CardAction>
      </CardHeader>
    </Card>
  )
}

const ProductList = ({ products }: { products: ProductsType[] }) => {

  const [openId, setOpenId] = useState<string | number | undefined | null>(null);

  const handleOpen = (id: string | number) => setOpenId(id);
  const handleClose = () => setOpenId(null);

  const product = products.find((product: ProductsType) => product.id === openId);

  return (
    <div className='grid grid-cols-5 gap-4 pt-5'>
      {products.map((product: ProductsType) => {
        return (
          <div key={product.id} className='w-full'>
            <CardProduct product={product} handleOpen={() => handleOpen(product.id)} />
          </div>
        )
      }
      )}

      <FormUpdate open={!!openId} onOpenChange={handleClose} product={product} />
    </div>
  )
}

export default ProductList