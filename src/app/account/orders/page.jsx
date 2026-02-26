'use client';

import { statusMap } from '@/data/dummyOrders'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { HiOutlineSearch, HiOutlineAdjustments } from 'react-icons/hi'
import { fetchOrders } from '@/lib/api'
import { dummyOrders } from '@/data/dummyOrders'

const MyOrders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    fetchOrders()
      .then((data) => {
        if (!cancelled) {
          setOrders(data)
          setError(null)
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.error('Error fetching orders:', err)
          // Fallback to dummy data if API fails
          setOrders(dummyOrders)
          setError('Failed to load orders. Showing cached data.')
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [])

  return (
    <div className="bg-white border border-gray-100 md:rounded-[32px] md:p-8 pb-6 shadow-sm">
      <h2 className="text-2xl font-extrabold text-gray-900 mb-3 pt-3 pl-3">
        My Orders
      </h2>

      {/* Search & Filter */}
      <div className="flex gap-4 mb-8 px-3 ">
        <div className="relative flex-1">
          <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Search your order here"
            className="w-full pl-12 pr-4 py-3 bg-gray-50/50 border border-gray-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-200 text-sm"
          />
        </div>

        <button className="flex items-center gap-2 px-6 py-3 border border-gray-100 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50">
          Filters <HiOutlineAdjustments />
        </button>
      </div>

      {/* Orders List */}
      {loading ? (
        <div className="py-12 text-center text-gray-500">Loading orders...</div>
      ) : error ? (
        <div className="py-12 text-center">
          <p className="text-amber-600 mb-2">{error}</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="py-12 text-center text-gray-500">
          <p>No orders found.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => {
          const product = order.items[0].product

          return (
            <Link
              key={order._id}
              href={`/account/orders/order-details/${order._id}`}
            >
              <div className="flex md:flex-row gap-6 p-4 border-b  border-gray-50 last:border-0 hover:bg-gray-50/30 rounded-2xl transition">
                <div className="w-24 h-24 shrink-0 rounded-xl bg-gray-50 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-800 leading-tight mb-1">
                    {product.name}
                  </h4>

                  <p className="text-sm font-medium text-gray-900 mb-4">
                    Order ID: {order._id}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-extrabold text-gray-900">
                      {statusMap[order.orderStatus]}
                    </span>

                    <span className="text-sm font-bold text-gray-500">
                      On{' '}
                      {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
        </div>
      )}
    </div>
  )
}

export default MyOrders
