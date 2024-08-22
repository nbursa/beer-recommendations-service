export interface Rating {
  average: number;
  reviews: number;
}

export interface Beer {
  id: number | null;
  name: string;
  image: string;
  price: string;
  rating: Rating;
  style?: string;
  details?: string;
  brand?: string;
}

export interface BeerState {
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
  addBeer: (newBeer: Beer) => void;
  updateBeer: (updatedBeer: Beer) => void;
  deleteBeer: (id: number) => void;
}
