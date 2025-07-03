import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEye, FaEdit, FaStar } from "react-icons/fa";
import { baseUrl } from "../api";
import axios from "axios";
import { toast } from "react-toastify";

import CandidateInformation from "../components/CandidateInformation";
import CandidateTable from "../components/CandidateTable";
import RemarkModal from "../components/RemarkModal";

const AssignedCandidatePage = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [assignedList, setAssignedList] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);

  const [selectedRemark, setSelectedRemark] = useState("");

  useEffect(() => {
    const getAllCandidates = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/get_all_assigned`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          setAssignedList(response.data.data);
        }
      } catch (error) {
        console.error(
          "Candidate Fetch Error:",
          error?.response?.data || error.message
        );
        toast.error("Failed to fetch assigned candidates.");
      }
    };
    getAllCandidates();
  }, []);

  const handleEditClick = (candidate) => {
    setSelectedCandidateId(candidate._id);
    setSelectedRemark(candidate.remarks || "");
    setModalOpen(true);
  };

  const handleStatusUpdate = (status) => {
    const updatedList = assignedList.map((c) =>
      c._id === selectedCandidate._id ? { ...c, status } : c
    );

    setAssignedList(updatedList); // update UI list
    toast.success(`Status updated to ${status}`);
  };

  const handleRemarkSave = (newRemark) => {
    const updatedList = assignedList.map((candidate) => {
      if (candidate._id === selectedCandidateId) {
        return { ...candidate, remarks: newRemark }; // update remark locally
      }
      return candidate;
    });

    setAssignedList(updatedList);
    toast.success("Remark updated");
    setModalOpen(false);
  };

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

  return (
    <div className="px-4 py-6 bg-gray-50 font-inter h-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 border-b pb-4 gap-3">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            Assigned Candidate Details
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors"
          >
            <FaArrowLeft className="text-base" />
            <span>Back to List</span>
          </button>
        </div>

        {/* Candidate Table */}
        <div className="overflow-x-auto rounded-xl shadow border border-gray-200 bg-white">
          <CandidateTable
            candidates={assignedList}
            onView={setSelectedCandidate}
            showEditButton={true}
            isAssignedTable={true}
            onEdit={handleEditClick}
          />
        </div>

        {/* Candidate Info Modal */}
        <CandidateInformation
          selectedCandidate={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
          handleStatusUpdate={handleStatusUpdate}
          isAssignedTableButton={true}
        />

        {/* Remark Modal */}
        <RemarkModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleRemarkSave}
          initialRemark={selectedRemark}
        />
      </div>
    </div>
  );
};

export default AssignedCandidatePage;
