import Banners from "../Model/Banner.js";

export const getBanners = async (req, res, next) => {
  try {
    const banners = await Banners.find();
    return res.status(200).json({
      status: true,
      message: "Done Get Banners Successfully.",
      banners,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: `Error Add Banner Controller: ${error.message}`,
    });
  }
};

export const addBanner = async (req, res, next) => {
  try {
    const { image, style, link } = req.body;
    const banner = await new Banners({
      image,
      style,
      link,
    });
    await banner.save();
    return res
      .status(200)
      .json({ status: true, message: "Done Add Banner Successfully.", banner });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: `Error Add Banner Controller: ${error.message}`,
    });
  }
};

export const DeleteBanner = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Banners.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ status: true, message: "Done Delete Banner Successfully." });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: `Error Delete Banner Controller: ${error.message}`,
    });
  }
};
