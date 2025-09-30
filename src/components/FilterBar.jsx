import React from "react";

export default function CategoryFilter({ categories, selectedCategories, setSelectedCategories }) {
    const handleCategoryChange = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter((c) => c !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    return (
        <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
                <label key={cat} className="flex items-center gap-1">
                    <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => handleCategoryChange(cat)}
                    />
                    {cat}
                </label>
            ))}
        </div>
    );
}
