'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaStar, FaRegHeart } from 'react-icons/fa'
import { useCartStore } from '@/store/cartStore'

export default function ProductCard({ product }) {
  const router = useRouter()
  const addItem = useCartStore((s) => s.addItem)
  const rating = Math.floor(Number(product.rating) || 0)

  const handleAdd = (e) => {
    e.preventDefault()
    addItem(product)
    router.push('/cart')
  }

  return (
    <Link href={`/shop/product_details/${product.id}`}>
      <div className="bg-white text-black rounded-xl p-3 flex flex-col justify-around hover:shadow-md transition cursor-pointer">

        <div className="relative flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="h-[180px] object-contain"
          />
          <button
            className="absolute top-2 right-2"
            onClick={(e) => e.preventDefault()}
          >
            <FaRegHeart className="text-gray-500 text-sm" />
          </button>
        </div>

        <p className="mt-2 text-sm font-medium leading-snug line-clamp-2">
          {product.name}
        </p>

        <div className="flex items-center gap-1 mt-1">
          {[...Array(rating)].map((_, i) => (
            <FaStar key={i} className="text-yellow-400 text-xs" />
          ))}
          <span className="text-xs text-gray-500 ml-1">
            ({product.reviews?.length || 0})
          </span>
        </div>

        <div className="flex items-center justify-between gap-2 mt-2">
          <span className="text-base font-semibold">₹{product.price}</span>
          {product.oldPrice != null && (
            <span className="text-sm text-gray-400 line-through">
              ₹{product.oldPrice}
            </span>
          )}
        </div>

        <button
          className="mt-2 w-full border border-gray-300 rounded-xl py-2 text-sm font-medium hover:bg-black hover:text-white transition"
          onClick={handleAdd}
        >
          ADD
        </button>

      </div>
    </Link>
  )
}
