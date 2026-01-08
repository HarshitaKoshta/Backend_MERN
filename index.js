// let fs = require('fs')
// fs.writeFileSync('index.txt','hello')

// let data = fs.readFileSync("index.txt")
// console.log(data.toString());

// fs.appendFileSync("index.txt","hello")
// fs.unlinkSync('index.txt')


// let os = require('os')
// console.log(os.freemem());
// console.log(os.homedir());
// console.log(os.hostname());
// console.log(os.machine());
// console.log(os.version());


// let express = require('express')
// let app = express()
// app.use(express.json())
// app.use('/', (req, res, next) => {
//   res.send("main ni jane dunga");
//   next()
// })

// app.get('/', (req, res) => {
//   res.send("heloo backend");
// })


// let arr = ['astha','vansi','vansi','astha']
// app.get('/:name',(req,res)=>{
//     let {name} = req.params

//     let data = arr.filter((a)=>{
//       return a == name
//     })
//     res.send(data)
// })


// let arr = ['astha updh','vansi','vansi','astha']
// app.get('/search',(req,res)=>{
//     let {fName,lName} = req.query
//     // console.log(`firstName: ${fName} lastName: ${lName}`);
//     res.send(`firstName: ${fName} lastName: ${lName}` )
    
// }) 

// app.post('/data',(req,res)=>{
//     let val = req.body
//     console.log(val);
    
// })

// let express = require('express')
// let mongoose = require('mongoose')
// let app = express()

// mongoose.connect("mongodb://127.0.0.1:27017/MERN_BACKEND").
// then(()=>{
//   console.log("db......");
// })
// app.get('/',(req,res)=>{
//     res.send("hello")
// })

// app.listen(4000,()=>{
//     console.log("server running on port no 4000");
// })





//  let express=  require('express')
//  let mongoose=      require('mongoose')
//  const Otp = require('./Otp')

//   let User=    require('./index')
//   let bcrypt=    require('bcrypt')
//   const sendOtp = require('./twilioService')


//  let app=     express()
//  app.use(express.json())
//  mongoose.connect("mongodb://127.0.0.1:27017/MERN_BACKEND").
//  then(()=>{
//     console.log("db connected...");
//  })


//  app.get('/',(req,res)=>{
//     res.send("hiii")

//  })
//  app.post('/create',  async(req,res)=>{
//       let {userName,email,passWord}=   req.body
//       console.log(userName,email ,"heheh");
      
//      let user=     await  User.findOne({email})
//      console.log(user,"hiiii");
     
//      if(user){
//         res.send("user jinda haiii")
//      }
//         let updatedP =  await  bcrypt.hash(passWord,10)
//         console.log(updatedP,"HEH");
         
//         let userData=   new  User({
//             userName,
//             email,
//             passWord:updatedP
//          })
//          await userData.save()
//          res.send("account ban gya hai....")  
            
//  })

//  app.post("/login",async(req,res)=>{
//     let {email,passWord}=   req.body

//        let userInfo=    await User.findOne({email})
//        console.log(userInfo,"kyaa milegaaaaaaaa");
       
//        if(!userInfo){
//          res.send("user not found")
//        }else{
//         let validPass=   await bcrypt.compare(passWord,userInfo.passWord,)
//         if(validPass){
//          res.send("login ho gyaa")
//         }else{
//          res.send("pass sahi nhi haiiii")
//         }
//        }
// })


// app.post('/send-otp',async(req,res)=>{
//    const {phoneNumber} = req.body;
//    const otp = Math.floor(100000 + Math.random() * 900000 )
//    const expiresAt = new Date(Date.now() + 1 * 60 *1000)
//    try{
//       await sendOtp(phoneNumber,otp)

//       const newOtp = new Otp({
//          phoneNumber,
//          otp,
//          expiresAt:expiresAt.toString()
//       })
//       await newOtp.save()
//       res.status(200).sendStatus({message:'otp sent successfully', otp})
//    }catch(error){
//       res.status(500).send({error: 'Failes to send OTP'})
//    }
// });

//  app.post('./verify',async(req,res)=>{
//    const{otp} = req.body;
//    try{
//       const otpRecord = await Otp.findOne({otp})

//       if(!otpRecord){
//          return res.status(400).send({error:'Invalid OTP'})
//       }

//       const currentTime = new Date()
//       if(currentTime > otpRecord.expiresAt){
//          return res.status(400).send({error:'OTP has expired'})
//       }
//       res.status(400).send({error:'OTP has sent successfully'})

//       await Otp.deleteOne({_id: otpRecord._id})
//    }catch(error){
//       console.error(error);
//       res.status(500).send({error:'failed to verify'})  
//    }
//  })
  
//  app.listen(4000,()=>{
//     console.log("server running on port no 4000");
    
//  })

//////////////////----------Signup--Login--forgot--reset------------//////////////////////

 let express= require('express')
 let mongoose=     require('mongoose')
let User=    require('./user')
let bcrypt=    require('bcrypt')
let jwt=    require('jsonwebtoken')
let crypto = require("crypto")
let {sendEmail} = require('./SendEmail')
  let app=     express()
  const cors = require('cors')
  app.use(cors())
app.use(express.json())
app.post('/forgot-pass',async(req,res)=>{
  const {email} = req.body;

  app.post('/reset-password/:token',async(req,res)=>{
    const {token} = req.params;
    const {newPassword} = req.body

    try{
      const user = await User.findOne({
        resetToken : token,
        resetTokenExpiry : {$gt:Date.now()},
      });

      if(!user){
        return res.status(400).send('Invalid or expired token')
      }

      const hashedPassword = await bcrypt.hash(newPassword,10);
      user.passWord = hashedPassword;
      user.resetToken = undefined;
      user.resetTokenExpiry = undefined;
      await user.save()

      res.status(200).send('Password reset successfully')
    }catch(error){
      res.status(500).send('Error resetting password'+error.message);
    }
  })

  try{
    const user = await User.findOne({email});
    if(!user){
      return res.status(400).send('User not found')
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 3600000;
    await user.save()
    const resetUrl = `http://localhost:5173\reset`
    // const resetUrl = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`
     await sendEmail(
       user.email,
      'Password Reset Request',
      `Click the link below to reset your password:\n\n${resetUrl}`
    );
    res.status(200).send('Password reset email sent')
  }catch(error){
    res.status(500).send("error sending password reset email"+error.message)
  }
})

 mongoose.connect("mongodb://127.0.0.1:27017/MERN_BACKEND").
  then(()=>{
   console.log("db....");
  })
  app.use(express.json())

  app.get('./',(req,res)=>{
   res.send("hello..")
  })

  app.post('/create',  async(req,res)=>{
      let {userName,email,passWord,role}=   req.body
      console.log(userName,email ,"heheh");
      
     let user=     await  User.findOne({email})
     console.log(user,"hiiii");
     
     if(user){
        res.send("user jinda haiii")
     }
         let updatedP=     await  bcrypt.hash(passWord,10)
         console.log(updatedP,"HEH");
         
        let userData=   new  User({
            userName,
            email,
            passWord:updatedP,
            role:role||'user'
         })
         await userData.save()
         res.send("account ban gya hai....")   
 })

  app.post("/login",async(req,res)=>{
    let {email,passWord}=   req.body
    console.log(email,passWord);
    
       let userInfo=    await User.findOne({email})
       console.log(userInfo,"kyaa milegaaaaaaaa");
       
       if(!userInfo){
         res.send("user not found")
       }else{
        let validPass=   await bcrypt.compare(passWord,userInfo.passWord,)
        if(validPass){
         let token = jwt.sign({  email: userInfo.email, role: userInfo.role }, "JHBFIUWBFIUWB");
         console.log(token,"tokennnnn");
         
         res.send("login ho gyaa")
        }else{
         res.send("pass sahi nhi haiiii")
        }
       }
 })

      
 function checkRole(role){
   return (req,res,next)=>{
      let token = req.headers.authorization;
      if (!token) {
         return res.send('Unauthorizeddd User ||');
     }else{
      let deCodedToken = jwt.verify(token,  "JHBFIUWBFIUWB");

      if (role!==deCodedToken.role) {
         return res.send('Access denieddd ||')
     }
     else {
         next();
      }}

   }
 }

  app.get('/public',(req,res)=>{
   res.send("isko koi bhi dekh sakta hai")

  })
  app.get('/private', checkRole('admin') , (req,res)=>{
   res.send("404......")

  })
  app.listen(4000,()=>{
   console.log("server running on port no 4000");
})