import { useEffect, useState } from "react";
import { getDonationHistory } from "../../services/api";
import Loading from "../../components/Loading";
const stageOrder = ["Donated", "Processed", "Shared", "Follow-up"];
export default function DonationHistory() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    getDonationHistory()
      .then((res) => setDonations(res.data))
      .catch(() =>
        setError("Couldn't load your donation history right now.")
      )
      .finally(() => setLoading(false));
  }, []);
  if (loading) {
    return <Loading label="Loading your donation history..." />;
  }
  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 py-8 sm:py-10">
      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-11 h-11 rounded-full bg-red-100 flex items-center justify-center text-xl">
              🩸
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Donation History
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Track your donations and see the journey of your blood.
              </p>
            </div>
          </div>
        </div>
        {/* Error Message */}
        {error && (
          <div className="mb-6 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            {error}
          </div>
        )}
        {/* Empty State */}
        {!error && donations.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm text-center py-16 px-6">
            <div className="text-5xl mb-4">🩸</div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              No donations yet
            </h2>
            <p className="text-gray-500 text-sm max-w-md mx-auto">
              Once you make your first donation, you'll be able to track
              its journey here.
            </p>
          </div>
        )}
        {/* Donation Cards */}
        <div className="space-y-5">
          {donations.map((d) => {
            const completedStages = d.completedStages || [];
            const progress =
              (completedStages.length / stageOrder.length) * 100;
            return (
              <div
                key={d.id}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-6"
              >
                {/* Donation Information */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-xl">
                      🩸
                    </div>
                    <div>
                      <h2 className="font-bold text-gray-800">
                        {d.donationType}
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">
                        Unit #{d.unitId}
                      </p>
                      <p className="text-sm text-gray-500">
                        {d.status === "Booked"
                          ? "Scheduled for"
                          : "Donated"}{" "}
                        {new Date(d.donatedOn).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  {/* Status */}
                  <span
                    className={`self-start sm:self-center text-xs font-semibold px-3 py-2 rounded-full ${
                      d.status === "Completed"
                        ? "bg-emerald-50 text-emerald-700"
                        : d.status === "Booked"
                        ? "bg-blue-50 text-blue-700"
                        : d.status === "Cancelled"
                        ? "bg-gray-100 text-gray-600"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {d.status}
                  </span>
                </div>
                {/* Journey Title */}
                <div className="mb-3">
                  <h3 className="text-sm font-semibold text-gray-800">
                    Blood Journey
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Follow the progress of your donation.
                  </p>
                </div>
                {/* Journey Stages */}
                <div className="grid grid-cols-4 gap-2 text-center mb-3">
                  {stageOrder.map((stage) => {
                    const completed = completedStages.includes(stage);
                    return (
                      <div key={stage}>
                        <div
                          className={`mx-auto mb-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                            completed
                              ? "bg-emerald-500 text-white"
                              : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          {completed ? "✓" : "•"}
                        </div>
                        <span
                          className={`text-xs ${
                            completed
                              ? "text-emerald-600 font-semibold"
                              : "text-gray-400"
                          }`}
                        >
                          {stage}
                        </span>
                      </div>
                    );
                  })}
                </div>
                {/* Progress Bar */}
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>
                {/* Progress Text */}
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-400">
                    Donation progress
                  </span>
                  <span className="text-xs font-semibold text-emerald-600">
                    {Math.round(progress)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}