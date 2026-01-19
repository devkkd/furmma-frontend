import React from 'react';
import Container from '@/components/Container';
import { HiOutlineLocationMarker, HiOutlineSearch, HiPhone } from 'react-icons/hi';
import { RiDirectionLine } from 'react-icons/ri';
import { LuArrowUpDown } from 'react-icons/lu';
import WhyChooseFurrmaa from '@/components/WhyChooseFurrmaa';

const Vet = () => {
    const categories = [
        "All", "Veterinarians", "Pet Shops", "Hospitals",
        "Pet Hotels / Hostels", "NGOs", "Shelters",
        "Rescue Centers", "Pet Cremation"
    ];

    const serviceProviders = Array(8).fill({
        name: "DOG MART",
        distance: "0.6 km away",
        address: "Plot No 173 200, NRI Cir, Sanganer, Sector 17, Pratap Nagar, Jaipur, Rajasthan",
        image: "/images/Vet/dogshop.png" // Replace with actual path
    });

    return (
        <section className="bg-white py-8">
            <Container>
                {/* Top Header Section */}
                <div className="flex flex-col xl:flex-row gap-4 items-start xl:items-center justify-between mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-900 shrink-0">Vet Services</h1>

                    <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
                        {/* Search Bar */}
                        <div className="relative flex-grow max-w-md">
                            <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                            <input
                                type="text"
                                placeholder="Search Vet Services"
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none text-sm"
                            />
                        </div>

                        {/* Sort By Dropdown */}
                        <button className="flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-600 bg-white hover:bg-gray-50 transition">
                            <span>Sort By</span>
                            <LuArrowUpDown className="text-gray-400" />
                        </button>

                        {/* Location Picker */}
                        <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-1 bg-white shadow-sm">
                            <HiOutlineLocationMarker className="text-gray-400 text-lg" />
                            <span className="text-xs text-gray-600 font-medium truncate max-w-[150px]">
                                Pratap Nagar, Jaipur
                            </span>
                            <button className="bg-[#95E562] text-black text-[10px] font-bold px-3 py-1 rounded-md uppercase hover:opacity-90">
                                Change
                            </button>
                        </div>
                    </div>
                </div>

                {/* Categories Horizontal Scroll */}
                <div className="flex items-center gap-2 overflow-x-auto pb-6 custom-scrollbar scrollbar-hide">
                    {categories.map((cat, idx) => (
                        <button
                            key={idx}
                            className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition-all
                                ${idx === 0
                                    ? 'bg-[#1e293b] text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Services Grid */}
<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-4 md:gap-6">
                    {serviceProviders.map((item, idx) => (
                        <div
                            key={idx}
                            className={`flex flex-col sm:flex-row gap-4 p-4 bg-white border rounded-2xl transition-all hover:shadow-md
                                ${idx === 2 ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-100'}`}
                        >
                            {/* Image Placeholder */}
                            <div className="w-full sm:w-32 h-32 shrink-0 rounded-xl overflow-hidden bg-gray-100">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Content */}
                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 uppercase">{item.name}</h3>
                                    <div className="flex items-center gap-1 text-gray-400 text-xs mb-2">
                                        <HiOutlineLocationMarker />
                                        <span>{item.distance}</span>
                                    </div>
                                    <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-2">
                                        {item.address}
                                    </p>
                                </div>

                                <div className="flex items-center gap-4 mt-4">
                                    <button className="flex items-center justify-center gap-2 bg-[#8B5FBF] text-white px-6 py-2 rounded-full text-xs font-bold hover:bg-[#7c3aed] transition w-full sm:w-auto">
                                        <HiPhone className="text-sm" />
                                        Call
                                    </button>
                                    <button className="flex items-center gap-2 text-gray-600 text-xs font-bold hover:text-gray-900 transition">
                                        <RiDirectionLine className="text-lg" />
                                        Direction
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
            <WhyChooseFurrmaa />

        </section>
    );
};

export default Vet;