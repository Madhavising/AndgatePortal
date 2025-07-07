import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEye, FaEdit, FaStar } from "react-icons/fa";
import { baseUrl } from "../api";
import axios from "axios";
import { toast } from "react-toastify";

import CandidateInformation from "../components/CandidateInformation";
import CandidateTable from "../components/CandidateTable";
import RemarkModal from "../components/RemarkModal";
import MiniLoading from "../components/miniLoading";

const AssignedCandidatePage = () => {
  const token = localStorage.getItem("token");
  const [refreshKey, setRefreshKey] = useState(0);
  const navigate = useNavigate();
  const [assignedList, setAssignedList] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const capitalizeFirst = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  const [loading, setLoading] = useState(true);


  const [selectedRemark, setSelectedRemark] = useState("");

  useEffect(() => {
    const getAllCandidates = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/get_all_assigned_to_me`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          setAssignedList(response.data.data);
        }
      } catch (error) {
        console.error("Candidate Fetch Error:", error?.response?.data || error.message);
        toast.error("Failed to fetch assigned candidates.");
      } finally {
        setLoading(false);
      }
    };

    getAllCandidates();
  }, [token, refreshKey]);

  const handleEditClick = (candidate) => {
    setSelectedCandidateId(candidate._id);
    setSelectedRemark(candidate.remark || "");
    setModalOpen(true);
  };

  const handleRemarkSave = async (newRemark) => {
    try {
      const response = await axios.patch(`${baseUrl}/api/add_remark/${selectedCandidateId}`, { remark: newRemark }, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      if (response.status === 200) {
        toast.success("Remark updated");
        setRefreshKey((prev) => prev + 1);
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.error(
        "Candidate update Error:",
        error?.response?.data || error.message
      );
    } finally {
      setModalOpen(false);
      setSelectedCandidateId(null);
    }
  };

  const handleStatusUpdate = async (status) => {
    try {
      const response = await axios.patch(`${baseUrl}/api/change_candidate_status/${selectedCandidate._id}`, { status: status }, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      if (response.status === 200) {
        toast.success(`Great! Status is now set to ${capitalizeFirst(status)}.`);
        setSelectedCandidate(null)
        setRefreshKey((prev) => prev + 1);
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.error(
        "Candidate update Error:",
        error?.response?.data || error.message
      );
    }
  };

  if (loading) return <MiniLoading />;

  return (
    <div className="px-4 py-6 bg-gray-50 font-inter h-full overflow-x-hidden">
      {
        assignedList.length !== 0 ? (
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
        ) : (
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
        )}
    </div>
  );
};

export default AssignedCandidatePage;
