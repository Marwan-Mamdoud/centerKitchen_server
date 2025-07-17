import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  name: {
    en: { type: String, required: true, unique: true },
    ar: { type: String, required: true, unique: true },
  },
  description: {
    en: { type: String },
    ar: { type: String },
  },
  backgroundImgage: { type: String, required: true },
  style: { type: String, required: true },
  logo: {
    type: String,
    default:
      "https://res.cloudinary.com/dk9wy7nq2/image/upload/v1734597885/qgvqdsx7sfkbxjjcwfih.jpg",
  },
  brands: [{ type: mongoose.Schema.Types.ObjectId, ref: "Brands" }], // العلاقات مع الماركات
  createdAt: { type: Date, default: Date.now },
});

Schema.index({ "name.en": 1, "name.ar": 1 }, { unique: true });

const Categories = mongoose.model("Categories", Schema);
export default Categories;
