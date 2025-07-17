import { Router } from "express";
import { CheckOut } from "../Controller/Payment.js";

const router = Router();

router.post("/checkout", CheckOut);

export default router;
