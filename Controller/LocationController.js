const locationsModel = require('../Models/LocationModel');

const getAllAreas = async (req, res) => {
    locationsModel.find().then((ress) => {
        res.send(ress)
    })

        .catch((error) => {
            res.send(error)
        }) 
}
const getLocationNameByCode = async (req, res) => {
    locationsModel.find().then((ress) => {
        let Area=ress.filter(o=>o.AreaCode==req.params.AreaCode)
        res.send(Area.AreaName)
    })

        .catch((error) => {
            res.send(error)
        }) 
} 
const newLocate = async (req, res) => {
    let locate = req.body.user 
    let newLocate= new locationsModel({
        AreaName:locate.AreaName,
        AreaCode:locate.AreaCode,
    })
    newLocate.save().then((data)=>{
        res.send("The locate added successfully!")
      }).catch((error)=>{
          res.send(error)
      })  
}


module.exports = { getAllAreas,newLocate ,getLocationNameByCode}
