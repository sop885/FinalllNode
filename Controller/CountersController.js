// import Time from './Time.js'
const CountersModel = require("../Models/CountersModel")


// const GetCounterAll = async (req,res)=>{
//     CountersModel.find().select('CounterAll -_id').then((data)=>{
//       res.send(data)
//     }).catch((error)=>{
//         res.send(error)
//     })
//   }

// const GetCounterLeave = async (req, res) => {
//     CountersModel.find().select('CounterLeave -_id').then((data) => {
//         res.send(data)
//     }).catch((error) => {
//         res.send(error)
//     })
// }

function GetCounterAll() {
    CountersModel.find().then((data) => {
        console.log(data[0].CounterAll);
        return data[0].CounterAll
    });
}

function UpdateCounterAll() {
    CountersModel.find().then((data) => {
        CountersModel.findByIdAndUpdate(process.env.COUNTER_ID, { CounterAll: data[0].CounterAll + 1 }).then((data1) => {
            return ( `${data1}+The counterAll updated succsessfuly`)
        })
    }).catch((error) => {
        return (error)
    })
}
function UpdateCounterDeleteAll() {
    CountersModel.find().then((data) => {
        CountersModel.findByIdAndUpdate(process.env.COUNTER_ID, { CounterAll: data[0].CounterAll = 0 }).then((data1) => {
            return ( `${data1}+The counterAll updated succsessfuly`)
        })
    }).catch((error) => {
        return (error)
    })
}
function  UpdateCounterLeave() {
    CountersModel.find().then((data) => {
        CountersModel.findByIdAndUpdate(process.env.COUNTER_ID, { CounterLeave: data[0].CounterLeave + 1 }).then((data1) => {
            return ( `${data1}+The CounterLeave updated succsessfuly`)
        })
    }).catch((error) => {
        return (error)
    })
}
function  UpdateCounterLeaveAll() {
    CountersModel.find().then((data) => {
        CountersModel.findByIdAndUpdate(process.env.COUNTER_ID, { CounterLeave: data[0].CounterLeave = 0 }).then((data1) => {
            return ( `${data1}+The CounterLeave updated succsessfuly`)
        })
    }).catch((error) => {
        return (error)
    })
}



module.exports = { UpdateCounterAll, UpdateCounterLeave, GetCounterAll,UpdateCounterLeaveAll,UpdateCounterDeleteAll }