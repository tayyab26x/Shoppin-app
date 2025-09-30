import React from "react";

export default function CartPanel({ cart, setCart, open, onClose }) {
    if (!open) return null;

    const updateCart = (newCart) => {
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    };

    const increaseQty = (id) => {
        const updated = cart.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
        updateCart(updated);
    };

    const decreaseQty = (id) => {
        const updated = cart.map(item =>
            item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
        );
        updateCart(updated);
    };

    const removeItem = (id) => {
        const updated = cart.filter(item => item.id !== id);
        updateCart(updated);
    };

    const emptyCart = () => {
        updateCart([]);
    };

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg p-4 z-50 overflow-y-auto">
            <button className="text-red-500 mb-4" onClick={onClose}>Close ✕</button>
            <h2 className="text-xl font-bold mb-4">Cart ({cart.length})</h2>

            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <ul>
                        {cart.map(item => (
                            <li key={item.id} className="mb-4 border-b pb-2">
                                <p className="font-semibold">{item.name}</p>
                                <p>₨ {item.price} x {item.quantity}</p>
                                <div className="flex gap-2 mt-1">
                                    <button onClick={() => decreaseQty(item.id)} className="px-2 bg-gray-200 rounded">-</button>
                                    <button onClick={() => increaseQty(item.id)} className="px-2 bg-gray-200 rounded">+</button>
                                    <button onClick={() => removeItem(item.id)} className="px-2 bg-red-500 text-white rounded">Remove</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <p className="font-bold mt-4">Total: ₨ {total}</p>
                    <button onClick={emptyCart} className="mt-2 bg-red-500 text-white px-4 py-2 rounded">
                        Empty Cart
                    </button>
                </>
            )}
        </div>
    );
}
