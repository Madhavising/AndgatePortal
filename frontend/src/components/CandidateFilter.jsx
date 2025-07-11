import React, { useEffect, useState } from "react";

const CandidateFilter = ({ candidates = [], onFilter }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const [selectedExperience, setSelectedExperience] = useState("");

  const getFilteredCandidates = (
    candidates,
    searchTerm,
    selectedDomain,
    selectedStatus,
    selectedExperience
  ) => {
    return candidates.filter((candidate) => {
      const nameMatch = candidate.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      const emailMatch = candidate.email
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      const phoneMatch = candidate.phone?.includes(searchTerm);
      const matchesSearch = nameMatch || emailMatch || phoneMatch;

      const matchesDomain = selectedDomain
        ? candidate.domain === selectedDomain
        : true;

      const exp = Number(candidate.experienceYears) || 0;
      let matchesExperience = true;
      if (selectedExperience === "0-1")
        matchesExperience = exp >= 0 && exp <= 1;
      else if (selectedExperience === "1-3")
        matchesExperience = exp > 1 && exp <= 3;
      else if (selectedExperience === "3-5")
        matchesExperience = exp > 3 && exp <= 5;
      else if (selectedExperience === "5+") matchesExperience = exp > 5;

      let matchesStatus = true;
      if (selectedStatus) {
        matchesStatus = candidate.status === selectedStatus;
      }

      return (
        matchesSearch && matchesDomain && matchesStatus && matchesExperience
      );
    });
  };

  useEffect(() => {
    const filtered = getFilteredCandidates(
      candidates,
      searchTerm,
      selectedDomain,
      selectedStatus,
      selectedExperience
    );
    onFilter(filtered);
  }, [
    searchTerm,
    selectedDomain,
    selectedStatus,
    selectedExperience,
    candidates,
    onFilter,
  ]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Search */}
      <div>
        <label className="block text-sm text-gray-600 mb-1">Search</label>
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
        <label className="block text-sm text-gray-600 mb-1">Domain</label>
        <select
          value={selectedDomain}
          onChange={(e) => setSelectedDomain(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:outline-none"
        >
          <option value="">All Domains</option>
          {[
            "DFT",
            "PD",
            "DV",
            "PDK",
            "Analog Mixed Signaling",
            "Analog Layout Design",
            "Design Engineer",
            "Synthesis",
            "Physical Verification",
            "Embedded",
            "FPGA",
            "Design",
            "Analog Design",
            "Formal Verification",
            "Software",
            "STA",
            "Others",
          ].map((domain) => (
            <option key={domain} value={domain}>
              {domain}
            </option>
          ))}
        </select>
      </div>

      {/* Status */}
      <div>
        <label className="block text-sm text-gray-600 mb-1">Status</label>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:outline-none"
        >
          <option value="">All Status</option>
          <option value="Assigned">Assigned</option>
          <option value="Rejected">Rejected</option>
          <option value="Pending">Pending</option>
          <option value="OnHold">On Hold</option>
        </select>
      </div>

      {/* Experience */}
      <div>
        <label className="block text-sm text-gray-600 mb-1">Experience</label>
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
  );
};

export default CandidateFilter;
