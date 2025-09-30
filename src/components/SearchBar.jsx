import React from "react";
import { FiSearch } from "react-icons/fi";

export default function SearchBar({ search, setSearch }) {
    return (
        <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-400" />
            <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border p-2 pl-10 rounded-full w-full"
            />
        </div>
    );
}
