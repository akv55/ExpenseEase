export default function DangerZone() {
  return (
    <>
      <div className="mb-6">
        <h2 className="text-lg md:text-xl font-semibold text-red-700">Danger Zone</h2>
        <p className="mt-1 text-sm text-gray-600">
          These actions are irreversible. Please proceed carefully.
        </p>
      </div>

      <div className="rounded-xl border border-red-100 bg-white p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-gray-900">Delete account</p>
            <p className="mt-1 text-xs text-gray-500">
              Permanently remove your account and associated data.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
          >
            Delete Account
          </button>
        </div>
      </div>
    </>
  );
}
