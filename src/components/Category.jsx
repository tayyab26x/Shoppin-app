import React from "react";

export default function Category({ categories, brands, onFilter }) {
    return (
        <div className="p-4 border rounded-lg shadow bg-white">
            <h2 className="text-lg font-bold mb-3">Filter by</h2>

            {/* Categories */}
            <div className="mb-4">
                <h3 className="font-semibold mb-2">Category</h3>
                <ul className="space-y-2">
                    {categories.map((category, index) => (
                        <li key={index}>
                            <button
                                className="w-full text-left px-2 py-1 rounded hover:bg-gray-100"
                                onClick={() => onFilter("category", category)}
                            >
                                {category}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Brands */}
            <div>
                <h3 className="font-semibold mb-2">Brand</h3>
                <ul className="space-y-2">
                    {brands.map((brand, index) => (
                        <li key={index}>
                            <button
                                className="w-full text-left px-2 py-1 rounded hover:bg-gray-100"
                                onClick={() => onFilter("brand", brand)}
                            >
                                {brand}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
