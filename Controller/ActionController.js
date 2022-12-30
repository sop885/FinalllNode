const UsersModels = require('../Models/UsersModels');
const ActionsModel = require('../Models/ActionsModel');
const Location = require('../Models/LocationModel')
const CitiesModels = require('../Models/CModel')


// const CreateUser = async (req, res)=>{
//     let newUser= new UsersModels({
//     })
//     newUser.save().then((data)=>{
//       counter.UpdateCounterAll()
//         res.send("The User added successfully!")
//       }).catch((error)=>{
//           res.send(error)
//       })  
// }
//אחרי שפתחתי בקשה ,מחזיר לי את הaction  הרשימה של המחליפים האופציונלים

async function NameCity(Cc) {

  let c = await CitiesModels.find()
  let city = await c.find(o => o.CityCode == Cc)
  console.log(city);
  return city.CityName

}



// function NameArea(Ac) {
//   Location.find().then((ress) => {
//     return ress.find(o => o.AreaCode == Ac)
//   }).then((y) => {
//     console.log(y);

//     return y.AreaName


//   })
// }

// const GetActionByDate = async (req, res) => {
//   date=req.params.date;
//   userId=req.params.userId;

//   let actions=[];
//  actions=ActionsModel.find({ReplacesUserId:userId,RequestingUserId:userId}).then((actions)=>{
//    actions.forEach((action)=>
//    {
//  if(action.DateStart<=date&&date<=action.DateEnd) 
//  console.log(true)
//  else
//  console.log(false)
 
//   } )

//  })


// }


async function NameArea(Ac) {

  let a = await Location.find()
  let area = await a.find(o => o.AreaCode == Ac)
  console.log(area);
  return area.AreaName

}

//יצירת בקשה

const createRequest = async (req, res) => {
  let action = await new ActionsModel(req.body)
  let userid = req.params.UserId

  console.log("yuiyiu :" + action);
  let arr = []
  let user = {}
  try {



    action.CityName = await NameCity(action.CityId)
    action.AreaName = await NameArea(action.AreaId)

    await console.log("action: " + action.ReplaceGender);
    await action.save()// שמירת הבקשה
    let allUsers = await UsersModels.find().populate('ActionsHistory')//שליפת כל המשתמשים
    await allUsers.forEach(async element => {//מעבר על המשתמשים - כל אחד אם מתאים - דחיפה למערך מקומי
      if (element.UserId == userid) {//אם האלמנט הנוכחי הפותח
        await element.ActionsHistory.push(action)//דחיפה למערך של הסטורית בקשות בפותח
        await element.save() //שמירה
        user = element
      }
      else if (element.AreaCode == action.AreaId &&
        (element.Diploma == "יש" && action.IsDiploma == "חובה") || (element.Diploma == "יש" && action.IsDiploma == "לא חובה") ||
        (element.Diploma == "אין" && action.IsDiploma == "לא חובה") &&
        element.Status == "ממלא/ת מקום" &&
        element.Job == action.Job
      ) {
        if ((element.Gender === "זכר" && action.ReplaceGender === "זכר") || (element.Gender === "נקבה" && action.ReplaceGender === "נקבה") || (action.ReplaceGender === "לא משנה")) {
          console.log(element);

          // await element.ActionsHistory.push(action._id)
          // await element.save()
          await arr.push(element)
        }
      }
    })

    // let areas=await Location.find()
    // let cities=await CitiesModels.find()


    // console.log("user  ", user);
    // console.log("arr  ", arr);

    //אם לא -זא שזה כל אחד אחר ברשימה
    res.json({ arr: arr, action: action })
  }
  catch (e) {
    res.send(e)
  }
}


// const createRequest = async (req, res) => {
//   console.log(req.body);
//   console.log(req.body.CurrentRequest);

//   let action = new ActionsModel(req.body)
//   let userid = req.params.UserId
//   let arr = []
//   let user = {}
//   // console.log("action", action)
//   action.save().then((ress) => {// שמירת הבקשה
//     console.log("resss" + ress);
//     UsersModels.find().then((res1) => {//שליפת כל המשתמשים
//       res1.forEach(element => {//מעבר על המשתמשים - כל אחד אם מתאים - דחיפה למערך מקומי
//         if (element.UserId == userid) {//אם האלמנט הנוכחי הפותח
//           element.ActionsHistory.push(action)//דחיפה למערך של הסטורית בקשות בפותח
//           element.save().then((us) => { //שמירה
//             user = us
//             console.log("us:" + us);
//           })
//         }//אם לא -זא שזה כל אחד אחר ברשימה
//         else if (element.AreaCode == action.AreaId && (element.Diploma == "יש" && action.IsDiploma == "חובה") || (element.Diploma == "יש" && action.IsDiploma == "חובה לא") || (element.Diploma == "אין" && action.IsDiploma == "לא חובה") && element.Status == "ממלא/ת מקום" && element.Job == action.Job && element.Gender == action.ReplaceGender || action.ReplaceGender == "לא משנה") {
//           console.log("element" + element);
//            arr.push(element)
//         }
//       })
//     })
//   }).then( () => {
//     console.log('after'+ user);
//     console.log('after2'+ arr);

//     res.json({ arr: arr, user: user })
//   }).catch((error) => {
//     res.send(error)
//   })
// }


const getAllActions = async (req, res) => {
  ActionsModel.find().then((ress) => {
    console.log(ress)
    res.send(ress)
  }).catch((error) => {
    res.send(error)
  })
}
//שליפת הפעולות של המשתמש 
const getUserActions = async (req, res) => {
  console.log(req.params.UserId)
  UsersModels.findOne({ UserId: req.params.UserId }).populate('ActionsHistory').then((ress) => {
    console.log(ress);

    res.send(ress.ActionsHistory)
  }).catch((error) => {
    res.send(error)
  })
}
const sendMessages = async (req, res) => {
  try {
    req.body.forEach(async user => {
      let currentUser = await UsersModels.findById(user._id)
      await currentUser.ActionsHistory.push(req.params.actionId)
      await currentUser.save()
    })
    res.send("update")
  } catch (error) {
    res.send(error)
  }
}
const UpdateActionStatus = async (req, res) => {
  // res.send(req.body)
  ActionsModel.findByIdAndUpdate(req.params.actionId, { status: true, ReplacesUserId: req.body._id }).then((data) => {
    res.send("The Action updated!")
  }).catch((error) => {
    res.send(error)
  })
}
const findUser = async (req, res) => {
  // res.send(req.body)
  // res.send(req.body.user)
  console.log(req.params);
  //get ActionId
  UsersModels.findById(req.params.userId).then((data) => {
    console.log("found");
    console.log("data" + data);
    res.send(data)
  }).catch((error) => {
    res.send(error)
  })
}
const findReqUser = async (req, res) => {
  // res.send(req.body)
  // res.send(req.body.user)
  console.log(req.params);
  //get ActionId
  UsersModels.findOne({UserId:req.params.id}).then((data) => {
    console.log("found");
    console.log("data" + data);
    res.send(data)
  }).catch((error) => {
    res.send(error)
  })
}
module.exports = { getUserActions, createRequest, getAllActions, sendMessages, UpdateActionStatus, findUser,findReqUser
  // ,GetActionByDate 
}
