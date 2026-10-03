import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const roleHome = {
  donor: "/donor/dashboard",
  hospital: "/hospital/dashboard",
  bloodbank: "/bloodbank/dashboard",
  admin: "/admin/dashboard",
};

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/login");
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-3">

        {/* LOGO */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-2"
        >
          <span className="w-9 h-9 rounded-lg bg-rose-500 flex items-center justify-center text-white">
            ♥️
          </span>

          <span className="font-bold text-lg text-gray-800">
            BloodLink
          </span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          {user ? (
            <>
              <Link
                to={roleHome[user.role] || "/"}
                className="hover:text-rose-600 transition"
              >
                Dashboard
              </Link>

              {user.role === "donor" && (
                <>
                  <Link
                    to="/donor/book"
                    className="hover:text-rose-600 transition"
                  >
                    Appointments
                  </Link>

                  <Link
                    to="/donor/history"
                    className="hover:text-rose-600 transition"
                  >
                    Impact
                  </Link>
                </>
              )}

              {user.role === "hospital" && (
                <Link
                  to="/hospital/request"
                  className="hover:text-rose-600 transition"
                >
                  Blood Request
                </Link>
              )}

              {user.role === "bloodbank" && (
                <Link
                  to="/bloodbank/inventory"
                  className="hover:text-rose-600 transition"
                >
                  Inventory
                </Link>
              )}
            </>
          ) : (
            <Link
              to="/"
              className="hover:text-rose-600 transition"
            >
              Home
            </Link>
          )}
        </div>

        {/* DESKTOP USER ACTIONS */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm text-gray-500">
                Hi, {user.name?.split(" ")[0]}
              </span>

              <button
                type="button"
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-semibold rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-semibold rounded-lg text-rose-600 hover:bg-rose-50 transition"
              >
                Log in
              </Link>

              <Link
                to="/register"
                className="px-4 py-2 text-sm font-semibold rounded-lg bg-rose-600 text-white hover:bg-rose-700 transition"
              >
                Become a Donor
              </Link>
            </>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden w-10 h-10 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center text-xl"
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-6 py-5">

          <div className="flex flex-col gap-2">

            {user ? (
              <>
                <Link
                  to={roleHome[user.role] || "/"}
                  onClick={closeMenu}
                  className="px-4 py-3 rounded-lg text-gray-700 font-medium hover:bg-rose-50 hover:text-rose-600"
                >
                  🏠 Dashboard
                </Link>

                {user.role === "donor" && (
                  <>
                    <Link
                      to="/donor/book"
                      onClick={closeMenu}
                      className="px-4 py-3 rounded-lg text-gray-700 font-medium hover:bg-rose-50 hover:text-rose-600"
                    >
                      📅 Appointments
                    </Link>

                    <Link
                      to="/donor/history"
                      onClick={closeMenu}
                      className="px-4 py-3 rounded-lg text-gray-700 font-medium hover:bg-rose-50 hover:text-rose-600"
                    >
                      ❤️ Impact
                    </Link>
                  </>
                )}

                {user.role === "hospital" && (
                  <Link
                    to="/hospital/request"
                    onClick={closeMenu}
                    className="px-4 py-3 rounded-lg text-gray-700 font-medium hover:bg-rose-50 hover:text-rose-600"
                  >
                    🩸 Blood Request
                  </Link>
                )}

                {user.role === "bloodbank" && (
                  <Link
                    to="/bloodbank/inventory"
                    onClick={closeMenu}
                    className="px-4 py-3 rounded-lg text-gray-700 font-medium hover:bg-rose-50 hover:text-rose-600"
                  >
                    📦 Inventory
                  </Link>
                )}

                <div className="border-t border-gray-100 my-2"></div>

                <div className="px-4 py-2 text-sm text-gray-500">
                  Hi, {user.name?.split(" ")[0]}
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 rounded-lg bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  onClick={closeMenu}
                  className="px-4 py-3 rounded-lg text-gray-700 font-medium hover:bg-rose-50 hover:text-rose-600"
                >
                  🏠 Home
                </Link>

                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="px-4 py-3 rounded-lg text-rose-600 font-semibold hover:bg-rose-50"
                >
                  Log in
                </Link>

                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="px-4 py-3 rounded-lg bg-rose-600 text-white font-semibold text-center hover:bg-rose-700"
                >
                  Become a Donor
                </Link>
              </>
            )}

          </div>
        </div>
      )}
    </nav>
  );
}