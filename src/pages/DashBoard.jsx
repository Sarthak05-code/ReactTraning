import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const DashBoard = () => {
  const navigate = useNavigate();

  // Guard route: redirect to /login if no auth token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm border-b px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="text-sm bg-red-500 text-white px-3 py-1.5 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </nav>

      <main className="p-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-800">Welcome Back!</h2>
          <p className="text-gray-600 mt-2">You are now logged in.</p>
        </div>
      </main>
    </div>
  );
};