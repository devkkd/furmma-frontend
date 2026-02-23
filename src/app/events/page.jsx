"use client"
import React, { useState, useEffect } from 'react';
import { HiOutlineLocationMarker, HiChevronDown, HiChevronUp } from 'react-icons/hi';
import Container from '@/components/Container';
import WhyChooseFurrmaa from '@/components/WhyChooseFurrmaa';
import { fetchPetEvents, registerPetEvent } from '@/lib/api';

const PetEvents = () => {
    const [expandedEventId, setExpandedEventId] = useState(null);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [city, setCity] = useState('Jaipur');
    const [showCityPicker, setShowCityPicker] = useState(false);
    const [registerEvent, setRegisterEvent] = useState(null);
    const [regName, setRegName] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regPhone, setRegPhone] = useState('');
    const [regNotes, setRegNotes] = useState('');
    const [regSubmitting, setRegSubmitting] = useState(false);
    const [regError, setRegError] = useState('');

    useEffect(() => {
        let cancelled = false;
        async function load() {
            setLoading(true);
            try {
                const list = await fetchPetEvents({ city: city === 'All' ? undefined : city });
                if (!cancelled) setEvents(list);
            } catch (e) {
                if (!cancelled) setEvents([]);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }
        load();
        return () => { cancelled = true; };
    }, [city]);

    const toggleEvent = (id) => {
        setExpandedEventId(expandedEventId === id ? null : id);
    };

    const openRegister = (event) => {
        setRegisterEvent(event);
        setRegName('');
        setRegEmail('');
        setRegPhone('');
        setRegNotes('');
        setRegError('');
    };

    const closeRegister = () => {
        if (!regSubmitting) {
            setRegisterEvent(null);
            setRegError('');
        }
    };

    const submitRegister = async (e) => {
        e.preventDefault();
        setRegError('');
        const name = regName.trim();
        const email = regEmail.trim();
        const phone = regPhone.trim();
        if (!name || !email || !phone) {
            setRegError('Name, email and phone are required.');
            return;
        }
        setRegSubmitting(true);
        try {
            await registerPetEvent(registerEvent._id, { name, email, phone, notes: regNotes.trim() || undefined });
            setRegisterEvent(null);
            setRegName('');
            setRegEmail('');
            setRegPhone('');
            setRegNotes('');
        } catch (err) {
            setRegError(err.message || 'Registration failed. Try again.');
        } finally {
            setRegSubmitting(false);
        }
    };

    const image1 = (event) => event.posterUrl || event.images?.[0];
    const image2 = (event) => event.images?.[1];
    const CITIES = ['Jaipur', 'Delhi', 'Mumbai', 'Bangalore', 'All'];

    return (
        <section className="bg-white py-10">
            <Container>
                <div className="px-5">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                        <h1 className="text-4xl font-bold text-gray-900">Pet Events</h1>
                        <div className="relative flex items-center gap-2 border border-gray-200 rounded-full px-4 py-2 bg-white shadow-sm w-full md:w-auto">
                            <HiOutlineLocationMarker className="text-gray-400 text-xl shrink-0" />
                            <button
                                type="button"
                                onClick={() => setShowCityPicker(!showCityPicker)}
                                className="text-sm text-gray-600 flex-grow px-2 text-left"
                            >
                                {city}
                            </button>
                            {showCityPicker && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10 py-2">
                                    {CITIES.map((c) => (
                                        <button
                                            key={c}
                                            type="button"
                                            onClick={() => { setCity(c); setShowCityPicker(false); }}
                                            className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${city === c ? 'bg-[#a3e635]/20 text-gray-900 font-medium' : 'text-gray-600'}`}
                                        >
                                            {c}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Events List */}
                    {loading ? (
                        <div className="flex justify-center py-16">
                            <div className="animate-spin rounded-full h-10 w-10 border-2 border-[#a3e635] border-t-transparent" />
                        </div>
                    ) : events.length === 0 ? (
                        <div className="text-center py-16 text-gray-600">
                            <p className="text-lg font-medium">No pet events in this location right now.</p>
                            <p className="text-sm mt-2">Try changing the city or check back later.</p>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {events.map((event) => {
                                const isExpanded = expandedEventId === event._id;
                                const img1 = image1(event);
                                const img2 = image2(event);

                                return (
                                    <div
                                        key={event._id}
                                        className="flex flex-col lg:flex-row border border-gray-100 rounded-[32px] overflow-hidden bg-[#fbfcfd] shadow-sm hover:shadow-md transition-all duration-300"
                                    >
                                        {/* Left: Event images (1 or 2) */}
                                        <div className="w-full lg:w-[380px] shrink-0 p-4 lg:p-6 space-y-4">
                                            {img1 && (
                                                <div
                                                    className="relative aspect-square md:aspect-video lg:aspect-square rounded-2xl overflow-hidden shadow-lg cursor-pointer"
                                                    onClick={() => toggleEvent(event._id)}
                                                >
                                                    <img
                                                        src={img1}
                                                        alt={event.title}
                                                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                                                    />
                                                </div>
                                            )}
                                            {img2 && (
                                                <div
                                                    className="relative aspect-video rounded-2xl overflow-hidden shadow-lg cursor-pointer"
                                                    onClick={() => toggleEvent(event._id)}
                                                >
                                                    <img
                                                        src={img2}
                                                        alt={`${event.title} – Photo 2`}
                                                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                                                    />
                                                </div>
                                            )}
                                            {!img1 && !img2 && (
                                                <div
                                                    className="aspect-square rounded-2xl bg-gray-100 flex items-center justify-center text-4xl cursor-pointer"
                                                    onClick={() => toggleEvent(event._id)}
                                                >
                                                    🐶🎉
                                                </div>
                                            )}
                                        </div>

                                        {/* Right: Event Details */}
                                        <div className="flex-1 p-6 lg:pl-0 lg:pr-10 lg:py-10 flex flex-col justify-between">
                                            <div className="cursor-pointer" onClick={() => toggleEvent(event._id)}>
                                                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">
                                                    {event.title}
                                                </h2>
                                                <div className="space-y-1 mb-4">
                                                    <p className="font-bold text-gray-800 text-[15px]">{event.dateText}</p>
                                                    <p className="text-gray-600 text-[14px] font-medium flex items-center gap-1">
                                                        <HiOutlineLocationMarker className="inline text-lg" />
                                                        {event.venue}
                                                        {event.city ? `, ${event.city}` : ''}
                                                    </p>
                                                </div>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => toggleEvent(event._id)}
                                                className="lg:hidden w-full flex items-center justify-center gap-2 bg-gray-100 py-3 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-200 transition mb-2"
                                            >
                                                {isExpanded ? 'Hide Details' : 'View Full Details'}
                                                {isExpanded ? <HiChevronUp /> : <HiChevronDown />}
                                            </button>

                                            <div
                                                className={`space-y-6 overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[1000px] opacity-100 mt-4' : 'max-h-0 opacity-0 lg:max-h-none lg:opacity-100 lg:mt-0'}`}
                                            >
                                                {event.description && (
                                                    <div className="space-y-3 pt-2 border-t border-gray-100 lg:border-none">
                                                        <h3 className="font-bold text-gray-900 text-lg">Event Details</h3>
                                                        <p className="text-gray-600 text-sm leading-relaxed max-w-3xl whitespace-pre-wrap">
                                                            {event.description}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => openRegister(event)}
                                                className="mt-4 w-full md:w-auto bg-[#a3e635] hover:bg-[#86b82a] text-gray-900 font-bold py-3 px-6 rounded-full transition"
                                            >
                                                Register for this event
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </Container>

            {/* Register modal */}
            {registerEvent && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={closeRegister}>
                    <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">Register for event</h3>
                        <p className="text-sm text-gray-600 mb-4">{registerEvent.title}</p>
                        <form onSubmit={submitRegister} className="space-y-3">
                            <input
                                type="text"
                                placeholder="Your name *"
                                value={regName}
                                onChange={(e) => setRegName(e.target.value)}
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm"
                                required
                                disabled={regSubmitting}
                            />
                            <input
                                type="email"
                                placeholder="Email *"
                                value={regEmail}
                                onChange={(e) => setRegEmail(e.target.value)}
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm"
                                required
                                disabled={regSubmitting}
                            />
                            <input
                                type="tel"
                                placeholder="Phone *"
                                value={regPhone}
                                onChange={(e) => setRegPhone(e.target.value)}
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm"
                                required
                                disabled={regSubmitting}
                            />
                            <textarea
                                placeholder="Notes (optional)"
                                value={regNotes}
                                onChange={(e) => setRegNotes(e.target.value)}
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm min-h-[80px]"
                                rows={3}
                                disabled={regSubmitting}
                            />
                            {regError && <p className="text-sm text-red-600">{regError}</p>}
                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={closeRegister} className="flex-1 py-3 rounded-xl border border-gray-200 font-medium text-gray-700" disabled={regSubmitting}>
                                    Cancel
                                </button>
                                <button type="submit" className="flex-1 py-3 rounded-xl bg-[#a3e635] font-bold text-gray-900 hover:opacity-90 disabled:opacity-70" disabled={regSubmitting}>
                                    {regSubmitting ? 'Submitting…' : 'Submit'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <WhyChooseFurrmaa />
        </section>
    );
};
export default PetEvents;
