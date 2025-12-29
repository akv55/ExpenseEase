import { useId } from "react";

export default function SettingsToggle({
  label,
  description,
  defaultChecked = false,
  disabled = false,
}) {
  const id = useId();

  return (
    <div className="flex items-start justify-between gap-4 py-2">
      <div className="min-w-0">
        <label htmlFor={id} className="block text-sm font-medium text-gray-900">
          {label}
        </label>
        {description ? (
          <p className="mt-0.5 text-xs text-gray-500">{description}</p>
        ) : null}
      </div>

      <label className={`relative inline-flex items-center ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}>
        <input
          id={id}
          type="checkbox"
          className="sr-only peer"
          defaultChecked={defaultChecked}
          disabled={disabled}
        />
        <span
          className="h-6 w-11 rounded-full bg-gray-200 transition-colors peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-teal-500 peer-checked:bg-teal-600 peer-disabled:opacity-60"
        />
        <span
          className="pointer-events-none absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform peer-checked:translate-x-5"
        />
      </label>
    </div>
  );
}
