const mongoose = require('mongoose');
const CSchema=mongoose.Schema({
    CityName:{type:String},
    CityCode:{type:Number},
    AreaCode:{type:Number,ref:"Location"}

})
module.exports=mongoose.model("citys",CSchema)