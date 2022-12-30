const router=require('express').Router()
const Action=require('../Controller/ActionController')
router.post('/createRequest/:UserId',Action.createRequest)
router.get('/getUserActions/:UserId',Action.getUserActions)
router.get('/getAllActions',Action.getAllActions)
//ActionId
router.get('/findUser/:userId',Action.findUser)
router.get('/findReqUser/:id',Action.findReqUser)

// router.get('/GetActionByDate/:date/:userId',Action.GetActionByDate)

router.put('/sendMessages/:actionId',Action.sendMessages)
router.put('/UpdateActionStatus/:actionId',Action.UpdateActionStatus)
module.exports=router