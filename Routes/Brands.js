import { Router } from "express";
import {
  addBrand,
  deleteBrand,
  editBrand,
  getBrandByName,
  getBrands,
} from "../Controller/Brands.js";
import { VerifyUser } from "../Controller/Users.js";

const router = Router();

router.post("/addBrand", VerifyUser, addBrand);

router.get("/getBrands", getBrands);

router.get("/getBrand/:name", getBrandByName);

router.put("/editBrand/:id", VerifyUser, editBrand);

router.delete("/deleteBrand/:name", VerifyUser, deleteBrand);

export default router;
