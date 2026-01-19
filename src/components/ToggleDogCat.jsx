// components/ToggleDogCat.jsx
'use client'

import { usePetStore } from '@/store/petStore'

export default function ToggleDogCat() {
  const petType = usePetStore(state => state.petType)
  const setPet = usePetStore(state => state.setPet)

  return (
    <div className="mx-auto mt-8 md:w-[400px] w-[350px] md:h-[60px] h-[50px] bg-white border border-gray-300 rounded-full p-2 flex items-center">

      <button
        onClick={() => setPet('dog')}
        className={`flex-1 h-full rounded-full flex items-center justify-center gap-2 text-sm font-medium transition
          ${petType === 'dog' ? 'bg-[#1F2E46] text-white' : 'text-gray-400'}
        `}
      >
        🐶 Dog Essentials
      </button>

      <button
        onClick={() => setPet('cat')}
        className={`flex-1 h-full rounded-full flex items-center justify-center gap-2 text-sm font-medium transition
          ${petType === 'cat' ? 'bg-[#1F2E46] text-white' : 'text-gray-400'}
        `}
      >
        🐱 Cat Essentials
      </button>

    </div>
  )
}
