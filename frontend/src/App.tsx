import { AuthProvider } from "./auth/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <h1 className="text-2xl font-bold white">Sweet Shop</h1>
    </AuthProvider>
  );
}
