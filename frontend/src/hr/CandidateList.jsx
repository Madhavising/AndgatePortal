import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
import { baseUrl } from "../api";
import { toast } from "react-toastify";

const CandidateList = () => {
  const token = localStorage.getItem("token");
  const [refreshKey, setRefreshKey] = useState(0);
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  // const [assignedCandidate, setAssignedCandidate] = useState(null);
  // const navigate = useNavigate();

  useEffect(() => {
    const getAllCandidates = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/get_all_candidates`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          }
        );

        if (response.status === 200) {
          setCandidates(response.data.data)
        }

      } catch (error) {
        console.error("Fresher Candidate Submit Error:", error?.response?.data || error.message);
        toast.error("Failed to register fresher candidate.");
      }
    };

    getAllCandidates()
  }, [token, refreshKey]);

  const handleAssign = async (candidateId) => {

    try {
      const response = await axios.patch(
        `${baseUrl}/api/assigned_to_me/${candidateId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      if (response.status === 200) {
        toast.success(`Assigned successfully`);
        setRefreshKey(prev => prev + 1);
      }

    } catch (error) {
      console.error("Candidate update Error:", error?.response?.data || error.message);
      toast.error("Failed to update candidate.");
    }
  };

  const Info = ({ label, value }) => (
    <div className="flex flex-col">
      <span className="text-sm text-gray-500 font-medium">{label}</span>
      <span className="text-base text-gray-800">{value || "—"}</span>
    </div>
  );

  return (
    <div className="p-6 font-inter bg-[#f8fafc] min-h-screen">
      <div className="mb-6 pb-2 border-b border-gray-200">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
          Candidate Submission Panel
        </h2>
      </div>

      <div className="overflow-x-auto rounded-lg shadow border border-gray-200 bg-white">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 font-medium text-gray-600">Name</th>
              <th className="px-6 py-3 font-medium text-gray-600">Email</th>
              <th className="px-6 py-3 font-medium text-gray-600">
                Phone Number
              </th>
              <th className="px-6 py-3 font-medium text-gray-600">Domain</th>
              <th className="px-6 py-3 font-medium text-gray-600">Status</th>
              <th className="px-6 py-3 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {candidates.map((candidate) => {
              return (
                <tr key={candidate._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">{candidate.name}</td>
                  <td className="px-6 py-4">{candidate.email}</td>
                  <td className="px-6 py-4">{candidate.mobile}</td>
                  <td className="px-6 py-4">{candidate.domain}</td>
                  <td className="px-6 py-4 font-medium text-blue-600">
                    {candidate.status}
                  </td>
                  <td className="px-6 py-4 space-y-2">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedCandidate(candidate)}
                        className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => handleAssign(candidate._id)}
                        className="px-4 py-1.5 text-sm font-semibold bg-yellow-500 hover:bg-yellow-600 text-white"
                      >
                        Assign to Me
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Review Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center px-4">
          <div className="bg-white max-w-4xl w-full rounded-2xl p-6 shadow-2xl overflow-y-auto max-h-[90vh] relative border border-gray-200">

            {/* Close Button */}
            <button
              onClick={() => setSelectedCandidate(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold transition"
              aria-label="Close"
            >
              ×
            </button>

            {/* Header */}
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-1">Candidate Details</h2>
              <p className="text-sm text-gray-500">Review the candidate's information and make a decision.</p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 mb-4">
              {/* <button
                onClick={() => {
                  toast.success("Candidate Accepted");
                  setSelectedCandidate(null);
                }}
                className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg text-sm font-medium shadow"
              >
                Accept
              </button> */}
              <button
                onClick={() => {
                  toast.error("Candidate Rejected");
                  setSelectedCandidate(null);
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg text-sm font-medium shadow"
              >
                Reject
              </button>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
              <Info label="Full Name" value={selectedCandidate.name} />
              <Info label="Email" value={selectedCandidate.email} />
              <Info label="Mobile" value={selectedCandidate.mobile} />
              <Info label="POC in ANDGATE" value={selectedCandidate.poc} />
              <Info label="Graduation Year" value={selectedCandidate.graduationYear} />
              <Info label="Degree" value={selectedCandidate.degree} />
              <Info label="Domain" value={selectedCandidate.domain} />
              <Info label="Availability" value={selectedCandidate.availability} />
              <Info label="Preferred Locations" value={selectedCandidate.preferredLocation} />

              {/* Resume */}
              {selectedCandidate.resume && (() => {
                const resumeUrl = `${baseUrl}/${selectedCandidate.resume}`;
                const isDoc = selectedCandidate.resume.endsWith(".doc") || selectedCandidate.resume.endsWith(".docx");
                const viewUrl = isDoc
                  ? `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(resumeUrl)}`
                  : resumeUrl;

                return (
                  <Info
                    label="Resume"
                    value={
                      <a
                        href={viewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline hover:text-blue-800 transition"
                      >
                        📄 View Resume
                      </a>
                    }
                  />
                );
              })()}
            </div>

            {/* Experience Section */}
            {selectedCandidate.experienceYears && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
                  Experience Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
                  <Info label="Experience Years" value={selectedCandidate.experienceYears} />
                  <Info label="Self Rating" value={selectedCandidate.selfRating} />
                  <Info label="Individual Role" value={selectedCandidate.individualRole} />
                  <Info label="Bond Details" value={selectedCandidate.bondDetails} />
                  <Info label="Bond Willingness" value={selectedCandidate.bondWilling} />
                  <Info label="Experience Excluding Training" value={selectedCandidate.expExcludingTraining} />
                  <Info label="Experience Including Training" value={selectedCandidate.expIncludingTraining} />
                  <Info label="Job Change Reason" value={selectedCandidate.jobChangeReason} />
                  <Info label="Interviews Attended" value={selectedCandidate.interviewsAttended} />
                  <Info label="Foreign Work Experience" value={selectedCandidate.foreignWork} />
                  <Info label="Skills" value={selectedCandidate.skills} />
                  <Info label="CTC Details" value={selectedCandidate.currentCTC} />
                  <Info label="Expected CTC" value={selectedCandidate.expectedCTC} />
                  <Info label="Offers in Hand" value={selectedCandidate.offerDetails} />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default CandidateList;
