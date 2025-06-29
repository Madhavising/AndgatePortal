import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { baseUrl } from "../api";
import axios from "axios";
import { toast } from "react-toastify";

const AssignedCandidatePage = () => {
  const token = localStorage.getItem("token")
  const navigate = useNavigate();
  const [assignedList, setAssignedList] = useState([]);

  useEffect(() => {
    const getAllCandidates = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/get_all_assigned`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          }
        );

        if (response.status === 200) {
          setAssignedList(response.data.data);
        }

      } catch (error) {
        console.error("Fresher Candidate Submit Error:", error?.response?.data || error.message);
        toast.error("Failed to register fresher candidate.");
      }
    };
    getAllCandidates()
  }, []);

  if (assignedList.length === 0) {
    return (
      <div className="p-6 text-gray-600">
        <p>No assigned candidates found.</p>
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

  const renderStatusBadge = (status) => {
    let color = "bg-gray-100 text-gray-700";
    if (status === "Resume Shortlisted") color = "bg-yellow-100 text-yellow-800";
    else if (status === "Interview Cleared") color = "bg-green-100 text-green-800";
    else if (status === "HR Round Cleared") color = "bg-blue-100 text-blue-800";
    else if (status === "Selected for Offer") color = "bg-indigo-100 text-indigo-800";
    else if (status === "Rejected") color = "bg-red-100 text-red-800";

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${color}`}>
        {status}
      </span>
    );
  };


  return (
    <div className="p-6 bg-gray-50 font-inter h-full overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8 border-b pb-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
            Assigned Candidate Details
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors duration-200"
          >
            <FaArrowLeft className="text-base" />
            <span>Back to List</span>
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
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {assignedList.map((candidate) => (
                <tr key={candidate._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-800 font-medium">
                    {candidate.name}
                  </td>
                  <td className="px-6 py-4 text-gray-700">{candidate.email}</td>
                  <td className="px-6 py-4 text-gray-700">
                    {candidate.mobile}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {candidate.domain}
                  </td>
                  <td className="px-6 py-4">
                    {renderStatusBadge(candidate.status || "Resume Shortlisted")}
                  </td>
                  <td className="px-6 py-4">
                    {candidate.resume && (() => {
                      const resumeUrl = `${baseUrl}/${candidate.resume}`;
                      const isDoc = candidate.resume.endsWith(".doc") || candidate.resume.endsWith(".docx");
                      const viewUrl = isDoc
                        ? `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(resumeUrl)}`
                        : resumeUrl;

                      return (
                        <a
                          href={viewUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded text-sm font-medium transition"
                        >
                          View Resume
                        </a>
                      );
                    })()}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AssignedCandidatePage;
