const mongoose = require("mongoose")


const studentModel = mongoose.Schema({

    studentName:{
        type: String
    },
    Email:{
        type: String
    },
    phoneNumber:{
        type: Number
    },
    course:{
        type: String
    },
    address:{
        type: String
    },
    password:{
        type:String
    }


})

module.exports=mongoose.model("student",studentModel)

 