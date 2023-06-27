const catchAsync = require("../utils/catchAsync");
const AppError = require("./../utils/appError");
const updateOne = (Model) => {
  return catchAsync(async (req, res, next) => {
   
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body);
    if (!doc) {
      return next(new AppError("No doc found with that ID", 404));
    }
    res.status(200).json({
      status: "doc successfully Updated",
      data: doc,
    });
  });
};
const deleteOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError("No doc found with that ID", 404));
    }
    res.status(200).json({
      status: "doc successfully deleted",
      data: doc._id,
    });
  });
};
const getOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);
    if (!doc) {
      return next(new AppError("No doc found with that ID", 404));
    }
    res.status(200).json({
      status: "doc successfully deleted",
      data: doc,
    });
  });
};
const CreateOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
   
    if (doc) {
      const { _id, title } = doc; 
      res.status(201).json({
        status: "Doc save successfully",
       data: doc
      });
    }
  });
};

const getAll = (Model) => {
  return catchAsync(async (req, res, next) => {
    const getDoc = await Model.find({}).lean();
    res.status(200).json({
      status: "success",
      results: getDoc.length,
      data: {
        data: getDoc,
      },
    });
  });
};

module.exports = { CreateOne, getAll, deleteOne, updateOne,getOne };
