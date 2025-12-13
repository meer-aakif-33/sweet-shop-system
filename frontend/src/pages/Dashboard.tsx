import { useEffect, useState } from "react";
import api from "../api/client";
import SweetCard from "../components/SweetCard";
import Navbar from "../components/Navbar";

type Sweet = {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
};

export default function Dashboard() {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    name: "",
    category: "",
    minPrice: "",
    maxPrice: "",
  });

  // Fetch sweets on mount
  useEffect(() => {
    const fetchSweets = async () => {
      try {
        const res = await api.get("/api/sweets");
        setSweets(res.data);
      } catch (err) {
        console.error("Failed to load sweets", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSweets();
  }, []);
const handleSearch = async () => {
  const params = new URLSearchParams();

  if (filters.name) params.append("name", filters.name);
  if (filters.minPrice) params.append("price_min", filters.minPrice);
  if (filters.maxPrice) params.append("price_max", filters.maxPrice);

  const res = await api.get(`/api/sweets/search?${params.toString()}`);
  setSweets(res.data);
};

const clearFilters = async () => {
  setFilters({ name: "", category: "", minPrice: "", maxPrice: "" });
  const res = await api.get("/api/sweets");
  setSweets(res.data);
};

  // Handle purchase
  const handleBuy = async (id: string) => {
    try {
      await api.post(`/api/sweets/${id}/purchase`);
      // Update local state
      setSweets((prev) =>
        prev.map((s) =>
          s.id === id
            ? { ...s, quantity: Math.max(s.quantity - 1, 0) }
            : s
        )
      );
    } catch (err) {
      console.error("Purchase failed", err);
      alert("Could not complete purchase");
    }
  };

  if (loading) {
    return <p className="p-4">Loading sweets...</p>;
  }

  return (
    <>
      <Navbar />
    <div className="p-4 space-y-4">
      <div className="border p-4 rounded space-y-3">
  <h3 className="font-semibold">Search & Filter</h3>

  <input
    placeholder="Search by name"
    value={filters.name}
    onChange={(e) =>
      setFilters({ ...filters, name: e.target.value })
    }
    className="border p-2 w-full"
  />

  <div className="grid grid-cols-2 gap-2">
    <input
      placeholder="Min price"
      value={filters.minPrice}
      onChange={(e) =>
        setFilters({ ...filters, minPrice: e.target.value })
      }
      className="border p-2"
    />
    <input
      placeholder="Max price"
      value={filters.maxPrice}
      onChange={(e) =>
        setFilters({ ...filters, maxPrice: e.target.value })
      }
      className="border p-2"
    />
  </div>

  <button
    onClick={handleSearch}
    className="bg-blue-600 text-white px-4 py-2 rounded"
  >
    Search
  </button>

  <button
    onClick={clearFilters}
    className="text-sm text-gray-600 underline ml-4"
  >
    Clear filters
  </button>
</div>

      <h2 className="text-2xl font-bold">Available Sweets</h2>
      {sweets.length === 0 ? (
        <p>No sweets available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {sweets.map((s) => (
            <SweetCard key={s.id} sweet={s} onBuy={handleBuy} />
          ))}
        </div>
      )}
    </div>
    </>
  );
}
