import { useEffect, useState } from "react";
import { getInventory } from "../../services/api";
import BloodCard from "../../components/bloodCard";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";

function statusFor(units) {
  if (units <= 3) return "critical";
  if (units <= 8) return "low";
  return "healthy";
}

export default function BloodBankDashboard() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInventory()
      .then((res) => {
        setInventory(res.data || []);
      })
      .catch((error) => {
        console.error("Failed to load inventory:", error);
        setInventory([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const totalUnits = inventory.reduce(
    (sum, item) => sum + Number(item.units || 0),
    0
  );

  const criticalCount = inventory.filter(
    (item) => statusFor(Number(item.units || 0)) === "critical"
  ).length;

  const lowCount = inventory.filter(
    (item) => statusFor(Number(item.units || 0)) === "low"
  ).length;

  const healthyCount = inventory.filter(
    (item) => statusFor(Number(item.units || 0)) === "healthy"
  ).length;

  if (loading) {
    return <Loading label="Loading blood bank stock..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-7">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-11 h-11 rounded-xl bg-red-100 flex items-center justify-center text-2xl">
                  🩸
                </div>

                <div>
                  <p className="text-sm font-medium text-red-600">
                    BloodLink
                  </p>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Blood Bank Portal
                  </h1>
                </div>
              </div>

              <p className="text-gray-500 text-sm">
                Monitor blood supplies and manage your blood inventory.
              </p>
            </div>

            <Link
              to="/bloodbank/inventory"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition"
            >
              <span>⚙️</span>
              Manage Inventory
            </Link>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Overview */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900">
            Inventory Overview
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            A quick look at your current blood supply.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {/* Total */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total units</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {totalUnits}
                </p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-2xl">
                🩸
              </div>
            </div>

            <p className="text-xs text-gray-400 mt-4">
              Units currently available
            </p>
          </div>

          {/* Blood types */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Blood types</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {inventory.length}
                </p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-2xl">
                🧪
              </div>
            </div>

            <p className="text-xs text-gray-400 mt-4">
              Types currently tracked
            </p>
          </div>

          {/* Critical */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Critical stock</p>
                <p className="text-3xl font-bold text-red-600 mt-2">
                  {criticalCount}
                </p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-2xl">
                ⚠️
              </div>
            </div>

            <p className="text-xs text-gray-400 mt-4">
              {criticalCount > 0
                ? "Needs urgent restocking"
                : "No critical blood types"}
            </p>
          </div>

          {/* Healthy */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Healthy stock</p>
                <p className="text-3xl font-bold text-green-600 mt-2">
                  {healthyCount}
                </p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-2xl">
                ✓
              </div>
            </div>

            <p className="text-xs text-gray-400 mt-4">
              Blood types with healthy supply
            </p>
          </div>
        </div>

        {/* Alert */}
        {criticalCount > 0 && (
          <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-5">
            <div className="flex items-start gap-4">
              <div className="text-2xl">⚠️</div>

              <div>
                <h3 className="font-bold text-red-800">
                  Low blood supply alert
                </h3>

                <p className="text-sm text-red-700 mt-1">
                  {criticalCount} blood type
                  {criticalCount !== 1 ? "s" : ""} currently has a critical
                  stock level. Consider updating the inventory or arranging
                  restocking.
                </p>

                <Link
                  to="/bloodbank/inventory"
                  className="inline-block mt-3 text-sm font-semibold text-red-700 hover:text-red-900"
                >
                  Check inventory →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Stock section */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Stock by Blood Type
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Current availability for each blood group.
              </p>
            </div>

            <Link
              to="/bloodbank/inventory"
              className="text-sm font-semibold text-red-600 hover:text-red-700"
            >
              View full inventory →
            </Link>
          </div>

          {inventory.length === 0 ? (
            <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-xl">
              <div className="text-4xl mb-3">🩸</div>

              <h3 className="font-semibold text-gray-800">
                No inventory records yet
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Add blood stock from the Inventory page.
              </p>

              <Link
                to="/bloodbank/inventory"
                className="inline-block mt-5 px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-semibold hover:bg-red-700"
              >
                Go to Inventory
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {inventory.map((item) => (
                <BloodCard
                  key={item.bloodType}
                  bloodType={item.bloodType}
                  units={item.units}
                  status={statusFor(Number(item.units || 0))}
                />
              ))}
            </div>
          )}
        </div>

        {/* Status guide */}
        <div className="mt-8 bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="font-bold text-gray-900 mb-4">
            Stock Status Guide
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-green-50">
              <span className="w-3 h-3 rounded-full bg-green-500"></span>

              <div>
                <p className="font-semibold text-gray-800">Healthy</p>
                <p className="text-xs text-gray-500">More than 8 units</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl bg-yellow-50">
              <span className="w-3 h-3 rounded-full bg-yellow-500"></span>

              <div>
                <p className="font-semibold text-gray-800">Low</p>
                <p className="text-xs text-gray-500">4–8 units</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>

              <div>
                <p className="font-semibold text-gray-800">Critical</p>
                <p className="text-xs text-gray-500">0–3 units</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}