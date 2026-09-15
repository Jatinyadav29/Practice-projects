const fileUploadController = (req, res) => {
  try {
    let body = req.body;
    let file = req.file;

    return res.status(200).json({
      message: "File received",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = fileUploadController;
