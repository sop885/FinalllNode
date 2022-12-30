const mongoose = require('mongoose');
const CounterSchema=mongoose.Schema({    
    CounterAll:{type:Number},
    CounterLeave:{type:Number},
})
module.exports=mongoose.model("Counter",CounterSchema)