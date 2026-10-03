import { useState } from "react";
import { bookDonation } from "../../services/api";

const donationTypes = [
  {
    name: "Whole Blood",
    icon: "🩸",
    description: "The most common type of donation",
  },
  {
    name: "Platelets",
    icon: "🧬",
    description: "Helps patients with clotting needs",
  },
  {
    name: "Plasma",
    icon: "💧",
    description: "Supports patients with blood disorders",
  },
];

const centers = [
  "General Hospital (Ngousso)",
  "Central Hospital",
  "Red Cross Center",
];

export default function BookDonation() {
  const [form, setForm] = useState({
    donationType: "Whole Blood",
    center: centers[0],
    date: "",
    time: "",
  });

  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);

    try {
      await bookDonation(form);

      setStatus("success");

      setForm({
        ...form,
        date: "",
        time: "",
      });
    } catch (err) {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* PAGE HEADER */}
      <section className="bg-gradient-to-br from-rose-50 via-white to-blue-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-12">

          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-xl bg-rose-100 flex items-center justify-center text-xl">
              🩸
            </div>

            <span className="text-sm font-semibold text-rose-600">
              DONOR APPOINTMENT
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Book your donation
          </h1>

          <p className="mt-3 text-gray-600 max-w-2xl">
            Choose your donation type, preferred center, and a convenient
            appointment time. Every appointment brings us one step closer
            to saving another life.
          </p>

        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="max-w-6xl mx-auto px-6 py-10">

        <div className="grid lg:grid-cols-3 gap-8">

          {/* FORM */}
          <div className="lg:col-span-2">

            {status === "success" && (
              <div className="mb-6 flex gap-3 items-start text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-4">
                <span className="text-lg">✓</span>

                <div>
                  <p className="font-bold">
                    Appointment request sent!
                  </p>

                  <p className="mt-1">
                    Your request has been submitted. You'll receive a
                    confirmation once the donation center accepts it.
                  </p>
                </div>
              </div>
            )}

            {status === "error" && (
              <div className="mb-6 flex gap-3 items-start text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-xl px-4 py-4">
                <span className="text-lg">!</span>

                <div>
                  <p className="font-bold">
                    We couldn't book your appointment.
                  </p>

                  <p className="mt-1">
                    Something went wrong. Please check your information and
                    try again.
                  </p>
                </div>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8"
            >

              {/* STEP 1 */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center text-sm font-bold">
                    1
                  </div>

                  <div>
                    <h2 className="font-bold text-gray-900">
                      Choose donation type
                    </h2>

                    <p className="text-sm text-gray-500">
                      Select the type of donation you would like to make.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-3">

                  {donationTypes.map((type) => (
                    <button
                      type="button"
                      key={type.name}
                      onClick={() =>
                        setForm({
                          ...form,
                          donationType: type.name,
                        })
                      }
                      className={`text-left rounded-xl border p-4 transition ${
                        form.donationType === type.name
                          ? "border-rose-500 bg-rose-50 ring-1 ring-rose-500"
                          : "border-gray-200 bg-white hover:border-rose-200"
                      }`}
                    >

                      <div className="text-2xl">
                        {type.icon}
                      </div>

                      <p className="mt-3 text-sm font-bold text-gray-900">
                        {type.name}
                      </p>

                      <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                        {type.description}
                      </p>

                    </button>
                  ))}

                </div>
              </div>

              <div className="my-8 border-t border-gray-100"></div>

              {/* STEP 2 */}
              <div>

                <div className="flex items-center gap-3 mb-5">

                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-bold">
                    2
                  </div>

                  <div>
                    <h2 className="font-bold text-gray-900">
                      Choose donation center
                    </h2>

                    <p className="text-sm text-gray-500">
                      Select where you would like to donate.
                    </p>
                  </div>

                </div>

                <label className="text-sm font-semibold text-gray-700">
                  Donation center
                </label>

                <select
                  name="center"
                  value={form.center}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-rose-400"
                >
                  {centers.map((center) => (
                    <option key={center} value={center}>
                      {center}
                    </option>
                  ))}
                </select>

              </div>

              <div className="my-8 border-t border-gray-100"></div>

              {/* STEP 3 */}
              <div>

                <div className="flex items-center gap-3 mb-5">

                  <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-sm font-bold">
                    3
                  </div>

                  <div>
                    <h2 className="font-bold text-gray-900">
                      Choose your appointment
                    </h2>

                    <p className="text-sm text-gray-500">
                      Select a date and time that works for you.
                    </p>
                  </div>

                </div>

                <div className="grid md:grid-cols-2 gap-5">

                  <div>
                    <label className="text-sm font-semibold text-gray-700">
                      Date
                    </label>

                    <input
                      type="date"
                      name="date"
                      required
                      value={form.date}
                      onChange={handleChange}
                      className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-400"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700">
                      Time
                    </label>

                    <input
                      type="time"
                      name="time"
                      required
                      value={form.time}
                      onChange={handleChange}
                      className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-400"
                    />
                  </div>

                </div>

              </div>

              <div className="mt-8">

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-xl bg-rose-600 text-white font-bold hover:bg-rose-700 disabled:opacity-60 transition"
                >
                  {submitting
                    ? "Booking appointment..."
                    : "Reserve donation slot →"}
                </button>

              </div>

            </form>

          </div>

          {/* SIDE INFORMATION */}
          <aside className="space-y-5">

            {/* SUMMARY */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

              <h3 className="font-bold text-gray-900">
                Your appointment
              </h3>

              <div className="mt-5 space-y-4">

                <div>
                  <p className="text-xs text-gray-500">
                    Donation type
                  </p>

                  <p className="mt-1 font-semibold text-gray-800">
                    {form.donationType}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Center
                  </p>

                  <p className="mt-1 font-semibold text-gray-800">
                    {form.center}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Date
                  </p>

                  <p className="mt-1 font-semibold text-gray-800">
                    {form.date || "Not selected"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Time
                  </p>

                  <p className="mt-1 font-semibold text-gray-800">
                    {form.time || "Not selected"}
                  </p>
                </div>

              </div>

            </div>

            {/* PREPARATION */}
            <div className="rounded-2xl bg-blue-50 border border-blue-100 p-6">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                  💙
                </div>

                <h3 className="font-bold text-gray-900">
                  Before you donate
                </h3>

              </div>

              <ul className="mt-5 space-y-3 text-sm text-gray-600">

                <li className="flex gap-2">
                  <span className="text-green-600">✓</span>
                  Eat a healthy meal before your appointment.
                </li>

                <li className="flex gap-2">
                  <span className="text-green-600">✓</span>
                  Drink plenty of water.
                </li>

                <li className="flex gap-2">
                  <span className="text-green-600">✓</span>
                  Bring a valid identification document.
                </li>

                <li className="flex gap-2">
                  <span className="text-green-600">✓</span>
                  Get enough rest before donating.
                </li>

              </ul>

            </div>

            {/* IMPACT */}
            <div className="rounded-2xl bg-rose-600 text-white p-6">

              <div className="text-3xl">
                ❤️
              </div>

              <h3 className="mt-3 font-bold text-lg">
                Your donation matters
              </h3>

              <p className="mt-2 text-sm text-rose-100 leading-relaxed">
                A single donation can contribute to helping multiple patients
                in need of blood.
              </p>

            </div>

          </aside>

        </div>

      </main>

    </div>
  );
}