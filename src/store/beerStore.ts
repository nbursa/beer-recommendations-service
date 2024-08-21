import { create } from "zustand";

interface Rating {
  average: number;
  reviews: number;
}

interface Beer {
  id: number;
  name: string;
  image: string;
  price: string;
  rating: Rating;
  style?: string;
  details?: string;
  brand?: string;
}

interface BeerState {
  beers: Beer[];
  filteredBeers: Beer[];
  filters: {
    name: string;
    minPrice: string;
    maxPrice: string;
    minRating: string;
    maxRating: string;
    sortBy: string;
    sortOrder: "asc" | "desc";
  };
  fetchBeers: () => void;
  getBeerById: (id: number) => Beer | undefined;
  setFilters: (filters: Partial<BeerState["filters"]>) => void;
  applyFilters: () => void;
}

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
}));
