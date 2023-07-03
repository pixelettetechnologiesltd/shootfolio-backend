module.exports = (err, req, res, next) => {
  if (err.code === 11000) {
    return res.status(409).json({
      status: "error",
      message: "Duplicate entry not allowed in the database",
    });
  }
  if (err.name === "JsonWebTokenError") {
    return res.status(409).json({
      status: "error",
      message: "Invalid Token",
    });
  }

  // Default error handling
  err.code = err.code || 500;

  err.status = err.status || "error";
  res.status(err.code).json({
    status: err.status,
    message: err.message,
  });
};
