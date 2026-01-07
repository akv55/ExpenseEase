import SettingsToggle from "./SettingsToggle";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

export default function SecuritySettings() {
  const { user, changePassword, updateLoginAlert } = useAuth();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [enabling2FA, setEnabling2FA] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const { currentPassword, newPassword, confirmPassword } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasAttemptedSubmit(true);

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Please fill out all required fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New Password and Confirm Password do not match.");
      return;
    }

    setLoading(true);
    try {
      await changePassword(formData);
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      toast.success("Password changed successfully.");
      navigate("/settings");
    } catch (err) {
      setError("Failed to change password.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleLoginAlertToggle = async (value) => {
    setSaving(true);
    try {
      await updateLoginAlert(value);
      toast.success(
        value ? "Login alerts enabled." : "Login alerts disabled."
      );
    } catch (err) {
      toast.error("Failed to update login alerts.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="mb-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">Security</h2>
        <p className="mt-1 text-sm text-gray-600">
          Manage authentication and security alerts.
        </p>
      </div>

      <div className="divide-y divide-gray-100 rounded-xl border border-gray-100 bg-white">
        <div className="px-4 py-3">
          <SettingsToggle
            label="Two Factor Authentication"
            description="Add an extra layer of protection to your account."
            checked={enabling2FA}
          />
        </div>
        {enabling2FA && (
          <div className="px-4 py-3 border-t border-gray-100">
            {/* 2FA Setup Instructions or QR Code would go here */}
            <p className="text-sm text-gray-600">
              To enable Two Factor Authentication, please scan the QR code
              below with your authenticator app and enter the generated code.
            </p>
          </div>
        )}
        <div className="px-4 py-3">

          <SettingsToggle
            label="Login Alerts"
            description="Get notified when your account is accessed."
            checked={!!user?.loginAlertEnabled}
            loading={saving}
            disabled={!user}
            onChange={handleLoginAlertToggle}
          />

        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={() => setIsChangePassword(!isChangePassword)}
          className="inline-flex items-center justify-center rounded-lg border border-teal-600 px-4 py-2 text-sm font-semibold text-teal-700 hover:bg-teal-50"
        >
          {isChangePassword ? "Cancel" : "Change Password"}
        </button>
      </div>

      {isChangePassword && (
        <div className="mt-6">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900">
            Change Password
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            {hasAttemptedSubmit && error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-red-600 text-center text-sm font-medium">
                  {error}
                </p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="currentPassword"
                value={currentPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-teal-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="newPassword"
                value={newPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-teal-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg outline-none ${confirmPassword && newPassword !== confirmPassword
                  ? "border-red-600 focus:ring-red-600"
                  : "border-gray-300 focus:ring-teal-500"
                  }`}
              />
              {confirmPassword && newPassword !== confirmPassword && (
                <p className="text-red-600 text-sm mt-1">
                  New Password and Confirm Password do not match.
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg border border-teal-600 px-4 py-2 text-sm font-semibold text-teal-700 hover:bg-teal-50"
            >
              {loading ? "Changing..." : "Change Password"}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
