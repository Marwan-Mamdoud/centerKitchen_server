import ImageHeaders from "../Model/ImageHeader.js";

export const addImageHeader = async (req, res, next) => {
  try {
    const { link, image } = req.body;
    const imageHeader = new ImageHeaders({ link, image });
    await imageHeader.save();
    return res.status(201).json({
      status: true,
      message: "Done Add Image Header Successfully.",
      imageHeader,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      error: `Error Add Image Header Controller:${error.message}`,
    });
  }
};

export const getImageHeaders = async (req, res, next) => {
  try {
    const imageHeaders = await ImageHeaders.find();
    return res.status(200).json({
      status: true,
      message: "Done Get Image Header Successfully.",
      imageHeaders,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      error: `Error Add Image Header Controller:${error.message}`,
    });
  }
};

export const deleteImageHeader = async (req, res, next) => {
  try {
    const { id } = req.params;
    await ImageHeaders.findByIdAndDelete(id);
    return res.status(200).json({
      status: true,
      message: "Done Delete ImageHeader By Successfully.",
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      error: `Error Delete ImageHeader Controller: ${error.message}`,
    });
  }
};
