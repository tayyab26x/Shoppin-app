import React, { useState } from "react";
import SearchBar from "../Components/SearchBar.jsx";
import BrandFilter from "../components/BrandFilter.jsx";
import PriceFilter from "../components/PriceFilter.jsx";
import RatingFilter from "../components/RatingFilter.jsx";
import SortDropdown from "../Components/SortDropdown.jsx";
import GenderFilter from "../components/GenderFilter.jsx";
import ClearFilters from "../components/ClearFilter.jsx";

export default function Navbar({
    search, setSearch,
    brand, setBrand,
    minPrice, setMinPrice,
    maxPrice, setMaxPrice,
    rating, setRating,
    gender, setGender,
    sort, setSort,
    clearAll,
    brands,
    genders,
    cartCount,
    openCart
}) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="w-full bg-[#DFDDD1] text-black px-4 py-3 flex items-center justify-between shadow-md relative">
            
            <div className="flex items-center gap-2">
                <span className="w-[46px] h-[45px] rounded-full bg-transparent flex items-center justify-center">
                    <img
                        src="istockphoto-1400557658-612x612.jpg"
                        alt="Logo"
                        className="w-[50px] h-[50px] rounded-full object-cover bg-black"
                    />
                </span>
                <span className="text-2xl font-bold">Test</span>
            </div>

            <button
                className="md:hidden text-2xl"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                &#9776;
            </button>

            <div
                className={`absolute md:static top-[70px] left-0 w-full md:w-auto bg-[#c2b0d4] md:bg-transparent px-6 py-4 md:p-0 transition-all duration-300 ${menuOpen
                        ? "flex flex-col gap-4"
                        : "hidden md:flex md:flex-row md:items-center gap-4"
                    }`}
            >
                <div className="flex flex-wrap gap-2 items-center justify-center md:justify-start text-sm">
                    <SearchBar search={search} setSearch={setSearch} className="w-full md:w-36" />
                    <BrandFilter brands={brands} brand={brand} setBrand={setBrand} className="w-full md:w-28" />
                    <GenderFilter genders={genders} gender={gender} setGender={setGender} className="w-full md:w-28" />
                    <PriceFilter
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                        setMinPrice={setMinPrice}
                        setMaxPrice={setMaxPrice}
                        className="w-full md:w-32"
                    />
                    <RatingFilter rating={rating} setRating={setRating} className="w-full md:w-24" />
                    <SortDropdown sort={sort} setSort={setSort} className="w-full md:w-28" />

                    {/* Cart + Clear All */}
                    <button
                        onClick={openCart}
                        className="flex items-center gap-2 bg-black text-white px-3 py-1 rounded-full font-medium"
                    >
                        🛒({cartCount})
                    </button>
                    <ClearFilters clearFilters={clearAll} className="px-3 py-2 rounded-md bg-gray-700 hover:bg-gray-600" />
                </div>
            </div>
        </nav>
    );
}  
