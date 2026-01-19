"use client"
import React, { useState } from 'react';
import Container from '@/components/Container';
import { HiOutlinePlus } from 'react-icons/hi';
import { IoMdRadioButtonOn, IoMdRadioButtonOff } from 'react-icons/io';

const MyAddress = () => {
    // Dummy state to manage selected address
    const [selectedId, setSelectedId] = useState(1);

    const addresses = [
        {
            id: 1,
            name: "John Deo",
            phone: "1234567890",
            addressLine: "123, abcd arera, 123456",
            cityState: "abcd city, abcd state",
            isDefault: true
        },
        {
            id: 2,
            name: "John Deo",
            phone: "1234567890",
            addressLine: "123, abcd arera, 123456",
            cityState: "abcd city, abcd state",
            isDefault: false
        }
    ];

    return (
        <section className="bg-white py-10 min-h-screen">
            <Container>
                {/* Main Card Wrapper */}
                <div className="bg-white border border-gray-100 rounded-[32px] p-8 md:p-12 shadow-sm min-h-[600px]">
                    
                    {/* Header with Add Button */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                            My Address
                        </h1>
                        <button className="bg-[#a3e635] text-gray-800 text-sm font-bold px-8 py-3 rounded-full flex items-center gap-2 hover:opacity-90 transition shadow-sm">
                            Add Address
                        </button>
                    </div>

                    {/* Address Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {addresses.map((addr) => {
                            const isSelected = selectedId === addr.id;
                            
                            return (
                                <div 
                                    key={addr.id}
                                    className={`flex flex-col border rounded-2xl overflow-hidden transition-all bg-white
                                        ${isSelected ? 'border-gray-200' : 'border-gray-100'}`}
                                >
                                    {/* Address Details Body */}
                                    <div className="p-6 flex gap-4">
                                        <button 
                                            onClick={() => setSelectedId(addr.id)}
                                            className="mt-1 shrink-0"
                                        >
                                            {isSelected ? (
                                                <IoMdRadioButtonOn className="text-2xl text-[#1e293b]" />
                                            ) : (
                                                <IoMdRadioButtonOff className="text-2xl text-gray-300" />
                                            )}
                                        </button>

                                        <div className="flex-1 space-y-1">
                                            <div className="flex justify-between items-start">
                                                <h3 className="font-bold text-gray-900">{addr.name}</h3>
                                                {addr.isDefault && (
                                                    <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-lg uppercase tracking-wider">
                                                        Default
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-700 font-medium">{addr.phone}</p>
                                            <p className="text-sm text-gray-500 leading-relaxed">
                                                {addr.addressLine} <br />
                                                {addr.cityState}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Action Buttons Footer */}
                                    <div className="flex border-t border-gray-100">
                                        <button className="flex-1 py-3 text-xs font-bold text-gray-500 hover:bg-gray-50 uppercase tracking-widest transition border-r border-gray-100">
                                            Edit
                                        </button>
                                        <button className="flex-1 py-3 text-xs font-bold text-gray-500 hover:bg-gray-50 uppercase tracking-widest transition">
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default MyAddress;