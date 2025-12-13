import { useEffect, useState } from "react";
import api from "../api/client";
import SweetCard from "../components/SweetCard";

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
    <div className="p-4 space-y-4">
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
  );
}
