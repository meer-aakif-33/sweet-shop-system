import api from "../api/client";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.email as HTMLInputElement).value;
    const password = (form.password as HTMLInputElement).value;

    try {
      await api.post("/api/auth/register", { email, password });
      navigate("/login");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <form onSubmit={submit} className="max-w-sm mx-auto mt-10 space-y-3">
      <h2 className="text-xl font-bold">Register</h2>
      <input name="email" placeholder="Email" className="border p-2 w-full" />
      <input
        name="password"
        type="password"
        placeholder="Password"
        className="border p-2 w-full"
      />
      <button className="bg-green-600 text-white px-4 py-2 w-full">
        Register
      </button>
    </form>
  );
}
