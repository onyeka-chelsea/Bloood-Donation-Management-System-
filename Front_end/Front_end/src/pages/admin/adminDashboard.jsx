import { useEffect, useState } from "react";
import { getAllUsers, getSystemStats } from "../../services/api";
import BloodCard from "../../components/bloodCard";
import Loading from "../../components/Loading";
const roleFilters = ["all", "donor", "hospital", "bloodbank", "admin"];
export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    loadAdminData();
  }, []);
  const loadAdminData = async () => {
    setLoading(true);
    setError("");
    try {
      const [statsRes, usersRes] = await Promise.all([
        getSystemStats(),
        getAllUsers(),
      ]);
      setStats(statsRes.data || {});
      setUsers(usersRes.data || []);
    } catch (error) {
      console.error("Failed to load admin data:", error);
      setError(
        "Couldn't load admin data. Please check your backend connection."
      );
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <Loading label="Loading admin dashboard..." />;
  }
  const visibleUsers = users.filter((user) => {
    const matchesRole =
      filter === "all" || user.role === filter;
    const query = search.toLowerCase().trim();
    const matchesSearch =
      !query ||
      user.name?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query);
    return matchesRole && matchesSearch;
  });
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-7">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-11 h-11 rounded-xl bg-red-100 flex items-center justify-center text-2xl">
                  🛡️
                </div>
                <div>
                  <p className="text-sm font-medium text-red-600">
                    BloodLink
                  </p>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Admin Dashboard
                  </h1>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                Manage users and monitor the BloodLink system.
              </p>
            </div>
            <button
              type="button"
              onClick={loadAdminData}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition"
            >
              🔄 Refresh Data
            </button>
          </div>
        </div>
      </div>
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}
        {/* Overview */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            System Overview
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            A quick look at the current BloodLink platform activity.
          </p>
        </div>
        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          <BloodCard
            label="Total users"
            value={stats?.totalUsers ?? users.length}
            icon="👥"
            sublabel="Registered accounts"
          />
          <BloodCard
            label="Donors"
            value={stats?.totalDonors ?? "—"}
            icon="🩸"
            sublabel="Registered donors"
          />
          <BloodCard
            label="Hospitals"
            value={stats?.totalHospitals ?? "—"}
            icon="🏥"
            sublabel="Registered hospitals"
          />
          <BloodCard
            label="Donations"
            value={stats?.totalDonations ?? "—"}
            icon="❤️"
            sublabel="Recorded donations"
          />
        </div>
        {/* User Management */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          {/* Section header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  User Management
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Search and filter registered BloodLink users.
                </p>
              </div>
              {/* Search */}
              <input
                type="text"
                placeholder="Search name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full lg:w-72 rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
            {/* Filters */}
            <div className="flex flex-wrap gap-2 mt-5">
              {roleFilters.map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setFilter(role)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold border capitalize transition ${
                    filter === role
                      ? "bg-red-600 text-white border-red-600"
                      : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {role === "all" ? "All Users" : role}
                </button>
              ))}
            </div>
          </div>
          {/* User count */}
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
            <p className="text-sm text-gray-600">
              Showing{" "}
              <span className="font-bold text-gray-900">
                {visibleUsers.length}
              </span>{" "}
              user
              {visibleUsers.length !== 1 ? "s" : ""}
            </p>
          </div>
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500 text-left">
                <tr>
                  <th className="px-6 py-4 font-semibold">
                    Name
                  </th>
                  <th className="px-6 py-4 font-semibold">
                    Email
                  </th>
                  <th className="px-6 py-4 font-semibold">
                    Role
                  </th>
                  <th className="px-6 py-4 font-semibold">
                    Joined
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {visibleUsers.map((user) => (
                  <tr
                    key={user.id || user._id}
                    className="hover:bg-gray-50 transition"
                  >
                    {/* Name */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center text-red-700 font-bold">
                          {user.name
                            ? user.name.charAt(0).toUpperCase()
                            : "U"}
                        </div>
                        <span className="font-semibold text-gray-800">
                          {user.name || "Unknown user"}
                        </span>
                      </div>
                    </td>
                    {/* Email */}
                    <td className="px-6 py-4 text-gray-600">
                      {user.email || "—"}
                    </td>
                    {/* Role */}
                    <td className="px-6 py-4">
                      <span className="inline-flex px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-semibold capitalize">
                        {user.role || "unknown"}
                      </span>
                    </td>
                    {/* Joined */}
                    <td className="px-6 py-4 text-gray-500">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : "—"}
                    </td>
                  </tr>
                ))}
                {visibleUsers.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-12 text-center"
                    >
                      <div className="text-4xl mb-3">
                        👥
                      </div>
                      <p className="font-semibold text-gray-800">
                        No users found
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Try changing your search or role filter.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        {/* Admin Information */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <div className="text-2xl mb-3">👥</div>
            <h3 className="font-bold text-gray-900">
              Users
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              View registered donors, hospitals, blood banks and administrators.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <div className="text-2xl mb-3">🩸</div>
            <h3 className="font-bold text-gray-900">
              Blood Network
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Monitor activity across the BloodLink blood donation network.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <div className="text-2xl mb-3">📊</div>
            <h3 className="font-bold text-gray-900">
              System Activity
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Keep track of donations, users and platform activity.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

