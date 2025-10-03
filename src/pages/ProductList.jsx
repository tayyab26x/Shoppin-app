import React, { useState, useEffect } from "react";
import Productc from "../components/Productc.jsx";
import ProductSkeleton from "../Components/LoadingSkeleton.jsx";
import Navbar from "../components/NavBar.jsx";
import CartPanel from "../Components/CartPanel.jsx";
import productsData from "../data/Products.js";
import Pagination from "../components/Pagination.jsx";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [brand, setBrand] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [rating, setRating] = useState(0);
  const [gender, setGender] = useState(""); 
  const [sort, setSort] = useState("relevance");

  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);
  const [cartOpen, setCartOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const categories = [...new Set(productsData.map(p => p.category))];
  const brands = [...new Set(productsData.map(p => p.brand))];
  const genders = ["Men", "Women", "Unisex"];

  useEffect(() => {
    // Simulate API loading
    setLoading(true);
    setTimeout(() => {
      setProducts(productsData);
      setLoading(false);
    }, 500); 
  }, []);

  const filteredProducts = products
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter(p => selectedCategories.length ? selectedCategories.includes(p.category) : true)
    .filter(p => brand ? p.brand === brand : true)
    .filter(p => gender ? p.gender === gender : true)
    .filter(p => minPrice ? p.price >= Number(minPrice) : true)
    .filter(p => maxPrice ? p.price <= Number(maxPrice) : true)
    .filter(p => rating === 0 ? true : (p.rating >= rating && p.rating <= (rating === 5 ? 5 : rating + 0.9)))
    .sort((a, b) => {
      switch (sort) {
        case "priceLow": return a.price - b.price;
        case "priceHigh": return b.price - a.price;
        case "ratingHigh": return b.rating - a.rating;
        case "newest": return new Date(b.createdAt) - new Date(a.createdAt);
        default: return 0;
      }
    });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const clearAll = () => {
    setSearch(""); setSelectedCategories([]); setBrand("");
    setMinPrice(""); setMaxPrice(""); setRating(0); setGender(""); setSort("relevance");
  };

  return (
    <div className="w-full relative">
      <Navbar
        search={search} setSearch={setSearch}
        brand={brand} setBrand={setBrand}
        minPrice={minPrice} setMinPrice={setMinPrice}
        maxPrice={maxPrice} setMaxPrice={setMaxPrice}
        rating={rating} setRating={setRating}
        gender={gender} setGender={setGender}
        sort={sort} setSort={setSort}
        clearAll={clearAll}
        brands={brands}
        genders={genders}
        cartCount={cart.length}
        openCart={() => setCartOpen(true)}
      />

      <div className="pt-[30px] px-4 pb-8">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {loading
            ? Array.from({ length: itemsPerPage }).map((_, i) => <ProductSkeleton key={i} />)
            : (paginatedProducts.length > 0
              ? paginatedProducts.map(product => (
                  <Productc key={product.id} product={product} cart={cart} setCart={setCart} />
                ))
              : <p className="text-center col-span-full">No products found.</p>
            )
          }
        </div>

        {totalPages > 1 && !loading && (
          <div className="mt-8 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>

      <CartPanel cart={cart} setCart={setCart} open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}
