const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const env = require("dotenv")
const cors = require('cors')
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const mongoose = require('mongoose')
const UserRouter = require("./Routes/UserRouter");
const ActionRouter = require("./Routes/ActionRouter");
const LocationRouter = require("./Routes/LocationRouter");
const CRouter = require("./Routes/CRouter")

const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './UsersImages')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})
//multer({ dest: 'uploads/' })
const upload = multer({ storage: storage })
app.use('/User/createUser', upload.single('file'), (req, res, next) => {
    try {
        console.log(req.file);

        next()
    } catch (error) {
        res.send(400);
    }
});
app.use('/User/UpdateUser/:UserId', upload.single('file'), (req, res, next) => {
    try {
        console.log(req.file,"hhhhhhhh");
        // res.send(req.file)
        next()
    } catch (error) {
        res.send(400);
    }
});

env.config()
mongoose.connect(process.env.CONNECTION, {}).then(() => {
    console.log("connect to mongo");
})

app.use("/User", UserRouter)
app.use("/City", CRouter)
app.use("/Action", ActionRouter)
app.use("/Location", LocationRouter)

app.use(express.static('public')); 
app.use('/UsersImages', express.static('UsersImages'));
app.listen(3000, () => {
    console.log("listening on port 3000");
})