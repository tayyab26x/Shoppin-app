import React from "react";

export default function ProductCart({ item, updateQty, removeItem }) {
    return (
        <div className="flex justify-between items-center border-b py-2">
            <div className="flex items-center gap-2">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                    onError={(e) => (e.target.src = "/images/placeholder.jpg")}
                />
                <div>
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-gray-500">{item.brand}</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <input
                    type="number"
                    min="1"
                    value={item.qty}
                    onChange={(e) => updateQty(item.id, Number(e.target.value))}
                    className="w-16 border p-1 rounded"
                />
                <p className="font-bold">₨ {item.price * item.qty}</p>
                <button
                    onClick={() => removeItem(item.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                >
                    Remove
                </button>
            </div>
        </div>
    );
}
