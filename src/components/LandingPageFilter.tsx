import { useBeerStore } from "../store/beerStore";
import { useState } from "react";

function LandingPageFilter() {
  const { filters, setFilters } = useBeerStore();
  const [isExpanded, setIsExpanded] = useState(true);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters({ [name]: value });
  };

  return (
    <div className="p-4 w-full md:w-2/3 lg:w-1/2 mx-auto">
      <div
        className="cursor-pointer text-center p-2 bg-gray-800 text-white rounded-md mb-4 transition-transform duration-300 hover:bg-gray-700"
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
        </div>
      </div>
    </div>
  );
}

export default LandingPageFilter;
