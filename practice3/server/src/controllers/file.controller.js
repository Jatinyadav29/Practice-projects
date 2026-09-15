const fileUploadController = async (req, res) => {
  try {
    let body = req.body;
    let file = req.file;
    let files = req.files;

    return res.status(200).json({
      message: "File received",
      body,
      files,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = fileUploadController;
