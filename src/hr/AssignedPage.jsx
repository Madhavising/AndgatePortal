import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const AssignedCandidatePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const candidate = location.state?.assignedCandidate;

  if (!candidate) {
    return (
      <div className="p-6 text-gray-600">
        <p>No candidate data found.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
        >
          <FaArrowLeft className="inline mr-2" />
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-inter">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-semibold text-gray-800 tracking-tight">
            Assigned Candidate Details
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
          >
            <FaArrowLeft />
            Back
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl shadow border border-gray-200 bg-white">
          <table className="min-w-full text-sm text-left table-auto">
            <thead className="bg-gray-50 text-gray-600 font-medium">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Phone</th>
                <th className="px-6 py-3">Domain</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Resume</th>
                <th className="px-6 py-3">Download</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-800 font-medium">
                  {candidate.name}
                </td>
                <td className="px-6 py-4 text-gray-700">{candidate.email}</td>
                <td className="px-6 py-4 text-gray-700">{candidate.mobile}</td>
                <td className="px-6 py-4 text-gray-700">{candidate.domain}</td>
                <td className="px-6 py-4">
                  <span className="text-blue-600 font-semibold">
                    {candidate.status || "Pending"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {candidate.resume ? (
                    <a
                      href={`/resumes/${candidate.resume}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      {candidate.resume}
                    </a>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="px-6 py-4">
                  {candidate.resume ? (
                    <a
                      href={`/resumes/${candidate.resume}`}
                      download
                      className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded text-sm font-medium"
                    >
                      Download
                    </a>
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AssignedCandidatePage;
