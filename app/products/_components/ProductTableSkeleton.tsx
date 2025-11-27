import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const CardSkeleton = () => {
  return (
    <Card className='min-h-[150px] flex flex-col p-5 gap-2'>
      <Skeleton className='h-3 w-full' />
      <Skeleton className='h-3 w-[75%]' />
      <Skeleton className='h-3 w-full' />
      <div className='flex gap-3'>
        <Skeleton className='h-10 w-20' />
        <Skeleton className='h-10 w-20' />
      </div>
    </Card>
  )
}

const ProductTableSkeleton = () => {
  return (
    <div className='grid grid-cols-5 gap-4'>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  )
}

export default ProductTableSkeleton