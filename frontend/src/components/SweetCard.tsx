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
  const outOfStock = sweet.quantity === 0;

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg
                    transition p-5 flex flex-col justify-between">
      {/* Sweet Info */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800">
          {sweet.name}
        </h3>

        <p className="text-sm text-gray-500">
          {sweet.category}
        </p>

        <p className="mt-3 text-xl font-bold text-blue-600">
          ₹{sweet.price}
        </p>

        <p
          className={`mt-1 text-sm ${
            outOfStock ? "text-red-500" : "text-gray-600"
          }`}
        >
          {outOfStock
            ? "Out of stock"
            : `${sweet.quantity} available`}
        </p>
      </div>

      {/* Action */}
      <button
        onClick={() => onBuy(sweet.id)}
        disabled={outOfStock}
        className={`mt-4 w-full py-2 rounded-lg font-medium text-white
          transition
          ${
            outOfStock
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
      >
        {outOfStock ? "Unavailable" : "Buy Now"}
      </button>
    </div>
  );
}
