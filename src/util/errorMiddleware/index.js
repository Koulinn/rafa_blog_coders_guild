const serverErrorHandler = (err, req, res, next) => {
  console.log(err);
  res.status(500).send("Server crashed 500");
};

const notFoundHandler = (err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send({
      success: false,
      msg: err,
    });
  } else {
    next(err);
  }
};

const errorMiddleware = {
  serverErrorHandler,
  notFoundHandler,
};

export default errorMiddleware;
