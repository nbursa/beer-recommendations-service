import { useEffect } from "react";
import { useBeerStore } from "./store/beerStore";

function App() {
  const { beers, fetchBeers } = useBeerStore();

  useEffect(() => {
    fetchBeers();
  }, [fetchBeers]);

  return (
    <div className="p-4 w-screen h-screen overflow-y-auto">
      <h1 className="text-4xl font-bold text-center">Craft Beer Emporium</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-6 max-w-screen-xl mt-4 mx-auto">
        {beers.map((beer) => (
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
            <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
              Buy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
