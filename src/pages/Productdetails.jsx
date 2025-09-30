import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import productsData from "../data/Products.js";

export default function ProductDetails({ cart, setCart }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const product = productsData.find((p) => p.id === id);

    if (!product) return <p>Product not found.</p>;

    const addToCart = () => {
        const updated = [...cart];
        const existing = updated.find(item => item.id === product.id);
        if (existing) {
            existing.quantity += 1;
        } else {
            updated.push({ ...product, quantity: 1 });
        }
        setCart(updated);
        localStorage.setItem("cart", JSON.stringify(updated));
    };

    return (
        <div className="container mx-auto p-4">
            <button onClick={() => navigate(-1)} className="mb-4 bg-gray-200 px-3 py-1 rounded">
                &larr; Back
            </button>
            <div className="flex flex-col md:flex-row gap-4">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full md:w-1/2 h-96 object-cover rounded"
                    onError={(e) => (e.target.src = "/images/placeholder.jpg")}
                />
                <div className="flex-1 flex flex-col gap-2">
                    <h1 className="text-3xl font-bold">{product.name}</h1>
                    <p className="text-gray-500">{product.brand}</p>
                    <p className="font-bold text-xl">₨ {product.price}</p>
                    <p className="text-yellow-500">{`⭐ ${product.rating}`}</p>
                    <p className="mt-2">{product.description || "No description available."}</p>
                    <button
                        disabled={!product.inStock}
                        onClick={addToCart}
                        className={`mt-auto py-2 px-4 rounded ${product.inStock
                                ? "bg-blue-500 text-white cursor-pointer hover:bg-blue-600"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                    >
                        {product.inStock ? "Add to Cart" : "Out of Stock"}
                    </button>
                </div>
            </div>
        </div>
    );
}
