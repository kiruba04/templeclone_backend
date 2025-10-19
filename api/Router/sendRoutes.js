import express from "express";
import fetch from "node-fetch";
import Volunteer from "../models/volunteer.js";
import User from "../models/user.js";
import Specialdevotee from "../models/specialdevotess.js";
import Uthchavam from "../models/Uthchavam.js";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Meta WhatsApp Cloud API credentials
const WHATSAPP_TOKEN = process.env.META_ACCESS_TOKEN; // Permanent Access Token
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;  // Your Business Phone Number ID

// Route to send Uthchavam images
router.post("/send-images", async (req, res) => {
  const { uthchavamId, groupType } = req.body;

  // Validate uthchavamId
  if (!uthchavamId || !uthchavamId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ error: "Invalid or missing Uthchavam ID" });
  }

  try {
    // Fetch the uthchavam details
    const uthchavam = await Uthchavam.findById(uthchavamId);

    if (!uthchavam) {
      return res.status(404).json({ error: "Uthchavam not found" });
    }

    const { imageurls } = uthchavam;
    const {poojaname} = uthchavam;
    let users;

    switch (groupType) {
      case "devotee":
        users = await User.find({});
        break;
      case "volunteer":
        users = await Volunteer.find({});
        break;
      case "special":
        users = await Specialdevotee.find({});
        break;
      default:
        return res.status(400).json({ error: "Invalid group type" });
    }

    // Filter out users without phone numbers
    const usersWithPhone = users.filter((user) => user.phone);

    // Prepare message sending promises
    const sendMessagesPromises = usersWithPhone.map(async (user) => {
      try {
        for (const url of imageurls) {
          const response = await fetch(
            `https://graph.facebook.com/v22.0/${PHONE_NUMBER_ID}/messages`,
            {
              method: "POST",
              headers: {
                "Authorization": `Bearer ${WHATSAPP_TOKEN}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                messaging_product: "whatsapp",
                to: `91${user.phone}`, // include country code
                type: "document",
                document: {
                  link:url, // Replace with your actual template name
                  caption: `Here is the ${poojaname} 🙏`,
                  filename: "Uthchavam-Invitation.pdf" // optional
                },
              }),
            }
          );
          const data = await response.json();
          console.log(`✅ Sent to ${user.phone}:`, data);
          if (data.error) {
            console.error(`❌ Failed for ${user.phone}:`, data.error.message);
          }
        }
      } catch (err) {
        console.error(`❌ Error sending to ${user.phone}:`, err);
      }
    });

    await Promise.all(sendMessagesPromises);
    res.status(200).json({ message: "WhatsApp messages sent successfully" });
  } catch (error) {
    console.error("Error sending messages:", error);
    res.status(500).json({ error: "Failed to send messages" });
  }
});

export default router;
