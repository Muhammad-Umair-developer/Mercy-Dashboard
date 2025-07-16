import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import images from "../../constants/images";

// Authentication context will be used later
interface LoginCredentials {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!credentials.email || !credentials.password) {
      setError("Please enter both email and password");
      return;
    }

    // Use the AuthContext login method
    const loginSuccess = login(credentials.email, credentials.password);

    if (loginSuccess) {
      // Redirect to dashboard
      navigate("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex h-screen w-full">
      {/* Left side - Background Image */}
      <div
        className="hidden md:flex md:w-1/2 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${images.login})` }}
      >
        <div className="absolute inset-0 bg-opacity-40 flex items-center justify-center">
          <img src={images.logo1} alt="Logo" className="h-[281px] w-[613px]" />
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-gray-50">
        <div className="w-full max-w-sm">
          <div className="bg-white rounded-3xl border border-[#992C55] p-8 shadow-sm">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold text-gray-900">Login</h1>
              <p className="text-gray-500 text-sm mt-1">
                Login to your account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                  {error}
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                  placeholder="Input email address"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#992C55] focus:border-transparent bg-gray-50 text-gray-700 placeholder-gray-400"
                  autoComplete="off"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  placeholder="Input password"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#992C55] focus:border-transparent bg-gray-50 text-gray-700 placeholder-gray-400"
                  autoComplete="new-password"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#992C55] hover:bg-[#7b2244] text-white font-medium rounded-lg transition duration-300 mt-6"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
