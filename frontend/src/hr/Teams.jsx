import React, { useState } from "react";
import {
  MagnifyingGlassIcon,
  EyeIcon,
  XMarkIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

const hrData = [
  {
    hrName: "Richa ",
    hrEmail: "richa@andgate.com",
    candidates: [
      {
        name: "Amit Kumar",
        status: "Shortlisted",
        email: "amit@example.com",
        updated: "1 day ago",
        phone: "+91 9876543210",
        skills: ["React", "Node.js"],
        resume: "https://example.com/resume-amit.pdf",
        notes: "Strong in backend. Good communication.",
      },
    ],
  },
  {
    hrName: "Saundarya",
    hrEmail: "saundarya@andgate.com",
    candidates: [
      {
        name: "Rohan Das",
        status: "Rejected",
        email: "rohan@example.com",
        updated: "3 days ago",
        phone: "+91 9123456789",
        skills: ["HTML", "CSS"],
        resume: "https://example.com/resume-rohan.pdf",
        notes: "Lacked experience in JavaScript.",
      },
    ],
  },
];

const statusColors = {
  Shortlisted: "bg-yellow-100 text-yellow-800",
  Interviewed: "bg-blue-100 text-blue-800",
  Selected: "bg-green-100 text-green-800",
  Rejected: "bg-red-100 text-red-800",
  Pending: "bg-gray-100 text-gray-800",
};

const TeamsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const filteredData = hrData.flatMap((hr) =>
    hr.candidates
      .filter((c) =>
        `${c.name} ${hr.hrName}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
      .map((c) => ({ ...c, hrName: hr.hrName, hrEmail: hr.hrEmail }))
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
       <div className="mb-6 border-b border-gray-200 pb-4">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between  gap-4">
        <h2 className="text-3xl font-bold text-gray-800">Team Overview</h2>
        <div className="relative w-full max-w-md">
          <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparen"
            placeholder="Search by HR or Candidate"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
      </div>
       </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                HR Name
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                HR Email
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                Candidate Name
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                Candidate Email
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                Status
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                Last Update
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((c, i) => (
                <tr key={i} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {c.hrName}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {c.hrEmail}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">{c.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{c.email}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full ${
                        statusColors[c.status] || "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {c.updated}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
                      onClick={() => setSelectedCandidate(c)}
                    >
                      <EyeIcon className="w-4 h-4" /> View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-4 py-8 text-center text-gray-400">
                  No matching candidates found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* View Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-white w-full max-w-xl rounded-lg shadow-lg p-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setSelectedCandidate(null)}
            >
              <XMarkIcon className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Candidate Profile
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-semibold text-gray-700">Name:</span>
                <div>{selectedCandidate.name}</div>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Email:</span>
                <div>{selectedCandidate.email}</div>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Phone:</span>
                <div>{selectedCandidate.phone || "N/A"}</div>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Status:</span>
                <span
                  className={`ml-1 text-xs font-medium px-3 py-1 rounded-full ${
                    statusColors[selectedCandidate.status] ||
                    "bg-gray-100 text-gray-800"
                  }`}
                >
                  {selectedCandidate.status}
                </span>
              </div>
              <div className="col-span-2">
                <span className="font-semibold text-gray-700">Skills:</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedCandidate.skills?.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="font-semibold text-gray-700">HR:</span>
                <div>{selectedCandidate.hrName}</div>
              </div>
              <div>
                <span className="font-semibold text-gray-700">
                  Last Updated:
                </span>
                <div>{selectedCandidate.updated}</div>
              </div>
              <div className="col-span-2">
                <span className="font-semibold text-gray-700">Resume:</span>
                <a
                  href={selectedCandidate.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View Resume
                </a>
              </div>
              <div className="col-span-2">
                <span className="font-semibold text-gray-700">Notes:</span>
                <p className="mt-1 text-gray-600 italic">
                  {selectedCandidate.notes || "No notes provided."}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamsPage;
