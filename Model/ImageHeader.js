import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  image: { type: String, required: true },
  link: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const ImageHeaders = mongoose.model("ImageHeaders", Schema);
export default ImageHeaders;
