import SettingsToggle from "./SettingsToggle";

export default function NotificationSettings() {
  return (
    <>
      <div className="mb-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">Notifications</h2>
        <p className="mt-1 text-sm text-gray-600">Control which updates you receive.</p>
      </div>

      <div className="divide-y divide-gray-100 rounded-xl border border-gray-100 bg-white">
        <div className="px-4 py-3">
          <SettingsToggle label="Expense Added" description="Get notified when an expense is created." />
        </div>
        <div className="px-4 py-3">
          <SettingsToggle label="Settlement Reminder" description="Remind you about pending settlements." />
        </div>
        <div className="px-4 py-3">
          <SettingsToggle label="Monthly Summary" description="Receive a monthly activity summary." />
        </div>
      </div>
    </>
  );
}
