'use client'

import ProductCard from '@/components/ProductCard'
import { usePetStore } from '@/store/petStore'
import { useProducts } from '@/hooks/useProducts'

export default function TopSelling() {
  const petType = usePetStore(state => state.petType)
  const { products: topSelling, loading } = useProducts({ petType: petType || undefined, limit: 12, sortBy: 'popularity' })
  
  return (
    <section className="w-full py-10">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Top-Selling Products</h2>

        <button className="bg-[#1F2E46] text-white text-sm px-4 py-2 rounded-full">
          See All →
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {loading ? <p className="text-gray-500 col-span-full">Loading...</p> : topSelling.map((product, i) => (
          <ProductCard key={product.id || product._id || i} product={product} />
        ))}
      </div>
    </section>
  )
}
