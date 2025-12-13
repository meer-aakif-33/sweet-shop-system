type Sweet = {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
};

export default function SweetCard({
  sweet,
  onBuy,
}: {
  sweet: Sweet;
  onBuy: (id: string) => void;
}) {
  return (
    <div className="border rounded p-4 flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold">{sweet.name}</h3>
        <p className="text-sm text-gray-600">{sweet.category}</p>
        <p className="mt-2 font-medium">₹{sweet.price}</p>
        <p className="mt-1 text-sm">
          {sweet.quantity} in stock
        </p>
      </div>
      <button
        onClick={() => onBuy(sweet.id)}
        disabled={sweet.quantity === 0}
        className={`mt-4 px-3 py-1 rounded text-white ${
          sweet.quantity === 0
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {sweet.quantity === 0 ? "Out of stock" : "Buy"}
      </button>
    </div>
  );
}
