import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  role: { type: String, default: "User" },
});

const User = mongoose.model("UserWithGoogle", UserSchema);
export default User;
