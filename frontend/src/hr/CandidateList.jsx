import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Search } from "lucide-react";

import { baseUrl } from "../api";
import CandidateInformation from "../components/CandidateInformation";
import CandidateTable from "../components/CandidateTable";

const CandidateList = () => {
  const token = localStorage.getItem("token");

  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedRating, setSelectedRating] = useState("");

  // Capitalize first letter utility
  const capitalizeFirst = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  // Fetch all candidates
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
          "Fetch Candidates Error:",
          error?.response?.data || error.message
        );
        toast.error("Failed to load candidates.");
      }
    };

    getAllCandidates();
  }, [token, refreshKey]);

  // Assign candidate
  const handleAssign = async (candidateId) => {
    try {
      const response = await axios.patch(
        `${baseUrl}/api/assign_candidate_to_me/${candidateId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Candidate assigned successfully");
        setRefreshKey((prev) => prev + 1);
      }
    } catch (error) {
      console.error(
        "Assign Candidate Error:",
        error?.response?.data || error.message
      );
      toast.error("Failed to assign candidate.");
    }
  };

  // Update status of candidate
  const handleStatusUpdate = async (status) => {
    try {
      const response = await axios.patch(
        `${baseUrl}/api/change_candidate_status/${selectedCandidate._id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success(`Status updated to ${capitalizeFirst(status)}`);
        setRefreshKey((prev) => prev + 1);
        setSelectedCandidate(null);
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.error(
        "Status Update Error:",
        error?.response?.data || error.message
      );
      toast.error("Status update failed");
    }
  };

  // Filter candidates based on search term
  const filteredCandidates = candidates.filter((c) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      c.email.toLowerCase().includes(term) ||
      c.name.toLowerCase().includes(term) ||
      c.status.toLowerCase().includes(term) ||
      c.mobile.toLowerCase().includes(term) ||
      c.domain.toLowerCase().includes(term) ||
      c.experienceYears.includes(term);

    const matchesRating = selectedRating
      ? c.rating >= Number(selectedRating)
      : true;

    return matchesSearch && matchesRating;
  });

  return (
    <div className="p-4 md:p-6 bg-[#f8fafc] h-full font-inter overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-6 border-b border-gray-200 pb-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Candidate Submission Panel
            </h2>

            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <span className="absolute left-3 top-2.5 text-gray-400">
                <Search size={16} />
              </span>
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Candidate Table */}
        <div className="overflow-x-auto rounded-xl shadow border border-gray-200 bg-white">
          <CandidateTable
            candidates={filteredCandidates}
            onAssign={handleAssign}
            onView={setSelectedCandidate}
            showAssignButton={true}
            searchTerm={searchTerm}
          />
        </div>
      </div>

      {/* Candidate Detail Modal */}
      <CandidateInformation
        selectedCandidate={selectedCandidate}
        onClose={() => setSelectedCandidate(null)}
        handleStatusUpdate={handleStatusUpdate}
      />
    </div>
  );
};

export default CandidateList;
