import { useEffect, useState, useMemo } from "react";
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
import BeerFilter from "../components/BeerFilter";
import BeerForm from "../components/BeerForm";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function ManagementPage() {
  const { beers, fetchBeers, addBeer, updateBeer, deleteBeer, filteredBeers } =
    useBeerStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editingBeer, setEditingBeer] = useState<Partial<Beer> | undefined>();

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

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const handleFormSubmit = (beer: Partial<Beer>) => {
    if (isEditing) {
      updateBeer(beer as Beer);
    } else {
      addBeer(beer as Beer);
    }
    setIsEditing(false);
    setEditingBeer(undefined);
  };

  const handleEdit = (beer: Beer) => {
    setIsEditing(true);
    setEditingBeer(beer);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingBeer(undefined);
  };

  const handleDelete = (id: number | null) => {
    if (id) deleteBeer(id);
  };

  if (!beers.length) return <div>Loading...</div>;

  return (
    <div className="p-4 w-screen h-screen overflow-y-auto">
      <h1 className="text-4xl font-bold text-center">Management View</h1>

      <div className="w-full max-w-screen-md mx-auto mt-4">
        <Bar
          data={chartData}
          options={chartOptions}
          className="w-full h-full"
        />
      </div>

      <div className="max-w-screen-md mx-auto mt-8">
        <h2 className="text-3xl text-center font-bold mb-4">Manage Beers</h2>

        <BeerForm
          onSubmit={handleFormSubmit}
          initialData={editingBeer}
          isEditing={isEditing}
          onCancel={handleCancel}
        />

        {!isEditing && (
          <>
            <BeerFilter />
            <div className="grid gap-4 xl:gap-6 max-w-screen-xl mt-4 mx-auto">
              {filteredBeers.map((beer) => (
                <div
                  key={beer.id}
                  className="p-4 flex flex-col sm:flex-row gap-4 border rounded transform transition duration-500 hover:scale-105"
                >
                  <img
                    src={beer.image}
                    alt={beer.name}
                    className="w-1/2 h-40 object-contain rounded"
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
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleEdit(beer)}
                        className="w-1/2 bg-yellow-500 text-white p-2 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(beer.id)}
                        className="w-1/2 bg-red-500 text-white p-2 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ManagementPage;
