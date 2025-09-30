import React from "react";

export default function Productc({ product, cart, setCart }) {
    const addToCart = () => {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            const updatedCart = cart.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
            setCart(updatedCart);
            localStorage.setItem("cart", JSON.stringify(updatedCart));
        } else {
            const updatedCart = [...cart, { ...product, quantity: 1 }];
            setCart(updatedCart);
            localStorage.setItem("cart", JSON.stringify(updatedCart));
        }
    };

    return (
        <div className="border rounded-lg shadow p-4 flex flex-col">
            <img
                src={product.image}
                alt={product.name}
                className="h-40 w-full object-cover mb-3"
                onError={(e) => (e.target.src = "/images/placeholder.jpg")}
            />
            <h3 className="font-semibold text-lg truncate">{product.name}</h3>

            {/* Brand + Category together */}
            <p className="text-gray-500">
                {product.brand} • {product.category}
            </p>

            <p className="font-bold mt-1">₨ {product.price}</p>
            <p className="text-yellow-500">{`⭐ ${product.rating}`}</p>

            <button
                disabled={!product.inStock}
                onClick={addToCart}
                className={`mt-auto py-2 px-4 rounded ${
                    product.inStock
                        ? "bg-blue-500 text-white hover:bg-blue-600"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
            >
                {product.inStock ? "Add to Cart" : "Out of Stock"}
            </button>
        </div>
    );
}
