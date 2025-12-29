import SettingsToggle from "./SettingsToggle";

export default function ExpenseSettings() {
  return (
    <>
      <div className="mb-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">Expense Preferences</h2>
        <p className="mt-1 text-sm text-gray-600">Set defaults for new expenses and budgets.</p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700">Default Category</label>
          <select className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500">
            <option value="">Select a category</option>
            <option>Food</option>
            <option>Travel</option>
          </select>
        </div>

        <div className="rounded-xl border border-gray-100">
          <div className="px-4 py-3">
            <SettingsToggle
              label="Enable Monthly Budget"
              description="Track spending against a monthly limit."
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Monthly Budget</label>
          <input
            type="number"
            className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500"
            placeholder="Monthly Budget ₹"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700"
        >
          Save
        </button>
      </div>
    </>
  );
}
