import { useState, useEffect, useCallback } from "react";
import { Beer } from "../types/beer";

interface BeerFormProps {
  onSubmit: (beer: Partial<Beer>) => void;
  initialData?: Partial<Beer>;
  isEditing: boolean;
  onCancel: () => void;
}

const BeerForm: React.FC<BeerFormProps> = ({
  onSubmit,
  initialData = {
    id: null,
    name: "",
    price: "",
    rating: { average: 0, reviews: 0 },
    image: "",
  },
  isEditing,
  onCancel,
}) => {
  const [newBeer, setNewBeer] = useState<Partial<Beer>>(initialData);

  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setNewBeer(initialData);
    if (isEditing) {
      setIsExpanded(true);
    }
  }, [initialData, isEditing]);

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

  const handleSubmit = () => {
    onSubmit(newBeer);
    setNewBeer({
      id: null,
      name: "",
      price: "",
      rating: { average: 0, reviews: 0 },
      image: "",
    });
    setIsExpanded(false); // Collapse the form after submission
  };

  const handleCancel = () => {
    onCancel();
    setIsExpanded(false); // Collapse the form on cancel
  };

  return (
    <div className="max-w-screen-md mx-auto my-8">
      <div
        className="cursor-pointer text-center p-2 bg-gray-800 text-white hover:bg-gray-700 rounded-md mb-4 transition-transform duration-300"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="text-xl font-bold">
          {isExpanded
            ? "Hide Beer Form"
            : isEditing
            ? "Edit Beer"
            : "Add New Beer"}
        </h2>
      </div>
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isExpanded ? "max-h-screen" : "max-h-0"
        }`}
      >
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
        <div className="flex justify-center gap-4">
          <button
            onClick={handleSubmit}
            className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded"
          >
            {isEditing ? "Update Beer" : "Add Beer"}
          </button>
          {isEditing && (
            <button
              onClick={handleCancel}
              className="bg-red-500 hover:bg-red-400 text-white p-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BeerForm;
