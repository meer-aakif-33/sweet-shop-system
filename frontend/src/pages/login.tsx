import api from "../api/client";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.email as HTMLInputElement).value;
    const password = (form.password as HTMLInputElement).value;

    try {
    const res = await api.post("/api/auth/login", { email, password });
    login(res.data.access_token, res.data.role);
    navigate("/");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <form onSubmit={submit} className="max-w-sm mx-auto mt-10 space-y-3">
      <h2 className="text-xl font-bold">Login</h2>
      <input name="email" placeholder="Email" className="border p-2 w-full" />
      <input
        name="password"
        type="password"
        placeholder="Password"
        className="border p-2 w-full"
      />
      <button className="bg-blue-600 text-white px-4 py-2 w-full">
        Login
      </button>
    </form>
  );
}
