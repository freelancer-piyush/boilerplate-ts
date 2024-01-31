import mongoose, { model, Types } from "mongoose";
const Schema = mongoose.Schema;

const usersSchema = new Schema(
  {
    username: {
      type: String,
      trip: true,
      required: true,
      index: true,
      unique: true,
    },
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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export interface UserDocument {
  username: string;
  email: string;
  name: string;
  _id: Types.ObjectId;
}

export default model("users", usersSchema);
