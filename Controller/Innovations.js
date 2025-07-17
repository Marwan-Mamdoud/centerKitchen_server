import Innovations from "../Model/Innovation.js";

export const addInnovation = async (req, res, next) => {
  try {
    const { link } = req.body;
    const innovation = new Innovations({ link });
    await innovation.save();
    return res.status(201).json({
      status: true,
      message: "Done Add Innovation Successfully",
      innovation,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      error: `Error Add Innovation Controller:${error.message}`,
    });
  }
};

export const getInnovations = async (req, res, next) => {
  try {
    const innovations = await Innovations.find();
    return res.status(200).json({
      status: true,
      message: "Done Get All Innovations Successfully.",
      innovations,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      error: `Error Get Innovations Controller:${error.message}`,
    });
  }
};

export const getInnovationsThree = async (req, res, next) => {
  try {
    const innovations = await Innovations.find()
      .sort({ createdAt: -1 })
      .limit(3);
    return res.status(200).json({
      status: true,
      message: "Done Get Innovations Successfully.",
      innovations,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      error: `Error Get Innovations Controller:${error.message}`,
    });
  }
};

export const deleteInnovation = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Innovations.findByIdAndDelete(id);
    return res.status(200).json({
      status: true,
      message: "Done Delete Innovation By Successfully.",
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      error: `Error Delete Innovation Controller: ${error.message}`,
    });
  }
};
