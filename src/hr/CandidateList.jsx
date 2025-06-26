import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

const currentHR = "Madhavi Singh";

const mockCandidates = [
  {
    id: 1,
    email: "keshav@example.com",
    poc: "Anand Sharma",
    name: "Keshav Singh",
    mobile: "9876543210",
    graduationYear: "2022",
    degree: "M.Tech",
    domain: "DV",
    preferredLocation: "Bangalore, Pune",
    availability: "Immediate",
    resume: "keshav_resume.pdf",
    experienceYears: "2 years 6 months",
    selfRating: "8/10 at 3 years",
    individualRole: "Yes",
    bondDetails: "6 months left, ₹1.5 lakh",
    bondWilling: "Maybe (with conditions)",
    expExcludingTraining: "2 year",
    expIncludingTraining: "3 year",
    jobChangeReason: "Growth and better learning opportunities",
    interviewsAttended: "ABC Corp - DV, XYZ Inc - STA",
    foreignWork: "No",
    skills: "SystemVerilog, UVM, Git, Scripting",
    currentCTC: "₹8 LPA",
    expectedCTC: "₹10 LPA",
    offerDetails: "Yes, CompanyX - ₹8 LPA",
    status: "Pending",
    isAssigned: false,
    assignedBy: "",
  },
  {
    id: 2,
    email: "keshav@example.com",
    poc: "Anand Sharma",
    name: "Keshav Singh",
    mobile: "9876543210",
    graduationYear: "2022",
    degree: "M.Tech",
    domain: "DV",
    preferredLocation: "Bangalore, Pune",
    availability: "Immediate",
    resume: "keshav_resume.pdf",
    experienceYears: "2 years 6 months",
    selfRating: "8/10 at 3 years",
    individualRole: "Yes",
    bondDetails: "6 months left, ₹1.5 lakh",
    bondWilling: "Maybe (with conditions)",
    expExcludingTraining: "2 year",
    expIncludingTraining: "3 year",
    jobChangeReason: "Growth and better learning opportunities",
    interviewsAttended: "ABC Corp - DV, XYZ Inc - STA",
    foreignWork: "No",
    skills: "SystemVerilog, UVM, Git, Scripting",
    currentCTC: "₹8 LPA",
    expectedCTC: "₹10 LPA",
    offerDetails: "Yes, CompanyX - ₹8 LPA",
    status: "Pending",
    isAssigned: false,
    assignedBy: "",
  },
  {
    id: 3,
    email: "keshav@example.com",
    poc: "Anand Sharma",
    name: "Keshav Singh",
    mobile: "9876543210",
    graduationYear: "2022",
    degree: "M.Tech",
    domain: "DV",
    preferredLocation: "Bangalore, Pune",
    availability: "Immediate",
    resume: "keshav_resume.pdf",
    experienceYears: "2 years 6 months",
    selfRating: "8/10 at 3 years",
    individualRole: "Yes",
    bondDetails: "6 months left, ₹1.5 lakh",
    bondWilling: "Maybe (with conditions)",
    expExcludingTraining: "2 year",
    expIncludingTraining: "3 year",
    jobChangeReason: "Growth and better learning opportunities",
    interviewsAttended: "ABC Corp - DV, XYZ Inc - STA",
    foreignWork: "No",
    skills: "SystemVerilog, UVM, Git, Scripting",
    currentCTC: "₹8 LPA",
    expectedCTC: "₹10 LPA",
    offerDetails: "Yes, CompanyX - ₹8 LPA",
    status: "Pending",
    isAssigned: false,
    assignedBy: "",
  },
];

const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [assignedCandidate, setAssignedCandidate] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const assigned =
      JSON.parse(localStorage.getItem("assignedCandidates")) || [];

    const updated = mockCandidates.map((candidate) => {
      const assignedMatch = assigned.find((a) => a.id === candidate.id);
      return assignedMatch
        ? {
            ...candidate,
            isAssigned: true,
            status: assignedMatch.status,
            assignedBy: assignedMatch.assignedBy,
          }
        : candidate;
    });

    setCandidates(updated);
  }, []);

  const handleAssign = (candidateId) => {
    const updatedCandidates = candidates.map((c) =>
      c.id === candidateId
        ? {
            ...c,
            isAssigned: true,
            assignedBy: currentHR,
            status: `Assigned to ${currentHR}`,
          }
        : c
    );

    const justAssigned = updatedCandidates.find((c) => c.id === candidateId);
    setCandidates(updatedCandidates);

    // ✅ Store multiple assigned candidates in localStorage
    const stored = JSON.parse(localStorage.getItem("assignedCandidates")) || [];
    const updatedList = [
      ...stored.filter((c) => c.id !== candidateId),
      justAssigned,
    ];
    localStorage.setItem("assignedCandidates", JSON.stringify(updatedList));

    toast.success(`Assigned to you (${currentHR})`);
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
            {candidates.map((candidate) => (
              <tr key={candidate.id} className="hover:bg-gray-50 transition">
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
                      disabled={candidate.isAssigned}
                      className={`flex items-center gap-2 px-4 py-2 text-sm ${
                        candidate.isAssigned
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-blue-500 hover:bg-blue-600 text-white"
                      }`}
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => handleAssign(candidate.id)}
                      disabled={candidate.isAssigned}
                      className={`px-4 py-1.5 text-sm font-semibold ${
                        candidate.isAssigned
                          ? "bg-gray-400 cursor-not-allowed text-white"
                          : "bg-yellow-500 hover:bg-yellow-600 text-white"
                      }`}
                    >
                      {candidate.isAssigned ? "Assigned" : "Assign to Me"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Review Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center px-4">
          <div className="bg-white max-w-4xl w-full rounded-2xl p-6 shadow-xl overflow-y-auto max-h-[90vh] relative border border-gray-200">
            <div className="flex justify-end gap-2 items-center mb-4 mr-6">
              <button
                onClick={() => {
                  toast.success("Candidate Accepted");
                  setSelectedCandidate(null);
                }}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 text-sm rounded"
              >
                Accept
              </button>
              <button
                onClick={() => {
                  toast.error("Candidate Rejected");
                  setSelectedCandidate(null);
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 text-sm rounded"
              >
                Reject
              </button>
              <button
                onClick={() => setSelectedCandidate(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            <h3 className="text-2xl font-semibold text-gray-800 mb-1 border-b pb-2">
              Candidate Review Details
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Full information provided by candidate
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <Info label="Email" value={selectedCandidate.email} />
              <Info label="POC in ANDGATE" value={selectedCandidate.poc} />
              <Info label="Full Name" value={selectedCandidate.name} />
              <Info label="Mobile Number" value={selectedCandidate.mobile} />
              <Info
                label="Graduation Year"
                value={selectedCandidate.graduationYear}
              />
              <Info label="Degree" value={selectedCandidate.degree} />
              <Info label="Domain" value={selectedCandidate.domain} />
              <Info
                label="Preferred Locations"
                value={selectedCandidate.preferredLocation}
              />
              <Info
                label="Availability"
                value={selectedCandidate.availability}
              />
              <Info
                label="Resume"
                value={
                  <a
                    href={`/resumes/${selectedCandidate.resume}`}
                    className="text-blue-600 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {selectedCandidate.resume}
                  </a>
                }
              />

              {selectedCandidate.experienceYears && (
                <>
                  <div className="col-span-2 pt-4">
                    <hr className="mb-2" />
                    <h4 className="text-base font-semibold text-gray-700">
                      Experience Details
                    </h4>
                  </div>
                  <Info
                    label="Experience Years"
                    value={selectedCandidate.experienceYears}
                  />
                  <Info
                    label="Self Rating"
                    value={selectedCandidate.selfRating}
                  />
                  <Info
                    label="Individual Role"
                    value={selectedCandidate.individualRole}
                  />
                  <Info
                    label="Bond Details"
                    value={selectedCandidate.bondDetails}
                  />
                  <Info
                    label="Bond Willingness"
                    value={selectedCandidate.bondWilling}
                  />
                  <Info
                    label="Experience Excluding Training"
                    value={selectedCandidate.expExcludingTraining}
                  />
                  <Info
                    label="Experience Including Training"
                    value={selectedCandidate.expIncludingTraining}
                  />
                  <Info
                    label="Job Change Reason"
                    value={selectedCandidate.jobChangeReason}
                  />
                  <Info
                    label="Interviews Attended"
                    value={selectedCandidate.interviewsAttended}
                  />
                  <Info
                    label="Foreign Work Experience"
                    value={selectedCandidate.foreignWork}
                  />
                  <Info label="Skills" value={selectedCandidate.skills} />
                  <Info
                    label="CTC Details"
                    value={selectedCandidate.currentCTC}
                  />
                  <Info
                    label="expectedCTC Details"
                    value={selectedCandidate.expectedCTC}
                  />
                  <Info
                    label="Offers in Hand"
                    value={selectedCandidate.offerDetails}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateList;
