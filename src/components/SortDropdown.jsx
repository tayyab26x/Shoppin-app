import React from "react";

export default function SortDropdown({ sort, setSort }) {
    return (
        <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className=" p-0"
        >
            <option value="relevance">Relevance</option>
            <option value="priceLow">Price: Low → High</option>
            <option value="priceHigh">Price: High → Low</option>
            <option value="ratingHigh">Rating: High → Low</option>
            <option value="newest">Newest</option>
        </select>
    );
}  
