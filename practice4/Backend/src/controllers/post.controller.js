import postModel from "../models/post.model.js";
import { sendFiles } from "../services/storage.service.js";

const createPostController = async (req, res) => {
  try {
    let { caption } = req.body;
    let image = req.file;

    if (!caption || !image) {
      return res.status(400).json({
        message: "Data is missing to create a post!",
      });
    }

    const uploadImage = await sendFiles(req.file.buffer, req.file.originalname);

    const post = await postModel.create({
      caption,
      image: uploadImage.url,
    });

    return res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    console.log("Create post controller error - ", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getAllPostController = async (req, res) => {
  try {
    let posts = await postModel.find();

    return res.status(200).json({
      message: "All Posts are here",
      posts,
    });
  } catch (error) {
    console.log("Get all post controller error - ", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export { createPostController, getAllPostController };
