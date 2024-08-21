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
      <h1 className="text-4xl font-bold text-center">{beer.name}</h1>
      <div className="max-w-screen-md mx-auto mt-4">
        <img
          src={beer.image}
          alt={beer.name}
          className="w-full h-60 object-cover"
        />
        <p>Price: {beer.price}</p>
        <p>
          Rating: {beer.rating.average.toFixed(2)} ({beer.rating.reviews}{" "}
          reviews)
        </p>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          Buy
        </button>
      </div>
    </div>
  );
}

export default BeerDetailsPage;
