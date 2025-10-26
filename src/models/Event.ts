import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  location: { type: String, required: true },
  eventType: { type: String, default: "Drill" },
  agenda: [
    {
      time: { type: String, required: true },
      title: { type: String, required: true },
    },
  ],
  trainers: [String],
  safetyChecklistUrl: String,
  image: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Event || mongoose.model("Event", eventSchema);
