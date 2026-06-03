import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("auth", "true");
    navigate("/admin");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[360px] bg-white rounded-xl border border-gray-200 shadow-sm p-8">
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="text-blue-900 text-2xl mb-2">
            ↔
          </div>
          <h1 className="text-3xl font-bold text-blue-900">
            Jio Discover
          </h1>
          <p className="text-sm text-gray-500">
            Network topology platform
          </p>
        </div>

        {/* Form */}
        <form>
          {/* Username */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Username
            </label>
            <input
              type="email"
              placeholder="netops@jio.com"
              className="w-full h-11 px-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Password */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full h-11 px-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full h-11 bg-blue-900 hover:bg-blue-800 text-white font-semibold rounded-lg transition"
            onClick={handleLogin}
          >
            Sign in
          </button>

        </form>

        {/* Roles */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400 mb-3">
            Role (demo)
          </p>
          <div className="flex justify-center gap-2">
            <button className="px-4 py-1 text-xs border border-gray-300 rounded-full text-gray-500">
              Viewer
            </button>
            <button className="px-4 py-1 text-xs rounded-full border border-blue-900 bg-blue-100 text-blue-900 font-semibold">
              Operator
            </button>
            <button className="px-4 py-1 text-xs border border-gray-300 rounded-full text-gray-500">
              Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;