import { useEffect, useState } from "react";
import api from "../api/client";
import Navbar from "../components/Navbar";

type Sweet = {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
};

export default function AdminPanel() {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  const loadSweets = async () => {
    const res = await api.get("/api/sweets");
    setSweets(res.data);
  };

  useEffect(() => {
    loadSweets();
  }, []);

  const addSweet = async () => {
    await api.post("/api/sweets", {
      ...form,
      price: Number(form.price),
      quantity: Number(form.quantity),
    });
    setForm({ name: "", category: "", price: "", quantity: "" });
    loadSweets();
  };

  const restock = async (id: string) => {
    await api.post(`/api/sweets/${id}/restock?amount=5`);
    loadSweets();
  };

const remove = async (id: string) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this sweet?"
  );

  if (!confirmed) return;

  await api.delete(`/api/sweets/${id}`);
  loadSweets();
};

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>

        {/* Add Sweet Card */}
        <div className="bg-white shadow rounded-xl p-5 space-y-3">
          <h3 className="font-semibold text-lg">Add Sweet</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border rounded-lg px-3 py-2"
            />
            <input
              placeholder="Category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="border rounded-lg px-3 py-2"
            />
            <input
              placeholder="Price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="border rounded-lg px-3 py-2"
            />
            <input
              placeholder="Quantity"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
              className="border rounded-lg px-3 py-2"
            />
          </div>

          <button
            onClick={addSweet}
            className="bg-green-600 hover:bg-green-700
                       text-white px-4 py-2 rounded-lg transition"
          >
            Add Sweet
          </button>
        </div>

        {/* Sweet List */}
        <div className="bg-white shadow rounded-xl divide-y">
          {sweets.map((s) => (
            <div
              key={s.id}
              className="flex items-center justify-between p-4"
            >
              <div>
                <p className="font-medium">
                  {s.name}
                </p>
                <p className="text-sm text-gray-500">
                  Qty: {s.quantity}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => restock(s.id)}
                  className="bg-blue-600 hover:bg-blue-700
                             text-white px-3 py-1 rounded-md"
                >
                  Restock
                </button>
                <button
                  onClick={() => remove(s.id)}
                  className="bg-red-600 hover:bg-red-700
                             text-white px-3 py-1 rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
