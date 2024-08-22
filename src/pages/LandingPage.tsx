import { Link } from "react-router-dom";
import { useBeerStore } from "../store/beerStore";
import { useEffect } from "react";
import BeerFilter from "../components/BeerFilter";

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
      <div className="w-full md:w-2/3 lg:w-1/2 mx-auto">
        <BeerFilter />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-6 max-w-screen-xl mt-4 mx-auto">
        {filteredBeers.map((beer) => (
          <div
            key={beer.id}
            className="p-4 flex flex-col justify-between sm:flex-row lg:flex-col  gap-4 border border-black rounded transform transition duration-500 hover:scale-105"
          >
            <div className="flex items-center justify-center w-full sm:w-1/2 lg:w-full object-contain rounded">
              <img src={beer.image} alt={beer.name} className="" />
            </div>
            <div className="w-full sm:w-1/2 lg:w-full flex flex-col justify-between gap-4">
              <h2 className="text-2xl text-center sm:text-left font-bold">
                {beer.name}
              </h2>
              <div className="flex flex-row justify-between w-full mb-4">
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
                <button className="w-full mt-auto px-4 py-2 text-sm rounded bg-gray-800 text-white hover:bg-gray-700">
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
