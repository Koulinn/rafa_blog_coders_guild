import POST_SCHEMA from "../../db/Schemas/Posts.js";

const create = async (req, res, next) => {
  try {
    const postBody = req.body;

    const newPost = new POST_SCHEMA(postBody);
    const savedPost = await newPost.save({ new: true });

    if (savedPost._id) {
      res.status(201).send({
        success: true,
        savedPost,
      });
      return;
    }
  } catch (error) {
    console.log(error);
    next();
  }
};

const saveImgUrl = (req, res, next) => {
  try {
    console.log(req);
  } catch (error) {
    console.log(error);
    next();
  }
};

const posts_utils = { create, saveImgUrl };

export default posts_utils;
