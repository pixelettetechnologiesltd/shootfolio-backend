module.exports=(err,req,res,next)=>{
    
    if(err.code===11000){
      res.status(409).json({
       status:"error",
       message:"Duplicate entry not allowed in database"
      })
    }
    if(err.name==='JsonWebTokenError'){
    res.status(409).json({
      status:"error",
      message:"Invalid Token"
    })
    }
    if(err.code==='ERR_HTTP_INVALID_STATUS_CODE'){
      res.status(500).json({
        status:"error",
        message:"Invalid Status Code"
      })
    }
    else{
      err.code = err.code || 500;
      err.status = err.status || "error";
      res.status(err.code).json({
        status: err.status,
        message: err.message,
      });
    }
}