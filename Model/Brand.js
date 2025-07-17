import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  name: {
    en: { type: String, required: true, unique: true },
    ar: { type: String, required: true, unique: true },
  },
  description: {
    en: { type: String, required: true },
    ar: { type: String, required: true },
  },
  image: { type: String, required: true },
  link: { type: String },
  createdAt: { type: Date, default: Date.now },
});

Schema.index({ "name.en": 1, "name.ar": 1 }, { unique: true });

const Brands = mongoose.model("Brands", Schema);
export default Brands;
