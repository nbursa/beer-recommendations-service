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
import { useBeerStore } from "../store/beerStore";
import { useEffect } from "react";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function ManagementPage() {
  const { beers, fetchBeers } = useBeerStore();

  useEffect(() => {
    if (!beers.length) {
      fetchBeers();
    }
  }, [beers, fetchBeers]);

  if (!beers.length) return <div>Loading...</div>;

  const topBeers = beers
    .sort((a, b) => b.rating.reviews - a.rating.reviews)
    .slice(0, 10);

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

  return (
    <div className="p-4 w-screen h-screen overflow-y-auto">
      <h1 className="text-4xl font-bold text-center">Management View</h1>
      <div className="max-w-screen-md mx-auto mt-4">
        <Bar data={chartData} />
      </div>
    </div>
  );
}

export default ManagementPage;
