'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import AccountSideBar from '@/components/AccountSideBar'
import MobileAccountNav from '@/components/MobileAccountNav'

export default function AccountLayout({ children }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) router.replace('/login')
  }, [isAuthenticated, router])

  if (!isAuthenticated) return null

  return (
    <div className="mx-auto min-h-screen max-w-7xl">

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-[380px]">
          <AccountSideBar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-white py-10">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
        <MobileAccountNav />
      </div>
    </div>
  )
}
