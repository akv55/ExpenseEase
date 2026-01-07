import { useId, useState, useEffect } from "react";

export default function SettingsToggle({
  label,
  description,
  defaultChecked = false,
  checked,              // 👈 controlled support
  onChange,             // 👈 callback
  disabled = false,
  loading = false,      // 👈 API loading state
}) {
  const id = useId();

  // Internal state fallback (uncontrolled)
  const [internalChecked, setInternalChecked] = useState(defaultChecked);

  const isControlled = typeof checked === "boolean";
  const isChecked = isControlled ? checked : internalChecked;

  useEffect(() => {
    if (isControlled) setInternalChecked(checked);
  }, [checked, isControlled]);

  const handleToggle = () => {
    if (disabled || loading) return;

    const nextValue = !isChecked;

    if (!isControlled) {
      setInternalChecked(nextValue);
    }

    onChange?.(nextValue);
  };

  return (
    <div className="flex items-start justify-between gap-4 py-2">
      {/* Text */}
      <div className="min-w-0">
        <label
          htmlFor={id}
          className={`block text-sm font-medium ${
            disabled ? "text-gray-400" : "text-gray-900"
          }`}
        >
          {label}
        </label>
        {description && (
          <p className="mt-0.5 text-xs text-gray-500">{description}</p>
        )}
      </div>

      {/* Toggle */}
      <button
        type="button"
        role="switch"
        aria-checked={isChecked}
        aria-disabled={disabled || loading}
        onClick={handleToggle}
        disabled={disabled || loading}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500
          ${isChecked ? "bg-teal-600" : "bg-gray-200"}
          ${disabled || loading ? "cursor-not-allowed opacity-60" : "cursor-pointer"}
        `}
      >
        <span
          className={`pointer-events-none absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform
            ${isChecked ? "translate-x-5" : ""}
          `}
        />
      </button>
    </div>
  );
}
