import express from "express";
import posts_utils from "./utils.js";
import POST_SCHEMA from "../../db/Schemas/Posts.js";
import fetch from "node-fetch";
import multer from "multer";
import savePostImage from "../../util/uploadImgs.js";

const { create, saveImgUrl } = posts_utils;

const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const all_posts = await POST_SCHEMA.find();

      // const omd_res = await fetch(
      //   `http://www.omdbapi.com/?i=tt3896198&apikey=${process.env.OMDB_API_KEY}`
      // );

      // const omdb_data = await omd_res.json();

      // console.log(omdb_data);
      if (all_posts.length > 0) {
        res.status(200).send({
          success: true,
          all_posts,
        });
      } else {
        res.status(404).send({
          success: false,
          msg: "No posts found",
        });
      }
    } catch (error) {
      console.log(error);
      next();
    }
  })
  .post(create);

router
  .route("/img_upload")
  .put(multer({ storage: savePostImage }).single("postImg"), saveImgUrl);

export default router;
