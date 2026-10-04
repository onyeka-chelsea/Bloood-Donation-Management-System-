import { Link } from "react-router-dom";
import Navbar from "../../components/navbar";
import { useAuth } from "../../context/authContext";
import "./donorDashboard.css";

const stats = [
  {
    label: "Lives Saved",
    value: "18",
    detail: "+3 this quarter",
    icon: "❤️",
    bg: "red",
  },
  {
    label: "Total Donations",
    value: "6",
    detail: "4 Whole Blood • 2 Platelets",
    icon: "🩸",
    bg: "blue",
  },
  {
    label: "Donation Streak",
    value: "4",
    detail: "Consistent donor",
    icon: "🔥",
    bg: "orange",
  },
  {
    label: "LifePoints",
    value: "1,450",
    detail: "550 pts to next reward",
    icon: "⭐",
    bg: "green",
  },
];

const campaigns = [
  {
    title: "Community Blood Drive",
    date: "Nov 14",
    location: "Bastos",
    icon: "🩸",
  },
  {
    title: "School Blood Challenge",
    date: "Nov 18",
    location: "Central Hospital",
    icon: "🏫",
  },
  {
    title: "Emergency Support Drive",
    date: "Nov 24",
    location: "Red Cross",
    icon: "🚑",
  },
];

const preparation = [
  "Stay well hydrated",
  "Eat an iron-rich meal",
  "Bring your donor ID",
];

export default function DonorDashboard() {
  const { user } = useAuth();

  const donorName = user?.name || "Donor";

  return (
    <div className="donor-page">
      {/* NAVBAR */}
      <Navbar />

      <main className="donor-container">

        {/* PAGE HEADER */}
        <section className="donor-header">
          <div>
            <p className="section-label">DONOR PORTAL</p>

            <h1>Welcome back, {donorName}! ❤️</h1>

            <p className="header-description">
              Thank you for helping save lives through blood donation.
              Keep making a difference with every donation.
            </p>
          </div>

          <Link to="/donor/book" className="donor-primary-button">
            + Book Donation
          </Link>
        </section>

        {/* EMERGENCY ALERT */}
        <section className="emergency-card">
          <div className="emergency-icon">!</div>

          <div className="emergency-content">
            <span>URGENT BLOOD NEED</span>

            <h3>
              O-Negative blood is currently needed for emergency patients.
            </h3>

            <p>
              If you are eligible to donate, your contribution could help save
              a life today.
            </p>
          </div>

          <Link to="/donor/book" className="emergency-button">
            I Can Help
          </Link>
        </section>

        {/* STATISTICS */}
        <section className="stats-grid">
          {stats.map((stat) => (
            <article className="donor-stat-card" key={stat.label}>
              <div className={`stat-icon ${stat.bg}`}>
                {stat.icon}
              </div>

              <div className="stat-information">
                <p>{stat.label}</p>

                <h2>{stat.value}</h2>

                <span>{stat.detail}</span>
              </div>
            </article>
          ))}
        </section>

        {/* MAIN GRID */}
        <section className="donor-content-grid">

          {/* LEFT COLUMN */}
          <div className="donor-main-column">

            {/* NEXT DONATION */}
            <section className="donor-card">
              <div className="card-heading">
                <div>
                  <p className="section-label">UPCOMING DONATION</p>
                  <h2>Next Donation</h2>
                </div>

                <span className="status-badge">
                  Eligible Soon
                </span>
              </div>

              <div className="next-donation">
                <div className="donation-date">
                  <span>DEC</span>
                  <strong>17</strong>
                </div>

                <div className="donation-details">
                  <h3>Whole Blood Donation</h3>

                  <p>
                    Your next donation window opens on December 17.
                  </p>

                  <div className="donation-info">
                    <span>🩸 Whole Blood</span>
                    <span>⏱ 45 min</span>
                  </div>
                </div>

                <Link
                  to="/donor/book"
                  className="small-primary-button"
                >
                  Book Now
                </Link>
              </div>
            </section>

            {/* ELIGIBILITY */}
            <section className="donor-card">
              <div className="card-heading">
                <div>
                  <p className="section-label">DONOR HEALTH</p>
                  <h2>Donation Readiness</h2>
                </div>

                <span className="readiness-badge">
                  82% Ready
                </span>
              </div>

              <div className="readiness-layout">

                <div className="readiness-circle">
                  <div>
                    <strong>82%</strong>
                    <span>Ready</span>
                  </div>
                </div>

                <div className="readiness-list">

                  <div className="readiness-item">
                    <div className="readiness-item-icon success">
                      ✓
                    </div>

                    <div>
                      <strong>Hemoglobin</strong>
                      <span>13.8 g/dL — Normal</span>
                    </div>
                  </div>

                  <div className="readiness-item">
                    <div className="readiness-item-icon success">
                      ✓
                    </div>

                    <div>
                      <strong>Eligibility</strong>
                      <span>Eligible from December 17</span>
                    </div>
                  </div>

                  <div className="readiness-item">
                    <div className="readiness-item-icon warning">
                      !
                    </div>

                    <div>
                      <strong>Hydration</strong>
                      <span>Drink more water before donating</span>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* BLOOD JOURNEY */}
            <section className="donor-card">
              <div className="card-heading">
                <div>
                  <p className="section-label">YOUR IMPACT</p>
                  <h2>Your Blood Journey</h2>
                </div>

                <Link
                  to="/donor/history"
                  className="view-link"
                >
                  View History →
                </Link>
              </div>

              <div className="journey">

                <div className="journey-step completed">
                  <div className="journey-circle">✓</div>

                  <div>
                    <strong>Donated</strong>
                    <span>Nov 12</span>
                  </div>
                </div>

                <div className="journey-line completed-line"></div>

                <div className="journey-step completed">
                  <div className="journey-circle">✓</div>

                  <div>
                    <strong>Processed</strong>
                    <span>Blood tested</span>
                  </div>
                </div>

                <div className="journey-line completed-line"></div>

                <div className="journey-step completed">
                  <div className="journey-circle">✓</div>

                  <div>
                    <strong>Matched</strong>
                    <span>Patient found</span>
                  </div>
                </div>

                <div className="journey-line"></div>

                <div className="journey-step">
                  <div className="journey-circle pending">
                    4
                  </div>

                  <div>
                    <strong>Transfused</strong>
                    <span>Saving a life</span>
                  </div>
                </div>

              </div>
            </section>

            {/* COMMUNITY DRIVES */}
            <section className="donor-card">
              <div className="card-heading">
                <div>
                  <p className="section-label">COMMUNITY</p>
                  <h2>Upcoming Blood Drives</h2>
                </div>
              </div>

              <div className="campaign-grid">
                {campaigns.map((campaign) => (
                  <article
                    className="campaign-card"
                    key={campaign.title}
                  >
                    <div className="campaign-icon">
                      {campaign.icon}
                    </div>

                    <div className="campaign-information">
                      <h3>{campaign.title}</h3>

                      <p>
                        📅 {campaign.date}
                      </p>

                      <p>
                        📍 {campaign.location}
                      </p>

                      <Link to="/donor/book">
                        Join Drive →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>

          </div>

          {/* RIGHT COLUMN */}
          <aside className="donor-side-column">

            {/* PREPARATION */}
            <section className="donor-card">
              <div className="card-heading">
                <div>
                  <p className="section-label">PREPARATION</p>
                  <h2>Before You Donate</h2>
                </div>
              </div>

              <div className="preparation-list">
                {preparation.map((item, index) => (
                  <div className="preparation-item" key={item}>
                    <span>{index + 1}</span>
                    <p>{item}</p>
                  </div>
                ))}
              </div>

              <Link
                to="/donor/book"
                className="full-width-button"
              >
                Schedule Donation
              </Link>
            </section>

            {/* QUICK ACTIONS */}
            <section className="donor-card">
              <div className="card-heading">
                <div>
                  <p className="section-label">QUICK ACTIONS</p>
                  <h2>Manage Donations</h2>
                </div>
              </div>

              <div className="quick-actions">

                <Link to="/donor/book">
                  <span className="quick-icon">📅</span>

                  <div>
                    <strong>Book Donation</strong>
                    <small>Choose a donation date</small>
                  </div>

                  <span>→</span>
                </Link>

                <Link to="/donor/history">
                  <span className="quick-icon">❤️</span>

                  <div>
                    <strong>Donation History</strong>
                    <small>See your previous donations</small>
                  </div>

                  <span>→</span>
                </Link>

              </div>
            </section>

            {/* SUPPORT */}
            <section className="support-card">
              <div className="support-icon">
                ☎
              </div>

              <div>
                <p>Need help?</p>

                <h3>Donor Support</h3>

                <span>
                  Our support team is available to assist you.
                </span>
              </div>
            </section>

          </aside>
        </section>
      </main>
    </div>
  );
}