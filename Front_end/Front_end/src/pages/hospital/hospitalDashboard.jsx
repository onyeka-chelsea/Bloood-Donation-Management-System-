import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getHospitalRequests } from "../../services/api";
import { useAuth } from "../../context/authContext";
import BloodCard from "../../components/BloodCard";
import Loading from "../../components/Loading";

const statusStyle = {
  Pending: "bg-amber-100 text-amber-700",
  Approved: "bg-blue-100 text-blue-700",
  Fulfilled: "bg-emerald-100 text-emerald-700",
  Rejected: "bg-rose-100 text-rose-700",
};

const urgencyStyle = {
  Critical: "bg-rose-100 text-rose-700",
  Urgent: "bg-orange-100 text-orange-700",
  Normal: "bg-gray-100 text-gray-600",
};

export default function HospitalDashboard() {
  const { user } = useAuth();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHospitalRequests()
      .then((res) => {
        setRequests(res.data || []);
      })
      .catch((error) => {
        console.error("Failed to load hospital requests:", error);
        setRequests([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading label="Loading your hospital dashboard..." />;
  }

  const pending = requests.filter(
    (request) => request.status === "Pending"
  ).length;

  const fulfilled = requests.filter(
    (request) => request.status === "Fulfilled"
  ).length;

  const critical = requests.filter(
    (request) =>
      request.urgency === "Critical" &&
      request.status !== "Fulfilled"
  ).length;

  const formatDate = (date) => {
    if (!date) return "—";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ================= HEADER ================= */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-11 h-11 rounded-xl bg-rose-100 flex items-center justify-center text-2xl">
                  🏥
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-rose-600">
                    BloodLink Hospital Portal
                  </p>

                  <h1 className="text-2xl font-bold text-gray-900">
                    Welcome, {user?.name || "Hospital"}
                  </h1>
                </div>
              </div>

              <p className="text-gray-500 text-sm">
                Manage your blood requests and monitor their progress.
              </p>
            </div>

            <Link
              to="/hospital/request"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-rose-600 text-white font-semibold text-sm hover:bg-rose-700 transition"
            >
              <span className="text-lg">+</span>
              New Blood Request
            </Link>

          </div>
        </div>
      </div>

      {/* ================= MAIN ================= */}
      <main className="max-w-6xl mx-auto px-6 py-8">

        {/* ================= QUICK MESSAGE ================= */}
        <div className="mb-8 bg-gradient-to-r from-rose-50 to-blue-50 border border-rose-100 rounded-2xl p-5">

          <div className="flex items-start gap-4">

            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-xl">
              🩸
            </div>

            <div>
              <h2 className="font-semibold text-gray-900">
                Blood supply overview
              </h2>

              <p className="text-sm text-gray-600 mt-1">
                Keep track of your hospital's blood requirements and
                follow each request from submission to fulfillment.
              </p>
            </div>

          </div>
        </div>

        {/* ================= STAT CARDS ================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">

          <BloodCard
            label="Total Requests"
            value={requests.length}
            icon="📋"
          />

          <BloodCard
            label="Pending"
            value={pending}
            icon="⏳"
          />

          <BloodCard
            label="Fulfilled"
            value={fulfilled}
            icon="✅"
          />

          <BloodCard
            label="Critical Open"
            value={critical}
            icon="🚨"
            sublabel={
              critical > 0
                ? "Needs attention"
                : "None open"
            }
          />

        </div>

        {/* ================= CRITICAL ALERT ================= */}
        {critical > 0 && (
          <div className="mb-8 bg-rose-50 border border-rose-200 rounded-2xl p-5">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

              <div className="flex items-start gap-3">

                <div className="text-2xl">
                  🚨
                </div>

                <div>
                  <h3 className="font-semibold text-rose-800">
                    Critical blood requests require attention
                  </h3>

                  <p className="text-sm text-rose-700 mt-1">
                    You currently have {critical} open critical{" "}
                    {critical === 1 ? "request" : "requests"}.
                  </p>
                </div>

              </div>

              <Link
                to="/hospital/request"
                className="text-sm font-semibold text-rose-700 hover:text-rose-900"
              >
                Create request →
              </Link>

            </div>
          </div>
        )}

        {/* ================= REQUESTS HEADER ================= */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Recent Blood Requests
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Your latest blood supply requests.
            </p>
          </div>

          <Link
            to="/hospital/request"
            className="text-sm font-semibold text-rose-600 hover:text-rose-700"
          >
            + New request
          </Link>

        </div>

        {/* ================= REQUEST TABLE ================= */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full text-sm">

              <thead className="bg-gray-50 border-b border-gray-100">

                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-gray-600">
                    Blood Type
                  </th>

                  <th className="px-6 py-4 text-left font-semibold text-gray-600">
                    Units
                  </th>

                  <th className="px-6 py-4 text-left font-semibold text-gray-600">
                    Urgency
                  </th>

                  <th className="px-6 py-4 text-left font-semibold text-gray-600">
                    Status
                  </th>

                  <th className="px-6 py-4 text-left font-semibold text-gray-600">
                    Date
                  </th>
                </tr>

              </thead>

              <tbody className="divide-y divide-gray-100">

                {requests.slice(0, 8).map((request) => (

                  <tr
                    key={request.id || request._id}
                    className="hover:bg-gray-50 transition"
                  >

                    {/* Blood Type */}
                    <td className="px-6 py-4">

                      <div className="flex items-center gap-3">

                        <div className="w-9 h-9 rounded-full bg-rose-50 flex items-center justify-center text-rose-600 font-bold">
                          🩸
                        </div>

                        <span className="font-bold text-gray-800">
                          {request.bloodType}
                        </span>

                      </div>

                    </td>

                    {/* Units */}
                    <td className="px-6 py-4 font-medium text-gray-700">
                      {request.units}
                    </td>

                    {/* Urgency */}
                    <td className="px-6 py-4">

                      <span
                        className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                          urgencyStyle[request.urgency] ||
                          "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {request.urgency || "Normal"}
                      </span>

                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">

                      <span
                        className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                          statusStyle[request.status] ||
                          "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {request.status || "Pending"}
                      </span>

                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 text-gray-500">
                      {formatDate(request.createdAt)}
                    </td>

                  </tr>

                ))}

                {/* Empty state */}
                {requests.length === 0 && (

                  <tr>

                    <td
                      colSpan={5}
                      className="px-6 py-14 text-center"
                    >

                      <div className="flex flex-col items-center">

                        <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center text-3xl mb-4">
                          🩸
                        </div>

                        <h3 className="font-semibold text-gray-800">
                          No blood requests yet
                        </h3>

                        <p className="text-sm text-gray-500 mt-1 mb-5">
                          Create your first blood request to get started.
                        </p>

                        <Link
                          to="/hospital/request"
                          className="px-5 py-2.5 rounded-lg bg-rose-600 text-white text-sm font-semibold hover:bg-rose-700 transition"
                        >
                          Create Blood Request
                        </Link>

                      </div>

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

        {/* ================= BOTTOM INFO ================= */}
        <div className="grid md:grid-cols-2 gap-5 mt-8">

          <div className="bg-white rounded-2xl border border-gray-100 p-6">

            <div className="flex items-center gap-3 mb-3">

              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-xl">
                📦
              </div>

              <h3 className="font-semibold text-gray-900">
                Need more blood?
              </h3>

            </div>

            <p className="text-sm text-gray-500 mb-4">
              Submit a new request with the blood type, number of
              units, and urgency level you need.
            </p>

            <Link
              to="/hospital/request"
              className="text-sm font-semibold text-rose-600 hover:text-rose-700"
            >
              Make a request →
            </Link>

          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6">

            <div className="flex items-center gap-3 mb-3">

              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-xl">
                ✓
              </div>

              <h3 className="font-semibold text-gray-900">
                Request tracking
              </h3>

            </div>

            <p className="text-sm text-gray-500">
              Monitor pending, approved, fulfilled, and rejected
              requests directly from your hospital dashboard.
            </p>

          </div>

        </div>

      </main>
    </div>
  );
}