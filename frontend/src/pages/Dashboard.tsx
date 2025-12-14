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
    minPrice: "",
    maxPrice: "",
  });

  useEffect(() => {
    const fetchSweets = async () => {
      try {
        const res = await api.get("/api/sweets");
        setSweets(res.data);
      } catch (err) {
        console.error(err);
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
    setFilters({ name: "", minPrice: "", maxPrice: "" });
    const res = await api.get("/api/sweets");
    setSweets(res.data);
  };

  const handleBuy = async (id: string) => {
    try {
      await api.post(`/api/sweets/${id}/purchase`);
      setSweets((prev) =>
        prev.map((s) =>
          s.id === id ? { ...s, quantity: Math.max(s.quantity - 1, 0) } : s
        )
      );
    } catch {
      alert("Purchase failed");
    }
  };

  if (loading) {
    return <p className="p-6 text-center text-gray-500">Loading sweets...</p>;
  }

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Filter Card */}
        <div className="bg-white rounded-xl shadow p-5 space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Search & Filter
          </h3>

          <input
            placeholder="Search by name"
            value={filters.name}
            onChange={(e) =>
              setFilters({ ...filters, name: e.target.value })
            }
            className="w-full rounded-lg border px-3 py-2
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="grid grid-cols-2 gap-3">
            <input
              placeholder="Min price"
              value={filters.minPrice}
              onChange={(e) =>
                setFilters({ ...filters, minPrice: e.target.value })
              }
              className="rounded-lg border px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              placeholder="Max price"
              value={filters.maxPrice}
              onChange={(e) =>
                setFilters({ ...filters, maxPrice: e.target.value })
              }
              className="rounded-lg border px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-700
                         text-white px-4 py-2 rounded-lg transition"
            >
              Search
            </button>
            <button
              onClick={clearFilters}
              className="text-sm text-gray-500 hover:underline"
            >
              Clear filters
            </button>
          </div>
        </div>

        {/* Sweets Section */}
        <h2 className="text-2xl font-bold text-gray-800">
          Available Sweets
        </h2>

        {sweets.length === 0 ? (
          <p className="text-gray-500">No sweets available.</p>
        ) : (
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {sweets.map((s) => (
              <SweetCard key={s.id} sweet={s} onBuy={handleBuy} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
