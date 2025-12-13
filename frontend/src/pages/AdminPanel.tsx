import { useEffect, useState } from "react";
import api from "../api/client";

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
      name: form.name,
      category: form.category,
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
    await api.delete(`/api/sweets/${id}`);
    loadSweets();
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">Admin Panel</h2>

      <div className="border p-4 space-y-2">
        <h3 className="font-semibold">Add Sweet</h3>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-1 w-full"
        />
        <input
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="border p-1 w-full"
        />
        <input
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="border p-1 w-full"
        />
        <input
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          className="border p-1 w-full"
        />
        <button
          onClick={addSweet}
          className="bg-green-600 text-white px-3 py-1"
        >
          Add Sweet
        </button>
      </div>

      <div className="space-y-2">
        {sweets.map((s) => (
          <div key={s.id} className="border p-2 flex justify-between">
            <span>
              {s.name} ({s.quantity})
            </span>
            <div className="space-x-2">
              <button
                onClick={() => restock(s.id)}
                className="bg-blue-600 text-white px-2"
              >
                Restock
              </button>
              <button
                onClick={() => remove(s.id)}
                className="bg-red-600 text-white px-2"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
