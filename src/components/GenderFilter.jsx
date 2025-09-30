import React from "react";

export default function GenderFilter({ genders, gender, setGender }) {
    return (
        <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className=" p-2 "
        >
            <option value="">All Genders</option>
            {genders.map((g) => (
                <option key={g} value={g}>
                    {g}
                </option>
            ))}
        </select>
    );
}
