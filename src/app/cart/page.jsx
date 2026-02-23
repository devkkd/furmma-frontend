'use client';

import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import Container from '@/components/Container';

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQty = useCartStore((s) => s.updateQty);

  const total = items.reduce((sum, i) => {
    const price = i.product?.price ?? 0;
    return sum + price * (i.qty || 1);
  }, 0);

  if (items.length === 0) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center py-16">
        <Container>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h1>
            <p className="text-gray-600 mb-6">Add items from the shop to get started.</p>
            <Link
              href="/shop"
              className="inline-block bg-[#1F2E46] text-white font-semibold px-6 py-3 rounded-lg hover:opacity-90"
            >
              Continue Shopping
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-12">
      <Container>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Cart</h1>
        <div className="space-y-4 mb-8">
          {items.map((item) => (
            <div
              key={item.productId}
              className="flex items-center gap-4 p-4 bg-white border rounded-xl shadow-sm"
            >
              <img
                src={item.product?.image || '/images/products/p1.png'}
                alt={item.product?.name || 'Product'}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{item.product?.name || `Product ${item.productId}`}</p>
                <p className="text-gray-600 text-sm">
                  ₹{(item.product?.price ?? 0).toLocaleString('en-IN')} × {item.qty}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => updateQty(item.productId, Math.max(1, item.qty - 1))}
                  className="w-8 h-8 rounded border border-gray-300 text-gray-600 hover:bg-gray-100"
                >
                  −
                </button>
                <span className="w-8 text-center font-medium">{item.qty}</span>
                <button
                  type="button"
                  onClick={() => updateQty(item.productId, item.qty + 1)}
                  className="w-8 h-8 rounded border border-gray-300 text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              <button
                type="button"
                onClick={() => removeItem(item.productId)}
                className="text-red-600 hover:underline text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <div className="border-t pt-6 flex justify-between items-center">
          <p className="text-xl font-bold text-gray-900">Total: ₹{total.toLocaleString('en-IN')}</p>
          <Link
            href="/shop"
            className="bg-[#1F2E46] text-white font-semibold px-6 py-3 rounded-lg hover:opacity-90"
          >
            Continue Shopping
          </Link>
        </div>
      </Container>
    </section>
  );
}
