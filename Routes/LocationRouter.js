const router=require('express').Router()

const Location=require('../Controller/LocationController')
router.post("/newLocate",Location.newLocate)
router.get("/getAllAreas",Location.getAllAreas)
router.get("/getAreaName/:AreaCode",Location.getLocationNameByCode)


module.exports=router