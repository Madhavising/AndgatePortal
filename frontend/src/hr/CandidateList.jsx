import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Search } from "lucide-react";

import { baseUrl } from "../api";
import CandidateInformation from "../components/CandidateInformation";
import CandidateTable from "../components/CandidateTable";
import CandidateFilter from "../components/CandidateFilter";

const CandidateList = () => {
  const token = localStorage.getItem("token");

  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [filteredCandidates, setFilteredCandidates] = useState([]);

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

  return (
    <div className="p-4 md:p-6 bg-[#f8fafc] h-full font-inter overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-6 border-b border-gray-200 pb-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Candidate Submission Panel
            </h2>
          </div>
          {/* Filters */}
          <div className=" mt-2">
            <CandidateFilter
              candidates={candidates}
              onFilter={setFilteredCandidates}
            />
          </div>
        </div>

        {/* Candidate Table */}
        <div className="overflow-x-auto rounded-xl shadow border border-gray-200 bg-white">
          {filteredCandidates.length > 0 ? (
            <CandidateTable
              candidates={filteredCandidates}
              onAssign={handleAssign}
              onView={setSelectedCandidate}
              showAssignButton={true}
            />
          ) : (
            <div className="text-center py-10 text-gray-500 text-sm">
              No candidates match the selected filters.
            </div>
          )}
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
