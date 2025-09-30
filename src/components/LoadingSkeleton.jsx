import React from "react";

export default function ProductSkeleton() {
    return (
        <div className="border rounded-lg shadow p-4 flex flex-col animate-pulse h-full">
            <div className="h-48 sm:h-56 md:h-40 w-full bg-gray-300 rounded mb-3"></div>
            <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-1"></div>
            <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
            <div className="h-8 bg-gray-300 rounded mt-auto"></div>
        </div>
    );
}
