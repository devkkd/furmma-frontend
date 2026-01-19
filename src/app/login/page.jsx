'use client'

import React, { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { FaApple } from 'react-icons/fa'
import Container from '@/components/Container'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'


const DUMMY_OTP = ''

const AuthPage = () => {
    const login = useAuthStore((state) => state.login)

    const [step, setStep] = useState('OTP') // PHONE | OTP
    const [phone, setPhone] = useState('')
    const [otp, setOtp] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()


    const sendOtp = () => {
        if (phone.length !== 10) {
            setError('Enter a valid 10 digit mobile number')
            return
        }
        setError('')
        console.log('OTP sent:', DUMMY_OTP)
        setStep('OTP')
    }
    const verifyOtp = () => {
        if (otp !== DUMMY_OTP) {
            setError('Invalid OTP')
            return
        }

        login({
            phone,
            name: 'Furrmaa User',
        })

        router.replace('/account') // or router.push('/account')
    }


    return (
        <section className="min-h-[100vh] flex items-center justify-center bg-gray-50 px-4">
            <Container>
                <div className="max-w-[400px] mx-auto bg-white border border-gray-100 rounded-[28px] p-6 md:p-8 shadow-sm">

                    {/* HEADER */}
                    <header className="mb-6">
                        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight">
                            {step === 'PHONE'
                                ? <>Create Your Account 🐾 <br /> or Login</>
                                : 'Verify OTP'}
                        </h1>

                        {step === 'PHONE' && (
                            <p className="mt-2 text-gray-600 text-sm md:text-[15px]">
                                Join <span className="font-bold text-gray-900">Furrmaa</span> and give your pet the care they deserve.
                            </p>
                        )}
                    </header>

                    {/* FORM */}
                    <div className="space-y-3">

                        {step === 'PHONE' && (
                            <>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide ml-1">
                                    Mobile Number
                                </label>

                                <input
                                    type="tel"
                                    placeholder="99999 99999"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full px-4 py-3.5 border border-gray-200 rounded-xl bg-gray-50 text-sm focus:outline-none"
                                />

                                {error && <p className="text-red-500 text-xs">{error}</p>}

                                <button
                                    onClick={sendOtp}
                                    className="w-full bg-[#1F2E46] text-white font-bold py-3.5 rounded-full mt-2"
                                >
                                    Send OTP →
                                </button>
                            </>
                        )}

                        {step === 'OTP' && (
                            <>
                                <input
                                    type="text"
                                    placeholder="Enter 6-digit OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="w-full px-4 py-3.5 border border-gray-200 rounded-xl bg-gray-50 text-sm"
                                />

                                {error && <p className="text-red-500 text-xs">{error}</p>}

                                <button
                                    onClick={verifyOtp}
                                    className="w-full bg-[#1F2E46] text-white font-bold py-3.5 rounded-full mt-2"
                                >
                                    Verify & Login →
                                </button>
                            </>
                        )}

                        {/* SOCIAL LOGIN */}
                        <div className="relative mt-4">
                            <div className="flex justify-center text-[10px] uppercase font-bold tracking-widest">
                                <span className="bg-white px-4 text-gray-400">or login with</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <button className="flex items-center justify-center gap-2 border border-gray-200 py-2.5 rounded-full">
                                <FcGoogle className="text-xl" />
                                <span className="font-bold text-gray-700 text-xs">Google</span>
                            </button>

                            <button className="flex items-center justify-center gap-2 border border-gray-200 py-2.5 rounded-full">
                                <FaApple className="text-xl" />
                                <span className="font-bold text-gray-700 text-xs">Apple</span>
                            </button>
                        </div>

                    </div>

                    {/* FOOTER */}
                    <footer className="mt-8 text-center">
                        <p className="text-[11px] text-gray-400">
                            By continuing, you agree to our
                            <span className="font-bold text-gray-700"> Terms</span> &
                            <span className="font-bold text-gray-700"> Privacy Policy</span>.
                        </p>
                    </footer>

                </div>
            </Container>
        </section>
    )
}

export default AuthPage
