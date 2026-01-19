'use client';

import React, { useState } from 'react';
import { HiArrowLeft } from 'react-icons/hi';
import { useParams, useRouter } from 'next/navigation';
import Container from '@/components/Container';
import ProductInfoCard from '@/components/ProductInfoCard';
import { dummyOrders } from '@/data/dummyOrders';

const ReturnOrderPage = () => {
    const { return_order_id } = useParams();
    console.log(return_order_id)
    const router = useRouter();

    const order = dummyOrders.find(o => o._id === return_order_id);

    if (!order) {
        return <div className="p-10">Order not found</div>;
    }

    return (
        <section className="bg-white min-h-screen py-6 md:py-10">
            <Container>
                {/* Navigation Header */}
                <div className="flex items-center gap-4 mb-8">
                    <button className="p-2 hover:bg-gray-50 rounded-full transition-all">
                        <HiArrowLeft className="text-2xl text-gray-800" />
                    </button>
                    <h1 className="text-2xl font-extrabold text-gray-900">Return Order</h1>
                </div>

                {/* Responsive Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

                    {/* First Grid: Product Details (Uses your existing component) */}
                    <div className="lg:col-span-4">
                        <ProductInfoCard order={order} />
                    </div>

                    {/* Second Grid: Return Reasons */}
                    <div className="lg:col-span-5">
                        <ReturnReasonCard />
                    </div>

                </div>
            </Container>
        </section>
    );
};

const ReturnReasonCard = () => {
    const [selectedReason, setSelectedReason] = useState('damaged');

    const reasons = [
        { id: 'damaged', label: 'Received a damaged product' },
        { id: 'wrong', label: 'Wrong item delivered' },
        { id: 'missing', label: 'Missing parts or accessories' },
        { id: 'quality', label: 'Poor quality or defective' },
        { id: 'not-described', label: 'Not as described' },
        { id: 'other', label: 'Other (write your reason)' },
    ];

    return (
        <div className="bg-white border border-gray-100 rounded-[24px] p-8 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 mb-8 ml-1">Select Return Reason</h3>

            <div className="space-y-6 mb-10">
                {reasons.map((reason) => (
                    <label key={reason.id} className="flex items-center gap-4 cursor-pointer group">
                        <div className="relative flex items-center justify-center">
                            <input
                                type="radio"
                                name="returnReason"
                                className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border-2 border-gray-300 checked:border-[#1a2b48] transition-all"
                                checked={selectedReason === reason.id}
                                onChange={() => setSelectedReason(reason.id)}
                            />
                            <div className="absolute h-2.5 w-2.5 rounded-full bg-[#1a2b48] opacity-0 peer-checked:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-[15px] text-gray-700 font-medium group-hover:text-gray-900 transition-colors">
                            {reason.label}
                        </span>
                    </label>
                ))}
            </div>

            <div className="flex justify-center">
                <button className="bg-[#1a2b48] hover:bg-[#0f1a2e] text-white font-bold py-4 px-12 rounded-full flex items-center justify-center gap-2 transition shadow-md active:scale-[0.98]">
                    Submit ➔
                </button>
            </div>
        </div>
    );
};

export default ReturnOrderPage;