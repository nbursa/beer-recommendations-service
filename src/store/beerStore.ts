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
}

interface BeerState {
  beers: Beer[];
  fetchBeers: () => void;
}

export const useBeerStore = create<BeerState>((set, get) => ({
  beers: [],
  fetchBeers: async () => {
    if (get().beers.length === 0) {
      // Check if beers are already in the store
      const response = await fetch("https://api.sampleapis.com/beers/ale");
      const data = await response.json();
      set({ beers: data });
    }
  },
}));
