import { Suspense } from 'react'
import FormCreate from './_components/FormCreate'
import Header from './_components/Header'
import ProductTableSkeleton from './_components/ProductTableSkeleton'
import ProductListWrapper from './_components/ProductListWrapper'
import SearchBar from './_components/searchBar'

const ProductPage = async ({ searchParams, }: { searchParams: Promise<{ q: string }> }) => {
  const q = (await searchParams).q || "";

  return (
    <div className='p-10'>
      <Header />
      <h1 className='text-4xl font-bold mb-10 uppercase'>Product List</h1>
      <SearchBar />
      {/* Hanya mencoba suspense */}
      {/* Lebih baik menggunakan suspense jika multi-fetching saja */}
      <Suspense fallback={<ProductTableSkeleton />}>
        <ProductListWrapper query={q} />
      </Suspense>
      <FormCreate />
    </div>
  )
}

export default ProductPage