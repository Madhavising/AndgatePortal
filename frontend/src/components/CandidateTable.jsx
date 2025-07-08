import React, { useEffect, useState } from "react";
import { FaEye, FaUserPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaStar, FaRegStar } from "react-icons/fa";

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
  const [candidateData, setCandidateData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setCandidateData(candidates);
  }, [candidates]);

  const handleRemarkChange = (id, value) => {
    setCandidateData((prev) =>
      prev.map((c) => (c._id === id ? { ...c, remarks: value } : c))
    );
  };

  const handleRatingChange = (id, value) => {
    setCandidateData((prev) =>
      prev.map((c) => (c._id === id ? { ...c, rating: value } : c))
    );
  };

  const renderStatusBadge = (status) => {
    let base = "px-3 py-1 rounded-full text-xs font-medium";
    let color = "bg-gray-200 text-gray-700";

    switch (status) {
      case "Rejected":
        color = "bg-red-100 text-red-700";
        break;
      case "Onhold":
        color = "bg-yellow-100 text-yellow-800";
        break;
      case "Assigned":
        color = "bg-green-100 text-green-800";
        break;
      default:
        break;
    }

    return (
      <span
        className={`${base} ${color} cursor-pointer`}
        onClick={() => {
          if (status === "Assigned") navigate("/application-tracker");
        }}
      >
        {status || "Pending"}
      </span>
    );
  };

  return (
    <>
      {/* ✅ Desktop View */}
      {!isMobileView && (
        <div className="overflow-x-auto bg-white border border-gray-200 shadow-sm rounded-xl">
          <table className="w-full min-w-[950px] text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs border-b sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Phone</th>
                <th className="px-6 py-3">Domain</th>
                <th className="px-6 py-3">Experience</th>
                <th className="px-6 py-3">Status</th>
                {isAssignedTable && (
                  <>
                    <th className="px-6 py-3">Remarks</th>
                    <th className="px-6 py-3">Rating</th>
                  </>
                )}
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {candidateData.map((c) => (
                <tr key={c._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{c.name}</td>
                  <td className="px-6 py-4">{c.email}</td>
                  <td className="px-6 py-4">{c.mobile}</td>
                  <td className="px-6 py-4">{c.domain || "—"}</td>
                  <td className="px-6 py-4">
                    {c.experienceYears || "Fresher"}
                  </td>
                  <td className="px-6 py-4">{renderStatusBadge(c.status)}</td>

                  {isAssignedTable && (
                    <>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          value={c.remarks || ""}
                          onChange={(e) =>
                            handleRemarkChange(c._id, e.target.value)
                          }
                          placeholder="Enter remarks"
                          className="w-full border rounded-md px-2 py-1 text-sm"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((star) =>
                            star <= c.rating ? (
                              <FaStar
                                key={star}
                                className="text-yellow-400 cursor-pointer"
                                onClick={() => handleRatingChange(c._id, star)}
                              />
                            ) : (
                              <FaRegStar
                                key={star}
                                className="text-gray-400 cursor-pointer"
                                onClick={() => handleRatingChange(c._id, star)}
                              />
                            )
                          )}
                        </div>
                      </td>
                    </>
                  )}

                  <td className="px-6 py-4 text-center space-x-2">
                    <button
                      onClick={() => onView(c)}
                      className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-md text-sm"
                      title="View"
                    >
                      <FaEye />
                    </button>
                    {showAssignButton && (
                      <button
                        onClick={() => onAssign(c._id)}
                        className="text-white bg-green-600 hover:bg-green-700 px-3 py-2 rounded-md text-sm"
                        title="Assign"
                      >
                        <FaUserPlus />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ✅ Mobile View */}
      {isMobileView && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
          {candidateData.map((c) => (
            <div
              key={c._id}
              className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold">{c.name}</h3>
                  <p className="text-sm text-gray-500">{c.domain || "—"}</p>
                </div>
                {renderStatusBadge(c.status)}
              </div>
              <div className="text-sm text-gray-700 space-y-1 mb-3">
                <p>
                  <span className="font-medium">Email:</span> {c.email}
                </p>
                <p>
                  <span className="font-medium">Phone:</span> {c.mobile}
                </p>
                <p>
                  <span className="font-medium">Exp:</span>{" "}
                  {c.experienceYears || "Fresher"}
                </p>
                {isAssignedTable && (
                  <>
                    <p>
                      <span className="font-medium">Remarks:</span>{" "}
                      <input
                        type="text"
                        value={c.remarks || ""}
                        onChange={(e) =>
                          handleRemarkChange(c._id, e.target.value)
                        }
                        placeholder="Remarks"
                        className="mt-1 w-full border rounded-md px-2 py-1 text-sm"
                      />
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="font-medium">Rating:</span>
                      <span className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) =>
                          star <= c.rating ? (
                            <FaStar
                              key={star}
                              className="text-yellow-400 cursor-pointer"
                              onClick={() => handleRatingChange(c._id, star)}
                            />
                          ) : (
                            <FaRegStar
                              key={star}
                              className="text-gray-400 cursor-pointer"
                              onClick={() => handleRatingChange(c._id, star)}
                            />
                          )
                        )}
                      </span>
                    </p>
                  </>
                )}
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => onView(c)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm"
                >
                  <FaEye className="inline mr-1" /> View
                </button>
                {showAssignButton && (
                  <button
                    onClick={() => onAssign(c._id)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md text-sm"
                  >
                    <FaUserPlus className="inline mr-1" /> Assign
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
