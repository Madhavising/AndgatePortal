import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../../api";
import { useEffect } from "react";

const experienceSteps = ["Experience Info", "Tech & Offers"];

const CandidateRegistration = () => {
  const [isExperienced, setIsExperienced] = useState(false);
  const [step, setStep] = useState(0);
  const [experienceStep, setExperienceStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [hrList, setHrList] = useState([]);

  const initialFormState = {
    email: "",
    poc: "",
    name: "",
    mobile: "",
    graduationYear: "",
    degree: "",
    domain: "",
    currentLocation: "",
    preferredLocation: "",
    availability: "",
    resume: "",
    experienceYears: "",
    selfRating: "",
    individualRole: "",
    bondDetails: "",
    bondWilling: "",
    releventExp: "",
    expIncludingTraining: "",
    jobChangeReason: "",
    interviewsAttended: "",
    foreignWork: "",
    skills: "",
    companiesAppliedSixMonths: "",

    currentCTC: "",
    expectedCTC: "",
    offerDetails: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    if (name === "resume" && files?.length > 0) {
      const file = files[0];
      const formDataToSend = new FormData();
      formDataToSend.append("file", file);

      try {
        const response = await axios.post(
          `${baseUrl}/api/upload_resume`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const uploadedPath = response.data?.file?.filePath;

        setFormData((prev) => ({
          ...prev,
          resume: uploadedPath,
        }));
      } catch (error) {
        console.error("Upload error:", error.response?.data || error.message);
      }

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateExperienceForm = () => {
    const {
      experienceYears,
      selfRating,
      individualRole,
      bondDetails,
      bondWilling,
      releventExp,
      expIncludingTraining,
      jobChangeReason,
      interviewsAttended,
      foreignWork,
      currentCTC,
      expectedCTC,
      offerDetails,
      companiesAppliedSixMonths,
    } = formData;

    if (
      !experienceYears ||
      !selfRating ||
      !individualRole ||
      !bondDetails ||
      !bondWilling ||
      !releventExp ||
      !expIncludingTraining ||
      !jobChangeReason ||
      !interviewsAttended ||
      !foreignWork ||
      !currentCTC ||
      !expectedCTC ||
      !offerDetails ||
      !companiesAppliedSixMonths
    ) {
      toast.error("Please fill all required experience fields.");
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    setStep(1);
  };

  const fresherCandidateSubmit = async () => {
    const cleanedData = Object.fromEntries(
      Object.entries(formData).filter(
        (entry) =>
          entry[1] !== null && entry[1] !== undefined && entry[1] !== ""
      )
    );
    try {
      const response = await axios.post(
        `${baseUrl}/api/fresher_registration`,
        cleanedData
      );

      if (response.status === 200) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error(
        "Fresher Candidate Submit Error:",
        error?.response?.data || error.message
      );
      toast.error("Failed to register fresher candidate.");
    }
  };

  const experienceCandidateSubmit = async () => {
    if (!isExperienced || !validateExperienceForm()) return;

    try {
      const response = await axios.post(
        `${baseUrl}/api/experienced_registration`,
        formData
      );

      if (response.status === 200) {
        handleSuccessfulSubmission();
      }
    } catch (error) {
      console.error(
        "Experienced Candidate Submit Error:",
        error?.response?.data || error.message
      );
      toast.error("Failed to register experienced candidate.");
    }
  };

  const handleSuccessfulSubmission = () => {
    setFormData(initialFormState);
    setIsExperienced(false);
    setStep(0);
    setExperienceStep(0);
    setSubmitted(true);
    toast.success("Registration submitted successfully!");
    setTimeout(() => setSubmitted(false), 3000);
  };

  useEffect(() => {
    const getAllHrs = async () => {
      try {
        let response = await axios.get(`${baseUrl}/api/auth/get_all_hr`);

        console.log(response)
        if (response.status === 200) {
          setHrList(response.data.data)
        }
      } catch (error) {
        console.log("Error fetching Hr list:", error.message)
      }
    }
    getAllHrs();
  }, [])

  const renderStyledStepper = () => {
    return (
      <div className="w-full flex items-center justify-between relative mb-6 px-2">
        {experienceSteps.map((label, index) => (
          <div
            key={index}
            className="flex flex-col items-center flex-1 relative z-10"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${experienceStep >= index
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

        {experienceSteps.map((_, index) => {
          if (index === experienceSteps.length - 1) return null;

          const leftPos = `calc(${(index / (experienceSteps.length - 1)) * 100
            }% + 16px)`;
          const segmentWidth = `calc(${100 / (experienceSteps.length - 1)
            }% - 32px)`;

          let background = "#d1d5db";
          if (experienceStep > index) {
            background = "#2563eb";
          } else if (experienceStep === index) {
            background = "linear-gradient(to right, #2563eb 50%, #d1d5db 50%)";
          }

          return (
            <div
              key={index}
              className="absolute top-4 h-0.5 z-0 transition-all duration-300"
              style={{
                left: leftPos,
                width: segmentWidth,
                background,
              }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 flex  justify-center overflow-hidden">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-2xl p-4 space-y-8">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Candidate Registration Form
        </h2>

        {submitted ? (
          <div className="text-center  text-green-700 text-lg font-semibold py-20 space-y-4">
            <div className="mt-10">
              🎉 Your form has been successfully submitted!
            </div>
            <div>
              Thank you for registering with{" "}
              <strong>AndGate Informatics Pvt Ltd.</strong>.
            </div>
            <div className="text-base text-gray-700 font-normal">
              Our HR team will review your details shortly. If your profile
              matches our requirements, you will hear from us via email or
              phone.
            </div>
            <div className="text-base text-gray-700 font-normal">
              In the meantime, feel free to explore our website or connect with
              us on LinkedIn for the latest updates and opportunities.
            </div>
            <div className="text-sm text-gray-500 italic">
              We appreciate your interest and wish you the very best in your
              career journey!
            </div>
          </div>
        ) : (
          <>
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
                    <label>
                      POC in ANDGATE (TA's name){" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="poc"
                      value={formData.poc}
                      onChange={handleChange}
                      className="border px-3 py-2 rounded"
                      required
                    >
                      <option value="">Select</option>
                      {
                        hrList && hrList.map((e) => {
                          return (
                            <option key={e._id} value={e._id}>{e.firstName + " " + e.lastName}</option>
                          )
                        })
                      }

                    </select>
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
                      Current Location <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="currentLocation"
                      value={formData.currentLocation}
                      onChange={handleChange}
                      className="border px-3 py-2 rounded"
                      required
                    />
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

                <div>
                  <div className="flex items-center space-x-3 ">
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

                  <div className=" text-end">
                    {isExperienced ? (
                      <button
                        onClick={handleNextStep}
                        className="bg-blue-600 text-white px-6  py-2 rounded-lg"
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        onClick={fresherCandidateSubmit}
                        className="bg-green-600 text-white px-6  py-2 rounded-lg"
                      >
                        Submit
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
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
                    Experience Including training{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="expIncludingTraining"
                    value={formData.expIncludingTraining}
                    onChange={handleChange}
                    className="border px-3 py-2 rounded"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label>
                    Relevant Experience
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="releventExp"
                    value={formData.releventExp}
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
                    Current CTC <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="currentCTC"
                    value={formData.currentCTC}
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
                    name="expectedCTC"
                    value={formData.expectedCTC}
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
                <div className="flex flex-col">
                  <label>
                    Companies you have applied within last 6 months
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="companiesAppliedSixMonths"
                    value={formData.companiesAppliedSixMonths}
                    onChange={handleChange}
                    className="border px-3 py-2 rounded"
                    required
                  />
                </div>
              </div>
            )}

            <div className="flex justify-between pt-20">
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
                  onClick={experienceCandidateSubmit}
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
