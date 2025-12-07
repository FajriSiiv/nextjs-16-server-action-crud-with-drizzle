import { Button } from '@/components/ui/button'
import { ProductsType } from '@/lib/type'
import Image from 'next/image';
import Link from 'next/link'
import React from 'react'

async function getProduct(id: string | undefined, slug: string) {
  const urlHttp = process.env.NEXT_PUBLIC_SITE_URL;

  const result = await fetch(`${urlHttp}/api/product/${slug}?id=${id}`, {
    cache: 'no-store'
  }).then((res) => res.json())

  const product = result.data[0]

  return product
}

const ProductDetail = async ({ params, searchParams, }: { params: Promise<{ productId: string }>, searchParams: Promise<{ id?: string }> }) => {
  const { productId } = await params;
  const { id } = await searchParams;
  const product: ProductsType = await getProduct(id, productId)
  return (
    <div className='w-3/4 mx-auto py-10 '>
      <Button variant='link' className='p-0 h-fit mb-10'>
        <Link href={'/product'}>Kembali</Link>
      </Button>
      <div className='flex flex-col gap-5'>
        <h1 className='text-4xl font-bold font-mono'>{product.name}</h1>
        <Image src={product.image_url} width={400} height={300} className='object-cover rounded-md' alt={product.slug_product} />
        <div className='flex flex-col'>
          <p>description : {product.description}</p>
          <b>price : Rp.{product.price}</b>
          <p>category : {product.category}</p>
        </div>

      </div>
    </div>
  )
}

export default ProductDetail