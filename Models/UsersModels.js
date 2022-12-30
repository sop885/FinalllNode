const mongoose = require('mongoose');
const UsersSchema=mongoose.Schema({
//הקוד משתמש יווצר באופן אוטומטי ע"י העתקתו מה counter שסופר כמה משתמשים קיימיים
UserId:{type:Number,require},
UserName:{type:String,require},
Password:{type:String,minlength: 8,maxlength:9,require},
ValidatePass:{type:String,minlength: 8,maxlength:9,require},
Diploma:{type:String},
Gender:{type:String},
BirthDate:{type:Date},
PhoneNumber:{type:Number},
AreaCode:{type:String,ref:"Location"},
CityCode:{type:String,ref:"City"},
Mail:{type:String},
Status:{type:String},
Job:{type:String},
Communication:{type:String},
Imag:{type:Object},
ActionsHistory:[{type: mongoose.Types.ObjectId,ref :"Action"}]// כל הבקשות שיש לו: גם מה שקיבל וגם מש ששלח שהאידי שלו וגם מה שסגור
})
module.exports=mongoose.model("User",UsersSchema)

/*  	
שם משתמש	סיסמה	תעודת הוראה:
כן/לא	מין:
זכר/נקבה	תאריך לידה	מס' פלאפון	קוד אזור:
	
מייל	ממלא מקום
/ מעוניין במילוי	גננ/ת / סייע/ת	תמונת פרופיל
*/


//תוספת: אפשר להוסיף מסנן לפי עיר המחליף