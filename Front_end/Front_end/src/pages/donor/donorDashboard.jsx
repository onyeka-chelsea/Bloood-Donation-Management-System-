import "./donorDashboard.css";
import { Link } from "react-router-dom";

const stats = [
  {
    label: "Lives Saved & Impacted",
    value: "18 Lives",
    detail: "+3 lives credited this quarter",
    icon: "❤",
    tone: "icon-primary",
  },
  {
    label: "Total Lifetime Donations",
    value: "6 Sessions",
    detail: "4 Whole Blood • 2 Platelets",
    icon: "💧",
    tone: "icon-secondary",
  },
  {
    label: "Lifesaver Streak",
    value: "4 Quarters",
    detail: "Consistent season donor",
    icon: "🔥",
    tone: "icon-tertiary",
  },
  {
    label: "LifePoints Balance",
    value: "1,450 pts",
    detail: "550 pts to $25 gift match",
    icon: "★",
    tone: "icon-secondary",
  },
];

const campaigns = [
  {
    title: "Community Drive",
    date: "Nov 14 • Bastos",
    icon: "🩸",
  },
  {
    title: "School Challenge",
    date: "Nov 18 • Central Hospital",
    icon: "🎓",
  },
  {
    title: "Emergency Support",
    date: "Nov 24 • Red Cross",
    icon: "🚑",
  },
];

const checklist = [
  "Hydration goal: 2.5L today",
  "Eat iron-rich meal before visit",
  "Bring donor ID and contact info",
];

export default function DonorDashboard() {
  return (
    <div className="dashboard-shell">
      {/* ================= HEADER ================= */}
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">❤</div>
          <span>BloodLink</span>
        </div>

        <nav className="topbar-nav" aria-label="Main navigation">
          <Link to="/donor/dashboard" className="active">
            Donor Portal
          </Link>

          <Link to="/donor/book">
            Appointments
          </Link>

          <Link to="/donor/history">
            Impact
          </Link>

          <Link to="/donor/book">
            Rewards
          </Link>
        </nav>

        <div className="topbar-actions">
          <button type="button" className="icon-button">
            Alerts
          </button>

          <Link to="/donor/book" className="primary-button">
            Book Visit
          </Link>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="dashboard-main">

        {/* Emergency Alert */}
        <section className="alert-banner">
          <div className="alert-copy">
            <span className="alert-dot" aria-hidden="true" />

            <div className="alert-text">
              <span className="alert-tag">
                High Priority Dispatch
              </span>

              <h3>
                Urgent Need: 4 units of O-Negative for emergency trauma triage.
              </h3>

              <p>
                3.8 miles away • General Hospital (Ngousso)
              </p>
            </div>
          </div>

          <Link to="/donor/book" className="secondary-button">
            I Can Help Today
          </Link>
        </section>

        {/* ================= HERO ================= */}
        <section className="hero-row">
          <div className="hero-copy">
            <div className="badge-row">
              <span className="pill soft">
                Donor Level: Golden Lifesaver
              </span>

              <span className="pill neutral">
                Badge ID: #LL-8921-O
              </span>
            </div>

            <h1>
              Good morning, Onyeka Virginia!
            </h1>

            <p>
              Your next whole blood donation window opens in{" "}
              <strong>14 days</strong> (Thursday, December 17).
            </p>
          </div>

          <div className="hero-actions">
            <button type="button" className="icon-button">
              Share Donor Badge
            </button>

            <Link to="/donor/book" className="primary-button">
              Schedule Next Donation
            </Link>
          </div>
        </section>

        {/* ================= STATS ================= */}
        <section className="stats-grid" aria-label="Donor summary">
          {stats.map((stat) => (
            <article key={stat.label} className="stat-card">
              <div className="stat-top">
                <div>
                  <div className="stat-label">
                    {stat.label}
                  </div>

                  <div className="stat-value">
                    {stat.value}
                  </div>
                </div>

                <div className={`stat-icon ${stat.tone}`}>
                  {stat.icon}
                </div>
              </div>

              <div className="stat-foot">
                {stat.detail}
              </div>

              <div className="progress">
                <span style={{ width: "75%" }} />
              </div>
            </article>
          ))}
        </section>

        {/* ================= CONTENT ================= */}
        <section className="content-grid">

          {/* ================= LEFT COLUMN ================= */}
          <div className="main-column">

            {/* Eligibility */}
            <div className="panel">
              <div className="panel-header">
                <div>
                  <div className="muted-label">
                    Clinical Recovery Tracker
                  </div>

                  <h2>
                    Next Whole Blood Eligibility
                  </h2>
                </div>

                <span className="pill soft">
                  Iron levels normal • 13.8 g/dL
                </span>
              </div>

              <div className="readiness-row">

                {/* Ring */}
                <div className="ring-wrap">
                  <div
                    className="ring"
                    aria-label="14 days left"
                  >
                    <svg
                      viewBox="0 0 120 120"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        fill="none"
                        stroke="#f1ecec"
                        strokeWidth="8"
                      />

                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        fill="none"
                        stroke="#b7102a"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray="314"
                        strokeDashoffset="78"
                      />
                    </svg>

                    <div className="ring-center">
                      <div>
                        <strong>14</strong>
                        <span>Days Left</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Readiness Items */}
                <div className="readiness-items">

                  {/* Hemoglobin */}
                  <div className="info-card">
                    <div className="info-copy">
                      <div className="info-icon">
                        ⚗
                      </div>

                      <div>
                        <strong>
                          Hemoglobin Estimation
                        </strong>

                        <span>
                          Optimal: 12.5 - 17.0 g/dL
                        </span>
                      </div>
                    </div>

                    <div className="info-value">
                      13.8 g/dL

                      <small>
                        Verified peak
                      </small>
                    </div>
                  </div>

                  {/* Hydration */}
                  <div className="info-card">
                    <div className="info-copy">
                      <div className="info-icon">
                        💧
                      </div>

                      <div>
                        <strong>
                          Hydration Advisory
                        </strong>

                        <span>
                          Drink 1 litre of water today
                        </span>
                      </div>
                    </div>

                    <div className="info-value">
                      1.8 / 2.5 L

                      <small>
                        Today's goal
                      </small>
                    </div>
                  </div>

                  {/* Booking */}
                  <div className="info-card">
                    <div className="info-copy">
                      <div className="info-icon">
                        🔔
                      </div>

                      <div>
                        <strong>
                          Pre-booking hint
                        </strong>

                        <span>
                          Slots are filling fast for December 17-30.
                        </span>
                      </div>
                    </div>

                    <Link
                      to="/donor/book"
                      className="primary-button"
                    >
                      Reserve Slot
                    </Link>
                  </div>

                </div>
              </div>
            </div>

            {/* ================= BLOOD JOURNEY ================= */}
            <div className="panel">
              <div className="panel-header">
                <div>
                  <div className="muted-label">
                    Impact Journey
                  </div>

                  <h3>
                    Your Blood's Journey
                  </h3>
                </div>

                <Link
                  to="/donor/history"
                  className="muted-label"
                >
                  View Full History
                </Link>
              </div>

              <div
                className="timeline"
                aria-label="Donation timeline"
              >
                <div className="timeline-step complete">
                  <strong>
                    1. Donated
                  </strong>

                  <span>
                    Nov 12, 2026
                  </span>
                </div>

                <div className="timeline-step complete">
                  <strong>
                    2. Processed
                  </strong>

                  <span>
                    Matched to patient
                  </span>
                </div>

                <div className="timeline-step complete">
                  <strong>
                    3. Shared
                  </strong>

                  <span>
                    Used in transfusion
                  </span>
                </div>

                <div className="timeline-step complete">
                  <strong>
                    4. Follow-up
                  </strong>

                  <span>
                    Recovery confirmed
                  </span>
                </div>
              </div>

              <div
                className="readiness-meter"
                style={{ marginTop: "18px" }}
              >
                <div className="bar">
                  <span style={{ width: "82%" }} />
                </div>

                <div className="readiness-stats">
                  <span>
                    Recovery in progress
                  </span>

                  <span>
                    82% complete
                  </span>
                </div>
              </div>
            </div>

            {/* ================= COMMUNITY DRIVES ================= */}
            <div className="panel">
              <div className="panel-header">
                <div>
                  <div className="muted-label">
                    Upcoming Community Drives
                  </div>

                  <h3>
                    Volunteer opportunities
                  </h3>
                </div>
              </div>

              <div className="campaign-list">
                {campaigns.map((campaign) => (
                  <article
                    key={campaign.title}
                    className="campaign-card"
                  >
                    <div className="campaign-image">
                      {campaign.icon}
                    </div>

                    <div className="campaign-body">
                      <h4>
                        {campaign.title}
                      </h4>

                      <p>
                        {campaign.date}
                      </p>

                      <small>
                        Open signups
                      </small>
                    </div>
                  </article>
                ))}
              </div>
            </div>

          </div>

          {/* ================= RIGHT COLUMN ================= */}
          <aside className="side-column">

            {/* Next Donation */}
            <div className="panel appointment-card">
              <div className="appointment-meta">
                <div className="muted-label">
                  Next Donation
                </div>

                <Link
                  to="/donor/book"
                  className="secondary-button"
                >
                  Edit
                </Link>
              </div>

              <div className="appointment-box">
                <div className="date-chip">
                  28
                  <br />
                  Mar
                </div>

                <div>
                  <h4>
                    Whole Blood Donation
                  </h4>

                  <p>
                    Tuesday, @ 10:30 AM • 45 min
                  </p>
                </div>
              </div>

              <div
                className="checklist"
                style={{ marginTop: "16px" }}
              >
                {checklist.map((item) => (
                  <div
                    key={item}
                    className="check-item"
                  >
                    <span className="checkmark">
                      ✓
                    </span>

                    <span>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Readiness */}
            <div className="panel">
              <div className="panel-header">
                <div>
                  <div className="muted-label">
                    Preparation Status
                  </div>

                  <h3>
                    Readiness score
                  </h3>
                </div>

                <span className="pill soft">
                  82%
                </span>
              </div>

              <div className="readiness-meter">
                <div className="bar">
                  <span style={{ width: "82%" }} />
                </div>

                <div className="readiness-stats">
                  <span>
                    Ready to donate
                  </span>

                  <span>
                    2 more steps
                  </span>
                </div>
              </div>
            </div>

            {/* Support */}
            <div className="panel support-card">
              <div className="support-icon">
                ☎
              </div>

              <div>
                <strong>
                  Donor Clinical Support
                </strong>

                <div
                  className="muted-label"
                  style={{ marginTop: "4px" }}
                >
                  24/7 Nurse Desk Available
                </div>
              </div>
            </div>

          </aside>
        </section>
      </main>
    </div>
  );
}