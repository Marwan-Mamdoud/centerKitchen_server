import Brands from "../Model/Brand.js";
import cache from "../Cashe.js";

export const addBrand = async (req, res, next) => {
  try {
    const { name, description, image } = req.body;

    const brand = await new Brands({
      name: JSON.parse(name),
      description: JSON.parse(description),
      image,
    });
    await brand.save();
    return res
      .status(201)
      .json({ status: true, message: "Done Create Brand Successfully", brand });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        status: false,
        error: `This Name has been Reserved to Another Brand`,
      });
    }
    return res.status(400).json({
      status: false,
      error: `Error Add Product Controller: ${error.message}`,
    });
  }
};

export const getBrands = async (req, res, next) => {
  const language = "en";
  try {
    const casheKey = "Brands";
    const casheDate = await cache.get(casheKey);
    // console.log(casheDate, "cachedata");
    if (casheDate) {
      return res.status(200).json({
        status: true,
        message: "Done Get All Categories Successfully.",
        brands: casheDate,
      });
    }
    const projection = {
      [`name.${language}`]: 1,
      [`description.${language}`]: 1,
      ["image"]: 1,
      link: 1,
      _id: 1,
    };
    let brands = await Brands.find({}, projection);
    // console.log(brands, "brands");
    // await cache.set(casheKey, brands);
    return res.status(200).json({
      status: true,
      message: "Done Get All Brands Successfully.",
      brands,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      error: `Error Get Brands Controller: ${error.message}`,
    });
  }
};

export const getBrandByName = async (req, res, next) => {
  try {
    const { name } = req.params;
    const brand = await Brands.findOne({ "name.en": name });
    return res.status(200).json({
      status: true,
      message: "Done Get Brand Successfully.",
      brand,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      error: `Error Get Brands Controller: ${error.message}`,
    });
  }
};

export const editBrand = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, image } = req.body;
    const brand = await Brands.findById(id);
    brand.name = JSON.parse(name);
    brand.description = JSON.parse(description);
    brand.image = image || brand.image;
    await brand.save();
    return res
      .status(201)
      .json({ status: true, message: "Done Edit Brand Successfully.", brand });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        status: false,
        error: `This Name has been Reserved to Another Brand`,
      });
    }
    return res.status(400).json({
      status: false,
      error: `Error Add Product Controller: ${error.message}`,
    });
  }
};

export const deleteBrand = async (req, res, next) => {
  try {
    const { name } = req.params;
    await Brands.findOneAndDelete({ "name.en": name });
    return res
      .status(200)
      .json({ status: true, message: "Done Delete Brand By Successfully." });
  } catch (error) {
    return res.status(400).json({
      status: false,
      error: `Error Delete Brand Controller: ${error.message}`,
    });
  }
};
