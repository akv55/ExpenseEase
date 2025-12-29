import SettingsToggle from "./SettingsToggle";

export default function SplitRulesSettings() {
  return (
    <>
      <div className="mb-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">Split Rules</h2>
        <p className="mt-1 text-sm text-gray-600">Choose how group expenses are split by default.</p>
      </div>

      <div className="divide-y divide-gray-100 rounded-xl border border-gray-100 bg-white">
        <div className="px-4 py-3">
          <SettingsToggle
            label="Equal Split (Default)"
            description="Split expenses equally among members."
            defaultChecked
          />
        </div>
        <div className="px-4 py-3">
          <SettingsToggle
            label="Allow Custom Split"
            description="Let members adjust shares per expense."
          />
        </div>
        <div className="px-4 py-3">
          <SettingsToggle
            label="Auto Settle Small Amounts"
            description="Automatically settle tiny balances."
          />
        </div>
      </div>
    </>
  );
}
