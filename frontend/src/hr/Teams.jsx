import React, { useEffect, useState } from "react";
import { baseUrl } from "../api";
import axios from "axios";
import { toast } from "react-toastify";
import MiniLoading from "../components/MiniLoading";
import moment from "moment";
import { Search, Eye, X } from "lucide-react";
import Pagination from "../components/Pagination";

const statusColors = {
  Onhold: "bg-yellow-100 text-yellow-800",
  Approved: "bg-blue-100 text-blue-800",
  Assigned: "bg-green-100 text-green-800",
  Rejected: "bg-red-100 text-red-800",
  Pending: "bg-gray-100 text-gray-800",
};

const TeamsPage = () => {
  const token = localStorage.getItem("token");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hrData, setHrData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  // Filter data
  const filteredData = hrData.filter((c) => {
    const fullName = `${c.user.firstName} ${c.user.lastName}`.toLowerCase();
    const userEmail = c.user.email.toLowerCase();
    const candidateEmail = c.email.toLowerCase();
    const name = c.name.toLowerCase();
    const status = c.status.toLowerCase();
    const term = searchTerm.toLowerCase();

    return (
      fullName.includes(term) ||
      userEmail.includes(term) ||
      candidateEmail.includes(term) ||
      name.includes(term) ||
      status.includes(term)
    );
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const indexOfLastCandidate = currentPage * limit;
  const indexOfFirstCandidate = indexOfLastCandidate - limit;
  const currentCandidates = filteredData.slice(
    indexOfFirstCandidate,
    indexOfLastCandidate
  );
  const totalPages = Math.ceil(filteredData.length / limit);

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
          setHrData(response.data.data);
        }
      } catch (error) {
        console.error("Fetch Error:", error?.response?.data || error.message);
        toast.error("Failed to fetch assigned candidates.");
      } finally {
        setLoading(false);
      }
    };

    getAllCandidates();
  }, [token]);

  if (loading) return <MiniLoading />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 h-full">
      {/* Header */}
      <div className="mb-6 border-b border-gray-200 pb-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-3xl font-bold text-gray-800">Team Overview</h2>
          <div className="relative w-full max-w-md">
            <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search by HR or Candidate"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Pagination */}
      {filteredData.length > limit && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevious={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          onNext={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
        />
      )}

      {/* Table (Desktop) */}
      <div className="hidden xl:block mt-2">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              {[
                "HR Name",
                "Candidate Name",
                "Candidate Email",
                "Status",
                "Last Update",
                "Action",
              ].map((head, idx) => (
                <th
                  key={idx}
                  className="px-4 py-3 text-sm font-semibold text-gray-600"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentCandidates.length > 0 ? (
              currentCandidates.map((c, i) => (
                <tr key={i} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {c.user.firstName} {c.user.lastName}
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
                    {moment(c.updatedAt).format("lll")}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
                      onClick={() => setSelectedCandidate(c)}
                    >
                      <Eye size={16} /> View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-4 py-8 text-center text-gray-400">
                  No matching candidates found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Cards (Mobile / Tablet < 1280px) */}
      <div className="xl:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        {currentCandidates.length > 0 ? (
          currentCandidates.map((c, i) => (
            <div
              key={i}
              className="border rounded-lg shadow-sm p-4 bg-white flex flex-col gap-2"
            >
              <div className="text-sm text-gray-800 font-medium">
                HR:{" "}
                <span className="font-normal">
                  {c.user.firstName} {c.user.lastName}
                </span>
              </div>
              <div className="text-sm text-gray-800 font-medium">
                Name: <span className="font-normal">{c.name}</span>
              </div>
              <div className="text-sm text-gray-800 font-medium">
                Email: <span className="text-blue-600">{c.email}</span>
              </div>
              <div className="text-sm text-gray-800 font-medium">
                Status:
                <span
                  className={`ml-1 text-xs font-medium px-3 py-1 rounded-full ${
                    statusColors[c.status] || "bg-gray-100 text-gray-800"
                  }`}
                >
                  {c.status}
                </span>
              </div>
              <div className="text-sm text-gray-800 font-medium">
                Updated:{" "}
                <span className="font-normal">
                  {moment(c.updatedAt).format("lll")}
                </span>
              </div>
              <div className="text-right">
                <button
                  className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm justify-end"
                  onClick={() => setSelectedCandidate(c)}
                >
                  <Eye size={16} /> View
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center py-6">
            No matching candidates found.
          </p>
        )}
      </div>

      {/* Modal View */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center px-4">
          <div className="bg-white w-full max-w-xl rounded-lg shadow-lg p-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setSelectedCandidate(null)}
            >
              <X size={20} />
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
                <div>{selectedCandidate.mobile || "N/A"}</div>
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
                  {selectedCandidate.skills?.split(",").map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800"
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="font-semibold text-gray-700">HR:</span>
                <div>
                  {selectedCandidate.user.firstName +
                    " " +
                    selectedCandidate.user.lastName}
                </div>
              </div>
              <div>
                <span className="font-semibold text-gray-700">
                  Last Updated:
                </span>
                <div>{moment(selectedCandidate.updatedAt).format("lll")}</div>
              </div>
              <div className="col-span-2">
                <span className="font-semibold text-gray-700">Resume:</span>
                {selectedCandidate.resume && (
                  <div className="mt-1">
                    <a
                      href={
                        selectedCandidate.resume.endsWith(".doc") ||
                        selectedCandidate.resume.endsWith(".docx")
                          ? `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(
                              `${baseUrl}/${selectedCandidate.resume}`
                            )}`
                          : `${baseUrl}/${selectedCandidate.resume}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline hover:text-blue-800 transition"
                    >
                      📄 View Resume
                    </a>
                  </div>
                )}
              </div>
              <div className="col-span-2">
                <span className="font-semibold text-gray-700">Notes:</span>
                <p className="mt-1 text-gray-600 italic">
                  {selectedCandidate.remark || "No notes provided."}
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
