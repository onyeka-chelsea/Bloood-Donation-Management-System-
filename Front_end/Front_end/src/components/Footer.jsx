export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-100 bg-white">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        
        {/* Copyright */}
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded bg-rose-500 flex items-center justify-center text-white text-xs">
            ♥️
          </span>

          <span>
            ©️ {new Date().getFullYear()} BloodLink. Every drop counts.
          </span>
        </div>

        {/* Footer Links */}
        <div className="flex gap-5">
  <a
    href="/#about"
    className="hover:text-rose-600 transition"
  >
    About
  </a>

  <a
    href="/#contact"
    className="hover:text-rose-600 transition"
  >
    Contact
  </a>

  <a
    href="/#emergency"
    className="hover:text-rose-600 transition"
  >
    Emergency Hotline
  </a>
</div>
      </div>
    </footer>
  );
}