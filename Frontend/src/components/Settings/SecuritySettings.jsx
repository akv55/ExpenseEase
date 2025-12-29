import SettingsToggle from "./SettingsToggle";

export default function SecuritySettings() {
  return (
    <>
      <div className="mb-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">Security</h2>
        <p className="mt-1 text-sm text-gray-600">Manage authentication and security alerts.</p>
      </div>

      <div className="divide-y divide-gray-100 rounded-xl border border-gray-100 bg-white">
        <div className="px-4 py-3">
          <SettingsToggle
            label="Two Factor Authentication"
            description="Add an extra layer of protection to your account."
          />
        </div>
        <div className="px-4 py-3">
          <SettingsToggle
            label="Login Alerts"
            description="Get notified when your account is accessed."
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg border border-teal-600 px-4 py-2 text-sm font-semibold text-teal-700 hover:bg-teal-50"
        >
          Change Password
        </button>
      </div>
    </>
  );
}
