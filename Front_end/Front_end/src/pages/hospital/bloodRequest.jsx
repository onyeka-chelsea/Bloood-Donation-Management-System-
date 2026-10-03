import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  createBloodRequest,
  getHospitalRequests,
} from "../../services/api";
import Loading from "../../components/Loading";

const bloodTypes = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
];

const urgencyLevels = ["Routine", "Urgent", "Critical"];

const urgencyStyle = {
  Routine: "bg-gray-100 text-gray-700 border-gray-200",
  Urgent: "bg-amber-100 text-amber-700 border-amber-200",
  Critical: "bg-rose-100 text-rose-700 border-rose-200",
};

const statusStyle = {
  Pending: "bg-amber-100 text-amber-700",
  Approved: "bg-blue-100 text-blue-700",
  Fulfilled: "bg-emerald-100 text-emerald-700",
  Rejected: "bg-rose-100 text-rose-700",
};

export default function BloodRequest() {
  const [form, setForm] = useState({
    bloodType: "O-",
    units: 1,
    urgency: "Routine",
    reason: "",
    location: "",
  });

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const loadRequests = () => {
    getHospitalRequests()
      .then((res) => {
        setRequests(res.data || []);
      })
      .catch((error) => {
        console.error("Failed to load requests:", error);
        setRequests([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleUrgencyChange = (level) => {
    setForm((previous) => ({
      ...previous,
      urgency: level,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);
    setStatus(null);

    try {
      await createBloodRequest({
        ...form,
        units: Number(form.units),
      });

      setStatus({
        type: "success",
        message:
          "Blood request dispatched successfully. The blood bank can now review it.",
      });

      setForm({
        bloodType: "O-",
        units: 1,
        urgency: "Routine",
        reason: "",
        location: "",
      });

      loadRequests();
    } catch (error) {
      console.error("Failed to create blood request:", error);

      setStatus({
        type: "error",
        message:
          error?.response?.data?.message ||
          "Could not send the request. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

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
        <div className="max-w-6xl mx-auto px-6 py-7">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <div>
              <div className="flex items-center gap-3">

                <div className="w-11 h-11 rounded-xl bg-rose-100 flex items-center justify-center text-2xl">
                  🩸
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-rose-600">
                    BloodLink Hospital Portal
                  </p>

                  <h1 className="text-2xl font-bold text-gray-900">
                    Request Blood
                  </h1>
                </div>

              </div>

              <p className="text-gray-500 text-sm mt-2">
                Submit a blood request and track its progress.
              </p>
            </div>

            <Link
              to="/hospital/dashboard"
              className="text-sm font-semibold text-gray-600 hover:text-rose-600"
            >
              ← Back to Dashboard
            </Link>

          </div>
        </div>
      </div>

      {/* ================= MAIN ================= */}
      <main className="max-w-6xl mx-auto px-6 py-8">

        <div className="grid lg:grid-cols-5 gap-8">

          {/* ================= REQUEST FORM ================= */}
          <section className="lg:col-span-3">

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

              <div className="mb-6">

                <h2 className="text-lg font-bold text-gray-900">
                  New Blood Request
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Provide the details of the blood your hospital needs.
                </p>

              </div>

              {/* SUCCESS */}
              {status?.type === "success" && (
                <div className="mb-5 flex items-start gap-3 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-4">

                  <span className="text-lg">
                    ✓
                  </span>

                  <div>
                    <p className="font-semibold">
                      Request sent successfully
                    </p>

                    <p className="mt-1">
                      {status.message}
                    </p>
                  </div>

                </div>
              )}

              {/* ERROR */}
              {status?.type === "error" && (
                <div className="mb-5 flex items-start gap-3 text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-xl px-4 py-4">

                  <span className="text-lg">
                    !
                  </span>

                  <div>
                    <p className="font-semibold">
                      Request failed
                    </p>

                    <p className="mt-1">
                      {status.message}
                    </p>
                  </div>

                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* Blood Type + Units */}
                <div className="grid sm:grid-cols-2 gap-5">

                  <div>
                    <label className="text-sm font-semibold text-gray-700">
                      Blood Type
                    </label>

                    <select
                      name="bloodType"
                      value={form.bloodType}
                      onChange={handleChange}
                      required
                      className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-400"
                    >
                      {bloodTypes.map((bloodType) => (
                        <option
                          key={bloodType}
                          value={bloodType}
                        >
                          {bloodType}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700">
                      Units Needed
                    </label>

                    <input
                      type="number"
                      name="units"
                      min="1"
                      max="100"
                      value={form.units}
                      onChange={handleChange}
                      required
                      className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-400"
                    />
                  </div>

                </div>

                {/* Urgency */}
                <div>

                  <label className="text-sm font-semibold text-gray-700">
                    Urgency Level
                  </label>

                  <div className="grid grid-cols-3 gap-2 mt-2">

                    {urgencyLevels.map((level) => (

                      <button
                        type="button"
                        key={level}
                        onClick={() => handleUrgencyChange(level)}
                        className={`py-3 rounded-xl text-sm font-semibold border transition ${
                          form.urgency === level
                            ? "bg-rose-600 text-white border-rose-600"
                            : "bg-white text-gray-600 border-gray-300 hover:border-rose-300"
                        }`}
                      >
                        {level}
                      </button>

                    ))}

                  </div>

                </div>

                {/* Location */}
                <div>

                  <label className="text-sm font-semibold text-gray-700">
                    Hospital Location
                  </label>

                  <input
                    type="text"
                    name="location"
                    required
                    value={form.location}
                    onChange={handleChange}
                    placeholder="e.g. General Hospital, Yaoundé"
                    className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-400"
                  />

                </div>

                {/* Reason */}
                <div>

                  <label className="text-sm font-semibold text-gray-700">
                    Reason / Notes
                  </label>

                  <textarea
                    name="reason"
                    rows={4}
                    value={form.reason}
                    onChange={handleChange}
                    placeholder="e.g. Emergency trauma care, surgery, maternity..."
                    className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-rose-400"
                  />

                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-xl bg-rose-600 text-white font-semibold hover:bg-rose-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting
                    ? "Dispatching Request..."
                    : "Dispatch Blood Request"}
                </button>

              </form>

            </div>
          </section>

          {/* ================= SIDE INFO ================= */}
          <aside className="lg:col-span-2 space-y-5">

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

              <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center text-2xl mb-4">
                🩸
              </div>

              <h2 className="font-bold text-gray-900">
                How it works
              </h2>

              <div className="space-y-5 mt-5">

                <div className="flex gap-3">

                  <div className="w-7 h-7 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center text-xs font-bold shrink-0">
                    1
                  </div>

                  <div>
                    <p className="font-semibold text-sm text-gray-800">
                      Submit your request
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      Tell us the blood type, units, and urgency you need.
                    </p>
                  </div>

                </div>

                <div className="flex gap-3">

                  <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold shrink-0">
                    2
                  </div>

                  <div>
                    <p className="font-semibold text-sm text-gray-800">
                      Blood bank reviews it
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      Your request can be reviewed by an authorized blood bank.
                    </p>
                  </div>

                </div>

                <div className="flex gap-3">

                  <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold shrink-0">
                    3
                  </div>

                  <div>
                    <p className="font-semibold text-sm text-gray-800">
                      Track fulfillment
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      Follow the request status from your hospital dashboard.
                    </p>
                  </div>

                </div>

              </div>

            </div>

            <div className="bg-rose-50 border border-rose-100 rounded-2xl p-5">

              <div className="flex gap-3">

                <span className="text-xl">
                  🚨
                </span>

                <div>
                  <h3 className="font-semibold text-rose-800">
                    Critical requests
                  </h3>

                  <p className="text-sm text-rose-700 mt-1">
                    Use Critical only when the blood is urgently required
                    for patient care.
                  </p>
                </div>

              </div>

            </div>

          </aside>
        </div>

        {/* ================= REQUEST HISTORY ================= */}
        <section className="mt-10">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">

            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Your Requests
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Track the blood requests submitted by your hospital.
              </p>
            </div>

            <span className="text-sm text-gray-500">
              {requests.length}{" "}
              {requests.length === 1 ? "request" : "requests"}
            </span>

          </div>

          {loading ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-10">
              <Loading label="Loading your requests..." />
            </div>
          ) : requests.length === 0 ? (

            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">

              <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center text-3xl mx-auto mb-4">
                📋
              </div>

              <h3 className="font-semibold text-gray-800">
                No requests yet
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Your submitted blood requests will appear here.
              </p>

            </div>

          ) : (

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

              {requests.map((request) => (

                <div
                  key={request.id || request._id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
                >

                  <div className="flex items-start justify-between gap-3">

                    <div>

                      <div className="flex items-center gap-2">

                        <div className="w-9 h-9 rounded-full bg-rose-50 flex items-center justify-center">
                          🩸
                        </div>

                        <div>
                          <p className="font-bold text-gray-900">
                            {request.bloodType}
                          </p>

                          <p className="text-xs text-gray-500">
                            {request.units}{" "}
                            {request.units === 1 ? "unit" : "units"}
                          </p>
                        </div>

                      </div>

                    </div>

                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        urgencyStyle[request.urgency] ||
                        urgencyStyle.Routine
                      }`}
                    >
                      {request.urgency || "Routine"}
                    </span>

                  </div>

                  <div className="mt-5 space-y-3">

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">
                        Status
                      </span>

                      <span
                        className={`font-semibold px-2.5 py-1 rounded-full text-xs ${
                          statusStyle[request.status] ||
                          "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {request.status || "Pending"}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm gap-4">

                      <span className="text-gray-500">
                        Location
                      </span>

                      <span className="text-gray-700 font-medium text-right">
                        {request.location || "Not provided"}
                      </span>

                    </div>

                    <div className="flex justify-between text-sm">

                      <span className="text-gray-500">
                        Date
                      </span>

                      <span className="text-gray-700">
                        {formatDate(request.createdAt)}
                      </span>

                    </div>

                  </div>

                  {request.reason && (
                    <div className="mt-4 pt-4 border-t border-gray-100">

                      <p className="text-xs font-semibold text-gray-500 mb-1">
                        Reason
                      </p>

                      <p className="text-sm text-gray-700">
                        {request.reason}
                      </p>

                    </div>
                  )}

                </div>

              ))}

            </div>

          )}

        </section>

      </main>
    </div>
  );
}