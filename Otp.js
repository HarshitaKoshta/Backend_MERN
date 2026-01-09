const mongoose =  require('mongoose')
const optSchema = new mongoose.Schema({
    phoneNumber: {type:String, required:true},
    otp: {type:String ,required: true},
    expiresAt : {type: Date ,required: true ,index:{expires: '1m'}},
});
const Otp = mongoose.model('Otp',optSchema)
module.exports = Otp;