import { useBeerStore } from "../store/beerStore";
import { useState } from "react";

function BeerFilter() {
  const { filters, setFilters, applyFilters } = useBeerStore();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters({ [name]: value });
    applyFilters();
  };

  return (
    <div className="w-full mx-auto">
      <div
        className="cursor-pointer text-center p-2 bg-gray-800 text-white hover:bg-gray-700 rounded-md mb-4 transition-transform duration-300"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="text-xl font-bold">
          {isExpanded ? "Hide" : "Show"} Filters
        </h2>
      </div>
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isExpanded ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={filters.name}
              onChange={handleInputChange}
              className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 transition duration-300"
              placeholder="e.g., Dogfish"
            />
          </div>
          <div>
            <label className="block mb-2">Rating</label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                name="minRating"
                value={filters.minRating}
                onChange={handleInputChange}
                className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 transition duration-300"
                placeholder="Min"
              />
              <input
                type="number"
                name="maxRating"
                value={filters.maxRating}
                onChange={handleInputChange}
                className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 transition duration-300"
                placeholder="Max"
              />
            </div>
          </div>
          <div>
            <label className="block mb-2">Price</label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleInputChange}
                className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 transition duration-300"
                placeholder="Min"
              />
              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleInputChange}
                className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 transition duration-300"
                placeholder="Max"
              />
            </div>
          </div>
          <div>
            <label className="block mb-2">Sort By & Order</label>
            <div className="grid grid-cols-2 gap-2">
              <select
                name="sortBy"
                value={filters.sortBy}
                onChange={handleInputChange}
                className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 transition duration-300"
              >
                <option value="">None</option>
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="rating">Rating</option>
              </select>
              <select
                name="sortOrder"
                value={filters.sortOrder}
                onChange={handleInputChange}
                className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 transition duration-300"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BeerFilter;
