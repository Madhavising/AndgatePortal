import React, { useEffect, useState } from "react";
import { FaEye, FaUserPlus, FaStar, FaRegStar } from "react-icons/fa";
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
  const [candidateData, setCandidateData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth < 1180);
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

  const capitalizeFirst = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

  const renderStatusBadge = (status, candidate) => {
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
          if (status === "Assigned") navigate("/application-tracker", {state: { candidate } });
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
          <table className="w-full text-sm text-left table-auto">
            <thead className="bg-gray-50 text-gray-700 uppercase text-xs border-b sticky top-0 z-10 font-medium">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Domain</th>
                <th className="px-4 py-3">Experience</th>
                <th className="px-4 py-3">Status</th>
                {isAssignedTable && (
                  <>
                    <th className="px-4 py-3">Remarks</th>
                    <th className="px-4 py-3">Rating</th>
                  </>
                )}
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y text-sm">
              {candidateData.map((c) => (
                <tr key={c._id} className="hover:bg-gray-100 transition">
                  <td
                    className="px-4 py-3 truncate max-w-[130px]"
                    title={c.name}
                  >
                    {c.name}
                  </td>
                  <td
                    className="px-4 py-3 truncate max-w-[190px]"
                    title={c.email}
                  >
                    {c.email}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">{c.mobile}</td>
                  <td
                    className="px-4 py-3 truncate max-w-[100px]"
                    title={c.domain}
                  >
                    {c.domain || "—"}
                  </td>
                  <td
                    className="px-4 py-3 max-w-[30px] truncate whitespace-nowrap"
                    title={c.experienceYears}
                  >
                    {c.experienceYears || "Fresher"}
                  </td>
                  <td className="px-4 py-3">{renderStatusBadge(capitalizeFirst(c.status), c)}</td>

                  {isAssignedTable && (
                    <>
                      <td className="px-2 py-2">
                        <input
                          type="text"
                          value={c.remarks || ""}
                          onChange={(e) =>
                            handleRemarkChange(c._id, e.target.value)
                          }
                          className="w-[100px] border border-gray-300 rounded px-2 py-1 text-xs"
                          placeholder="Remarks"
                        />
                      </td>
                      <td className="px-2 py-2 w-[80px]">
                        <div className="flex space-x-0.5">
                          {[1, 2, 3, 4, 5].map((star) =>
                            star <= c.rating ? (
                              <FaStar
                                key={star}
                                className="text-yellow-400 cursor-pointer text-sm"
                                onClick={() => handleRatingChange(c._id, star)}
                              />
                            ) : (
                              <FaRegStar
                                key={star}
                                className="text-gray-400 cursor-pointer text-sm"
                                onClick={() => handleRatingChange(c._id, star)}
                              />
                            )
                          )}
                        </div>
                      </td>
                    </>
                  )}

                  <td className="px-4 py-3 text-center space-x-2">
                    <button
                      onClick={() => onView(c)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-sm"
                    >
                      <FaEye />
                    </button>
                    {showAssignButton && (
                      <button
                        onClick={() => onAssign(c._id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-md text-sm"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4  px-2 py-2">
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
                <div className="text-sm text-gray-500">
                  {renderStatusBadge(capitalizeFirst(c.status))}
                </div>
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
