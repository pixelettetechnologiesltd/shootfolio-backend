const catchAsync = (fun) => {
  return function (req, res, next) {
    Promise.resolve(fun(req, res, next))
      .then(()=>{console.log("Promise resolve successfully")})
      .catch((err) => next(err));
  };
};

module.exports = catchAsync;
