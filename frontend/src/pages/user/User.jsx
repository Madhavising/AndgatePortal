import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

const MOCK_USERS = [
  { id: 1, firstName: "Priya", lastName: "Mehta", email: "priya@company.com", role: "hr" },
  { id: 2, firstName: "Ravi", lastName: "Kumar", email: "ravi@company.com", role: "user" },
  { id: 3, firstName: "Neha", lastName: "Singh", email: "neha@company.com", role: "hr" },
];

const UserPage = () => {
  const [allUsers, setAllUsers] = useState(MOCK_USERS);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [tab, setTab] = useState("HR"); // HR | ALL
  const [searchTerm, setSearchTerm] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    let filtered = allUsers;
    if (tab === "HR") {
      filtered = allUsers.filter((u) => u.role === "hr");
    }
    if (searchTerm) {
      filtered = filtered.filter(
        (u) =>
          u.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          u.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredUsers(filtered);
  }, [allUsers, tab, searchTerm]);

  const handleAddUser = () => {
    const { firstName, lastName, email, password, role } = newUser;
    const newErrors = {};

    if (!firstName) newErrors.firstName = "First name is required.";
    if (!lastName) newErrors.lastName = "Last name is required.";
    if (!email) newErrors.email = "Email is required.";
    if (!password) newErrors.password = "Password is required.";
    if (!role) newErrors.role = "Role is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const id = allUsers.length + 1;
    const addedUser = {
      id,
      ...newUser,
    };

    setAllUsers((prev) => [...prev, addedUser]);
    toast.success("User added successfully!");
    setShowModal(false);
    setShowConfirm(false);
    setNewUser({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "",
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-[#f9f9fb] px-6 py-10">
      <ToastContainer />

      <div className="max-w-7xl mx-auto bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Manage Users</h1>
            <p className="text-sm text-gray-500">
              Add, manage and control user roles
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search users..."
              className="px-4 py-2 rounded-md border w-full sm:w-64 shadow-sm text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              onClick={() => setShowModal(true)}
              className="px-5 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700"
            >
              + Add User
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 border-b mb-6">
          {["HR", "ALL"].map((item) => (
            <button
              key={item}
              onClick={() => setTab(item)}
              className={`px-4 pb-2 font-medium ${
                tab === item
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600"
              }`}
            >
              {item === "HR" ? "HR Users" : "All Users"}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Role</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((u) => (
                  <tr key={u.id}>
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {u.firstName} {u.lastName}
                    </td>
                    <td className="px-6 py-4 text-gray-700">{u.email}</td>
                    <td className="px-6 py-4 capitalize text-gray-500">{u.role}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-6 text-gray-400">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-40">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg border">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New User</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "First Name", key: "firstName" },
                { label: "Last Name", key: "lastName" },
                { label: "Email", key: "email", type: "email" },
                { label: "Password", key: "password", type: "password" },
              ].map(({ label, key, type = "text" }) => (
                <div key={key}>
                  <label className="text-sm font-medium">{label}</label>
                  <input
                    type={type}
                    className={`mt-1 w-full px-4 py-2 border text-sm rounded-md ${
                      errors[key]
                        ? "border-red-500"
                        : "border-gray-300 focus:border-blue-500"
                    }`}
                    value={newUser[key]}
                    onChange={(e) => {
                      setNewUser({ ...newUser, [key]: e.target.value });
                      setErrors((prev) => ({ ...prev, [key]: "" }));
                    }}
                  />
                  {errors[key] && (
                    <p className="text-xs text-red-500 mt-1">{errors[key]}</p>
                  )}
                </div>
              ))}

              {/* Role */}
              <div className="sm:col-span-2">
                <label className="text-sm font-medium">Role</label>
                <select
                  className={`mt-1 w-full px-4 py-2 border text-sm rounded-md ${
                    errors.role
                      ? "border-red-500"
                      : "border-gray-300 focus:border-blue-500"
                  }`}
                  value={newUser.role}
                  onChange={(e) => {
                    setNewUser({ ...newUser, role: e.target.value });
                    setErrors((prev) => ({ ...prev, role: "" }));
                  }}
                >
                  <option value="">Select role</option>
                  <option value="hr">HR</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
                {errors.role && (
                  <p className="text-xs text-red-500 mt-1">{errors.role}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end mt-6 gap-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  setErrors({});
                }}
                className="px-4 py-2 text-sm rounded-md border text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowConfirm(true)}
                className="px-6 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-xl w-full max-w-sm shadow-lg">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Confirm Save</h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to save this user?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 text-sm border rounded-md text-gray-700"
              >
                No
              </button>
              <button
                onClick={handleAddUser}
                className="px-5 py-2 text-sm bg-blue-600 text-white rounded-md"
              >
                Yes, Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPage;
