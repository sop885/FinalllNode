const CityModel = require('../Models/CModel');

const getCitiesByArea = async (req, res) => {
    console.log(req.params.AreaCode)
    CityModel.find().then((ress) => {
        let cities= ress.filter(o=>o.AreaCode==req.params.AreaCode)
        res.send(cities)
    })

        .catch((error) => {
            res.send(error)
        }) 
} 
const getCityNameByCodes = async (req, res) => {
    CityModel.find().then((ress) => {
        let cities= ress.filter(o=>o.AreaCode==req.params.AreaCode)
        let city=cities.filter(o=>o.CityCode==req.params.CityCode)
        res.send(city.CityName)
    })

        .catch((error) => {
            res.send(error)
        }) 
} 

const getAllCity = async (req, res) => {
    CityModel.find().then((ress) => {
        res.send(ress)
    })

        .catch((error) => {
            res.send(error)
        }) 
} 
const newCity = async (req, res) => {
    let city = req.body 
    let newCity= new CityModel(city)
    newCity.save().then((data)=>{
        res.send("The city added successfully!")
      }).catch((error)=>{
          res.send(error)
      })  
}
module.exports = {getAllCity,newCity,getCitiesByArea,getCityNameByCodes}