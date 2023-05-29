const transaction = require("./../models/transactionModel");
const setting = require("./../models/settingModel");
const { CreateOne, getAll, deleteOne, updateOne } = require("./handleFactory");
const catchAsync = require("../utils/catchAsync");
const AppError = require("./../utils/appError");
exports.transactionAdd = CreateOne(transaction);
exports.transactionGet = getAll(transaction);
exports.create = CreateOne(setting);
exports.borrowRate = catchAsync(async (req, res, next) => {
  const borrowRate = req.params.borrowRate;
  const Value = await setting.find({ title: borrowRate }).select("value");
  if (!Value) {
    return next(new AppError('No value found ', 404));
  }
    res.status(200).json({
      status: "success",
      data: Value,
    });
});
