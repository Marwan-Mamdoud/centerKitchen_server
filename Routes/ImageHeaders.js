import { Router } from "express";
import {
  addImageHeader,
  deleteImageHeader,
  getImageHeaders,
} from "../Controller/ImageHeaders.js";
import { VerifyUser } from "../Controller/Users.js";

const router = Router();

router.get("/getImageHeaders", getImageHeaders);

router.use(VerifyUser);

router.post("/addImageHeader", addImageHeader);

router.delete("/deleteImageHeader/:id", deleteImageHeader);

export default router;
