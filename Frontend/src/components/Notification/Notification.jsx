import React from "react";
import Sidebar from "../Layouts/Sidebar";

const Notification = () => {
    const notifications = [
        {
            id: "n1",
            title: "Expense added",
            message: "You added an expense of ₹450 in Food.",
            time: "2m ago",
            read: false,
        },
        {
            id: "n2",
            title: "Group member joined",
            message: "Aditi joined your group ‘Goa Trip’.",
            time: "1h ago",
            read: false,
        },
        {
            id: "n3",
            title: "Settlement reminder",
            message: "You have an unsettled balance in ‘Flatmates’.",
            time: "Yesterday",
            read: true,
        },
        {
            id: "n4",
            title: "Password changed",
            message: "Your account password was updated successfully.",
            time: "3 days ago",
            read: true,
        },
    ];
    const unreadCount = notifications.filter((n) => !n.read).length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-50 to-indigo-100 transition-colors duration-300">
            <Sidebar />

            <div className="md:ml-64 pt-16 md:pt-0 transition-all duration-300">
                <div className="p-6 md:p-8">
                    <div className="max-w-5xl mx-auto group-container">
                        <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg border border-white/60 p-6 md:p-8">
                            <div className="flex items-start sm:items-center justify-between gap-4">
                                <div>
                                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Notifications</h1>
                                    <p className="mt-1 text-sm md:text-base text-gray-600">
                                        Updates about your expenses, groups, and account activity.
                                    </p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="inline-flex items-center rounded-full bg-teal-50 text-teal-700 border border-teal-100 px-3 py-1 text-xs font-semibold">
                                        {unreadCount} unread
                                    </span>
                                    <span className="inline-flex items-center rounded-full bg-gray-50 text-gray-700 border border-gray-200 px-3 py-1 text-xs font-semibold">
                                        {notifications.length} total
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6">
                                {notifications.length === 0 ? (
                                    <div className="rounded-2xl border border-dashed border-teal-200 bg-gradient-to-br from-white to-teal-50 p-10 text-center">
                                        <div className="mx-auto w-14 h-14 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center text-xl font-bold">
                                            N
                                        </div>
                                        <h2 className="mt-4 text-lg font-semibold text-gray-900">You’re all caught up</h2>
                                        <p className="mt-1 text-sm text-gray-600">
                                            New notifications will show up here when something changes.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white">
                                        <div className="divide-y divide-gray-100">
                                            {notifications.map((n) => (
                                                <div
                                                    key={n.id}
                                                    className={`p-4 md:p-5 transition-colors ${n.read ? "bg-white" : "bg-teal-50/40"}`}
                                                >
                                                    <div className="flex items-start justify-between gap-4">
                                                        <div className="min-w-0">
                                                            <p className="text-sm md:text-base font-semibold text-gray-900 truncate">
                                                                {n.title}
                                                            </p>
                                                            <p className="mt-1 text-sm text-gray-600">
                                                                {n.message}
                                                            </p>
                                                        </div>
                                                        <div className="flex-shrink-0 text-xs text-gray-500">
                                                            {n.time}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Notification;