import express from "express";
import posts_utils from "./utils.js";
import POST_SCHEMA from "../../db/Schemas/Posts.js";
import multer from "multer";
import savePostImage from "../../util/uploadImgs.js";

const { getPosts, create, saveImgUrl, handleLike, editPost } = posts_utils;

const router = express.Router();

router.route("/").get(getPosts).post(create);

router.route("/like/:postId").put(handleLike);

router
  .route("/imgUpload/:postId")
  .put(multer({ storage: savePostImage }).single("postImg"), saveImgUrl);

router.route("/:postId").put(editPost);

export default router;
