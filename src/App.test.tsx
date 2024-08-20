import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { useBeerStore } from "./store/beerStore";
import App from "./App";

// Mock the `useBeerStore` hook using Vitest
vi.mock("./store/beerStore", () => {
  return {
    useBeerStore: vi.fn(),
  };
});

describe("App component", () => {
  it("renders Craft Beer Emporium title and beers", async () => {
    const beers = [
      {
        id: 1,
        name: "Founders All Day IPA",
        price: "$16.99",
        rating: { average: 4.41, reviews: 453 },
        image:
          "https://www.totalwine.com/media/sys_master/twmmedia/h00/h94/11891416367134.png",
      },
      {
        id: 2,
        name: "Blue Moon Belgian White Belgian-Style Wheat Ale",
        price: "$13.99",
        rating: { average: 4.77, reviews: 305 },
        image:
          "https://www.totalwine.com/media/sys_master/twmmedia/he8/h67/11931543830558.png",
      },
    ];

    // Mock the return value of useBeerStore
    (useBeerStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      beers,
      fetchBeers: vi.fn(),
    });

    render(<App />);

    // Check that the title is rendered
    expect(screen.getByText(/Craft Beer Emporium/i)).toBeInTheDocument();

    // Wait for the beers to be rendered
    await waitFor(() => {
      beers.forEach((beer) => {
        expect(screen.getByText(beer.name)).toBeInTheDocument();

        // Search for the price using `getAllByText`
        const priceElements = screen.getAllByText((_, element) =>
          element?.textContent ? element.textContent.includes(beer.price) : false
        );
        expect(priceElements.length).toBeGreaterThan(0);

        // Ensure the image is present
        expect(screen.getByAltText(beer.name)).toBeInTheDocument();
      });
    });
  });
});
