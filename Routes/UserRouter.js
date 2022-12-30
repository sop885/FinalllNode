const router=require('express').Router()
const user=require('../Controller/UsersControllers')

// router.post('/image',upload.single('file'),user.image)
router.post('/createUser',user.CreateUser)
router.put('/updateUser/:UserId',user.UpdateUser)
router.delete('/deleteUser/:UserId',user.DeleteUser)
// router.delete('/DeleteAllUsers',user.DeleteAllUsers)
router.get('/CheckPasswordSign/:password',user.CheckPasswordSign)
router.get('/CheckPassword/:UserId/:password',user.CheckPassword)
router.get('/CheckConnect/:UserName/:password',user.CheckConnect)


module.exports=router