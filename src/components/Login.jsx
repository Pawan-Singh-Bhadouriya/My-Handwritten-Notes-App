import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, NavLink } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // ✅ Redirect after successful login
    } catch (err) {
      setError("Failed to log in. Please check your credentials.");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Form */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white p-8">
        <h2 className="text-3xl font-bold mb-6">Log in to Your Account</h2>
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          {error && (
            <div className="mb-4 text-red-600 font-semibold">{error}</div>
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff004f]"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff004f]"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#f62164] text-white py-2 rounded-md hover:bg-[#ff004f] transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <NavLink to="/signup" className="text-[#ff004f] hover:underline">
            Sign up
          </NavLink>
        </p>
      </div>

      {/* Right side - Description */}
      <div className="w-1/2 bg-[#ff004f] text-white p-10 flex flex-col justify-center items-center">
        <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
        <p className="text-lg max-w-md text-center">
          Access your notes anytime, anywhere. Manage, download, and preview all
          your semester notes with ease.
        </p>
      </div>
    </div>
  );
}
