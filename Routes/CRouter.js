const router=require('express').Router()
const cities=require('../Controller/CController')
router.get("/getCitiesByArea/:AreaCode",cities.getCitiesByArea)
router.get("/getCityNameByCodes/:AreaCode/:CityCode",cities.getCityNameByCodes)
router.post("/newCity",cities.newCity)
router.get("/getAllCity",cities.getAllCity)


module.exports=router