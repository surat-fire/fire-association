import mongoose, { Schema, Document, Model } from "mongoose";

export interface IEventRegistration extends Document {
  event: mongoose.Types.ObjectId;
  fullName: string;
  organization?: string;
  phone?: string;
  email: string;
  registeredAt: Date;
}

const eventRegistrationSchema = new Schema<IEventRegistration>(
  {
    event: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    organization: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    registeredAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const EventRegistration: Model<IEventRegistration> =
  mongoose.models.EventRegistration ||
  mongoose.model<IEventRegistration>(
    "EventRegistration",
    eventRegistrationSchema
  );

export default EventRegistration;
