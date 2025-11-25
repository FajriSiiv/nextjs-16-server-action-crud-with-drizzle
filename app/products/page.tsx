import React from 'react'
import ProductList from './_components/ProductList'
import FormCreate from './_components/FormCreate'

async function getProducts() {
  const results = await fetch('http://localhost:3000/api/product', {
    cache: 'no-store'
  })

  return results.json()
}

const ProductPage = async () => {

  const products = await getProducts()

  return (
    <div className='p-10'>
      <h1 className='text-4xl font-bold mb-10 uppercase'>Product List</h1>
      <ProductList products={products} />
      <FormCreate />
    </div>
  )
}

export default ProductPage