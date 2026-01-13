let mongoose= require('mongoose')
const { data } = require('react-router-dom')

let userSchema= mongoose.Schema({
    userName:{
        type:String

    },
    email:{
        type:String
    },
    passWord:{
        type:String
    },
    role: {
        type: String,
        enum: ["user", "admin", "instructor"],
        default: "user"
    },
    resetToken:String,
    resetTokenExpiry:Date
})


   let User=   mongoose.model("user",userSchema)

   module.exports=User

//    fgwp yolx zanf nkwh