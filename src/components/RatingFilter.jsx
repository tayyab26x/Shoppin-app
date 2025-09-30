import React from "react";

export default function RatingFilter({ rating, setRating }) {
    return (
        <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="p-2 "
        >
            <option value={0}>All Ratings</option>
            <option value={1}>1+ ⭐</option>
            <option value={2}>2+ ⭐</option>
            <option value={3}>3+ ⭐</option>
            <option value={4}>4+ ⭐</option>
            <option value={5}>5 ⭐</option>
        </select>
    );
}
