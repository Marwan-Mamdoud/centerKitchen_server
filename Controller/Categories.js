import Categories from "../Model/Category.js";
import cache from "../Cashe.js";
export const addCategory = async (req, res, next) => {
  try {
    const { name, description, backgroundImgage, brands, logo, style } =
      req.body;
    const category = await new Categories({
      name: JSON.parse(name),
      description: JSON.parse(description),
      brands,
      style,
      backgroundImgage,
      logo,
    });
    await category.save();
    return res.status(201).json({
      status: true,
      message: "Done Create Category Successfully",
      category,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        status: false,
        error: `This Name has been Reserved to Another Cagtegory`,
      });
    } else {
      return res.status(400).json({
        status: false,
        error: `Error Add Category Controller: ${error.message}`,
      });
    }
  }
};

export const getCategories = async (req, res, next) => {
  const language = "en";
  try {
    const casheKey = "AllCategory";
    const casheDate = await cache.get(casheKey);
    if (casheDate) {
      return res.status(200).json({
        status: true,
        message: "Done Get All Categories Successfully.",
        categories: casheDate,
      });
    }
    // const projection = {
    //   [`name.${language}`]: 1,
    //   [`description.${language}`]: 1,
    //   logo: 1,
    //   brands: 1,
    //   style: 1,
    //   backgroundImgage: 1,
    //   _id: 1,
    // };
    const categories = await Categories.find().populate("brands");
    // await cache.set(casheKey, categories);
    return res.status(200).json({
      status: true,
      message: "Done Get All Categories Successfully.",
      categories,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      error: `Error Get Categories Controller: ${error.message}`,
    });
  }
};

export const getCategoryByName = async (req, res, next) => {
  try {
    const { name } = req.params;
    const category = await Categories.findOne({ "name.en": name }).populate(
      "brands"
    );

    if (category == null) {
      return res.status(400).json({
        status: false,
        error: `There is no Category has that name`,
      });
    }
    return res.status(200).json({
      status: true,
      message: "Done Get Category Successfully.",
      category,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      error: `Error Get Categories Controller: ${error.message}`,
    });
  }
};

export const editCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, backgroundImgage, brands, logo, style } =
      req.body;
    const category = await Categories.findById(id);
    category.name = JSON.parse(name);
    category.description = JSON.parse(description);
    category.brands = brands.length == 0 ? category.brands : brands;
    category.backgroundImgage = backgroundImgage || category.backgroundImgage;
    category.style = style || category.style;
    category.logo = logo || category.logo;
    await category.save();
    return res.status(201).json({
      status: true,
      message: "Done Edit Category Successfully.",
      category,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        status: false,
        error: `This Name has been Reserved to Another Category`,
      });
    }
    return res.status(400).json({
      status: false,
      error: `Error Edit Category Controller: ${error.message}`,
    });
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const { name } = req.params;
    await Categories.findOneAndDelete({ "name.en": name });
    return res
      .status(200)
      .json({ status: true, message: "Done Delete Category By Successfully." });
  } catch (error) {
    return res.status(400).json({
      status: false,
      error: `Error Delete Category Controller: ${error.message}`,
    });
  }
};
