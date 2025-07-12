const Event = require("../models/event");
const { interviewerHtml, candidateHtml } = require("../utils/emailTemplates");
const transporter = require("../utils/mailer");


exports.createEvent = async (req, res) => {
    const {
        candidate,
        interviewer,
        scheduledBy,
        round,
        interviewDate,
        meetingLink,
        notes,
        organization,
    } = req.body;

    try {
        // Validate required fields
        const requiredFields = {
            "candidate.name": candidate?.name,
            "candidate.email": candidate?.email,
            "candidate.mobile": candidate?.mobile,
            "interviewer.interviewerId": interviewer?.interviewerId,
            "interviewer.name": interviewer?.name,
            "interviewer.email": interviewer?.email,
            "scheduledBy": scheduledBy,
            "round": round,
            "interviewDate": interviewDate,
            "meetingLink": meetingLink,
            "organization.companyId": organization?.companyId,
            "organization.name": organization?.name,
        };

        const missingFields = Object.entries(requiredFields)
            .filter(([, value]) => !value)
            .map(([key]) => key);

        if (missingFields.length > 0) {
            return res.status(400).json({
                status: false,
                message: "Missing required fields.",
                missingFields,
            });
        }

        // Create event
        const newEvent = await Event.create({
            candidate,
            interviewer,
            scheduledBy,
            round,
            interviewDate,
            meetingLink,
            notes,
            organization,
        });

        // Helper to build email content
        const createEmail = (to, subject, html) => ({
            from: `"Andgate HR Team" <${process.env.SMTP_USER}>`,
            to,
            subject,
            text: `Dear- Andgate HR Team`,
            html
        });

        const personalizedCandidateHtml = candidateHtml
            .replace("{{candidate.name}}", candidate.name)
            .replace("{{organization.name}}", organization.name)
            .replace("{{round}}", round)
            .replace("{{interviewDate}}", new Date(interviewDate).toLocaleString())
            .replace("{{meetingLink}}", meetingLink)
            .replace("{{currentYear}}", 2025);

        const personalizedInterviewerHtml = interviewerHtml
            .replace("{{interviewer.name}}", interviewer.name)
            .replace("{{candidate.name}}", candidate.name)
            .replace("{{round}}", round)
            .replace("{{interviewDate}}", new Date(interviewDate).toLocaleString())
            .replace("{{meetingLink}}", meetingLink)
            .replace("{{currentYear}}", 2025);


        // Send emails
        const candidateEmail = createEmail(
            candidate.email,
            `Interview Scheduled for ${candidate.name} - Round ${round}`,
            personalizedCandidateHtml
        );

        const interviewerEmail = createEmail(
            interviewer.email,
            `Interview Assignment for ${candidate.name} - Round ${round}`,
            personalizedInterviewerHtml
        );

        await Promise.all([
            transporter.sendMail(candidateEmail),
            transporter.sendMail(interviewerEmail),
        ]);

        return res.status(201).json({
            status: true,
            message: "Event created and emails sent successfully.",
            data: newEvent,
        });
    } catch (error) {
        console.error("Error creating event:", error);
        return res.status(500).json({
            status: false,
            message: "Failed to create event.",
            error: error.message,
        });
    }
};

