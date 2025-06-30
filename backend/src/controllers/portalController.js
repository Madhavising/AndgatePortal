const UploadModel = require('../models/upload');
const path = require('path');
const CandidateModel = require("../models/candidate")

exports.getAllUnassignedCanditates = async (req, res) => {
    try {
        const registrationForms = await CandidateModel.find({ isAssigned: false }).lean().exec();

        return res.status(200).json({
            status: true,
            data: registrationForms,
        });
    } catch (error) {
        console.error("Error fetching unassigned candidates:", error);

        return res.status(500).json({
            status: false,
            message: "Failed to fetch unassigned candidates.",
            error: error.message,
        });
    }
};

exports.getAllAssignedCanditates = async (req, res) => {
    const user = req.user;
    try {
        const allAssigned = await CandidateModel.find({ assignedTo: user._id }).lean().exec();

        return res.status(200).json({
            status: true,
            data: allAssigned,
        });
    } catch (error) {
        console.error("Error fetching assigned candidates:", error);

        return res.status(500).json({
            status: false,
            message: "Failed to fetch assigned candidates.",
            error: error.message,
        });
    }
};

exports.uploadResume = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const ext = path.extname(req.file.originalname).toLowerCase().replace('.', '');

    const allowedTypes = ['pdf', 'doc', 'docx'];
    if (!allowedTypes.includes(ext)) {
        return res.status(400).json({ error: 'Invalid file type' });
    }

    try {
        const uploadDoc = new UploadModel({
            fileName: req.file.originalname,
            fileType: ext,
            filePath: req.file.path
        });

        await uploadDoc.save();

        res.status(200).json({
            status: true,
            file: {
                fileName: uploadDoc.fileName,
                filePath: uploadDoc.filePath,
            }
        });
    } catch (err) {
        console.error('Upload save error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.fresherRegistration = async (req, res) => {
    const {
        availability,
        degree,
        domain,
        email,
        graduationYear,
        mobile,
        name,
        poc,
        preferredLocation,
        currentLocation,
        resume,
        skills
    } = req.body;

    const requiredFields = {
        name,
        email,
        mobile,
        degree,
        domain,
        graduationYear,
        resume,
        availability,
        preferredLocation,
        currentLocation,
        skills
    };

    const missingFields = [];

    for (const [field, value] of Object.entries(requiredFields)) {
        if (!value || (typeof value === 'string' && value.trim() === '')) {
            missingFields.push(field);
        }
    }

    if (missingFields.length > 0) {
        return res.status(400).json({
            status: false,
            message: `The following fields are required: ${missingFields.join(', ')}`,
            missingFields
        });
    }

    try {
        const candidate = new CandidateModel({
            availability,
            degree,
            domain,
            email,
            graduationYear,
            mobile,
            name,
            poc,
            preferredLocation,
            currentLocation,
            resume,
            skills,
        });

        await candidate.save();

        return res.status(200).json({
            status: true,
            message: 'Registration Successful.',
            candidateId: candidate._id
        });

    } catch (error) {
        console.error('Registration save error:', error);
        return res.status(500).json({
            status: false,
            message: 'Internal server error'
        });
    }
};

exports.experiencedRegistration = async (req, res) => {
    const {
        availability,
        bondDetails,
        bondWilling,
        companiesAppliedSixMonths,
        currentCTC,
        degree,
        domain,
        email,
        expIncludingTraining,
        expectedCTC,
        experienceYears,
        foreignWork,
        graduationYear,
        individualRole,
        interviewsAttended,
        jobChangeReason,
        mobile,
        name,
        offerDetails,
        poc,
        preferredLocation,
        currentLocation,
        releventExp,
        resume,
        selfRating,
        skills
    } = req.body;


    const requiredFields = {
        availability,
        bondDetails,
        bondWilling,
        companiesAppliedSixMonths,
        currentCTC,
        degree,
        domain,
        email,
        expIncludingTraining,
        expectedCTC,
        experienceYears,
        foreignWork,
        graduationYear,
        individualRole,
        interviewsAttended,
        jobChangeReason,
        mobile,
        name,
        offerDetails,
        preferredLocation,
        currentLocation,
        releventExp,
        resume,
        selfRating,
        skills
    };

    const missingFields = [];

    for (const [field, value] of Object.entries(requiredFields)) {
        if (!value || (typeof value === 'string' && value.trim() === '')) {
            missingFields.push(field);
        }
    }

    if (missingFields.length > 0) {
        return res.status(400).json({
            status: false,
            message: `The following fields are required: ${missingFields.join(', ')}`,
            missingFields
        });
    }

    try {
        const candidate = new CandidateModel({
            availability,
            bondDetails,
            bondWilling,
            companiesAppliedSixMonths,
            currentCTC,
            degree,
            domain,
            email,
            expIncludingTraining,
            expectedCTC,
            experienceYears,
            foreignWork,
            graduationYear,
            individualRole,
            interviewsAttended,
            jobChangeReason,
            mobile,
            name,
            offerDetails,
            poc,
            preferredLocation,
            currentLocation,
            releventExp,
            resume,
            selfRating,
            skills,
            isExperienced: true
        });

        await candidate.save();

        return res.status(200).json({
            status: true,
            message: 'Registration Successful.',
            candidateId: candidate._id
        });

    } catch (error) {
        console.error('Registration save error:', error);
        return res.status(500).json({
            status: false,
            message: 'Internal server error'
        });
    }
};

exports.assignedToMe = async (req, res) => {
    const user = req.user;
    const candidateId = req.params.candidateId;

    try {
        const candidate = await CandidateModel.findOneAndUpdate(
            {
                _id: candidateId,
            },
            {
                status: "assigned",
                assignedTo: user._id,
                isAssigned: true,
            },
            {
                new: true
            }
        );

        if (!candidate) {
            return res.status(404).json({
                status: false,
                message: "Candidate not found or not assigned to you.",
            });
        }

        return res.status(200).json({
            status: true,
            message: "Candidate updated successfully.",
            candidate,
        });

    } catch (error) {
        console.error("Error updating assigned candidate:", error);

        return res.status(500).json({
            status: false,
            message: "Failed to update assigned candidate.",
            error: error.message,
        });
    }
};

