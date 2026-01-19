"use client";

import ToggleDogCat from "@/components/ToggleDogCat";
import FilterSidebar from "@/components/FilterSidebar";
import ProductCard from "@/components/ProductCard";

import { usePetStore } from "@/store/petStore";
import { products } from "@/data/products";

export default function StorePage() {
  const petType = usePetStore((state) => state.petType);
  const filters = usePetStore((state) => state.filters);

  // FILTER LOGIC (simple now, expandable later)
  const filteredProducts = products
    .filter((p) => p.petType === petType)
    .filter((p) => {
      if (filters.category && p.category !== filters.category) return false;
      if (filters.rating && p.rating < filters.rating) return false;
      return true;
    });

  return (
    <div className="bg-white w-full">
      <div className="max-w-7xl mx-auto px-4 py-8 font-sans">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Shop</h1>
        </div>

        <ToggleDogCat />

        <div className="flex gap-8 mt-6">
          {/* Sidebar */}
          <div className="hidden md:block w-64 shrink-0">
            <FilterSidebar />
          </div>

          {/* Products */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            
            {filteredProducts.length === 0 && (
<p className="text-gray-900">No products found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


// "use client"
// import ToggleDogCat from '@/components/ToggleDogCat'
// import { usePetStore } from '@/store/petStore'
// import { products } from '@/data/products'

// export default function StorePage() {
//   const petType = usePetStore(state => state.petType)

//   const visibleProducts = products.filter(
//     p => p.petType === petType
//   )

//   return (
//     <>
//       <ToggleDogCat />

//       {visibleProducts.map(p => (
//         <div key={p.id}>{p.name}</div>
//       ))}
//     </>
//   )
// }

// "use client";

// import React, { useEffect, useState } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import FilterSidebar from "@/components/FilterSidebar";

// const PRODUCTS = Array(8).fill({
//     id: 1,
//     name: "Canine Creek Club Ultra Premium Dry",
//     image: "/dog-food.png",
//     rating: 5,
//     reviews: 265,
//     price: 2229,
//     originalPrice: 2449,
// });

// export default function StorePage() {
//     const searchParams = useSearchParams();
//     const router = useRouter();

//     // SINGLE SOURCE FILTER STATE
//     const [filters, setFilters] = useState({
//         petType: null,
//         category: null,
//         age: null,
//         dogBreed: null,
//         catBreed: null,
//         size: null,
//         dietary: null,
//         rating: null,
//         sort: null,
//     });

//     // useEffect(() => {
//     //     console.log(filters)
//     // }, [filters])


//     // Read from URL
//     useEffect(() => {
//         setFilters({
//             petType: searchParams.get("petType"),
//             category: searchParams.get("category"),
//             age: searchParams.get("age"),
//             dogBreed: searchParams.get("dogBreed"),
//             catBreed: searchParams.get("catBreed"),
//             size: searchParams.get("size"),
//             dietary: searchParams.get("dietary"),
//             rating: searchParams.get("rating"),
//             sort: searchParams.get("sort"),
//         });
//     }, [searchParams]);


//     // Update URL when filters change
//     const updateFilters = (updated) => {
//         const params = new URLSearchParams(searchParams.toString());

//         Object.entries(updated).forEach(([key, value]) => {
//             if (!value) params.delete(key);
//             else params.set(key, value);
//         });

//         router.push(`/shop?${params.toString()}`);
//     };

//     return (
//         <div className="bg-white w-full">
//             <div className="max-w-7xl mx-auto px-4 py-8 font-sans">
//                 {/* Header */}
//                 <div className="flex justify-between items-center mb-8">
//                     <h1 className="text-4xl font-bold text-gray-900">Shop</h1>

//                     <select
//                         className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm"
//                         value={filters.sort || ""}
//                         onChange={(e) =>
//                             onChange({ sort: e.target.value })}>
//                         <option value="">Sort By</option>
//                         <option value="price_low">Price: Low to High</option>
//                         <option value="price_high">Price: High to Low</option>
//                     </select>
//                 </div>

//                 <div className="flex gap-8">
//                     {/* Sidebar */}
//                     <div className="hidden md:block w-64 shrink-0">
//                         <FilterSidebar
//                             filters={filters}
//                             onChange={updateFilters}
//                         />
//                     </div>

//                     {/* Products */}
//                     <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10">
//                         {/* {PRODUCTS.map((product, i) => (
//               <ProductCard key={i} product={product} />
//             ))} */}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
