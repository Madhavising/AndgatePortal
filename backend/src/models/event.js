import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    candidate: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        mobile: { type: String, required: true },
    },
    interviewer: {
        enterviewerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        name: { type: String, required: true, required: true },
        email: { type: String, required: true, required: true },
    },
    scheduledBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    round: {
        type: String,
        required: true,
    },
    interviewDate: {
        type: Date,
        required: true,
    },
    meetingLink: {
        type: String,
        required: true,
    },
    feedbackLink: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['scheduled', 'completed', 'cancelled', 'feedback-submitted'],
        default: 'scheduled',
    },
    notes: {
        type: String,
    },
    rescheduleHistory: [
        {
            previousDate: Date,
            rescheduledBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            reason: String,
            dateRescheduled: { type: Date, default: Date.now },
        },
    ],
    feedback: {
        givenBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        rating: Number,
        comments: String,
        submittedAt: Date,
    },
    reminderSent: {
        type: Boolean,
        default: false,
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
    },
}, {
    timestamps: true,
    versionKey: false
});

export default mongoose.model('Event', eventSchema);
