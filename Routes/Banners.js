import { Router } from "express";
import { addBanner, DeleteBanner, getBanners } from "../Controller/Banners.js";
import { VerifyUser } from "../Controller/Users.js";

const router = Router();

router.get("/getBanners", getBanners);

router.post("/addBanner", VerifyUser, addBanner);

router.delete("/deleteBanner/:id", VerifyUser, DeleteBanner);

export default router;
