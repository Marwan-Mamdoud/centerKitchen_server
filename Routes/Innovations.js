import { Router } from "express";
import {
  addInnovation,
  deleteInnovation,
  getInnovations,
  getInnovationsThree,
} from "../Controller/Innovations.js";
import { VerifyUser } from "../Controller/Users.js";
const router = Router();

router.get("/getInnovations", getInnovations);

router.get("/getInnovationsLimit", getInnovationsThree);

router.use(VerifyUser);

router.post("/addInnovation", addInnovation);

router.delete("/deleteInnovation/:id", deleteInnovation);

export default router;
