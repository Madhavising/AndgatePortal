import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEye, FaUserPlus } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
import { baseUrl } from "../api";
import { toast } from "react-toastify";
import { Search } from "lucide-react";

import CandidateInformation from "../components/CandidateInformation";
import CandidateTable from "../components/CandidateTable";

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
        const response = await axios.get(`${baseUrl}/api/get_all_candidates`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          setCandidates(response.data.data);
        }
      } catch (error) {
        console.error(
          "Fresher Candidate Submit Error:",
          error?.response?.data || error.message
        );
        toast.error("Failed to register fresher candidate.");
      }
    };

    getAllCandidates();
  }, [token, refreshKey]);

  const handleAssign = async (candidateId) => {
    try {
      const response = await axios.patch(
        `${baseUrl}/api/assigned_to_me/${candidateId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success(`Assigned successfully`);
        setRefreshKey((prev) => prev + 1);
      }
    } catch (error) {
      console.error(
        "Candidate update Error:",
        error?.response?.data || error.message
      );
      toast.error("Failed to update candidate.");
    }
  };

  const handleStatusUpdate = (status) => {
    const updatedList = candidates.map((c) =>
      c._id === selectedCandidate._id ? { ...c, status } : c
    );

    setCandidates(updatedList); // update the UI list
    toast.success(`Status updated to ${status}`);
  };

  return (
    <div className="p-4 md:p-6 bg-[#f8fafc] h-full font-inter overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-6 border-b border-gray-200 pb-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Heading */}
            <h2 className="text-2xl font-bold text-gray-900">
              Candidate Submission Panel
            </h2>

            {/* Search Bar */}
            <div className="relative w-full md:w-96">
              <span className="absolute left-3 top-2.5 text-gray-400">
                <Search size={16} />
              </span>
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto rounded-xl shadow border border-gray-200 bg-white">
          <CandidateTable
            candidates={candidates}
            onAssign={handleAssign}
            onView={setSelectedCandidate}
            showAssignButton={true}
          />
        </div>
      </div>

      {/* Review Modal */}
      <CandidateInformation
        selectedCandidate={selectedCandidate}
        onClose={() => setSelectedCandidate(null)}
        handleStatusUpdate={handleStatusUpdate}
      />
    </div>
  );
};

export default CandidateList;
