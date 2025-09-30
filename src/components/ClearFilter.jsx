import React from "react";

export default function ClearFilters({ clearFilters }) {
    return (
        <button
            onClick={clearFilters}
            className="flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded mt-2 md:mt-0"
        >
            Clear All
        </button>
    );
}
