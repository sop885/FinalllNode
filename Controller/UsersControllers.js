const counter = require('./CountersController');
const action = require('../Models/ActionsModel');
// const cities = require('../models/CitiesModels');
const UsersModels = require('../Models/UsersModels');
const CountersModel = require('../Models/CountersModel');
const locationsModel = require('../Models/LocationModel')
const multer = require('multer')

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, '../UsersImages')
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname)
//   },
// })
// const upload = multer({ storage: storage })

// app.use(express.static('images')); 
// const path=require('path')
// const dirPath=path.join(__dirname, 'images')


// app.post('/bulk', upload.single('file') , (req, res) =>{
//   try {
//       console.log();
//       res.send(req.file);
//   } catch(error) {
//         console.log(error);
//          res.send(400);
//   }
// });
// const image = (upload.single('file'),(req, res) => {

//   console.log("in image");
//   try {
//     upload.single('file')
//     console.log();
//     res.send(req.file);
//   } catch (error) {
//     console.log(error);
//     res.send(400);
//   }
// })
//בודק האם הסיסמא קיימת אצל משתמש אחר לא כולל המשתמש הנוכחי לצורך עדכון סיסמא חדשה עבורו
const CheckPassword = async (req, res) => {
  UsersModels.find({ UserId: req.params.UserId, Password: req.params.password }).then((data) => {
    if (data.length != 0)
      res.send(data[0])
    else {
      UsersModels.find({ Password: req.params.password }).then((et) => {
        console.log(et)
        if (et.length == 0) {
          res.send('ok')//סיסמה לא קיימת בכלל
        }
        else {
          res.send('unavailable')//סיסמה קיימת אצל בנאדם אחר
        }
      }).catch((error) => {
        res.send(error)
      })
    }

  })
}
//בדיקה האם הסיסמא קיימת אצל אחד המשתמשים
const CheckPasswordSign = async (req, res) => {
  UsersModels.find({ Password: req.params.password }).then((et) => {
    console.log(et)
    if (et.length == 0) {
      res.send('ok')//סיסמה לא קיימת בכלל
    }
    else {
      res.send('unavailable')//סיסמה קיימת אצל בנאדם אחר
    }
  }).catch((error) => {
    res.send(error)
  })
}
//בדיקה האם הסיסמא ושם המשתמש נכונים לצורך התחברות לאתר
const CheckConnect = async (req, res) => {
  UsersModels.find({ UserName: req.params.UserName, Password: req.params.password }).then((data) => {
    if (data.length != 0)
      res.send(data[0])
    else
      res.send('unvalid')
  }).catch((error) => {
    res.send(error)
  })
}


// מוחק את המשתמש שביקש למחוק
const DeleteUser = async (req, res) => {
  //להחזיר את החיפוש ע"פ קוד במקום שם משתמש
  UsersModels.findOneAndDelete({ UserId: req.params.UserId }).then((data) => {
    counter.UpdateCounterLeave()
    res.send("The User deleted!")
  }).catch((error) => {
    res.send(error)
  })
}


// function DeleteAllUsers(req, res) {
//להחזיר את החיפוש ע"פ קוד במקום שם משתמש
//   for (let i = 1; i <= CountersModel.CounterAll; i++) {

//     UsersModels.findOne({ UserId: i }).then((data) => {
//       if (data == null)
//         i++
//       else
//         Delete(i)
//     })
//   }
// counter.UpdateCounterDeleteAll()
// counter.UpdateCounterLeaveAll()
// res.send("all Users deleted!")

// }
// //מוחק את כל המשתמשים ומאפס את הקאונטרים
// const DeleteAllUsers = async (req, res) => {
//   //להחזיר את החיפוש ע"פ קוד במקום שם משתמש
//   UsersModels.find().then((data) => {
//         data.map(e=>{        
//         Delete(e.UserId)}).then(
//       counter.UpdateCounterDeleteAll(),
//       counter.UpdateCounterLeaveAll(),
//       res.send("all Users deleted!")
//     )

//   }).catch((error) => {
//     res.send(error)
//   })
// }
// //פונקציית עזר
// function Delete(userid) {
//   //להחזיר את החיפוש ע"פ קוד במקום שם משתמש
//   UsersModels.findOneAndDelete({ UserId: userid }).then(() => {
//   }).catch((error) => {
//     res.send(error)
//   })
// }


//יצירת משתמש חדש
const CreateUser = async (req, res) => {
  console.log('.....', req.body)
  let user = req.body
  try {
    CountersModel.find().then(async (data) => {
      console.log(data[0].CounterAll);
      if (data[0].CounterAll == undefined) {
        res.send("counter is not working")
      }
      else {

        let newUser = new UsersModels({
          UserId: data[0].CounterAll,
          UserName: user.UserName,
          Password: user.Password,
          Diploma: user.Diploma,
          Gender: user.Gender,
          BirthDate: user.BirthDate,
          PhoneNumber: user.PhoneNumber,
          AreaCode: user.AreaCode,
          CityCode: user.CityCode,
          Mail: user.Mail,
          Status: user.Status,
          Job: user.Job,
          Imag: req.file,
        })
        await newUser.save()
        await counter.UpdateCounterAll()
        res.send("The User added successfully!")
      }
    });
  }
  catch (error) {
    res.send(error)
  }
}

//עדכון משתמש
const UpdateUser = async (req, res) => {
  // res.send(req.body)
  // res.send(req.body.user)
  let user = req.body;
  let userToUpdate = {
    UserName: user.UserName,
    Password: user.Password,
    Diploma: user.Diploma,
    Gender: user.Gender,
    BirthDate: user.BirthDate,
    PhoneNumber: user.PhoneNumber,
    AreaCode: user.AreaCode,
    CityCode: user.CityCode,
    Mail: user.Mail,
    Status: user.Status,
    Job: user.Job,
    Imag: req.file,
  }
  UsersModels.findOneAndUpdate({ UserId: req.params.UserId },userToUpdate).then((data) => {
    res.send(data)
  }).catch((error) => {
    res.send(error)
  })
}


// const CheckPass=async (req, res) => {

//   UsersModels.find({ Password: req.params.Password, UserName: req.params.UserName }).then((data) => {
//     res.send("The User found!")
//   }).catch((error) => {
//     res.send(error)
//   })
// }
module.exports = {
  UpdateUser, DeleteUser, CreateUser, CheckPassword, CheckConnect, CheckPasswordSign
  // DeleteAllUsers
}