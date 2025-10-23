import React, { useState } from "react";
import { FaSave, FaTimes } from "react-icons/fa";
import { useAuth } from "../../context/authContext";

const EditProfileForm = () => {
  const { user } = useAuth();
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });
  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);

      // Example: send formData to backend
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("phone", formData.phone);
      res.status.json({ message: "Profile updated successfully" });
    } catch (err) {
      setError("Error updating profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      image: user?.profileImage?.url || "",
    });
    setPreviewImage(user?.profileImage?.url || null);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Edit Profile Information
      </h3>
      {hasAttemptedSubmit && error && (
      <div className='mb-6 bg-red-50 border border-red-200 rounded-xl p-4'>
        <p className="text-red-600 text-center text-sm font-medium">{error}</p>
      </div>
              )}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Preview */}


        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
              required
            />
          </div>

          {/* Image Upload */}
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Profile Picture{" "}
              <span className="text-gray-500">(JPEG, PNG)</span>
            </label>
            <input
              type="file"
              accept="image/jpeg, image/png"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border-2 border-dashed border-purple-400 rounded-lg cursor-pointer file:border-0 file:bg-purple-100 file:rounded-lg file:text-purple-700 file:text-sm file:p-1 hover:border-purple-500 transition"
            />
          </div> */}
        </div>

        {/* Buttons */}
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={loading}
            className={`bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors ${loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
          >
            <FaSave className="w-4 h-4" />
            <span>{loading ? "Saving..." : "Save Changes"}</span>
          </button>

          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <FaTimes className="w-4 h-4" />
            <span>Cancel</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;
