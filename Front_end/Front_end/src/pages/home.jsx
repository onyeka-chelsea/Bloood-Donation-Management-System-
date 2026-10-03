import { Link } from "react-router-dom";

const stats = [
  { value: "2,400+", label: "Registered Donors" },
  { value: "6,100+", label: "Lives Impacted" },
  { value: "18", label: "Partner Hospitals" },
  { value: "24/7", label: "Emergency Support" },
];

const steps = [
  {
    number: "01",
    title: "Create your profile",
    text: "Register as a donor, hospital, or blood bank and securely manage your information.",
  },
  {
    number: "02",
    title: "Find or request blood",
    text: "Hospitals can request blood while eligible donors can discover opportunities to help.",
  },
  {
    number: "03",
    title: "Make an impact",
    text: "Book your donation, attend your appointment, and keep track of the lives you help.",
  },
];

const features = [
  {
    icon: "🩸",
    title: "Smart donor matching",
    text: "Connect urgent blood requests with suitable donors more efficiently.",
  },
  {
    icon: "🏥",
    title: "Hospital coordination",
    text: "Help hospitals manage requests and communicate their blood needs.",
  },
  {
    icon: "📦",
    title: "Blood inventory",
    text: "Blood banks can monitor available blood types and manage stock.",
  },
];

export default function Home() {
  return (
    <div className="bg-white text-gray-900">

      {/* HERO */}
      <section className="bg-gradient-to-br from-rose-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">

          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* LEFT */}
            <div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-rose-100 shadow-sm mb-6">
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>

                <span className="text-sm font-semibold text-rose-700">
                  BloodLink • Saving lives together
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Every drop can save a life.
                <span className="block text-rose-600">
                  Join the BloodLink community today.
                </span>
              </h1>

              <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-xl">
                BloodLink connects blood donors, hospitals, and blood banks
                through one simple platform — helping make blood available
                when and where it is needed.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">

                <Link
                  to="/register"
                  className="px-7 py-3.5 rounded-xl bg-rose-600 text-white font-semibold text-center hover:bg-rose-700 transition"
                >
                  Become a Donor →
                </Link>

                <Link
                  to="/login"
                  className="px-7 py-3.5 rounded-xl bg-white border border-gray-300 text-gray-700 font-semibold text-center hover:bg-gray-50 transition"
                >
                  Sign in
                </Link>

              </div>

              <div className="mt-8 flex items-center gap-3 text-sm text-gray-500">

                <div className="flex -space-x-2">

                  <div className="w-9 h-9 rounded-full bg-rose-100 border-2 border-white flex items-center justify-center">
                    🩸
                  </div>

                  <div className="w-9 h-9 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center">
                    🏥
                  </div>

                  <div className="w-9 h-9 rounded-full bg-green-100 border-2 border-white flex items-center justify-center">
                    ❤️
                  </div>

                </div>

                <span>
                  Donors, hospitals & blood banks working together
                </span>

              </div>

            </div>

            {/* RIGHT — EMERGENCY CARD */}
            <div>

              <div className="bg-white rounded-3xl border border-gray-100 shadow-lg p-7">

                <div className="flex items-center justify-between mb-6">

                  <div>
                    <p className="text-xs font-bold tracking-wider text-rose-600">
                      HIGH PRIORITY
                    </p>

                    <h2 className="text-xl font-bold mt-1">
                      Emergency blood request
                    </h2>
                  </div>

                  <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center text-2xl">
                    🩸
                  </div>

                </div>

                <div className="rounded-2xl bg-rose-50 border border-rose-100 p-5">

                  <div className="flex items-center justify-between">

                    <div>
                      <p className="text-sm text-gray-500">
                        Blood type needed
                      </p>

                      <p className="text-3xl font-bold text-rose-600 mt-1">
                        O−
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-gray-500">
                        Units required
                      </p>

                      <p className="text-2xl font-bold text-gray-900">
                        4
                      </p>
                    </div>

                  </div>

                </div>

                <div className="mt-5 space-y-4">

                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                      🏥
                    </div>

                    <div>
                      <p className="text-sm font-semibold">
                        Emergency Department
                      </p>

                      <p className="text-xs text-gray-500">
                        General Hospital
                      </p>
                    </div>

                  </div>

                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                      📍
                    </div>

                    <div>
                      <p className="text-sm font-semibold">
                        Yaoundé
                      </p>

                      <p className="text-xs text-gray-500">
                        Emergency request
                      </p>
                    </div>

                  </div>

                </div>

                <Link
                  to="/register"
                  className="block text-center mt-6 w-full py-3 rounded-xl bg-rose-600 text-white font-semibold hover:bg-rose-700 transition"
                >
                  I Can Help
                </Link>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-gray-100 bg-white">

        <div className="max-w-7xl mx-auto px-6 py-10">

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">

            {stats.map((stat) => (

              <div key={stat.label} className="text-center lg:text-left">

                <p className="text-3xl font-bold text-gray-900">
                  {stat.value}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  {stat.label}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="max-w-2xl">

          <p className="text-sm font-bold tracking-wider text-rose-600 uppercase">
            One platform. One mission.
          </p>

          <h2 className="mt-3 text-3xl md:text-4xl font-bold">
            Making blood donation easier and more connected.
          </h2>

          <p className="mt-4 text-gray-600 leading-relaxed">
            BloodLink brings together donors, hospitals and blood banks
            so they can coordinate more effectively and help patients
            receive the blood they need.
          </p>

        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-6">

          {features.map((feature) => (

            <div
              key={feature.title}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition"
            >

              <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center text-2xl">
                {feature.icon}
              </div>

              <h3 className="mt-5 text-lg font-bold">
                {feature.title}
              </h3>

              <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                {feature.text}
              </p>

            </div>

          ))}

        </div>

      </section>

      {/* HOW IT WORKS */}
      <section className="bg-gray-50 border-y border-gray-100">

        <div className="max-w-7xl mx-auto px-6 py-20">

          <div className="text-center max-w-2xl mx-auto">

            <p className="text-sm font-bold tracking-wider text-rose-600 uppercase">
              Simple process
            </p>


            {/* ABOUT */}
      <section
        id="about"
        className="bg-white border-t border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-10 items-center">

            <div>
              <p className="text-sm font-bold tracking-wider text-rose-600 uppercase">
                About BloodLink
              </p>

              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">
                Connecting people, hospitals and blood banks.
              </h2>

              <p className="mt-5 text-gray-600 leading-relaxed">
                BloodLink is a blood donation management platform designed
                to make it easier for donors, hospitals and blood banks to
                work together.
              </p>

              <p className="mt-4 text-gray-600 leading-relaxed">
                Donors can register and book donation appointments, hospitals
                can submit blood requests, and blood banks can monitor their
                available blood inventory.
              </p>
            </div>

            <div className="bg-rose-50 rounded-3xl border border-rose-100 p-8">
              <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-3xl shadow-sm">
                🩸
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-900">
                Our mission
              </h3>

              <p className="mt-3 text-gray-600 leading-relaxed">
                To make blood donation more organized, accessible and
                connected so that blood can reach patients when it is needed.
              </p>

              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                <div className="bg-white rounded-xl p-3">
                  <p className="text-xl font-bold text-rose-600">🩸</p>
                  <p className="text-xs text-gray-500 mt-1">Donors</p>
                </div>

                <div className="bg-white rounded-xl p-3">
                  <p className="text-xl font-bold text-rose-600">🏥</p>
                  <p className="text-xs text-gray-500 mt-1">Hospitals</p>
                </div>

                <div className="bg-white rounded-xl p-3">
                  <p className="text-xl font-bold text-rose-600">❤️</p>
                  <p className="text-xs text-gray-500 mt-1">Lives</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>



      {/* CONTACT */}
<section id="contact" className="bg-white border-t border-gray-100">
  <div className="max-w-7xl mx-auto px-6 py-20">

    <div className="max-w-2xl">
      <p className="text-sm font-bold tracking-wider text-rose-600 uppercase">
        Contact BloodLink
      </p>

      <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">
        We're here to help.
      </h2>

      <p className="mt-4 text-gray-600 leading-relaxed">
        Have a question about donating blood, requesting blood, or using
        BloodLink? Get in touch with our team.
      </p>
    </div>

    <div className="mt-10 grid md:grid-cols-2 gap-8">

      {/* Contact information */}
      <div className="bg-gray-50 rounded-3xl border border-gray-100 p-7">

        <h3 className="text-xl font-bold text-gray-900">
          Get in touch
        </h3>

        <div className="mt-6 space-y-5">

          <a
            href="mailto:bloodlink008@gmail.com"
            className="flex items-center gap-4 group"
          >
            <div className="w-11 h-11 rounded-xl bg-rose-100 flex items-center justify-center text-xl">
              📧
            </div>

            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-semibold text-gray-800 group-hover:text-rose-600 transition">
                bloodlink008@gmail.com
              </p>
            </div>
          </a>

          <a
            href="tel:+237652012763"
            className="flex items-center gap-4 group"
          >
            <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center text-xl">
              📞
            </div>

            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-semibold text-gray-800 group-hover:text-rose-600 transition">
                +237 652 012 763
              </p>
            </div>
          </a>

          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center text-xl">
              📍
            </div>

            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-semibold text-gray-800">
                Yaoundé, Cameroon
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Contact form */}
      <div className="bg-white rounded-3xl border border-gray-200 p-7 shadow-sm">

        <h3 className="text-xl font-bold text-gray-900">
          Send us a message
        </h3>

        <div className="mt-6 space-y-4">

          <input
            type="text"
            placeholder="Your name"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
          />

          <input
            type="email"
            placeholder="Your email"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
          />

          <textarea
            rows="4"
            placeholder="How can we help?"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
          />

          <a
            href="mailto:bloodlink008@gmail.com"
            className="block w-full text-center py-3 rounded-xl bg-rose-600 text-white font-semibold hover:bg-rose-700 transition"
          >
            Send Message
          </a>

        </div>
      </div>

    </div>
  </div>
</section>


{/* EMERGENCY SUPPORT */}
<section
  id="emergency"
  className="bg-rose-50 border-y border-rose-100"
>
  <div className="max-w-7xl mx-auto px-6 py-16">

    <div className="bg-white rounded-3xl border border-rose-100 shadow-sm p-8 md:p-10">

      <div className="grid md:grid-cols-2 gap-10 items-center">

        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-100 text-rose-700 text-sm font-bold">
            <span className="w-2 h-2 rounded-full bg-rose-600"></span>
            Emergency Blood Support
          </div>

          <h2 className="mt-5 text-3xl md:text-4xl font-bold text-gray-900">
            Need urgent blood support?
          </h2>

          <p className="mt-4 text-gray-600 leading-relaxed">
            If you are a hospital or authorized healthcare professional
            handling an urgent blood request, contact the BloodLink team
            for assistance.
          </p>

          <p className="mt-4 text-sm text-gray-500">
            For life-threatening emergencies, contact your local emergency
            medical services or the nearest hospital immediately.
          </p>
        </div>

        <div className="bg-rose-600 rounded-2xl p-7 text-white">

          <p className="text-rose-100 text-sm font-semibold uppercase tracking-wider">
            BloodLink Emergency Contact
          </p>

          <p className="mt-3 text-3xl font-bold">
            +237 652 012 763
          </p>

          <p className="mt-2 text-rose-100 text-sm">
            Available for BloodLink emergency support.
          </p>

          <a
            href="tel:+237652012763"
            className="inline-flex items-center justify-center gap-2 mt-6 w-full py-3.5 rounded-xl bg-white text-rose-600 font-bold hover:bg-rose-50 transition"
          >
            📞 Call BloodLink
          </a>

        </div>

      </div>

    </div>
  </div>
</section>



            <h2 className="mt-3 text-3xl md:text-4xl font-bold">
              How BloodLink works
            </h2>

            <p className="mt-4 text-gray-500">
              From registration to donation, BloodLink keeps the process
              simple and organized.
            </p>

          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-8">

            {steps.map((step) => (

              <div
                key={step.number}
                className="bg-white rounded-2xl border border-gray-100 p-7"
              >

                <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                  {step.number}
                </div>

                <h3 className="mt-5 text-xl font-bold">
                  {step.title}
                </h3>

                <p className="mt-3 text-gray-500 leading-relaxed">
                  {step.text}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* FINAL CTA */}
      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="rounded-3xl bg-rose-600 px-8 py-12 md:px-14 md:py-14 text-white">

          <div className="grid md:grid-cols-2 gap-8 items-center">

            <div>

              <p className="text-rose-100 text-sm font-semibold uppercase tracking-wider">
                Be part of the solution
              </p>

              <h2 className="mt-3 text-3xl md:text-4xl font-bold">
                Your donation could be someone's second chance.
              </h2>

              <p className="mt-4 text-rose-100">
                Join BloodLink and help connect blood donors with people
                who need them.
              </p>

            </div>

            <div className="flex md:justify-end">

              <Link
                to="/register"
                className="px-7 py-3.5 rounded-xl bg-white text-rose-600 font-bold hover:bg-rose-50 transition"
              >
                Join BloodLink →
              </Link>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}