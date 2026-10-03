import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import "./register.css";

const roles = [
  { value: "donor", label: "Donor" },
  { value: "hospital", label: "Hospital" },
  { value: "bloodbank", label: "Blood Bank" },
];

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

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "donor",
    bloodType: "",
    phone: "",
    location: "",
  });

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSubmitting(true);

    try {
      const user = await register(form);

      const roleHome = {
        donor: "/donor/dashboard",
        hospital: "/hospital/dashboard",
        bloodbank: "/bloodbank/dashboard",
      };

      navigate(roleHome[user.role] || "/login");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Could not create your account. Try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">

        {/* LEFT SIDE */}
        <div className="register-info">

          <div className="register-brand">
            <div className="register-logo">♥</div>
            <span>BloodLink</span>
          </div>

          <div className="register-info-content">

            <span className="register-small-title">
              JOIN BLOODLINK
            </span>

            <h1>
              Be part of
              <br />
              <span>saving lives.</span>
            </h1>

            <p>
              Create your BloodLink account and connect
              with the people and healthcare services
              that make blood donation possible.
            </p>

            <div className="register-feature">
              <div className="register-feature-icon">♥</div>
              <div>
                <strong>Become a donor</strong>
                <p>Help patients receive the blood they need.</p>
              </div>
            </div>

            <div className="register-feature">
              <div className="register-feature-icon">✚</div>
              <div>
                <strong>Support hospitals</strong>
                <p>Connect your healthcare facility to donors.</p>
              </div>
            </div>

            <div className="register-feature">
              <div className="register-feature-icon">✓</div>
              <div>
                <strong>Make an impact</strong>
                <p>Every contribution can make a difference.</p>
              </div>
            </div>

          </div>

          <p className="register-footer-text">
            Together, we make a difference.
          </p>

        </div>

        {/* RIGHT SIDE */}
        <div className="register-card">

          <div className="register-mobile-brand">
            <div className="register-logo">♥</div>
            <span>BloodLink</span>
          </div>

          <div className="register-heading">

            <span>GET STARTED</span>

            <h2>Create your account</h2>

            <p>
              Join BloodLink as a donor or hospital.
            </p>

          </div>

          {/* ERROR */}
          {error && (
            <div className="register-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* ROLE */}
            <div className="register-form-group">

              <label className="register-label">
                I am registering as
              </label>

              <div className="role-options">

                {roles.map((role) => (
                  <button
                    type="button"
                    key={role.value}
                    className={`role-button ${
                      form.role === role.value
                        ? "role-button-active"
                        : ""
                    }`}
                    onClick={() =>
                      setForm({
                        ...form,
                        role: role.value,
                      })
                    }
                  >
                    <span className="role-icon">
                      {role.value === "donor" ? "♥" : "✚"}
                    </span>

                    {role.label}
                  </button>
                ))}

              </div>

            </div>

            {/* NAME */}
            <div className="register-form-group">

              <label htmlFor="name">
                {form.role === "hospital"
                  ? "Hospital Name"
                  : form.role === "bloodbank"
                    ? "Blood Bank Name"
                    : "Full Name"}
              </label>

              <div className="register-input-wrapper">

                <span className="register-input-icon">
                  {form.role === "hospital" ? "✚" : "♙"}
                </span>

                <input
                  id="name"
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder={
                    form.role === "hospital"
                      ? "Enter hospital name"
                      : form.role === "bloodbank"
                        ? "Enter blood bank name"
                        : "Enter your full name"
                  }
                />

              </div>

            </div>

            {form.role === "bloodbank" && (
              <div className="register-form-group">
                <label htmlFor="location">Blood Bank Location</label>
                <div className="register-input-wrapper">
                  <span className="register-input-icon">⌖</span>
                  <input
                    id="location"
                    type="text"
                    name="location"
                    required
                    value={form.location}
                    onChange={handleChange}
                    placeholder="Enter the blood bank location"
                  />
                </div>
              </div>
            )}

            {/* EMAIL + PHONE */}
            <div className="register-two-columns">

              <div className="register-form-group">

                <label htmlFor="email">
                  Email Address
                </label>

                <div className="register-input-wrapper">

                  <span className="register-input-icon">
                    ✉
                  </span>

                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                  />

                </div>

              </div>

              <div className="register-form-group">

                <label htmlFor="phone">
                  Phone Number
                </label>

                <div className="register-input-wrapper">

                  <span className="register-input-icon">
                    ☎
                  </span>

                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+237..."
                  />

                </div>

              </div>

            </div>

            {/* BLOOD TYPE */}
            {form.role === "donor" && (
              <div className="register-form-group">

                <label htmlFor="bloodType">
                  Blood Type
                </label>

                <div className="register-input-wrapper">

                  <span className="register-input-icon">
                    ♥
                  </span>

                  <select
                    id="bloodType"
                    name="bloodType"
                    value={form.bloodType}
                    onChange={handleChange}
                  >
                    <option value="">
                      Not sure yet
                    </option>

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

              </div>
            )}

            {/* PASSWORD */}
            <div className="register-form-group">

              <label htmlFor="password">
                Password
              </label>

              <div className="register-input-wrapper">

                <span className="register-input-icon">
                  🔒
                </span>

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  minLength={6}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                />

                <button
                  type="button"
                  className="register-show-password"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>

              <p className="password-hint">
                Password must contain at least 6 characters.
              </p>

            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="register-button"
              disabled={submitting}
            >
              {submitting
                ? "Creating account..."
                : "Create Account"}

              {!submitting && <span>→</span>}
            </button>

          </form>

          {/* LOGIN LINK */}
          <div className="already-account">
            Already have an account?

            <Link to="/login">
              Log in
            </Link>
          </div>

          <div className="register-security">
            <span>🔒</span>
            Your information is protected and secure.
          </div>

        </div>

      </div>
    </div>
  );
}