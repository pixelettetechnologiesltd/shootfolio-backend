const catchAsync = require("../utils/catchAsync");
const AppError = require("./../utils/appError");
const updateOne=(Model)=>{
   return  catchAsync(async(req,res,next)=>{
        const updateTeam = await Model.findByIdAndUpdate(req.params.id, req.body);
        if (!updateTeam) {
          return next(new AppError("No Team found with that ID", 404));
        }
        res.status(200).json({
          status: "Team successfully Updated",
          data: updateTeam,
        });
    })
}
const deleteOne=(Model)=>{
   return catchAsync(async(req, res, next) => {
        const deleteTeam=await Model.findByIdAndDelete(req.params.id);
        if (!deleteTeam) {
          return next(new AppError('No Team found with that ID', 404));
        }
        res.status(200).json({
          status: 'Team successfully deleted',
          data: null
        });
})
}
const CreateOne=(Model)=>{
   return  catchAsync(async(req,res,next)=>{
        const team = await Model.create(req.body);
        if (team) {
          res.status(201).json({
            status: "Team save successfully",
            data: {
              team,
            },
          });
        }
    })
}
const getAll=(Model)=>{
    return catchAsync(async(req,res,next)=>{
        const getTeam = await Model.find({}).lean();
        res.status(200).json({
          status: 'success',
          results: getTeam.length,
          data: {
            data: getTeam
          }
    })
})
}

module.exports ={CreateOne,getAll,deleteOne,updateOne}