import HopeByFurrmaa from '@/components/HopesByFurrmaa'
import PetAiPage from '@/components/PetAiPage'
import PetAIChat from '@/components/PetAiPage'
import PetOwnerChat from '@/components/PetOwnerChat'
import WhyChooseFurrmaa from '@/components/WhyChooseFurrmaa'
import React from 'react'

export default function page() {
    return (
        <div className=''>
            {/* <HopeByFurrmaa /> */}
            {/* <PetOwnerChat/> */}
            <PetAiPage />
            <WhyChooseFurrmaa />
        </div>
    )
}
