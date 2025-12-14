import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-blue-600 text-white">
      <h1 className="text-lg font-bold">🍬 Sweet Shop</h1>

<div className="flex items-center space-x-4">
  <Link to="/" className="hover:underline">
    Dashboard
  </Link>

  {role === "ADMIN" && (
    <span className="text-sm opacity-80">(Admin Mode)</span>
  )}

  <button
    onClick={handleLogout}
    className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
  >
    Logout
  </button>
</div>

    </nav>
  );
}
