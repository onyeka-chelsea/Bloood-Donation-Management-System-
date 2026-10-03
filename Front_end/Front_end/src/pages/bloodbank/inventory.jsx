import { useEffect, useState } from "react";
import { getInventory, updateInventory } from "../../services/api";
import Loading from "../../components/Loading";
export default function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const [message, setMessage] = useState("");
  useEffect(() => {
    loadInventory();
  }, []);
  const loadInventory = async () => {
    try {
      const res = await getInventory();
      setInventory(res.data || []);
    } catch (error) {
      console.error("Failed to load inventory:", error);
      setInventory([]);
      setMessage("Failed to load inventory.");
    } finally {
      setLoading(false);
    }
  };
  const getItemId = (item) => item.id || item._id;
  const handleUnitsChange = (id, value) => {
    const units = Math.max(0, Number(value));
    setInventory((prev) =>
      prev.map((item) =>
        getItemId(item) === id
          ? { ...item, units }
          : item
      )
    );
  };
  const handleSave = async (item) => {
    const id = getItemId(item);
    if (!id) {
      setMessage("This inventory record has no valid ID.");
      return;
    }
    setSavingId(id);
    setMessage("");
    try {
      await updateInventory(id, {
        units: Number(item.units),
      });
      setMessage(`${item.bloodType} inventory updated successfully.`);
      // Refresh data from the backend
      const res = await getInventory();
      setInventory(res.data || []);
    } catch (error) {
      console.error("Failed to update inventory:", error);
      setMessage(`Failed to update ${item.bloodType} inventory.`);
    } finally {
      setSavingId(null);
    }
  };
  const getStatus = (units) => {
    if (units <= 3) {
      return {
        label: "Critical",
        className: "bg-red-100 text-red-700",
      };
    }
    if (units <= 8) {
      return {
        label: "Low",
        className: "bg-yellow-100 text-yellow-700",
      };
    }
    return {
      label: "Healthy",
      className: "bg-green-100 text-green-700",
    };
  };
  if (loading) {
    return <Loading label="Loading inventory..." />;
  }
  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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
                    Blood Inventory
                  </h1>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                Update blood stock as donations arrive or units are dispatched.
              </p>
            </div>
          </div>
        </div>
        {/* Message */}
        {message && (
          <div
            className={`mb-6 rounded-xl px-4 py-3 text-sm font-medium ${
              message.includes("successfully")
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {message}
          </div>
        )}
        {/* Inventory table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">
              Current Stock
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Manage the number of available units for each blood type.
            </p>
          </div>
          {inventory.length === 0 ? (
            <div className="text-center py-16 px-6">
              <div className="text-5xl mb-4">🩸</div>
              <h3 className="font-semibold text-gray-800 text-lg">
                No inventory records yet
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                There are currently no blood inventory records in the system.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-500 text-left">
                  <tr>
                    <th className="px-6 py-4 font-semibold">
                      Blood Type
                    </th>
                    <th className="px-6 py-4 font-semibold">
                      Units
                    </th>
                    <th className="px-6 py-4 font-semibold">
                      Status
                    </th>
                    <th className="px-6 py-4 font-semibold">
                      Last Updated
                    </th>
                    <th className="px-6 py-4 font-semibold text-right">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {inventory.map((item) => {
                    const id = getItemId(item);
                    const status = getStatus(Number(item.units || 0));
                    return (
                      <tr
                        key={id || item.bloodType}
                        className="hover:bg-gray-50 transition"
                      >
                        {/* Blood type */}
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center justify-center w-12 h-10 rounded-lg bg-red-50 text-red-700 font-bold">
                            {item.bloodType}
                          </span>
                        </td>
                        {/* Units */}
                        <td className="px-6 py-4">
                          <input
                            type="number"
                            min="0"
                            value={item.units ?? 0}
                            onChange={(e) =>
                              handleUnitsChange(
                                id,
                                e.target.value
                              )
                            }
                            className="w-24 rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                          />
                        </td>
                        {/* Status */}
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${status.className}`}
                          >
                            {status.label}
                          </span>
                        </td>
                        {/* Updated */}
                        <td className="px-6 py-4 text-gray-500">
                          {item.updatedAt
                            ? new Date(item.updatedAt).toLocaleString()
                            : "—"}
                        </td>
                        {/* Save */}
                        <td className="px-6 py-4 text-right">
                          <button
                            type="button"
                            onClick={() => handleSave(item)}
                            disabled={savingId === id}
                            className="px-4 py-2 rounded-lg bg-red-600 text-white text-xs font-semibold hover:bg-red-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
                          >
                            {savingId === id
                              ? "Saving..."
                              : "Save"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
        {/* Status guide */}
        <div className="mt-6 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">
            Stock Status Guide
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-green-50">
              <span className="w-3 h-3 rounded-full bg-green-500" />
              <div>
                <p className="font-semibold text-gray-800">
                  Healthy
                </p>
                <p className="text-xs text-gray-500">
                  More than 8 units
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-yellow-50">
              <span className="w-3 h-3 rounded-full bg-yellow-500" />
              <div>
                <p className="font-semibold text-gray-800">
                  Low
                </p>
                <p className="text-xs text-gray-500">
                  4–8 units
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <div>
                <p className="font-semibold text-gray-800">
                  Critical
                </p>
                <p className="text-xs text-gray-500">
                  0–3 units
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

