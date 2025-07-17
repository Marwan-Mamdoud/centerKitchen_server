import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  link: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Innovations = mongoose.model("Innovations", Schema);
export default Innovations;
