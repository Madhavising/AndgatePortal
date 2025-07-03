import React, { useState } from "react";
import moment from "moment";
import { FaPlus, FaCheck, FaTimes, FaEdit } from "react-icons/fa";

const ApplicationTracker = () => {
  const [clientRounds, setClientRounds] = useState([]);
  const [status, setStatus] = useState("Pending");
  const [isLocked, setIsLocked] = useState(false);
  const [modal, setModal] = useState({ open: false, round: null, index: null });
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbacks, setFeedbacks] = useState({ AndGate: "", Client: [] });

  const getTimestamp = () => moment().format("DD MMM YYYY, hh:mm A");


  const addClientRound = () => {
    setClientRounds([...clientRounds, { decision: "", timestamp: "" }]);
    setFeedbacks((prev) => ({ ...prev, Client: [...prev.Client, ""] }));
  };

  const handleDecision = (round, index, decision) => {
    const timestamp = getTimestamp();
    if (round === "AndGate") {
      setStatus(decision === "qualified" ? "Qualified" : "Disqualified");
      if (decision === "disqualified") setIsLocked(true);
    } else {
      const updated = [...clientRounds];
      updated[index].decision = decision;
      updated[index].timestamp = timestamp;
      setClientRounds(updated);
    }
  };

  const openFeedbackModal = (round, index) => {
    setModal({ open: true, round, index });
    setFeedbackText(
      round === "AndGate" ? feedbacks.AndGate : feedbacks.Client[index] || ""
    );
  };

  const saveFeedback = () => {
    if (modal.round === "AndGate") {
      setFeedbacks((prev) => ({ ...prev, AndGate: feedbackText }));
    } else {
      const updated = [...feedbacks.Client];
      updated[modal.index] = feedbackText;
      setFeedbacks((prev) => ({ ...prev, Client: updated }));
    }
    setModal({ open: false, round: null, index: null });
  };

  const getStatusBadge = (decision) => {
    if (!decision) return <span className="text-gray-400">Pending</span>;
    if (decision === "qualified")
      return (
        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">
          Qualified
        </span>
      );
    if (decision === "disqualified")
      return (
        <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-semibold">
          Disqualified
        </span>
      );
    return null;
  };

  return (
    <div className="max-w-7xl mx-auto p-6 font-sans bg-gray-50 h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-3 sm:gap-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Application Tracker
        </h1>
        <span
          className={`inline-block px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap
      ${
        status === "Pending"
          ? "bg-yellow-100 text-yellow-800"
          : status === "Qualified"
          ? "bg-green-100 text-green-800"
          : "bg-red-100 text-red-800"
      }`}
        >
          Status: {status}
        </span>
      </div>

      {/* Candidate Card */}
      <section className="bg-white rounded-lg shadow-md p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Candidate Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-gray-700 text-sm">
          <div>
            <strong>Name:</strong> John Doe
          </div>
          <div>
            <strong>Email:</strong> john@example.com
          </div>
          <div>
            <strong>Phone:</strong> 9876543210
          </div>
          <div>
            <strong>Domain:</strong> Backend
          </div>
          <div>
            <strong>Experience:</strong> 2.5 Yrs
          </div>
          <div>
            <strong>Skills:</strong> Node.js, MongoDB
          </div>
        </div>
      </section>

      {/* Interview Stages Table */}
      <section className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-8">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            Interview Stages
          </h2>
          <button
            disabled={isLocked}
            onClick={addClientRound}
            className={`inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-white text-xs sm:text-sm font-medium transition 
        ${
          isLocked
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
          >
            <FaPlus /> Add Client Round
          </button>
        </div>

        {/* TABLE for medium and up */}
        <div className="overflow-x-auto hidden sm:block">
          <table className="w-full min-w-[600px] border-collapse border border-gray-200 text-sm sm:text-base">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-3 sm:py-3 sm:px-6 border border-gray-200 text-left text-gray-600 font-medium">
                  Round
                </th>
                <th className="py-2 px-3 sm:py-3 sm:px-6 border border-gray-200 text-left text-gray-600 font-medium">
                  Interviewer
                </th>
                <th className="py-2 px-3 sm:py-3 sm:px-6 border border-gray-200 text-left text-gray-600 font-medium">
                  Feedback
                </th>
                <th className="py-2 px-3 sm:py-3 sm:px-6 border border-gray-200 text-left text-gray-600 font-medium">
                  Decision
                </th>
                <th className="py-2 px-3 sm:py-3 sm:px-6 border border-gray-200 text-left text-gray-600 font-medium">
                  Timestamp
                </th>
                <th className="py-2 px-3 sm:py-3 sm:px-6 border border-gray-200"></th>
              </tr>
            </thead>
            <tbody>
              {/* AndGate Row */}
              <tr className="hover:bg-gray-50 transition">
                <td className="py-2 px-3 sm:py-3 sm:px-6 border border-gray-200 font-semibold text-gray-900">
                  AndGate Interview
                </td>
                <td className="py-2 px-3 sm:py-3 sm:px-6 border border-gray-200 font-normal text-gray-900">
                  Tech Team
                </td>
                <td className="py-2 px-3 sm:py-3 sm:px-6 border border-gray-200">
                  <button
                    onClick={() => openFeedbackModal("AndGate")}
                    className="w-full text-left text-blue-600 hover:underline focus:outline-none"
                    title="Click to add/edit feedback"
                  >
                    {feedbacks.AndGate || (
                      <span className="text-gray-400 italic">Add feedback</span>
                    )}
                  </button>
                </td>
                <td className="py-2 px-3 sm:py-3 sm:px-6 border border-gray-200 flex gap-2 sm:gap-3 items-center">
                  <button
                    disabled={isLocked}
                    onClick={() => handleDecision("AndGate", null, "qualified")}
                    className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-2 py-1 sm:px-3 sm:py-1 rounded-md flex items-center gap-1 text-xs sm:text-sm"
                    title="Qualify Candidate"
                  >
                    <FaCheck />
                  </button>
                  <button
                    disabled={isLocked}
                    onClick={() =>
                      handleDecision("AndGate", null, "disqualified")
                    }
                    className="bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-2 py-1 sm:px-3 sm:py-1 rounded-md flex items-center gap-1 text-xs sm:text-sm"
                    title="Disqualify Candidate"
                  >
                    <FaTimes />
                  </button>
                  {getStatusBadge(status.toLowerCase())}
                </td>
                <td className="py-2 px-3 sm:py-3 sm:px-6 border border-gray-200 text-gray-600 whitespace-nowrap">
                  {status !== "Pending" ? getTimestamp() : "--"}
                </td>
                <td className="py-2 px-3 sm:py-3 sm:px-6 border border-gray-200 text-center">
                  <button
                    onClick={() => openFeedbackModal("AndGate")}
                    className="text-gray-500 hover:text-gray-700"
                    title="Edit Feedback"
                  >
                    <FaEdit />
                  </button>
                </td>
              </tr>

              {/* Client Rounds */}
              {clientRounds.map((round, index) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                  <td className="py-2 px-3 sm:py-3 sm:px-6 border border-gray-200 font-semibold text-gray-900">
                    Client {index + 1}
                  </td>
                  <td className="py-2 px-3 sm:py-3 sm:px-6 border border-gray-200 font-normal text-gray-900">
                    Client Name
                  </td>
                  <td className="py-2 px-3 sm:py-3 sm:px-6 border border-gray-200">
                    <button
                      onClick={() => openFeedbackModal("Client", index)}
                      className="w-full text-left text-blue-600 hover:underline focus:outline-none"
                      title="Click to add/edit feedback"
                    >
                      {feedbacks.Client[index] || (
                        <span className="text-gray-400 italic">
                          Add feedback
                        </span>
                      )}
                    </button>
                  </td>
                  <td className="py-2 px-3 sm:py-3 sm:px-6 border border-gray-200 flex gap-2 sm:gap-3 items-center">
                    <button
                      disabled={isLocked}
                      onClick={() =>
                        handleDecision("Client", index, "qualified")
                      }
                      className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-2 py-1 sm:px-3 sm:py-1 rounded-md flex items-center gap-1 text-xs sm:text-sm"
                      title="Qualify Candidate"
                    >
                      <FaCheck />
                    </button>
                    <button
                      disabled={isLocked}
                      onClick={() =>
                        handleDecision("Client", index, "disqualified")
                      }
                      className="bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-2 py-1 sm:px-3 sm:py-1 rounded-md flex items-center gap-1 text-xs sm:text-sm"
                      title="Disqualify Candidate"
                    >
                      <FaTimes />
                    </button>
                    {getStatusBadge(round.decision)}
                  </td>
                  <td className="py-2 px-3 sm:py-3 sm:px-6 border border-gray-200 text-gray-600 whitespace-nowrap">
                    {round.timestamp || "--"}
                  </td>
                  <td className="py-2 px-3 sm:py-3 sm:px-6 border border-gray-200 text-center">
                    <button
                      onClick={() => openFeedbackModal("Client", index)}
                      className="text-gray-500 hover:text-gray-700"
                      title="Edit Feedback"
                    >
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CARD LIST for small devices */}
        <div className="sm:hidden space-y-4">
          {/* AndGate Card */}
          <div className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-gray-900 font-semibold">AndGate Interview</h3>
              <button
                onClick={() => openFeedbackModal("AndGate")}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                title="Edit Feedback"
                aria-label="Edit AndGate feedback"
              >
                <FaEdit size={18} />
              </button>
            </div>

            <p className="text-sm text-gray-700 mb-2">
              <span className="font-medium">Interviewer:</span> Tech Team
            </p>

            <button
              onClick={() => openFeedbackModal("AndGate")}
              className="inline-flex items-center gap-1 text-blue-600 font-semibold text-sm hover:underline focus:outline-none px-1 py-0.5 rounded mb-4"
              title="Click to add/edit feedback"
              aria-label="Add or edit AndGate feedback"
            >
              {feedbacks.AndGate || (
                <span className="italic text-gray-400">Add feedback</span>
              )}
              <FaEdit className="text-blue-600" size={14} />
            </button>

            <div className="flex flex-wrap gap-2 mb-2">
              <button
                disabled={isLocked}
                onClick={() => handleDecision("AndGate", null, "qualified")}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-3 py-1 rounded-md flex items-center gap-1 text-xs"
                title="Qualify Candidate"
              >
                <FaCheck /> Qualify
              </button>
              <button
                disabled={isLocked}
                onClick={() => handleDecision("AndGate", null, "disqualified")}
                className="bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-3 py-1 rounded-md flex items-center gap-1 text-xs"
                title="Disqualify Candidate"
              >
                <FaTimes /> Disqualify
              </button>
              {getStatusBadge(status.toLowerCase())}
            </div>

            <p className="text-gray-600 text-xs">
              <span className="font-medium">Timestamp:</span>{" "}
              {status !== "Pending" ? getTimestamp() : "--"}
            </p>
          </div>

          {/* Client Rounds Cards */}
          {clientRounds.map((round, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-gray-900 font-semibold">
                  Client {index + 1}
                </h3>
                <button
                  onClick={() => openFeedbackModal("Client", index)}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  title="Edit Feedback"
                  aria-label={`Edit Client ${index + 1} feedback`}
                >
                  <FaEdit size={18} />
                </button>
              </div>

              <p className="text-sm text-gray-700 mb-2">
                <span className="font-medium">Interviewer:</span>{" "}
                <button
                  onClick={() => openFeedbackModal("Client", index)}
                  className="inline-flex items-center gap-1 text-blue-600 font-semibold text-sm hover:underline focus:outline-none px-1 py-0.5 rounded"
                  title="Click to add/edit feedback"
                  aria-label={`Add or edit Client ${index + 1} feedback`}
                >
                  {feedbacks.Client[index] || (
                    <span className="italic text-gray-400">Add feedback</span>
                  )}
                  <FaEdit className="text-blue-600" size={14} />
                </button>
              </p>

              <div className="flex flex-wrap gap-2 mb-2">
                <button
                  disabled={isLocked}
                  onClick={() => handleDecision("Client", index, "qualified")}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-3 py-1 rounded-md flex items-center gap-1 text-xs"
                  title="Qualify Candidate"
                >
                  <FaCheck /> Qualify
                </button>
                <button
                  disabled={isLocked}
                  onClick={() =>
                    handleDecision("Client", index, "disqualified")
                  }
                  className="bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-3 py-1 rounded-md flex items-center gap-1 text-xs"
                  title="Disqualify Candidate"
                >
                  <FaTimes /> Disqualify
                </button>
                {getStatusBadge(round.decision)}
              </div>

              <p className="text-gray-600 text-xs">
                <span className="font-medium">Timestamp:</span>{" "}
                {round.timestamp || "--"}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Feedback Modal */}
      {modal.open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 px-4 py-6">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-auto">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">
              Enter Feedback
            </h3>
            <textarea
              rows={5}
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              className="w-full p-3 mb-4 border border-gray-300 rounded resize-y min-h-[120px] focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Write feedback here..."
            />
            <div className="flex justify-end gap-3 flex-wrap">
              <button
                onClick={() =>
                  setModal({ open: false, round: null, index: null })
                }
                className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={saveFeedback}
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationTracker;
