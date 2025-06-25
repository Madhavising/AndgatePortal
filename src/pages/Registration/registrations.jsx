import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CandidateRegistration = () => {
  const [isExperienced, setIsExperienced] = useState(false);
  const [step, setStep] = useState(0);
  const [experienceStep, setExperienceStep] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    poc: "",
    name: "",
    mobile: "",
    graduationYear: "",
    degree: "",
    domain: "",
    preferredLocation: "",
    availability: "",
    resume: null,
    experienceYears: "",
    selfRating: "",
    individualRole: "",
    bondDetails: "",
    bondWilling: "",
    totalExperience: "",
    jobChangeReason: "",
    interviewsAttended: "",
    foreignWork: "",
    skills: "",
    ctcDetails: "",
    offerDetails: "",
  });

  const experienceSteps = ["Experience Info", "Tech & Offers"];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const submit = () => {
    console.log("Submitted", formData);
    toast.success("Registration submitted!");
  };

  const renderStyledStepper = () => (
    <div className="w-full flex items-center justify-between relative mb-6 px-2">
      {experienceSteps.map((label, index) => (
        <div
          key={index}
          className="flex flex-col items-center flex-1 relative z-10"
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
              experienceStep === index
                ? "bg-blue-600 text-white"
                : "bg-gray-300 text-gray-600"
            }`}
          >
            {index + 1}
          </div>
          <span className="text-sm text-center mt-2 font-medium text-gray-800">
            {label}
          </span>
        </div>
      ))}
      <div className="absolute top-4 left-4 right-4 h-0.5 bg-gray-300 z-0" />
      <div
        className="absolute top-4 left-4 h-0.5 bg-blue-600 z-0 transition-all duration-300"
        style={{
          width: `${(experienceStep / (experienceSteps.length - 1)) * 100}%`,
        }}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 flex justify-center overflow-hidden">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-2xl p-4 space-y-8">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Candidate Registration Form
        </h2>

        {/* Step 0: Fresher Form */}
        {step === 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
              <div className="flex flex-col">
                <label>
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border px-3 py-2 rounded"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label>POC in ANDGATE (TA's name)</label>
                <input
                  type="text"
                  name="poc"
                  value={formData.poc}
                  onChange={handleChange}
                  className="border px-3 py-2 rounded"
                />
              </div>
              <div className="flex flex-col">
                <label>
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border px-3 py-2 rounded"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label>
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="border px-3 py-2 rounded"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label>Graduation Year</label>
                <input
                  type="month"
                  name="graduationYear"
                  value={formData.graduationYear}
                  onChange={handleChange}
                  className="border px-3 py-2 rounded"
                />
              </div>
              <div className="flex flex-col">
                <label>
                  Degree <span className="text-red-500">*</span>
                </label>
                <select
                  name="degree"
                  value={formData.degree}
                  onChange={handleChange}
                  className="border px-3 py-2 rounded"
                  required
                >
                  <option value="">Select</option>
                  <option value="B.Tech">B.Tech</option>
                  <option value="M.Tech">M.Tech</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label>
                  Domain <span className="text-red-500">*</span>
                </label>
                <select
                  name="domain"
                  value={formData.domain}
                  onChange={handleChange}
                  className="border px-3 py-2 rounded"
                  required
                >
                  <option value="">Select</option>
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
                  <option value="STA">Others</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label>
                  Preferred Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="preferredLocation"
                  value={formData.preferredLocation}
                  onChange={handleChange}
                  className="border px-3 py-2 rounded"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label>
                  Availability / Notice Period{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  className="border px-3 py-2 rounded"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label>
                  Upload Resume <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  name="resume"
                  onChange={handleChange}
                  className="border px-3 py-2 rounded"
                  required
                />
              </div>
            </div>

            <div className="flex items-center space-x-3 pt-6">
              <label className="text-sm font-medium text-gray-700">
                Are you an experienced candidate?
              </label>
              <input
                type="checkbox"
                checked={isExperienced}
                onChange={() => setIsExperienced(!isExperienced)}
                className="h-5 w-5 text-blue-600"
              />
            </div>

            <div className="pt-5 text-end">
              {isExperienced ? (
                <button
                  onClick={() => setStep(1)}
                  className="bg-blue-600 text-white px-6 pt-2 py-2 rounded-lg"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={submit}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg"
                >
                  Submit
                </button>
              )}
            </div>
          </>
        )}

        {/* Step 1: Experience Form */}
        {step === 1 && isExperienced && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">
              Experience Details
            </h3>
            {renderStyledStepper()}

            {experienceStep === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="flex flex-col">
                  <label>
                    Total Experience (e.g., 2 years 6 months){" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="experienceYears"
                    value={formData.experienceYears}
                    onChange={handleChange}
                    className="border px-3 py-2 rounded"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label>
                    Interview Self-Rating (e.g., 7/10){" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="selfRating"
                    value={formData.selfRating}
                    onChange={handleChange}
                    className="border px-3 py-2 rounded"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label>
                    Can handle Individual Contributor role?{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="individualRole"
                    value={formData.individualRole}
                    onChange={handleChange}
                    className="border px-3 py-2 rounded"
                    required
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label>
                    Bond with current employer?{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="bondDetails"
                    value={formData.bondDetails}
                    onChange={handleChange}
                    className="border px-3 py-2 rounded"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label>
                    Willing to buyback/break bond?{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="bondWilling"
                    value={formData.bondWilling}
                    onChange={handleChange}
                    className="border px-3 py-2 rounded"
                    required
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="Maybe">Maybe</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label>
                    Experience excluding training{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="totalExperience"
                    value={formData.totalExperience}
                    onChange={handleChange}
                    className="border px-3 py-2 rounded"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label>
                    Relevant Experience including training"{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="totalExperience"
                    value={formData.totalExperience}
                    onChange={handleChange}
                    className="border px-3 py-2 rounded"
                    required
                  />
                </div>
              </div>
            )}

            {experienceStep === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="flex flex-col">
                  <label>
                    Reason for job change / Motivation{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="jobChangeReason"
                    value={formData.jobChangeReason}
                    onChange={handleChange}
                    className="border px-3 py-2 rounded"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label>
                    Last 4 interviews attended{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="interviewsAttended"
                    value={formData.interviewsAttended}
                    onChange={handleChange}
                    className="border px-3 py-2 rounded"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label>
                    Foreign work experience?{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="foreignWork"
                    value={formData.foreignWork}
                    onChange={handleChange}
                    className="border px-3 py-2 rounded"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label>
                    Technical skills, tools, strengths{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    className="border px-3 py-2 rounded"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label>
                    Current CTC <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="ctcDetails"
                    value={formData.ctcDetails}
                    onChange={handleChange}
                    className="border px-3 py-2 rounded"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label>
                    Expected CTC <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="ctcDetails"
                    value={formData.ctcDetails}
                    onChange={handleChange}
                    className="border px-3 py-2 rounded"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label>
                    Offers in hand (Company & CTC){" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="offerDetails"
                    value={formData.offerDetails}
                    onChange={handleChange}
                    className="border px-3 py-2 rounded"
                    required
                  />
                </div>
              </div>
            )}

            <div className="flex justify-between pt-14">
              <button
                onClick={() =>
                  experienceStep === 0
                    ? setStep(0)
                    : setExperienceStep(experienceStep - 1)
                }
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
              >
                Back
              </button>
              {experienceStep < experienceSteps.length - 1 ? (
                <button
                  onClick={() => setExperienceStep(experienceStep + 1)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={submit}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateRegistration;
