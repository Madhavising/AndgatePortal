import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { baseUrl } from "../../api";
import { FaLock, FaPlus } from "react-icons/fa6";
import { useLocation } from "react-router-dom";

const ApplicationTracker = () => {
  const token = localStorage.getItem("token");
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [enterviewers, setInterviewers] = useState([])
  const [formData, setFormData] = useState({
    eventName: "",
    interviewer: "",
    email: "",
    link: "",
  });

  const location = useLocation();
  const candidate = location.state?.candidate || {};

  const eventOptions = [
    { value: "Screening", label: "Screening Round" },
    { value: "Technical 1", label: "Technical Round 1" },
    { value: "Technical 2", label: "Technical Round 2" },
    { value: "Technical 3", label: "Technical Round 3" },
    { value: "Orientation", label: "Orientation Round" },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      ...formData,
      id: Date.now(),
      feedback: "",
      status: "Pending",
    };

    console.log("New Event Data:", newEvent);

    setEvents([...events, newEvent]);
    setShowModal(false);
    setFormData({ eventName: "", interviewer: null, email: "", link: "" });
  };

  const handleFeedbackChange = (id, value) => {
    setEvents((prev) =>
      prev.map((ev) => (ev.id === id ? { ...ev, feedback: value } : ev))
    );
  };

  const handleStatusChange = (id, newStatus) => {
    setEvents((prev) =>
      prev.map((ev) => (ev.id === id ? { ...ev, status: newStatus } : ev))
    );
  };

  useEffect(() => {
    const getAllEnterviewers = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/auth/getAllUsers`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = response.data.data;

        setInterviewers(
          data.map((interviewer) => ({
            value: interviewer.email,
            label: `${interviewer.firstName} ${interviewer.lastName}`,
            email: interviewer.email
          }))
        );

      } catch (error) {
        console.error("Error fetching interviewers:", error);
      }
    };

    getAllEnterviewers();
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-2xl font-bold text-gray-900">
          🎯 Application Tracker
        </h1>
      </div>

      {/* Candidate Info */}
      <div className="bg-white p-6 rounded-lg shadow mb-10">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          👤 Candidate Info
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700">
          <div><strong>Name:</strong> {candidate.name}</div>
          <div><strong>Email:</strong> {candidate.email}</div>
          <div><strong>Phone:</strong> {candidate.mobile}</div>
          <div><strong>Domain:</strong> {candidate.domain}</div>
          <div><strong>Experience:</strong> {candidate.experienceYears} Yrs</div>
          <div><strong>Skills:</strong> {candidate.skills}</div>
        </div>
      </div>

      {/* Selection Rounds */}
      <div className="mb-16">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 gap-3">
            <h2 className="text-lg font-semibold text-yellow-600 flex items-center gap-2">
              <FaLock /> Selection Rounds
            </h2>
            <button
              onClick={() => setShowModal(true)}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm flex items-center justify-center gap-2"
            >
              <FaPlus /> Add Event
            </button>
          </div>

          {/* Event Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div key={event.id} className="border border-gray-200 p-4 rounded-lg shadow-sm bg-white hover:shadow-md transition">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg text-blue-700">
                    {event.eventName}
                  </h3>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${event.status === "Selected"
                      ? "bg-green-100 text-green-700"
                      : event.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                      }`}
                  >
                    {event.status}
                  </span>
                </div>
                <p><strong>Interviewer:</strong> {event.interviewer?.label}</p>
                <p><strong>Email:</strong> {event.email}</p>
                {event.link && (
                  <p className="truncate">
                    <strong>Link:</strong>{" "}
                    <a href={event.link} target="_blank" rel="noreferrer" className="text-blue-500 underline">
                      Join Meet
                    </a>
                  </p>
                )}
                <div className="mt-2">
                  <textarea
                    rows={2}
                    placeholder="Add Feedback"
                    className="w-full border px-2 py-1 rounded text-sm"
                    value={event.feedback}
                    onChange={(e) =>
                      handleFeedbackChange(event.id, e.target.value)
                    }
                  />
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleStatusChange(event.id, "Selected")}
                    disabled={event.status !== "Pending"}
                    className={`px-3 py-1 rounded text-sm w-full ${event.status === "Selected"
                      ? "bg-green-400 text-white cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700 text-white"
                      }`}
                  >
                    Select
                  </button>
                  <button
                    onClick={() => handleStatusChange(event.id, "Rejected")}
                    disabled={event.status !== "Pending"}
                    className={`px-3 py-1 rounded text-sm w-full ${event.status === "Rejected"
                      ? "bg-red-400 text-white cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700 text-white"
                      }`}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
            <h3 className="text-xl font-semibold mb-4 text-center">
              Add Interview Event
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Event Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Name
                </label>
                <Select
                  options={eventOptions}
                  value={eventOptions.find(
                    (e) => e.value === formData.eventName
                  )}
                  onChange={(selected) =>
                    setFormData({ ...formData, eventName: selected.value })
                  }
                />
              </div>

              {/* Interviewer */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Interviewer
                </label>
                <Select
                  options={enterviewers}
                  getOptionLabel={(e) => `${e.label}`}
                  onChange={(selected) =>
                    setFormData({
                      ...formData,
                      interviewer: selected,
                    })
                  }
                  placeholder="Search by name..."
                />
              </div>

              {/* Interviewer Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Interviewer Email
                </label>
                <input
                  type="email"
                  readOnly
                  className="w-full border bg-gray-100 border-gray-300 rounded px-3 py-2 text-sm"
                  value={formData.interviewer?.email || ""}
                />
              </div>

              {/* Candidate Email & Link */}
              {["Technical 1", "Technical 2", "Technical 3"].includes(formData.eventName) && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Candidate Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Meet Link
                    </label>
                    <input
                      type="text"
                      name="link"
                      value={formData.link}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                  </div>
                </>
              )}

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationTracker;
