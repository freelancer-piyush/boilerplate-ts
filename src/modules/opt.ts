import mongoose, { model } from "mongoose";
const Schema = mongoose.Schema;

const OtpSchema = new Schema(
  {
    email: {
      type: String,
      trip: true,
      required: true,
      index: true,
      unique: true,
    },
    name: {
      type: String,
      trip: true,
      required: true,
    },
    username: {
      type: String,
      trip: true,
      required: true,
      index: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

OtpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });

export default model("otp", OtpSchema);
