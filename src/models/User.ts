import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  role: string;
  imageFile: string;
}

const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  role: { type: String, required: true },
  imageFile: { type: String, required: true },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
