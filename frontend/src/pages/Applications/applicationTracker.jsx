// import React, { useState, useEffect } from "react";
// import { FaPlus, FaCheck, FaTimes, FaLock } from "react-icons/fa";

// const ApplicationTracker = () => {
//   const [technicalRounds, setTechnicalRounds] = useState([
//     { name: "", feedback: "", status: "" },
//   ]);
//   const [clientRounds, setClientRounds] = useState([
//     { name: "", feedback: "", status: "" },
//   ]);
//   const [screening, setScreening] = useState({
//     name: "",
//     feedback: "",
//     status: "",
//   });
//   const [orientation, setOrientation] = useState({
//     name: "",
//     feedback: "",
//     status: "",
//   });
//   const [status, setStatus] = useState("Pending");

//   const [modal, setModal] = useState({ open: false, type: "", index: null });
//   const [feedbackText, setFeedbackText] = useState("");

//   const updateRound = (rounds, setRounds, index, key, value) => {
//     const updated = [...rounds];
//     updated[index][key] = value;
//     setRounds(updated);
//   };

//   const addRound = (setter) =>
//     setter((prev) => [...prev, { name: "", feedback: "", status: "" }]);

//   const saveFeedback = () => {
//     if (modal.type === "screening")
//       setScreening({ ...screening, feedback: feedbackText });
//     else if (modal.type === "technical")
//       updateRound(
//         technicalRounds,
//         setTechnicalRounds,
//         modal.index,
//         "feedback",
//         feedbackText
//       );
//     else if (modal.type === "orientation")
//       setOrientation({ ...orientation, feedback: feedbackText });
//     else if (modal.type === "client")
//       updateRound(
//         clientRounds,
//         setClientRounds,
//         modal.index,
//         "feedback",
//         feedbackText
//       );

//     setModal({ open: false, type: "", index: null });
//     setFeedbackText("");
//   };

//   const renderStatusBadge = (status) => {
//     const styles = {
//       Qualified: "bg-green-100 text-green-700",
//       Disqualified: "bg-red-100 text-red-700",
//       Upcoming: "bg-yellow-100 text-yellow-700",
//     };
//     return status ? (
//       <span
//         className={`px-3 py-1 text-xs font-semibold rounded-full ${
//           styles[status] || "bg-gray-100 text-gray-600"
//         }`}
//       >
//         {status}
//       </span>
//     ) : null;
//   };

//   const renderRoundCard = (round, index, type, updater) => {
//     const isObjectRound = type === "screening" || type === "orientation";

//     const handleInputChange = (field, value) => {
//       if (isObjectRound) {
//         type === "screening" && setScreening({ ...screening, [field]: value });
//         type === "orientation" &&
//           setOrientation({ ...orientation, [field]: value });
//       } else {
//         updateRound(
//           updater,
//           type === "client" ? setClientRounds : setTechnicalRounds,
//           index,
//           field,
//           value
//         );
//       }
//     };

//     return (
//       <div
//         key={index}
//         className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm transition hover:shadow-md"
//       >
//         <h3 className="text-sm font-bold text-gray-800 mb-3 capitalize">
//           {type} Round{" "}
//           {type !== "screening" && type !== "orientation" ? index + 1 : ""}
//         </h3>
//         <input
//           type="text"
//           value={round.name}
//           onChange={(e) => handleInputChange("name", e.target.value)}
//           placeholder="Interviewer Name"
//           className="w-full text-sm px-3 py-2 border border-gray-300 rounded mb-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//         />
//         <button
//           onClick={() => {
//             setModal({ open: true, type, index });
//             setFeedbackText(round.feedback || "");
//           }}
//           className="text-blue-600 text-sm underline hover:text-blue-800 mb-2"
//         >
//           {round.feedback ? "Edit" : "Add"} Feedback
//         </button>

//         {round.feedback && (
//           <div className="bg-gray-50 p-3 rounded border text-sm mb-3 text-gray-700">
//             <strong>Feedback:</strong>
//             <p className="mt-1 whitespace-pre-line">{round.feedback}</p>
//           </div>
//         )}

//         <div className="flex justify-between items-center mt-3 flex-wrap gap-2">
//           <div className="flex gap-2">
//             <button
//               title="Mark Qualified"
//               onClick={() => handleInputChange("status", "Qualified")}
//               className="p-2 rounded bg-green-600 hover:bg-green-700 text-white"
//             >
//               <FaCheck />
//             </button>
//             <button
//               title="Mark Disqualified"
//               onClick={() => handleInputChange("status", "Disqualified")}
//               className="p-2 rounded bg-red-600 hover:bg-red-700 text-white"
//             >
//               <FaTimes />
//             </button>
//           </div>
//           {renderStatusBadge(round.status)}
//         </div>
//       </div>
//     );
//   };

//   const allTechnicalQualified = technicalRounds.every(
//     (r) => r.status === "Qualified"
//   );

//   useEffect(() => {
//     const allRounds = [
//       screening.status,
//       ...technicalRounds.map((r) => r.status),
//       allTechnicalQualified ? orientation.status : "",
//       ...clientRounds.map((r) => r.status),
//     ];

//     if (allRounds.includes("Disqualified")) setStatus("Disqualified");
//     else if (allRounds.every((s) => s === "Qualified" && s))
//       setStatus("Qualified");
//     else setStatus("Pending");
//   }, [screening, technicalRounds, orientation, clientRounds]);

//   return (
//     <div className="max-w-7xl mx-auto py-10 px-4">
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
//         <h1 className="text-2xl font-bold text-gray-900">
//           🎯 Application Tracker
//         </h1>
//         <span
//           className={`px-4 py-2 rounded-full text-sm font-medium ${
//             status === "Qualified"
//               ? "bg-green-100 text-green-700"
//               : status === "Disqualified"
//               ? "bg-red-100 text-red-700"
//               : "bg-yellow-100 text-yellow-700"
//           }`}
//         >
//           Status: {status}
//         </span>
//       </div>

//       {/* Candidate Info */}
//       <div className="bg-white p-6 rounded-lg shadow mb-10">
//         <h2 className="text-lg font-semibold text-gray-800 mb-4">
//           👤 Candidate Info
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700">
//           <div>
//             <strong>Name:</strong> John Doe
//           </div>
//           <div>
//             <strong>Email:</strong> john@andgatetech.com
//           </div>
//           <div>
//             <strong>Phone:</strong> 9876543210
//           </div>
//           <div>
//             <strong>Domain:</strong> Backend
//           </div>
//           <div>
//             <strong>Experience:</strong> 2.5 Yrs
//           </div>
//           <div>
//             <strong>Skills:</strong> Node.js, MongoDB
//           </div>
//         </div>
//       </div>

//       {/* Internal Rounds */}
//       <div className="mb-10">
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-lg font-semibold text-blue-700 mb-5">
//             🏢 Internal Rounds (Andgate)
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {renderRoundCard(screening, 0, "screening", null)}
//             {technicalRounds.map((round, idx) =>
//               renderRoundCard(round, idx, "technical", technicalRounds)
//             )}
//             <button
//               onClick={() => addRound(setTechnicalRounds)}
//               className="w-full sm:w-auto border-2 border-dashed border-blue-500 text-blue-600 hover:bg-blue-50 p-4 rounded-lg flex items-center justify-center text-sm"
//             >
//               <FaPlus className="mr-2" /> Add Technical Round
//             </button>
//             {allTechnicalQualified &&
//               renderRoundCard(orientation, 0, "orientation", null)}
//           </div>
//         </div>
//       </div>

//       {/* Client Rounds */}
//       <div className="mb-16">
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 gap-3">
//             <h2 className="text-lg font-semibold text-yellow-600 flex items-center gap-2">
//               <FaLock /> Client Rounds
//             </h2>
//             <button
//               onClick={() => addRound(setClientRounds)}
//               className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm flex items-center justify-center gap-2"
//             >
//               <FaPlus /> Add Client Round
//             </button>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {clientRounds.map((round, idx) =>
//               renderRoundCard(round, idx, "client", clientRounds)
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Feedback Modal */}
//       {modal.open && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
//           <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
//             <h3 className="text-lg font-semibold mb-4">Enter Feedback</h3>
//             <textarea
//               rows={4}
//               className="w-full p-2 border border-gray-300 rounded resize-none mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={feedbackText}
//               onChange={(e) => setFeedbackText(e.target.value)}
//               placeholder="Write feedback..."
//             />
//             <div className="flex justify-end gap-3">
//               <button
//                 className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
//                 onClick={() => setModal({ open: false, type: "", index: null })}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
//                 onClick={saveFeedback}
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ApplicationTracker;

import React, { useState } from "react";
import Select from "react-select";
import { FaLock, FaPlus } from "react-icons/fa6";

const applicationTracker = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    eventName: "",
    interviewer: null,
    email: "",
    link: "",
  });

  const eventOptions = [
    { value: "Screening", label: "Screening" },
    { value: "Technical 1", label: "Technical Round 1" },
    { value: "Technical 2", label: "Technical Round 2" },
    { value: "Technical 3", label: "Technical Round 3" },
    { value: "Orientation", label: "Orientation Round" },
  ];

  const interviewerOptions = [
    {
      value: "Udit Kishor",
      label: "Udit Kishor",
      email: "udit@andgatetech.com",
    },
    {
      value: "Anjnesh Maindolia",
      label: "Anjnesh Maindolia",
      email: "anjnesh@andgatetech.com",
    },
    {
      value: "Pradeep Kumar",
      label: "Pradeep Kumar",
      email: "pradeep@andgatetech.com",
    },
    {
      value: "Madhavi Singh",
      label: "Madhavi Singh",
      email: "madhavi@andgatetech.com",
    },
    {
      value: "Rahul Thakur",
      label: "Rahul Thakur",
      email: "rahul@andgatetech.com",
    },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Event Submitted:", formData);
    setShowModal(false);
    setFormData({ eventName: "", interviewer: null, email: "", link: "" });
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-2xl font-bold text-gray-900">
          🎯 Application Tracker
        </h1>
      </div>

      {/* Candidate Info */}
      <div className="bg-white p-6 rounded-lg shadow mb-10">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          👤 Candidate Info
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700">
          <div>
            <strong>Name:</strong> John Doe
          </div>
          <div>
            <strong>Email:</strong> john@em.com
          </div>
          <div>
            <strong>Phone:</strong> 9876543210
          </div>
          <div>
            <strong>Domain:</strong> Backend
          </div>
          <div>
            <strong>Experience:</strong> 2.5 Yrs
          </div>
          <div>
            <strong>Skills:</strong> Node.js, MongoDB
          </div>
        </div>
      </div>

      {/* Selection Rounds */}
      <div className="mb-16">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 gap-3">
            <h2 className="text-lg font-semibold text-yellow-600 flex items-center gap-2">
              <FaLock /> Selection Rounds
            </h2>
            <button
              onClick={() => setShowModal(true)}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm flex items-center justify-center gap-2"
            >
              <FaPlus /> Add Event
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Show added events here if needed */}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
            <h3 className="text-xl font-semibold mb-4 text-center">
              Add Interview Event
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Event Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Name
                </label>
                <Select
                  options={eventOptions}
                  value={eventOptions.find(
                    (e) => e.value === formData.eventName
                  )}
                  onChange={(selected) =>
                    setFormData({ ...formData, eventName: selected.value })
                  }
                />
              </div>

              {/* Interviewer (Search by Name) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Interviewer
                </label>
                <Select
                  options={interviewerOptions}
                  getOptionLabel={(e) => `${e.label}`} 
                  onChange={(selected) =>
                    setFormData({
                      ...formData,
                      interviewer: selected, // Save full object
                    })
                  }
                  placeholder="Search by name..."
                />
              </div>

              {/* Interviewer Email (auto-filled from selected interviewer) */}
              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Interviewer Email
                </label>
                <input
                  type="email"
                  name="interviewerEmail"
                  value={formData.interviewer?.email || ""}
                  readOnly
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-100"
                />
              </div>

              {/* Candidate Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Candidate Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                />
              </div>

              {/* Event Link */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Link
                </label>
                <input
                  type="text"
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default applicationTracker;
