import Feedback from '../models/feedbackModel.js';
import User from '../models/Trustee.js';
import nodemailer from 'nodemailer';
import moment from 'moment-timezone';


export const submitFeedback = async (req, res) => {
  try {
    const { fullname, email, phone, message, issueDate, issuePlace } = req.body;

    // ✅ Validation: message is required
    if (!message || message.trim() === "") {
      return res.status(400).json({ message: "Message is required" });
    }

    // ✅ Current timestamp
   const timestamp = moment().tz("Asia/Kolkata").format("dddd, MMMM D, YYYY, hh:mm:ss A");

    // ✅ Format dates
    const formattedIssueDate = issueDate
      ? new Date(issueDate).toLocaleDateString("en-US", {
          weekday: "long",  // Tuesday
          year: "numeric",  // 2025
          month: "long",    // August
          day: "numeric"    // 26
        })
      : "Not Provided";

    

    // ✅ Save in DB
    const feedbackData = {
      message,
      timestamp,
    };

    if (fullname) feedbackData.fullname = fullname;
    if (email) feedbackData.email = email;
    if (phone) feedbackData.phone = phone;
    feedbackData.issueDate = issueDate ? new Date(issueDate) : new Date();
    if (issuePlace) feedbackData.issuePlace = issuePlace;

    const newFeedback = new Feedback(feedbackData);
    await newFeedback.save();

    // ✅ Create transporter *here*, not globally
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // ✅ Find trustees (who have email)
    const trustees = await User.find({ email: { $exists: true, $ne: null } });

    // ✅ Send email to each trustee
    for (const trustee of trustees) {
      await transporter.sendMail({
        from: `"Feedback System" <${process.env.EMAIL_USER}>`,
        to: trustee.email,
        subject: `New Feedback Submitted`,
        html: `
          <h2>New Feedback Received</h2>
          ${fullname ? `<p><b>Full Name:</b> ${fullname}</p>` : ""}
          ${email ? `<p><b>Email:</b> ${email}</p>` : ""}
          ${phone ? `<p><b>Phone:</b> ${phone}</p>` : ""}
          <p><b>Message:</b> ${message}</p>
          <p><b>Issue Date:</b> ${formattedIssueDate}</p>
          <p><b>Issue Place:</b> ${issuePlace || "Not Provided"}</p>
          <p><b>Submitted At:</b> ${timestamp}</p>
        `
      });
    }

    res.status(201).json({ message: "Feedback submitted and notifications sent successfully!" });

  } catch (error) {
    console.error("Feedback Submission Error:", error);
    res.status(500).json({ message: "Failed to submit feedback" });
  }
};



// GET: Retrieve all feedbacks
export const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    res.status(500).json({ message: 'Failed to fetch feedbacks' });
  }
};
