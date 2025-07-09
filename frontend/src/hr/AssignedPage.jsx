// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaArrowLeft, FaEye, FaEdit, FaStar } from "react-icons/fa";
// import { baseUrl } from "../api";
// import axios from "axios";
// import { toast } from "react-toastify";

// import CandidateInformation from "../components/CandidateInformation";
// import CandidateTable from "../components/CandidateTable";
// import RemarkModal from "../components/RemarkModal";
// import MiniLoading from "../components/miniLoading";

// const AssignedCandidatePage = () => {
//   const token = localStorage.getItem("token");
//   const [refreshKey, setRefreshKey] = useState(0);
//   const navigate = useNavigate();
//   const [assignedList, setAssignedList] = useState([]);
//   const [selectedCandidate, setSelectedCandidate] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedCandidateId, setSelectedCandidateId] = useState(null);
//   const capitalizeFirst = (str) => str.charAt(0).toUpperCase() + str.slice(1);
//   const [loading, setLoading] = useState(true);

//   const [selectedRemark, setSelectedRemark] = useState("");

//   useEffect(() => {
//     const getAllCandidates = async () => {
//       try {
//         const response = await axios.get(`${baseUrl}/api/get_all_assigned_to_me`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });

//         if (response.status === 200) {
//           setAssignedList(response.data.data);
//         }
//       } catch (error) {
//         console.error("Candidate Fetch Error:", error?.response?.data || error.message);
//         toast.error("Failed to fetch assigned candidates.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     getAllCandidates();
//   }, [token, refreshKey]);

//   const handleEditClick = (candidate) => {
//     setSelectedCandidateId(candidate._id);
//     setSelectedRemark(candidate.remark || "");
//     setModalOpen(true);
//   };

//   const handleRemarkSave = async (newRemark) => {
//     try {
//       const response = await axios.patch(`${baseUrl}/api/add_remark/${selectedCandidateId}`, { remark: newRemark }, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       })
//       if (response.status === 200) {
//         toast.success("Remark updated");
//         setRefreshKey((prev) => prev + 1);
//       } else {
//         toast.error("Failed to update status");
//       }
//     } catch (error) {
//       console.error(
//         "Candidate update Error:",
//         error?.response?.data || error.message
//       );
//     } finally {
//       setModalOpen(false);
//       setSelectedCandidateId(null);
//     }
//   };

//   const handleStatusUpdate = async (status) => {
//     try {
//       const response = await axios.patch(`${baseUrl}/api/change_candidate_status/${selectedCandidate._id}`, { status: status }, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       })
//       if (response.status === 200) {
//         toast.success(`Great! Status is now set to ${capitalizeFirst(status)}.`);
//         setSelectedCandidate(null)
//         setRefreshKey((prev) => prev + 1);
//       } else {
//         toast.error("Failed to update status");
//       }
//     } catch (error) {
//       console.error(
//         "Candidate update Error:",
//         error?.response?.data || error.message
//       );
//     }
//   };

//   if (loading) return <MiniLoading />;

//   return (
//     <div className="px-4 py-6 bg-gray-50 font-inter h-full overflow-x-hidden">
//       {
//         assignedList.length !== 0 ? (
//           <div className="max-w-7xl mx-auto">
//             {/* Header */}
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 border-b pb-4 gap-3">
//               <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
//                 Assigned Candidate Details
//               </h2>
//               <button
//                 onClick={() => navigate(-1)}
//                 className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors"
//               >
//                 <FaArrowLeft className="text-base" />
//                 <span>Back to List</span>
//               </button>
//             </div>

//             {/* Candidate Table */}
//             <div className="overflow-x-auto rounded-xl shadow border border-gray-200 bg-white">
//               <CandidateTable
//                 candidates={assignedList}
//                 onView={setSelectedCandidate}
//                 showEditButton={true}
//                 isAssignedTable={true}
//                 onEdit={handleEditClick}
//               />
//             </div>

//             {/* Candidate Info Modal */}
//             <CandidateInformation
//               selectedCandidate={selectedCandidate}
//               onClose={() => setSelectedCandidate(null)}
//               handleStatusUpdate={handleStatusUpdate}
//               isAssignedTableButton={true}
//             />

//             {/* Remark Modal */}
//             <RemarkModal
//               isOpen={modalOpen}
//               onClose={() => setModalOpen(false)}
//               onSave={handleRemarkSave}
//               initialRemark={selectedRemark}
//             />
//           </div>
//         ) : (
//           <div className="p-6 text-gray-600">
//             <p>No assigned candidates found.</p>
//             <button
//               onClick={() => navigate(-1)}
//               className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
//             >
//               <FaArrowLeft className="inline mr-2" />
//               Go Back
//             </button>
//           </div>
//         )}
//     </div>
//   );
// };

// export default AssignedCandidatePage;

import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEye, FaEdit, FaStar } from "react-icons/fa";
import { baseUrl } from "../api";
import axios from "axios";
import { toast } from "react-toastify";

import CandidateInformation from "../components/CandidateInformation";
import CandidateTable from "../components/CandidateTable";
import RemarkModal from "../components/RemarkModal";
import MiniLoading from "../components/MiniLoading";
import { Search } from "lucide-react";

const AssignedCandidatePage = () => {
  const token = localStorage.getItem("token");
  const [refreshKey, setRefreshKey] = useState(0);
  const navigate = useNavigate();
  const [assignedList, setAssignedList] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedRemark, setSelectedRemark] = useState("");

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");

  const capitalizeFirst = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  useEffect(() => {
    const getAllCandidates = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/get_all_assigned_to_me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          setAssignedList(response.data.data);
        }
      } catch (error) {
        console.error(
          "Candidate Fetch Error:",
          error?.response?.data || error.message
        );
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
      const response = await axios.patch(
        `${baseUrl}/api/add_remark/${selectedCandidateId}`,
        { remark: newRemark },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        toast.success("Remark updated");
        setRefreshKey((prev) => prev + 1);
      } else {
        toast.error("Failed to update remark");
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
      const response = await axios.patch(
        `${baseUrl}/api/change_candidate_status/${selectedCandidate._id}`,
        { status: status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        toast.success(
          `Great! Status is now set to ${capitalizeFirst(status)}.`
        );
        setSelectedCandidate(null);
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

  const filteredCandidates = useMemo(() => {
    return assignedList.filter((candidate) => {
      const matchesSearch =
        candidate.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.phone?.includes(searchTerm);

      const matchesDomain = selectedDomain
        ? candidate.domain === selectedDomain
        : true;

      const matchesRating = selectedRating
        ? String(candidate.rating) === selectedRating
        : true;

      const matchesExperience = (() => {
        const exp = Number(candidate.experienceYears) || 0;
        if (selectedExperience === "0-1") return exp >= 0 && exp <= 1;
        if (selectedExperience === "1-3") return exp > 1 && exp <= 3;
        if (selectedExperience === "3-5") return exp > 3 && exp <= 5;
        if (selectedExperience === "5+") return exp > 5;
        return true;
      })();

      return (
        matchesSearch && matchesDomain && matchesRating && matchesExperience
      );
    });
  }, [
    assignedList,
    searchTerm,
    selectedDomain,
    selectedRating,
    selectedExperience,
  ]);

  if (loading) return <MiniLoading />;

  return (
    <div className="px-4 py-6 bg-gray-50 font-inter h-full overflow-x-hidden">
      {assignedList.length !== 0 ? (
        <div className="max-w-7xl mx-auto">
          {/* Header with Filters */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">
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

            {/* Filters Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Search
                </label>
                <input
                  type="text"
                  placeholder="By name, email, or phone"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Domain */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Domain
                </label>
                <select
                  value={selectedDomain}
                  onChange={(e) => setSelectedDomain(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">All Domains</option>
                  <option value="DFT">DFT</option>
                  <option value="PD">PD</option>
                  <option value="DV">DV</option>
                  <option value="PDK">PDK</option>
                  <option value="Analog Mixed Signaling">
                    Analog Mixed Signaling
                  </option>
                  <option value="Analog Layout Design">
                    Analog Layout Design
                  </option>
                  <option value="Design Engineer">Design Engineer</option>
                  <option value="Synthesis">Synthesis</option>
                  <option value="Physical Verification">
                    Physical Verification
                  </option>
                  <option value="Embedded">Embedded</option>
                  <option value="FPGA">FPGA</option>
                  <option value="Design">Design</option>
                  <option value="Analog Design">Analog Design</option>
                  <option value="Formal Verification">
                    Formal Verification
                  </option>
                  <option value="Software">Software</option>
                  <option value="STA">STA</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Rating
                </label>
                <select
                  value={selectedRating}
                  onChange={(e) => setSelectedRating(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">All Ratings</option>
                  <option value="5">5⭐</option>
                  <option value="4">4⭐ & above</option>
                  <option value="3">3⭐ & above</option>
                  <option value="2">2⭐ & above</option>
                  <option value="1">1⭐</option>
                </select>
              </div>

              {/* Experience */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Experience
                </label>
                <select
                  value={selectedExperience}
                  onChange={(e) => setSelectedExperience(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">All</option>
                  <option value="0-1">0-1 yrs</option>
                  <option value="1-3">1-3 yrs</option>
                  <option value="3-5">3-5 yrs</option>
                  <option value="5+">5+ yrs</option>
                </select>
              </div>
            </div>
          </div>

          {/* Candidate Table */}
          <div className="overflow-x-auto rounded-xl shadow border border-gray-200 bg-white">
            <CandidateTable
              candidates={filteredCandidates}
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
