import React from 'react';
import Image from 'next/image';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import Container from '@/components/Container';
import WhyChooseFurrmaa from '@/components/WhyChooseFurrmaa';

const PetEvents = () => {
    // Dummy data to map through for the event cards
    const events = [
        {
            id: 1,
            title: "Jaipur Dog Show 2026",
            date: "Sunday, 18th January 2026",
            venue: "Dussehra Ground, Raja Park, Jaipur",
            time: "10:00 A.M. to 7:00 P.M.",
            image: "/images/Events/events.png", // Replace with your actual path
            highlights: [
                "Puppy Show – Witness the cutest puppies showcasing their charm.",
                "Free Dog Adoption in Jaipur – Find your perfect four-legged companion.",
                "Exciting Competitions – Engage in thrilling contests featuring national and international breeds.",
                "Exclusive Pet Supermarket – Shop the best pet essentials.",
                "Pet Salon & Spa – Pamper your pet with professional grooming services.",
                "Jaipur's First Pet Café – Enjoy a delightful outing with your furry friend.",
                "Dog Tower – A First in Jaipur! – Experience a never-seen-before concept dedicated to dogs."
            ]
        },
        {
            id: 2,
            title: "Jaipur Dog Show 2026",
            date: "Sunday, 18th January 2026",
            venue: "Dussehra Ground, Raja Park, Jaipur",
            time: "10:00 A.M. to 7:00 P.M.",
            image: "/images/Events/events.png",
            highlights: [
                "Puppy Show – Witness the cutest puppies showcasing their charm.",
                "Free Dog Adoption in Jaipur – Find your perfect four-legged companion.",
                "Exciting Competitions – Engage in thrilling contests featuring national and international breeds.",
                "Exclusive Pet Supermarket – Shop the best pet essentials.",
                "Pet Salon & Spa – Pamper your pet with professional grooming services.",
                "Jaipur's First Pet Café – Enjoy a delightful outing with your furry friend.",
                "Dog Tower – A First in Jaipur! – Experience a never-seen-before concept dedicated to dogs."
            ]
        }
    ];

    return (
        <section className="bg-white py-10">
            <Container>
                {/* Header Section with Location Picker */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                    <h1 className="text-4xl font-bold text-gray-900">Pet Events</h1>

                    <div className="flex items-center gap-2 border border-gray-200 rounded-full px-4 py-2 bg-white shadow-sm w-full md:w-auto">
                        <HiOutlineLocationMarker className="text-gray-400 text-xl" />
                        <span className="text-sm text-gray-600 flex-grow px-2">Jaipur</span>
                        <button className="bg-[#a3e635] text-white text-xs font-bold px-4 py-1.5 rounded-full hover:opacity-90 transition">
                            Change
                        </button>
                    </div>
                </div>

                {/* Events List */}
                <div className="space-y-8">
                    {events.map((event) => (
                        <div
                            key={event.id}
                            className="flex flex-col lg:flex-row border border-gray-100 rounded-[32px] overflow-hidden bg-[#fbfcfd] shadow-sm hover:shadow-md transition-shadow"
                        >
                            {/* Left: Event Poster Image */}
                            <div className="w-full lg:w-[380px] shrink-0 p-6">
                                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
                                    <img
                                        src={event.image}
                                        alt={event.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                            {/* Right: Event Details */}
                            <div className="flex-1 p-6 lg:pl-0 lg:pr-10 lg:py-10 space-y-6">
                                <div>
                                    <h2 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">
                                        {event.title}
                                    </h2>

                                    <div className="space-y-1">
                                        <p className="font-bold text-gray-800 text-[15px]">{event.date}</p>
                                        <p className="text-gray-700 text-[15px] font-semibold italic">
                                            {event.venue}, from {event.time}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="font-bold text-gray-900 text-lg">A Grand Celebration of Canines</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed max-w-3xl">
                                        The Jaipur Dog Show is not just an exhibition; it's a paradise for pet enthusiasts.
                                        Whether you're searching for dog shows near me or looking to adopt a furry friend,
                                        this event has something for everyone.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="font-bold text-gray-900 text-[15px]">
                                        Event Highlights: {event.title}
                                    </h4>
                                    <ul className="space-y-2">
                                        {event.highlights.map((highlight, idx) => (
                                            <li key={idx} className="text-gray-600 text-sm flex items-start">
                                                <span className="mr-2 opacity-70">•</span>
                                                {highlight}
                                            </li>
                                        ))}
                                    </ul>
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

export default PetEvents;