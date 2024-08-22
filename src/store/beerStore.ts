import { create } from "zustand";
import { BeerState } from "../types/beer";

export const useBeerStore = create<BeerState>((set, get) => ({
  beers: [],
  filteredBeers: [],
  filters: {
    name: "",
    minPrice: "",
    maxPrice: "",
    minRating: "",
    maxRating: "",
    sortBy: "",
    sortOrder: "asc",
  },
  fetchBeers: async () => {
    if (get().beers.length === 0) {
      const response = await fetch("https://api.sampleapis.com/beers/ale");
      const data = await response.json();
      set({ beers: data });
      get().applyFilters();
    }
  },
  getBeerById: (id: number) => {
    return get().beers.find((beer) => beer.id === id);
  },
  setFilters: (filters) => {
    set((state) => ({
      filters: { ...state.filters, ...filters },
    }));
    get().applyFilters();
  },
  applyFilters: () => {
    const { beers, filters } = get();
    const filtered = beers.filter((beer) => {
      const matchName = filters.name
        ? beer.name
            ?.toLocaleLowerCase()
            .includes(filters.name.toLocaleLowerCase())
        : true;
      const matchPrice =
        (filters.minPrice
          ? parseFloat(beer.price.replace("$", "")) >=
            parseFloat(filters.minPrice)
          : true) &&
        (filters.maxPrice
          ? parseFloat(beer.price.replace("$", "")) <=
            parseFloat(filters.maxPrice)
          : true);
      const matchRating =
        (filters.minRating
          ? beer.rating?.average >= parseFloat(filters.minRating)
          : true) &&
        (filters.maxRating
          ? beer.rating?.average <= parseFloat(filters.maxRating)
          : true);
      return matchName && matchPrice && matchRating;
    });

    // Sort the filtered beers based on the selected sort option and order
    const sorted = [...filtered].sort((a, b) => {
      const orderMultiplier = filters.sortOrder === "asc" ? 1 : -1;
      if (filters.sortBy === "name") {
        return orderMultiplier * a.name.localeCompare(b.name);
      } else if (filters.sortBy === "price") {
        return (
          orderMultiplier *
          (parseFloat(a.price.replace("$", "")) -
            parseFloat(b.price.replace("$", "")))
        );
      } else if (filters.sortBy === "rating") {
        return orderMultiplier * (b.rating.average - a.rating.average);
      }
      return 0;
    });

    set({ filteredBeers: sorted });
  },
  addBeer: (newBeer) => {
    set((state) => ({
      beers: [...state.beers, newBeer],
    }));
    get().applyFilters();
  },
  updateBeer: (updatedBeer) => {
    set((state) => ({
      beers: state.beers.map((beer) =>
        beer.id === updatedBeer.id ? updatedBeer : beer
      ),
    }));
    get().applyFilters();
  },
  deleteBeer: (id) => {
    set((state) => ({
      beers: state.beers.filter((beer) => beer.id !== id),
    }));
    get().applyFilters();
  },
}));
