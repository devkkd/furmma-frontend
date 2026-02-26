"use client";

import { useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ToggleDogCat from "@/components/ToggleDogCat";
import FilterSidebar from "@/components/FilterSidebar";
import ProductCard from "@/components/ProductCard";
import { usePetStore } from "@/store/petStore";
import { useProducts } from "@/hooks/useProducts";

function StorePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const petType = usePetStore((state) => state.petType);
  const setPetType = usePetStore((state) => state.setPet);
  const filters = usePetStore((state) => state.filters);
  const setFilter = usePetStore((state) => state.setFilter);

  // Only URL = source of truth on shop
  const categoryFromUrl = searchParams.get("category") || null;
  const petFromUrl = searchParams.get("petType") || null;
  const ratingFromUrl = searchParams.get("rating") || searchParams.get("minRating") || null;
  const ageFromUrl = searchParams.get("age") || null;

  // Shop default: Dog selected (active button + dog products) when no petType in URL
  const effectivePetType = petFromUrl || "dog";

  // Sync to store so Header/other links carry current pet type
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setFilter("category", cat);
    if (ratingFromUrl) setFilter("rating", ratingFromUrl);
    if (ageFromUrl) setFilter("age", ageFromUrl);
    setPetType(effectivePetType);
  }, [searchParams, effectivePetType, ratingFromUrl, ageFromUrl, setFilter, setPetType]);

  // Filters object for FilterSidebar (from URL + store)
  const sidebarFilters = {
    petType: effectivePetType,
    category: categoryFromUrl || filters?.category || null,
    age: ageFromUrl || filters?.age || null,
    dogBreed: filters?.dogBreed || null,
    catBreed: filters?.catBreed || null,
    size: filters?.size || null,
    dietary: filters?.dietary || null,
    rating: ratingFromUrl || filters?.rating || null,
  };

  // When user changes filter in sidebar: update store + URL (all filters persist)
  const handleFilterChange = useCallback(
    (payload) => {
      // Handle petType - take first value if comma-separated
      if (payload.petType) {
        const petTypeValue = payload.petType.split(",")[0].toLowerCase();
        setPetType(petTypeValue === "dog" ? "dog" : petTypeValue === "cat" ? "cat" : effectivePetType);
      }
      
      // Handle category - take first value if comma-separated, convert to lowercase slug
      if (payload.category !== undefined) {
        const categoryValue = payload.category 
          ? payload.category.split(",")[0].toLowerCase().trim()
          : null;
        setFilter("category", categoryValue);
      }
      
      if (payload.rating !== undefined) {
        const ratingValue = payload.rating ? payload.rating.split(",")[0] : null;
        setFilter("rating", ratingValue);
      }
      
      if (payload.age !== undefined) {
        const ageValue = payload.age ? payload.age.split(",")[0].toLowerCase() : null;
        setFilter("age", ageValue);
      }
      
      if (payload.size !== undefined) setFilter("size", payload.size || null);
      if (payload.dietary !== undefined) setFilter("dietary", payload.dietary || null);
      if (payload.dogBreed !== undefined) setFilter("dogBreed", payload.dogBreed || null);
      if (payload.catBreed !== undefined) setFilter("catBreed", payload.catBreed || null);

      const params = new URLSearchParams();
      const pet = (payload.hasOwnProperty("petType") 
        ? payload.petType.split(",")[0].toLowerCase() 
        : effectivePetType) || null;
      const cat = (payload.hasOwnProperty("category") && payload.category
        ? payload.category.split(",")[0].toLowerCase().trim()
        : categoryFromUrl) || null;
      const rating = (payload.hasOwnProperty("rating") && payload.rating
        ? payload.rating.split(",")[0]
        : ratingFromUrl) || null;
      const age = (payload.hasOwnProperty("age") && payload.age
        ? payload.age.split(",")[0].toLowerCase()
        : ageFromUrl) || null;
      
      if (pet) params.set("petType", pet);
      if (cat) params.set("category", cat);
      if (rating) params.set("rating", rating);
      if (age) params.set("age", age);
      
      router.push(`/shop${params.toString() ? `?${params.toString()}` : ""}`);
    },
    [setPetType, setFilter, effectivePetType, categoryFromUrl, ratingFromUrl, ageFromUrl, router]
  );

  const effectiveRating = ratingFromUrl || filters?.rating || undefined;
  const effectiveCategory = categoryFromUrl || filters?.category || undefined;
  const effectiveAge = ageFromUrl || filters?.age || undefined;
  const minRatingNum = effectiveRating ? parseInt(String(effectiveRating).split(",")[0], 10) : undefined;

  const { products: apiProducts, loading } = useProducts({
    petType: effectivePetType,
    category: effectiveCategory,
    age: effectiveAge,
    minRating: minRatingNum || undefined,
  });

  // Normalize category for comparison (case-insensitive, handle slugs)
  const normalizeCategory = (cat) => {
    if (!cat) return null;
    return cat.toLowerCase().trim();
  };

  const filteredProducts = apiProducts.filter((p) => {
    // Category filter - case-insensitive matching
    if (effectiveCategory) {
      const productCategory = normalizeCategory(p.category);
      const filterCategory = normalizeCategory(effectiveCategory);
      if (productCategory !== filterCategory) return false;
    }
    
    // Rating filter
    if (minRatingNum != null && (p.rating || 0) < minRatingNum) return false;
    
    return true;
  });

  return (
    <div className="bg-white w-full">
      <div className="max-w-7xl mx-auto px-4 py-8 font-sans">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Shop</h1>
        </div>
        <ToggleDogCat
          onShopPage
          currentPetType={effectivePetType}
          onPetTypeChange={(type) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set("petType", type);
            if (categoryFromUrl) params.set("category", categoryFromUrl);
            router.push(`/shop${params.toString() ? `?${params.toString()}` : ""}`);
          }}
        />
        <div className="flex gap-8 mt-6">
          <div className="hidden md:block w-64 shrink-0">
            <FilterSidebar filters={sidebarFilters} onChange={handleFilterChange} />
          </div>
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
            {loading ? (
              <p className="text-gray-500 col-span-full">Loading...</p>
            ) : (
              <>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
                {filteredProducts.length === 0 && (
                  <p className="text-gray-900 col-span-full">No products found</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StorePage() {
  return (
    <Suspense fallback={<div className="py-12 text-center text-gray-500">Loading...</div>}>
      <StorePageContent />
    </Suspense>
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
