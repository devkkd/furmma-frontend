'use client';

import { useState, useEffect } from 'react';
import { fetchProducts, normalizeProduct } from '@/lib/api';
import { products as staticProducts } from '@/data/products';

/** Normalize static product for ProductCard (id, price, oldPrice) */
function normalizeStatic(p) {
  return {
    ...p,
    id: p._id || p.id,
    price: p.discountPrice ?? p.price ?? 0,
    oldPrice: p.discountPrice ? p.price : undefined,
    image: (p.images && p.images[0]) || '/images/products/p1.png',
  };
}

export function useProducts(options = {}) {
  const { petType, category, age, search, sortBy, minRating, limit } = options;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchProducts({ petType, category, age, search, sortBy, minRating })
      .then((apiProducts) => {
        if (cancelled) return;
        const normalized = (apiProducts || []).map(normalizeProduct);
        setProducts(limit ? normalized.slice(0, limit) : normalized);
      })
      .catch(() => {
        if (cancelled) return;
        const fallback = staticProducts.map(normalizeStatic);
        setProducts(limit ? fallback.slice(0, limit) : fallback);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [petType, category, age, search, sortBy, minRating, limit]);

  return { products, loading };
}
