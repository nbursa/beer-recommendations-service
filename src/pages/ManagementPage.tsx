import { useEffect, useState, useMemo, useCallback } from "react";
import { useBeerStore } from "../store/beerStore";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Beer } from "../types/beer";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function ManagementPage() {
  const { beers, fetchBeers, addBeer, updateBeer, deleteBeer } = useBeerStore();
  const [newBeer, setNewBeer] = useState<Partial<Beer>>({
    id: null,
    name: "",
    price: "",
    rating: { average: 0, reviews: 0 },
    image: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!beers.length) {
      fetchBeers();
    }
  }, [beers, fetchBeers]);

  const topBeers = useMemo(() => {
    return beers
      .slice()
      .sort((a, b) => b.rating.reviews - a.rating.reviews)
      .slice(0, 10);
  }, [beers]);

  const chartData = {
    labels: topBeers.map((beer) => beer.name),
    datasets: [
      {
        label: "Top 10 Rated Beers",
        data: topBeers.map((beer) => beer.rating.reviews),
        backgroundColor: "rgba(75,192,192,0.6)",
      },
    ],
  };

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setNewBeer((prev) => {
        if (name.includes("rating")) {
          const [, key] = name.split(".");
          return {
            ...prev,
            rating: {
              ...prev.rating,
              [key]: parseFloat(value) || 0,
            },
          } as Partial<Beer>;
        } else {
          return { ...prev, [name]: value };
        }
      });
    },
    []
  );

  const handleSubmit = useCallback(() => {
    if (isEditing) {
      updateBeer(newBeer as Beer);
    } else {
      addBeer(newBeer as Beer);
    }
    setNewBeer({
      id: null,
      name: "",
      price: "",
      rating: { average: 0, reviews: 0 },
      image: "",
    });
    setIsEditing(false);
  }, [isEditing, newBeer, addBeer, updateBeer]);

  const handleEdit = useCallback((beer: Beer) => {
    setIsEditing(true);
    setNewBeer({
      ...beer,
      rating: {
        average: beer.rating?.average || 0,
        reviews: beer.rating?.reviews || 0,
      },
    });
  }, []);

  const handleDelete = useCallback(
    (id: number | null) => {
      if (id) deleteBeer(id);
    },
    [deleteBeer]
  );

  if (!beers.length) return <div>Loading...</div>;

  return (
    <div className="p-4 w-screen h-screen overflow-y-auto">
      <h1 className="text-4xl font-bold text-center">Management View</h1>
      <div className="max-w-screen-md mx-auto mt-4">
        <Bar data={chartData} />
      </div>
      <div className="max-w-screen-md mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">
          {isEditing ? "Edit" : "Add"} Beer
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="name"
            value={newBeer.name || ""}
            onChange={handleInputChange}
            placeholder="Name"
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            name="price"
            value={newBeer.price || ""}
            onChange={handleInputChange}
            placeholder="Price"
            className="border p-2 rounded w-full"
          />
          <input
            type="number"
            name="rating.average"
            value={newBeer.rating?.average || 0}
            onChange={handleInputChange}
            placeholder="Rating"
            className="border p-2 rounded w-full"
          />
          <input
            type="number"
            name="rating.reviews"
            value={newBeer.rating?.reviews || 0}
            onChange={handleInputChange}
            placeholder="Reviews"
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            name="image"
            value={newBeer.image || ""}
            onChange={handleInputChange}
            placeholder="Image URL"
            className="border p-2 rounded w-full"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white p-2 rounded"
        >
          {isEditing ? "Update Beer" : "Add Beer"}
        </button>
      </div>
      <div className="max-w-screen-md mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">Manage Beers</h2>
        <ul className="space-y-2">
          {beers.map((beer) => (
            <li
              key={beer.id}
              className="p-4 border rounded flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold">{beer.name}</h3>
                <p>Price: {beer.price}</p>
                <p>Rating: {beer.rating.average.toFixed(2)}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(beer)}
                  className="bg-yellow-500 text-white p-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(beer.id)}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ManagementPage;
