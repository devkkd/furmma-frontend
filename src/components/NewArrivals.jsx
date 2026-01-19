'use client'

import ProductCard from '@/components/ProductCard'
import { products } from '@/data/products'
import { usePetStore } from '@/store/petStore'

export default function Arrivals() {
  const petType = usePetStore(state => state.petType)

  const arrivals = products
  .filter(p => !petType || p.petType.includes(petType))
  .slice(0, 12)

  return (
    <section className="w-full py-10">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">New Arrivals</h2>

        <button className="bg-[#1F2E46] text-white text-sm px-4 py-2 rounded-full">
          See All →
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {arrivals.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
