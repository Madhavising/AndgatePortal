const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
      lowercase: true,
      trim: true,
      unique: true,
    },
    mobile: { type: String, required: true, unique: true },
    degree: { type: String },
    domain: { type: String },
    graduationYear: { type: String },
    skills: { type: String },
    selfRating: { type: String },
    releventExp: { type: String },
    expIncludingTraining: { type: String },
    experienceYears: { type: String },
    currentCTC: { type: String },
    expectedCTC: { type: String },
    jobChangeReason: { type: String },
    interviewsAttended: { type: String },
    companiesAppliedSixMonths: { type: String },
    offerDetails: { type: String },
    individualRole: { type: String },
    foreignWork: { type: String },
    preferredLocation: { type: String },
    currentLocation: { type: String },
    availability: { type: String },
    bondWilling: { type: String },
    bondDetails: { type: String },
    poc: { type: String },
    resume: { type: String },
    isExperienced: { type: Boolean, default: false },
    isAssigned: { type: Boolean, default: false },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    status: {
      type: String,
      enum: [
        "pending",
        "assigned",
        "onhold",
        "approved",
        "employee",
        "tranee",
        "deployed",
        "rejected",
      ],
      default: "pending",
      required: true,
    },
    remark: { type: "String" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("candidate", candidateSchema);
