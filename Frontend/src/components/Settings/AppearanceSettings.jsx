import SettingsToggle from "./SettingsToggle";

export default function AppearanceSettings() {
  return (
    <>
      <div className="mb-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">Appearance</h2>
        <p className="mt-1 text-sm text-gray-600">Adjust how the app looks and feels.</p>
      </div>

      <div className="divide-y divide-gray-100 rounded-xl border border-gray-100 bg-white">
        <div className="px-4 py-3">
          <SettingsToggle label="Dark Mode" description="Use a darker theme (if supported)." />
        </div>
        <div className="px-4 py-3">
          <SettingsToggle label="Compact Layout" description="Reduce spacing to fit more content." />
        </div>
      </div>
    </>
  );
}
