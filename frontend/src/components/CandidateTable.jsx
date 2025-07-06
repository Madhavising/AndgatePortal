import React, { useEffect, useState } from "react";
import { FaEye, FaUserPlus, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CandidateTable = ({
  candidates = [],
  onAssign,
  onView,
  onEdit,
  showAssignButton = false,
  showEditButton = false,
  isAssignedTable = false,
}) => {
  const [isMobileView, setIsMobileView] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkWidth = () => {
      setIsMobileView(window.innerWidth <= 1265);
    };

    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  const renderStatusBadge = (status) => {
    let base = "px-3 py-1 rounded-full text-xs font-semibold";
    let color = "bg-gray-200 text-gray-600";

    switch (status) {
      // case "Shortlisted":
      //   color = "bg-yellow-100 text-yellow-800";
      //   break;
      // case "Interview Cleared":
      //   color = "bg-green-100 text-green-800";
      //   break;
      // case "HR Round Cleared":
      //   color = "bg-blue-100 text-blue-800";
      //   break;
      // case "Accepted":
      //   color = "bg-indigo-100 text-indigo-800";
      //   break;
      case "Rejected":
        color = "bg-red-100 text-red-800";
        break;
      case "Onhold":
        color = "bg-orange-100 text-orange-800";
        break;
      case "Assigned":
        color = "bg-green-200 text-green-900";
        break;
      default:
        break;
    }



    return (
      <span
        className={`${base} ${color} cursor-pointer`}
        onClick={() => {
          if (status === "assigned" || status === "Accepted") navigate("/application-tracker");
        }}
      >
        {status || "Pending"}
      </span>
    );
  };

  return (
    <>
      {/* Desktop Table View */}
      {!isMobileView && (
        <div className="overflow-x-auto w-full rounded-xl shadow-md border border-gray-200 bg-white">
          <table className="min-w-[800px] w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-gray-100 text-gray-700 text-xs uppercase tracking-wide border-b sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Phone</th>
                <th className="px-6 py-3">Domain</th>
                <th className="px-6 py-3">Exp</th>
                <th className="px-6 py-3">Status</th>
                {isAssignedTable && <th className="px-6 py-3">Remarks</th>}
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {candidates.map((candidate) => (
                <tr
                  key={candidate._id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {candidate.name}
                  </td>
                  <td className="px-6 py-4 text-gray-700">{candidate.email}</td>
                  <td className="px-6 py-4 text-gray-700">{candidate.mobile}</td>
                  <td className="px-6 py-4 text-gray-700">{candidate.domain}</td>
                  <td className="px-6 py-4 text-gray-700">{candidate.experienceYears || "Fresher"}</td>
                  <td className="px-6 py-4">
                    {renderStatusBadge(
                      candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)
                    )}
                  </td>
                  {isAssignedTable && (
                    <td className="px-6 py-4">
                      <div className="truncate max-w-[120px] text-gray-700" title={candidate.remarks}>
                        {candidate.remarks || "—"}
                      </div>
                    </td>
                  )}
                  <td className="px-6 py-4 space-x-2 text-center">
                    <button onClick={() => onView(candidate)} className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md transition" title="View">
                      <FaEye />
                    </button>
                    {showAssignButton && (
                      <button onClick={() => onAssign(candidate._id)} className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-md transition" title="Assign">
                        <FaUserPlus />
                      </button>
                    )}
                    {showEditButton && (
                      <button onClick={() => onEdit(candidate)} className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-md transition" title="Edit">
                        <FaEdit />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Mobile Card View */}
      {isMobileView && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-2 gap-4">
          {candidates.map((candidate) => (
            <div
              key={candidate._id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-5"
            >
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 capitalize">
                    {candidate.name}
                  </h3>
                  <p className="text-sm text-gray-500">{candidate.domain || "—"}</p>
                </div>
                <div>{renderStatusBadge(candidate.status)}</div>
              </div>
              <div className="text-sm text-gray-700 space-y-1 mb-4">
                <p><span className="font-medium">Email:</span> {candidate.email}</p>
                <p><span className="font-medium">Phone:</span> {candidate.mobile}</p>
                <p><span className="font-medium">Experience:</span> {candidate.experienceYears || "Fresher"}</p>
                {isAssignedTable && (
                  <p><span className="font-medium">Remarks:</span> {candidate.remarks || "—"}</p>
                )}
              </div>
              <div className="flex gap-2">
                <button onClick={() => onView(candidate)} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-3 rounded-md text-sm">
                  <FaEye className="inline mr-1" /> View
                </button>
                {showAssignButton && (
                  <button onClick={() => onAssign(candidate._id)} className="flex-1 bg-green-600 hover:bg-green-700 text-white py-1.5 px-3 rounded-md text-sm">
                    <FaUserPlus className="inline mr-1" /> Assign
                  </button>
                )}
                {showEditButton && (
                  <button onClick={() => onEdit(candidate)} className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-1.5 px-3 rounded-md text-sm">
                    Edit
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default CandidateTable;
