const express = require("express");
const fileUploadController = require("../controllers/file.controller");
const upload = require("../config/multer");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello");
});

router.post("/data", upload.array("profilePicture", 5), fileUploadController);

module.exports = router;
