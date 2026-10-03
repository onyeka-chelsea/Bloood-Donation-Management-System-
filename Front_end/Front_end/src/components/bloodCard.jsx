/**
 * Reusable card used across dashboards.
 *
 * Two modes:
 * 1. Stat mode:  <BloodCard label="Lives Saved" value="18" icon="❤️" sublabel="+3 this quarter" />
 * 2. Blood-type mode: <BloodCard bloodType="O-" units={12} status="critical" />
 */
export default function BloodCard({
  label,
  value,
  sublabel,
  icon,
  bloodType,
  units,
  status,
}) {
  if (bloodType) {
    const statusStyles = {
      critical: "border-rose-300 bg-rose-50 text-rose-700",
      low: "border-amber-300 bg-amber-50 text-amber-700",
      healthy: "border-emerald-300 bg-emerald-50 text-emerald-700",
    };
    const style = statusStyles[status] || statusStyles.healthy;

    return (
      <div className={`rounded-xl border p-4 flex flex-col gap-1 ${style}`}>
        <span className="text-2xl font-bold">{bloodType}</span>
        <span className="text-lg font-semibold">{units} units</span>
        <span className="text-xs uppercase tracking-wide opacity-80">
          {status || "healthy"}
        </span>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-500">{label}</span>
        {icon && <span className="text-xl">{icon}</span>}
      </div>
      <div className="text-3xl font-bold text-gray-800">{value}</div>
      {sublabel && (
        <div className="text-xs text-emerald-600 mt-1">{sublabel}</div>
      )}
      <div className="h-1 w-full bg-rose-100 rounded-full mt-3">
        <div className="h-1 bg-rose-500 rounded-full w-2/3" />
      </div>
    </div>
  );
}