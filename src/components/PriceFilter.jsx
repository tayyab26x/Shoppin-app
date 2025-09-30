import React from "react";

export default function PriceFilter({ minPrice, maxPrice, setMinPrice, setMaxPrice }) {
    return (
        <div className="flex gap-2 items-center">
            <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="border p-2 rounded w-20"
            />
            <span>-</span>
            <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="border p-2 rounded w-20"
            />
        </div>
    );
}
