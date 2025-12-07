"use client"
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React, { useCallback, useState } from 'react'
import { deleteProduct } from '../delete/actions'
import Link from 'next/link'
import { ProductsType } from '@/lib/type'
import { Edit } from 'lucide-react'
import FormUpdate from './FormUpdate'
import Image from 'next/image'

const SkeletonImage = () => {
  return (
    <div className='w-full h-[100px] animate-pulse bg-gray-200 rounded-md'>
      <div className='flex justify-center items-center h-full w-full'>
        <p className='font-mono'>No Image</p>
      </div>
    </div>
  )
}

const SectionImage = ({ name, url }: { name: string, url: string }) => {
  return (
    <div >
      <Image
        alt={name}
        src={url}
        fill={true}
        className='object-cover rounded-md'
        sizes="(max-width: 768px) 100vw, 33vw"
      />    </div>
  )
}

const CardProduct = ({ product, handleOpen }: { product: ProductsType, handleOpen: () => void }) => {
  if (!product) return <p>Product undefined</p>;

  return (
    <Card className='relative gap-2'>
      <Button className='absolute top-2 right-2 cursor-pointer rounded-full bg-amber-600 z-10' size="icon-sm" onClick={handleOpen}>
        <Edit />
      </Button>
      <CardHeader>
        <div className='w-full h-[100px] rounded-md relative'>
          {product.image_url ? <SectionImage url={product.image_url} name={product.slug_product} /> : <SkeletonImage />}
        </div>
      </CardHeader>
      <CardContent className='flex flex-col gap-2'>
        <CardTitle>{product.name.slice(0, 20)}...</CardTitle>
        <CardDescription className='flex flex-col gap-1'>
          <b>Rp.{product.price}</b>
          <span>
            {product.description.slice(0, 20)}...
          </span>
        </CardDescription>
        <CardAction className='flex flex-row gap-2'>
          <Button className='bg-emerald-600 cursor-pointer p-0 h-fit'>
            <Link className='py-2 px-3' href={`/product/${product.slug_product}?id=${product.id}`} >Detail</Link>
          </Button>
          <Button variant="destructive" className='cursor-pointer' onClick={() => deleteProduct(product.id)}>Delete</Button>
        </CardAction>
      </CardContent>
    </Card>
  )
}

const ProductList = ({ products }: { products: ProductsType[] }) => {

  const [openId, setOpenId] = useState<string | number | undefined | null>(null);

  // const handleOpen = (id: string | number) => {
  //   console.log('open drawer', id);
  //   setOpenId(id)
  // };
  const handleOpen = (id: string | number) => {
    console.log('open drawer - ID:', id);

    setOpenId(null);

    setTimeout(() => {
      setOpenId(id);
    }, 0);
  };

  console.log('Current openId:', openId, 'Prop open:', !!openId);

  const handleOpenChange = useCallback((openState: boolean) => {
    if (openState === false) {
      setOpenId(null);
    }
  }, [setOpenId]);

  const product = products.find((product: ProductsType) => product.id === openId);

  return (
    <div className='grid sm:grid-cols-3 gap-4 pt-5 lg:grid-cols-4 xl:grid-cols-5'>
      {products.map((product: ProductsType) => {
        return (
          <div key={product.id} className='w-full'>
            <CardProduct product={product} handleOpen={() => handleOpen(product.id)} />
          </div>
        )
      }
      )}

      <FormUpdate open={!!openId} onOpenChange={handleOpenChange} product={product} />
    </div>
  )
}

export default ProductList