'use client'

import Link from 'next/link'
import { FaStar, FaRegHeart } from 'react-icons/fa'

export default function ProductCard({ product }) {
  const rating = Math.floor(Number(product.rating) || 0)
  return (
    <Link href={`/shop/product_details/${product.id}`}>
      <div className="bg-white text-black rounded-xl p-3 flex flex-col justify-around hover:shadow-md transition cursor-pointer">

        {/* Image */}
        <div className="relative flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="h-[180px] object-contain"
          />

          <button
            className="absolute top-2 right-2"
            onClick={(e) => e.preventDefault()} // prevent navigation on heart click
          >
            <FaRegHeart className="text-gray-500 text-sm" />
          </button>
        </div>

        {/* Name */}
        <p className="mt-2 text-sm font-medium leading-snug line-clamp-2">
          {product.name}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-1">
          {[...Array(rating)].map((_, i) => (
            <FaStar key={i} className="text-yellow-400 text-xs" />
          ))}
          <span className="text-xs text-gray-500 ml-1">
            ({product.reviews?.length || 0})
          </span>
        </div>


        {/* Price */}
        <div className="flex items-center justify-between gap-2 mt-2">
          <span className="text-base font-semibold">₹{product.price}</span>
          <span className="text-sm text-gray-400 line-through">
            ₹{product.oldPrice}
          </span>
        </div>

        <button
          className="mt-2 w-full border border-gray-300 rounded-xl py-2 text-sm font-medium hover:bg-black hover:text-white transition"
          onClick={(e) => e.preventDefault()}
        >
          ADD
        </button>

      </div>
    </Link>
  )
}
