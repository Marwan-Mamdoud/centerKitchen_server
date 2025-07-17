import mongoose from "mongoose";
import Products from "../Model/Product.js";
import cache from "../Cashe.js";
export const addProduct = async (req, res, next) => {
  try {
    const {
      name,
      description,
      image,
      price,
      sale,
      stock,
      code,
      category,
      brand,
      weight,
      dimensions,
    } = req.body;
    const product = await new Products({
      name: JSON.parse(name),
      description: JSON.parse(description),
      image,
      price,
      sale,
      stock,
      code,
      category,
      brand,
      weight,
      dimensions: JSON.parse(dimensions),
    });
    await product.save();
    return res.status(201).json({
      status: true,
      message: "Done Create New Product Successfully",
      product,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        status: false,
        error: `This Code has been Reserved to Another product`,
      });
    }
    return res.status(400).json({
      status: false,
      error: `Error Add Product Controller: ${error.message}`,
    });
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const language = "en";
    const projection = {
      [`name.${language}`]: 1,
      [`description.${language}`]: 1,
      image: 1,
      brand: 1,
      category: 1,
      price: 1,
      stock: 1,
      sale: 1,
      code: 1,
      dimensions: 1,
      weight: 1,
      _id: 1,
    };
    const { code } = req.params;
    const product = await Products.findOne({ code: code })
      .populate("category")
      .populate("brand");
    return res.status(200).json({
      status: true,
      message: `Done Get Product Successfully.`,
      product,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      error: `Error Get Product Controller: ${error.message}`,
    });
  }
};

export const getProducts = async (req, res, next) => {
  try {
    const casheKey = "ProductsKey";
    const casheDate = await cache.get(casheKey);
    if (casheDate) {
      return res.status(200).json({
        status: true,
        message: "Done Get All Categories Successfully.",
        products: casheDate,
      });
    }
    const products = await Products.find();
    // await cache.set(casheKey, products);
    return res
      .status(200)
      .json({ status: true, message: "Done Get All Products", products });
  } catch (error) {
    return res.status(400).json({
      status: false,
      error: `Error Get Products Controller: ${error.message}`,
    });
  }
};

export const editProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Products.findById(id);
    const {
      name,
      description,
      image,
      price,
      sale,
      stock,
      code,
      category,
      brand,
      weight,
      dimensions,
    } = req.body;
    product.name = JSON.parse(name);
    product.description = JSON.parse(description);
    product.dimensions = JSON.parse(dimensions);
    product.sale = sale || product.sale;
    product.code = code || product.code;
    product.image = image || product.image;
    product.price = price || product.price;
    product.stock = stock || product.stock;
    product.brand = brand || product.brand;
    product.weight = weight || product.weight;
    product.category = category || product.category;
    await product.save();
    return res.status(201).json({
      status: true,
      message: "Done Edit Product Successfully.",
      product,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        status: false,
        error: `This Code has been Reserved to Another product`,
      });
    }
    return res.status(400).json({
      status: false,
      error: `Error Edit Product Controller: ${error.message}`,
    });
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { code } = req.params;
    await Products.findOneAndDelete({ code: code });
    return res.status(200).json({
      status: true,
      message: "Done Delete Product By Successfully.",
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      error: `Error Delete Product Controller: ${error.message}`,
    });
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Products.findById(id)
      .populate("category")
      .populate("brand");
    return res.status(200).json({
      status: true,
      message: "Done Get Products Successfully.",
      product,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      error: `Error Get Product Controller: ${error.message}`,
    });
  }
};

//==================================================================================================================
//=============FILTER===============================FILTER========================FILTER============================
//==================================================================================================================

export const getProductsbyCateogry = async (req, res, next) => {
  try {
    const { category } = req.params;
    const products = await Products.find({ category: category }).populate(
      "category"
    );
    return res.status(200).json({
      status: true,
      message: "Done Get Products By Category",
      length: products.length,
      products,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      error: `Error Get Products Controller: ${error.message}`,
    });
  }
};

export const getNewProducts = async (req, res, next) => {
  try {
    const casheKey = "NewProducts";
    const casheDate = await cache.get(casheKey);
    if (casheDate) {
      return res.status(200).json({
        status: true,
        message: "Done Get All Categories Successfully.",
        products: casheDate,
      });
    }
    const products = await Products.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("category");
    // await cache.set(casheKey, products);
    return res.status(200).json({
      status: true,
      message: "Done New Products Successfully.",
      products,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      error: `Error Get New Products Controller: ${error.message}`,
    });
  }
};

export const getRelatedProducts = async (req, res, next) => {
  try {
    const { idCategory } = req.params;
    const products = await Products.find({ category: idCategory })
      .limit(12)
      .populate("category");
    return res.status(200).json({
      status: true,
      message: "Done Get Related Products Successfully.",
      products,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      error: `Error Get Related Products Controller: ${error.message}`,
    });
  }
};

export const getNumberOfProductsInCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const number = await Products.countDocuments({
      category: id,
    });
    return res.status(200).json({
      message: "Done get Number Of Products In category",
      status: true,
      number,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      error: `Error Get Number Of Products in Category Controller: ${error.message}`,
    });
  }
};

export const getProductsinSale = async (req, res, next) => {
  try {
    const casheKey = "SaleProducts";
    const casheDate = await cache.get(casheKey);
    if (casheDate) {
      return res.status(200).json({
        status: true,
        message: "Done Get All Categories Successfully.",
        products: casheDate,
      });
    }
    const products = await Products.find({ sale: { $gt: 0 } }).populate(
      "category"
    );
    // await cache.set(casheKey, products);
    return res.status(200).json({
      status: true,
      message: "Done Get Products in Sale Successfully.",
      products,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      error: `Error Get Products in Sale Controller: ${error.message}`,
    });
  }
};

export const getProductsBySearch = async (req, res, next) => {
  try {
    const search = req.query.search?.toLowerCase();
    const products = await Products.find({
      "name.en": { $regex: search, $options: "i" },
    }).populate("category");
    return res.status(200).json({
      message: "Done Get Products Successfully",
      status: true,
      products,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      error: `Error Get Products in Sale Controller: ${error.message}`,
    });
  }
};
