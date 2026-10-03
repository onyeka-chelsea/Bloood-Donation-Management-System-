import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { useAuth } from "../context/authContext";

const roleHome = {
  donor: "/donor/dashboard",
  hospital: "/hospital/dashboard",
  bloodbank: "/bloodbank/dashboard",
  admin: "/admin/dashboard",
};

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

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
      const user = await login(form.email, form.password);

      navigate(roleHome[user.role] || "/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Invalid email or password. Try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">

        {/* LEFT SIDE */}
        <div className="auth-info">

          <div className="auth-brand">
            <div className="auth-logo">♥</div>
            <span>BloodLink</span>
          </div>

          <div className="auth-info-content">

            <span className="auth-small-title">
              BLOOD DONATION PLATFORM
            </span>

            <h1>
              Every donation
              <br />
              <span>can save a life.</span>
            </h1>

            <p>
              Connect donors, hospitals and blood banks
              in one trusted healthcare platform.
            </p>

            <div className="auth-feature">
              <div className="feature-icon">♥</div>

              <div>
                <strong>Donate blood</strong>
                <p>Help patients who need you.</p>
              </div>
            </div>

            <div className="auth-feature">
              <div className="feature-icon">✚</div>

              <div>
                <strong>Save lives</strong>
                <p>Track your impact and donations.</p>
              </div>
            </div>

            <div className="auth-feature">
              <div className="feature-icon">✓</div>

              <div>
                <strong>Stay connected</strong>
                <p>Find hospitals and donation centers.</p>
              </div>
            </div>

          </div>

          <p className="auth-footer-text">
            Together, we make a difference.
          </p>

        </div>

        {/* RIGHT SIDE */}
        <div className="login-card">

          <div className="mobile-brand">
            <div className="auth-logo">♥</div>
            <span>BloodLink</span>
          </div>

          <div className="login-heading">

            <span>WELCOME BACK</span>

            <h2>Sign in to BloodLink</h2>

            <p>
              Enter your details to access your account.
            </p>

          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* EMAIL */}
            <div className="form-group">

              <label htmlFor="email">
                Email Address
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  ✉
                </span>

                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            {/* PASSWORD */}
            <div className="form-group">

              <div className="password-label">

                <label htmlFor="password">
                  Password
                </label>

                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                >
                  Forgot password?
                </a>

              </div>

              <div className="input-wrapper">

                <span className="input-icon">
                  🔒
                </span>

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  className="show-password"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>

            </div>

            {/* REMEMBER ME */}
            <div className="remember-row">

              <label>
                <input type="checkbox" />
                <span>Remember me</span>
              </label>

            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="login-button"
              disabled={submitting}
            >
              {submitting ? "Signing In..." : "Sign In"}

              {!submitting && <span>→</span>}
            </button>

          </form>

          {/* REGISTER */}
          <div className="register-text">

            Don't have an account?

            <Link to="/register">
              Create an account
            </Link>

          </div>

          {/* SECURITY */}
          <div className="security-note">
            <span>🔒</span>
            Your information is protected and secure.
          </div>

        </div>

      </div>
    </div>
  );
}