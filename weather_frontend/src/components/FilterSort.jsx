import React, { useState } from "react";

const FilterSort = ({ data, onUpdate }) => {
  const [cityFilter, setCityFilter] = useState("");

  // Unique weather descriptions for filter dropdown
  const uniqueDescriptions = [...new Set(data.map((item) => item.description))];
  const [descriptionFilter, setDescriptionFilter] = useState("");

  const handleApply = () => {
    let filtered = data;

    // Apply city name filter (case-insensitive partial match)
    if (cityFilter) {
      filtered = filtered.filter((item) =>
        item.city.toLowerCase().includes(cityFilter.toLowerCase()),
      );
    }

    // Apply description filter
    if (descriptionFilter) {
      filtered = filtered.filter(
        (item) => item.description === descriptionFilter,
      );
    }

    // Update ranks based on new filtered list (optional, keeps consistency)
    filtered = filtered.map((item, index) => ({
      ...item,
      rank: index + 1,
    }));

    onUpdate(filtered);
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col md:flex-row items-start md:items-end gap-4">
      <div className="flex flex-col w-full md:w-auto">
        <label className="text-sm text-gray-600 mb-1">Filter City</label>
        <input
          type="text"
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          placeholder="e.g., Colombo"
          className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>
      <div className="flex flex-col w-full md:w-auto">
        <label className="text-sm text-gray-600 mb-1">Filter Description</label>
        <select
          value={descriptionFilter}
          onChange={(e) => setDescriptionFilter(e.target.value)}
          className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          <option value="">All</option>
          {uniqueDescriptions.map((desc) => (
            <option key={desc} value={desc}>
              {desc}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleApply}
        className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition w-full md:w-auto md:mt-0"
      >
        Apply Filter
      </button>
    </div>
  );
};

export default FilterSort;
