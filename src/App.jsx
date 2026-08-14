import { useState } from "react";

function App() {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    {
      title: "Total Listings",
      value: "128",
      change: "+12%",
      icon: "📦",
      color: "bg-emerald-100 text-emerald-700",
    },
    {
      title: "Active Products",
      value: "94",
      change: "+5%",
      icon: "✅",
      color: "bg-teal-100 text-teal-700",
    },
    {
      title: "Total Sales",
      value: "Rs 2,84,500",
      change: "+18%",
      icon: "💰",
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Pending Offers",
      value: "23",
      change: "-3%",
      icon: "📩",
      color: "bg-amber-100 text-amber-700",
    },
  ];

  const recentListings = [
    {
      id: 1,
      title: "iPhone 13 Pro - 256GB",
      price: "Rs 85,000",
      status: "Active",
      date: "2 hours ago",
    },
    {
      id: 2,
      title: "MacBook Air M1",
      price: "Rs 92,000",
      status: "Sold",
      date: "5 hours ago",
    },
    {
      id: 3,
      title: "Sony WH-1000XM4",
      price: "Rs 18,500",
      status: "Active",
      date: "1 day ago",
    },
    {
      id: 4,
      title: "Canon EOS 200D",
      price: "Rs 45,000",
      status: "Pending",
      date: "1 day ago",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              R
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">ReTrade</h1>
              <p className="text-xs text-gray-500">Second-Hand Marketplace</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full">
              🔔
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-semibold">
                A
              </div>
              <span className="text-sm font-medium text-gray-700">Admin</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
          <p className="text-gray-500 mt-1">
            Welcome back! Here's what's happening with your marketplace today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-2">
                    {stat.value}
                  </h3>
                  <p
                    className={`text-sm mt-2 font-medium ${
                      stat.change.startsWith("+")
                        ? "text-emerald-600"
                        : "text-red-500"
                    }`}
                  >
                    {stat.change} from last month
                  </p>
                </div>
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${stat.color}`}
                >
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Listings */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-semibold text-gray-800">Recent Listings</h3>
              <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                View All →
              </button>
            </div>

            <div className="divide-y divide-gray-100">
              {recentListings.map((item) => (
                <div
                  key={item.id}
                  className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-xl">
                      📱
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{item.title}</p>
                      <p className="text-sm text-gray-500">{item.date}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold text-gray-800">{item.price}</p>
                    <span
                      className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.status === "Active"
                          ? "bg-emerald-100 text-emerald-700"
                          : item.status === "Sold"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions + Summary */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-800 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 px-4 py-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl transition-colors font-medium">
                  <span>➕</span> Add New Product
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl transition-colors font-medium">
                  <span>📊</span> View Analytics
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl transition-colors font-medium">
                  <span>⚙️</span> Manage Categories
                </button>
              </div>
            </div>

            {/* Top Categories */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-800 mb-4">
                Top Categories
              </h3>
              <div className="space-y-4">
                {[
                  { name: "Electronics", count: 42, percent: 85 },
                  { name: "Fashion", count: 28, percent: 60 },
                  { name: "Books", count: 19, percent: 45 },
                  { name: "Furniture", count: 15, percent: 35 },
                ].map((cat, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700 font-medium">
                        {cat.name}
                      </span>
                      <span className="text-gray-500">{cat.count}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-emerald-500 h-2 rounded-full"
                        style={{ width: `${cat.percent}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
