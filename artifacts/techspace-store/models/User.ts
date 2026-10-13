import mongoose, { type Model } from "mongoose";

export interface UserRecord {
  name: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
}

const UserSchema = new mongoose.Schema<UserRecord>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    passwordHash: {
      type: String,
      required: true,
      select: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  },
);

export const User =
  (mongoose.models.User as Model<UserRecord> | undefined) ??
  mongoose.model<UserRecord>("User", UserSchema);
