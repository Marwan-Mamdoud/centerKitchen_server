import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  editProduct,
  getNewProducts,
  getNumberOfProductsInCategory,
  getProduct,
  getProductById,
  getProducts,
  getProductsbyCateogry,
  getProductsBySearch,
  getProductsinSale,
  getRelatedProducts,
} from "../Controller/Products.js";
import { VerifyUser } from "../Controller/Users.js";
const router = Router();

router.get("/getProduct/:code", getProductById);

router.get("/getProductById/:id", getProduct);

router.get("/getProducts", getProducts);

// ==============================================================

router.get("/getNewProducts", getNewProducts);

router.get("/getproducts/:category", getProductsbyCateogry);

router.get("/getRelatedProduct/:idCategory", getRelatedProducts);

router.get("/getNumberOfProductsInCategory/:id", getNumberOfProductsInCategory);

router.get("/getProductsInSale", getProductsinSale);

router.get("/getProductsBySearch", getProductsBySearch);

router.use(VerifyUser);

router.post("/addProduct", addProduct);

router.delete("/deleteProduct/:code", deleteProduct);

router.put("/editProduct/:id", editProduct);

export default router;
