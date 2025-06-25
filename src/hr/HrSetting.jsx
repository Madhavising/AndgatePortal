import React, { useState } from "react";
import { UploadCloud, Bell, Lock, UserCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function HrSettings() {
  const [profilePic, setProfilePic] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setProfilePic(URL.createObjectURL(file));
  };

  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="h-full bg-gray-100 flex items-center justify-center px-2 py-4">
      <div className="max-w-6xl w-full bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">HR Settings</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column: Profile Pic & Info */}
          <div className="bg-gray-50 rounded-lg p-5 border space-y-5 flex flex-col items-center justify-center">
            {profilePic ? (
              <img
                src={profilePic}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border"
              />
            ) : (
              <UserCircle className="w-24 h-24 text-gray-300" />
            )}
            <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-white border border-gray-300 text-sm rounded-md hover:bg-gray-100">
              <UploadCloud className="w-4 h-4 mr-2" />
              Upload Picture
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>

            <div className="w-full space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Right Column: Settings */}
          <div className="space-y-6">
            {/* Notifications */}
            <div className="bg-gray-50 p-4 rounded-lg border">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-3">
                <Bell className="w-5 h-5" /> Notification Preferences
              </h3>
              <label className="flex items-center gap-2 text-gray-700 mb-2">
                <input
                  type="checkbox"
                  className="accent-blue-600"
                  defaultChecked
                />
                Email updates for approvals
              </label>
              <label className="flex items-center gap-2 text-gray-700">
                <input type="checkbox" className="accent-blue-600" />
                SMS alerts for urgent actions
              </label>
            </div>

            {/* Department */}
            <div className="bg-gray-50 p-4 rounded-lg border">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Department
              </h3>
              <select className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500">
                <option>Human Resources</option>
                <option>Finance</option>
                <option>Engineering</option>
                <option>Marketing</option>
              </select>
            </div>

            {/* Password */}
            <div className="bg-gray-50 p-4 rounded-lg border">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-3">
                <Lock className="w-5 h-5" /> Change Password
              </h3>
              <div className="space-y-3">
                <input
                  type="password"
                  placeholder="Current Password"
                  className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="text-right pt-3">
              <button
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-2 rounded-md shadow"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
