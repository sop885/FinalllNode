const mongoose =require('mongoose')

const Location=mongoose.Schema({
    AreaName:{type:String},
    AreaCode:{type:Number}
})

module.exports=mongoose.model('Location',Location)