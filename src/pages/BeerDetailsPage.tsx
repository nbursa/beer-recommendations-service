import { useParams } from "react-router-dom";
import { useBeerStore } from "../store/beerStore";
import { useEffect } from "react";

function BeerDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { getBeerById, fetchBeers } = useBeerStore();
  const beer = getBeerById(Number(id));

  useEffect(() => {
    if (!beer) {
      fetchBeers();
    }
  }, [beer, fetchBeers]);

  if (!beer) return <div>Loading...</div>;

  return (
    <div className="p-4 w-screen h-screen overflow-y-auto">
      <div className="max-w-xl mx-auto p-4 flex flex-col gap-4 rounded">
        <img
          src={beer.image}
          alt={beer.name}
          className="w-full max-w-52 max-h-52 mx-auto object-contain rounded"
        />
        <div className="flex flex-col justify-between gap-4">
          <h2 className="text-3xl text-center font-bold">{beer.name}</h2>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <span>Price: </span> <span className="text-lg">{beer.price}</span>
            </div>
            <div className="text-sm">
              <span>Rating: </span>
              <span className="text-lg">{beer.rating.average.toFixed(2)} </span>
              <div className="text-xs italic">
                ({beer.rating.reviews} reviews)
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <button className="w-full border bg-yellow-500 text-black hover:bg-yellow-400 hover:border-none hover:scale-105 transition duration-150 ease-in-out p-2 rounded">
              Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BeerDetailsPage;
