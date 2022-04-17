import express from "express";
import cors from "cors";
import postsRouter from "./services/posts/index.js";
import errorMiddleware from "./util/errorMiddleware/index.js";
import connect_mongo_db from "./db/index.js";

const { serverErrorHandler, notFoundHandler } = errorMiddleware;

const server = express();

server.use(express.json());
server.use(cors());

server.use("/posts", postsRouter);

server.use(notFoundHandler);
server.use(serverErrorHandler);

server.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
  connect_mongo_db();
});

export default server;
