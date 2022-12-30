const mongoose = require('mongoose');
const ActionsSchema=mongoose.Schema({
//הקוד פעולה יווצר באופן אוטומטי ע"י העתקתו מה counter שסופר כמה פעולות קיימותם
ActionId:{type:Number,require},
ReplacesUserId:{type:mongoose.Types.ObjectId,ref:"User"},
RequestingUserId:{type:Number},
CurrentDate:{type:String},
CurrentTime:{type:String},
DateStart:{type:Date},
DateEnd:{type:Date},
AreaId:{type:String,ref:'Location'},
CityId:{type:String,ref:'city'},
GenderPlace:{type:String},
ReplaceGender:{type:String},
Adress:{type:String},
Job:{type:String},
AgeGroup:{type:String},
IsDiploma:{type:String},
Rate:{type:Number},
Note:{type:String},
status:{type:Boolean},
AreaName:{type:String,default:'מרכז'},
CityName:{type:String,default:'אלעד'}


//את התמונה, מין,טלפון ,מייל ושם הפרופיל של המחליף נשלוף ע"י שימוש בקוד המחליף
})
module.exports=mongoose.model("Action",ActionsSchema)
