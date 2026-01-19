import { dummyOrders, statusMap } from '@/data/dummyOrders'
import Link from 'next/link'
import React from 'react'
import { HiOutlineSearch, HiOutlineAdjustments } from 'react-icons/hi'

const MyOrders = () => {
  const orders = dummyOrders

  return (
    <div className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm">
      <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
        My Orders
      </h2>

      {/* Search & Filter */}
      <div className="flex gap-4 mb-8">
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
      <div className="space-y-6">
        {orders.map(order => {
          const product = order.items[0].product

          return (
            <Link
              key={order._id}
              href={`/account/orders/order-details/${order._id}`}
            >
              <div className="flex flex-col md:flex-row gap-6 p-4 border-b border-gray-50 last:border-0 hover:bg-gray-50/30 rounded-2xl transition">
                <div className="w-24 h-24 shrink-0 rounded-xl bg-gray-50 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex-1">
                  <h4 className="text-sm font-bold text-gray-800 leading-tight mb-1">
                    {product.name}
                  </h4>

                  <p className="text-sm font-bold text-gray-900 mb-4">
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
    </div>
  )
}

export default MyOrders
