import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthPage({ setIsAuthenticated }:  { setIsAuthenticated: (auth: boolean) => void }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      localStorage.setItem("token", "dummy-auth-token");
      setIsAuthenticated(true);
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          {isSignUp ? "Create an Account": "Welcome Back"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
        {isSignUp && (
         <input 
            type="text"
            placeholder="Name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}

          <input 
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          

          <input 
            type="password"
            placeholder="password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button 
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              {isSignUp ? "Sign Up" : "Login"}
            </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-500">
          {isSignUp ? "Already have an account?": "Don't have an account?"}{""}
          <span
           onClick={() => setIsSignUp(!isSignUp)}
           className="text-blue-600 cursor-pointer hover:underline"
           >
            {isSignUp ? "Login here" : "Sign up"}
           </span>
        </p>
      </div>

    </div>
  );
}