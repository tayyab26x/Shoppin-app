import React from "react";

export default function BrandFilter({ brands, brand, setBrand }) {
    return (
        <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className=" p-2 "
        >
            <option value="">All Brands</option>
            {brands.map((b) => (
                <option key={b} value={b}>{b}</option>
            ))}
        </select>
    );
}
