import React from "react";
import { baseUrl } from "../api";

const CandidateInformation = ({
  selectedCandidate,
  onClose,
  handleStatusUpdate,
  isAssignedTableButton = false,
}) => {
  if (!selectedCandidate) return null;

  const Info = ({ label, value }) => (
    <div className="flex flex-col break-words">
      <span className="text-xs sm:text-sm text-gray-500 font-medium">
        {label}
      </span>
      <span className="text-sm sm:text-base text-gray-800">{value || "—"}</span>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center px-2 sm:px-4">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto relative border border-gray-200 rounded-2xl shadow-2xl p-4 sm:p-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold transition"
          aria-label="Close"
        >
          ×
        </button>

        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">
            Candidate Details
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Review the candidate's information and make a decision.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-row justify-end gap-2 mb-3 overflow-x-auto">
          <button
            onClick={() => handleStatusUpdate("Onhold")}
            className="min-w-[100px] bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded text-sm text-center"
          >
            On Hold
          </button>

          {isAssignedTableButton && (
            <button
              onClick={() => handleStatusUpdate("Assigned")}
              className="min-w-[100px] bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded text-sm text-center"
            >
              Accept
            </button>
          )}

          <button
            onClick={() => handleStatusUpdate("Rejected")}
            className="min-w-[100px] bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded text-sm text-center"
          >
            Reject
          </button>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 text-sm">
          <Info label="Full Name" value={selectedCandidate.name} />
          <Info label="Email" value={selectedCandidate.email} />
          <Info label="Mobile" value={selectedCandidate.mobile} />
          <Info label="POC in ANDGATE" value={selectedCandidate.poc} />
          <Info
            label="Graduation Year"
            value={selectedCandidate.graduationYear}
          />
          <Info label="Degree" value={selectedCandidate.degree} />
          <Info label="Domain" value={selectedCandidate.domain} />
          <Info label="Availability" value={selectedCandidate.availability} />
          <Info
            label="Current Location"
            value={selectedCandidate.currentLocation}
          />
          <Info
            label="Preferred Locations"
            value={selectedCandidate.preferredLocation}
          />

          {/* Resume Link */}
          {selectedCandidate.resume &&
            (() => {
              const resumeUrl = `${baseUrl}/${selectedCandidate.resume}`;
              const isDoc =
                selectedCandidate.resume.endsWith(".doc") ||
                selectedCandidate.resume.endsWith(".docx");
              const viewUrl = isDoc
                ? `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(
                    resumeUrl
                  )}`
                : resumeUrl;

              return (
                <Info
                  label="Resume"
                  value={
                    <a
                      href={viewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline hover:text-blue-800 transition"
                    >
                      📄 View Resume
                    </a>
                  }
                />
              );
            })()}
        </div>

        {/* Experience Section */}
        {selectedCandidate.experienceYears && (
          <div className="mt-8">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
              Experience Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 text-sm">
              <Info
                label="Experience Years"
                value={selectedCandidate.experienceYears}
              />
              <Info label="Self Rating" value={selectedCandidate.selfRating} />
              <Info
                label="Individual Role"
                value={selectedCandidate.individualRole}
              />
              <Info
                label="Bond Details"
                value={selectedCandidate.bondDetails}
              />
              <Info
                label="Bond Willingness"
                value={selectedCandidate.bondWilling}
              />
              <Info
                label="Relevant Experience"
                value={selectedCandidate.releventExp}
              />
              <Info
                label="Experience Including Training"
                value={selectedCandidate.expIncludingTraining}
              />
              <Info
                label="Job Change Reason"
                value={selectedCandidate.jobChangeReason}
              />
              <Info
                label="Interviews Attended"
                value={selectedCandidate.interviewsAttended}
              />
              <Info
                label="Foreign Work Experience"
                value={selectedCandidate.foreignWork}
              />
              <Info label="Skills" value={selectedCandidate.skills} />
              <Info label="CTC Details" value={selectedCandidate.currentCTC} />
              <Info
                label="Expected CTC"
                value={selectedCandidate.expectedCTC}
              />
              <Info
                label="Offers in Hand"
                value={selectedCandidate.offerDetails}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateInformation;
