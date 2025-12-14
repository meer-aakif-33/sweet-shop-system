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
    <nav className="bg-blue-600 text-white shadow">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo / Title */}
        <h1 className="text-xl font-bold tracking-wide">
          <span className="hidden sm:inline">🍬 </span>
          Sweet Shop
        </h1>

        {/* Links */}
        <div className="flex items-center gap-5">
          <Link
            to="/"
            className="font-medium hover:text-blue-100 transition"
          >
            Dashboard
          </Link>

          {role === "ADMIN" && (
            <span className="px-3 py-1 text-xs font-semibold
                             bg-white text-blue-600 rounded-full">
              ADMIN
            </span>
          )}

          <button
            onClick={handleLogout}
            className="bg-white text-blue-600 px-4 py-1.5 rounded-lg
                       font-medium hover:bg-blue-50 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
