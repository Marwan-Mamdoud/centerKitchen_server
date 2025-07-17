import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  name: {
    en: { type: String, required: true },
    ar: { type: String, required: true },
  },
  description: {
    en: { type: String, required: true },
    ar: { type: String, required: true },
  },
  image: { type: String },
  price: { type: Number, requierd: true },
  sale: { type: Number, default: 0 },
  stock: { type: Number, required: true },
  code: { type: String, required: true, unique: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categories",
    required: true,
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brands",
    required: true,
  },
  weight: { type: String },
  dimensions: {
    length: { type: Number }, // الطول
    width: { type: Number }, // العرض
    height: { type: Number }, // الارتفاع
  },
  createdAt: { type: Date, default: Date.now },
});

const Products = mongoose.model("Products", Schema);
export default Products;
