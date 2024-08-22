import { Link } from "react-router-dom";
import { useBeerStore } from "../store/beerStore";
import { useEffect } from "react";
import LandingPageFilter from "../components/LandingPageFilter";

function LandingPage() {
  const { fetchBeers, filteredBeers } = useBeerStore();

  useEffect(() => {
    fetchBeers();
  }, [fetchBeers]);

  return (
    <div className="p-4 w-screen h-screen overflow-y-auto">
      <h1 className="text-4xl font-bold text-center mb-4">
        Craft Beer Emporium
      </h1>
      <LandingPageFilter />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-6 max-w-screen-xl mt-4 mx-auto">
        {filteredBeers.map((beer) => (
          <div
            key={beer.id}
            className="p-4 flex gap-4 border rounded transform transition duration-500 hover:scale-105"
          >
            <img
              src={beer.image}
              alt={beer.name}
              className="w-1/2 h-50 object-contain rounded"
            />
            <div className="w-1/2 flex flex-col justify-between">
              <div className="mb-4">
                <h2 className="text-xl font-bold">{beer.name}</h2>
                <div className="text-sm">
                  Price: <span className="text-xl">{beer.price}</span>
                </div>
                <div className="text-sm">
                  Rating:{" "}
                  <span className="text-lg">
                    {beer.rating.average.toFixed(2)}{" "}
                  </span>
                  <div className="text-xs italic">
                    ({beer.rating.reviews} reviews)
                  </div>
                </div>
              </div>
              <Link to={`/beer/${beer.id}`}>
                <button className="mt-auto px-4 py-2 text-sm text-primary rounded hover:bg-gray-200 hover:text-black">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LandingPage;
