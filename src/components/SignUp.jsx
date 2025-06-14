// import { useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { NavLink, useNavigate } from "react-router-dom";

// export default function Signup() {
//   const { signup } = useAuth();
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [passwordConfirm, setPasswordConfirm] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (password !== passwordConfirm) {
//       setError("Passwords do not match");
//       return;
//     }

//     setLoading(true);
//     try {
//       await signup(email, password);
//       console.log("Signup success");
//       navigate("/"); // ✅ Redirect to home after successful signup
//     } catch (err) {
//       console.error("Signup error:", err);
//       setError("Failed to create an account");
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="flex min-h-screen">
//       {/* Left side - Signup form */}
//       <div className="w-1/2 flex flex-col justify-center items-center bg-white p-8">
//         <h2 className="text-3xl font-bold mb-6">Create an Account</h2>
//         <form onSubmit={handleSubmit} className="w-full max-w-sm">
//           {error && (
//             <div className="mb-4 text-red-600 font-semibold">{error}</div>
//           )}
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff004f]"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff004f]"
//           />
//           <input
//             type="password"
//             placeholder="Confirm Password"
//             value={passwordConfirm}
//             onChange={(e) => setPasswordConfirm(e.target.value)}
//             required
//             className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff004f]"
//           />
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-[#f62164] text-white py-2 rounded-md hover:bg-[#ff004f]transition disabled:opacity-50"
//           >
//             {loading ? "Signing up..." : "Sign Up"}
//           </button>
//         </form>
//       </div>

//       {/* Right side - Description */}
//       <div className="w-1/2 bg-[#ff004f] text-white p-10 flex flex-col justify-center items-center">
//         <h2 className="text-4xl font-bold mb-4">Join Us Today!</h2>
//         <p className="text-lg max-w-md text-center">
//           Create your account to access all notes and enjoy seamless note management.
//         </p>

//         <p className="mt-4 text-center text-sm">
//           Already have an account?{" "}
//           <NavLink to="/login" className="text-white underline hover:text-gray-300">
//             Log in
//           </NavLink>
//         </p>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth"; // ✅

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== passwordConfirm) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signup(email, password);
      const user = userCredential.user;

      await sendEmailVerification(user); // ✅ send email
      alert("A verification email has been sent. Please check your inbox.");

      navigate("/login"); // ✅ redirect to login after signup
    } catch (err) {
      console.error("Signup error:", err);
      setError("Failed to create an account");
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Signup form */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white p-8">
        <h2 className="text-3xl font-bold mb-6">Create an Account</h2>
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
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff004f]"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
            className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff004f]"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#f62164] text-white py-2 rounded-md hover:bg-[#ff004f] transition disabled:opacity-50"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
      </div>

      {/* Right side - Description */}
      <div className="w-1/2 bg-[#ff004f] text-white p-10 flex flex-col justify-center items-center">
        <h2 className="text-4xl font-bold mb-4">Join Us Today!</h2>
        <p className="text-lg max-w-md text-center">
          Create your account to access all notes and enjoy seamless note management.
        </p>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <NavLink to="/login" className="text-white underline hover:text-gray-300">
            Log in
          </NavLink>
        </p>
      </div>
    </div>
  );
}
