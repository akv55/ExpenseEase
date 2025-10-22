import React from "react";
import { Link } from "react-router-dom";

const UnderMaintenance = () => {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-8 text-center">
                <svg
                    className="mx-auto h-24 w-24 text-yellow-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>

                <h1 className="mt-6 text-3xl font-semibold text-gray-900">We'll be back soon</h1>
                <p className="mt-4 text-gray-600">
                    Our site is currently undergoing scheduled maintenance. We’re making improvements to serve you better.
                </p>
            </div>
        </div>
    );
};

export default UnderMaintenance;