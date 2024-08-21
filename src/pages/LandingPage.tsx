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
      <h1 className="text-4xl font-bold text-center">Craft Beer Emporium</h1>
      <LandingPageFilter />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-6 max-w-screen-xl mt-4 mx-auto">
        {filteredBeers.map((beer) => (
          <div key={beer.id} className="p-4 border rounded">
            <img
              src={beer.image}
              alt={beer.name}
              className="w-full h-40 object-cover"
            />
            <h2 className="text-lg font-bold">{beer.name}</h2>
            <p>Price: {beer.price}</p>
            <p>
              Rating: {beer.rating.average.toFixed(2)} ({beer.rating.reviews}{" "}
              reviews)
            </p>
            <Link to={`/beer/${beer.id}`}>
              <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LandingPage;
