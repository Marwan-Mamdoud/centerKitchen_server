import { Router } from "express";
import {
  addCategory,
  deleteCategory,
  editCategory,
  getCategories,
  getCategoryByName,
} from "../Controller/Categories.js";
import { VerifyUser } from "../Controller/Users.js";

const router = Router();

router.get("/getCategories", getCategories);

router.get("/getCategory/:name", getCategoryByName);

router.use(VerifyUser);

router.post("/addCategory", addCategory);

router.put("/editCategory/:id", editCategory);

router.delete("/deleteCategory/:name", deleteCategory);

export default router;
