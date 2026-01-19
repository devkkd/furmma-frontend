import React from 'react';

const AccNotification = () => {
    // Dummy notification data based on your screenshot
    const notifications = [
        {
            id: 1,
            title: "Pet Event Near You",
            description: "New pet events are happening nearby. Join the fun.",
            time: "10 Dec 2025, 11:34 am"
        },
        {
            id: 2,
            title: "Welcome to Furrmaa",
            description: "Your trusted companion for all pet care needs.",
            time: "10 Dec 2025, 11:34 am"
        },
        {
            id: 3,
            title: "Pet Event Near You",
            description: "New pet events are happening nearby. Join the fun.",
            time: "10 Dec 2025, 11:34 am"
        },
        {
            id: 4,
            title: "Welcome to Furrmaa",
            description: "Your trusted companion for all pet care needs.",
            time: "10 Dec 2025, 11:34 am"
        },
        {
            id: 5,
            title: "Pet Event Near You",
            description: "New pet events are happening nearby. Join the fun.",
            time: "10 Dec 2025, 11:34 am"
        },
        {
            id: 6,
            title: "Welcome to Furrmaa",
            description: "Your trusted companion for all pet care needs.",
            time: "10 Dec 2025, 11:34 am"
        }
    ];

    return (
        <div className="bg-white border border-gray-100 rounded-[32px] p-6 md:p-10 shadow-sm min-h-[600px]">
            {/* Header */}
            <h1 className="text-3xl font-extrabold text-gray-900 mb-8 tracking-tight">
                Notifications
            </h1>

            {/* Notifications List */}
            <div className="space-y-4">
                {notifications.map((notification) => (
                    <div 
                        key={notification.id}
                        className="bg-[#fbfcfd] border border-gray-50 rounded-2xl p-5 hover:shadow-sm transition-shadow cursor-pointer group"
                    >
                        <div className="space-y-1">
                            <h3 className="text-[15px] font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                {notification.title}
                            </h3>
                            <p className="text-[13px] text-gray-600 font-medium">
                                {notification.description}
                            </p>
                            <p className="text-[11px] text-gray-400 font-bold pt-1 uppercase tracking-wider">
                                {notification.time}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State Logic (Optional) */}
            {notifications.length === 0 && (
                <div className="flex flex-col items-center justify-center h-[400px] text-center">
                    <p className="text-gray-400 font-bold uppercase tracking-widest">
                        No New Notifications
                    </p>
                </div>
            )}
        </div>
    );
};

export default AccNotification;