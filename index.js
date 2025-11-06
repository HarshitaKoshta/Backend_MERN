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


let express = require('express')
let app = express()
// app.use('/', (req, res, next) => {
//   res.send("main ni jane dunga");
//   next()
// })

// app.get('/', (req, res) => {
//   res.send("heloo backend");
// })
app.listen(4000,()=>{
    console.log("server running on port no 4000");
})


// let arr = ['astha','vansi','vansi','astha']
// app.get('/:name',(req,res)=>{
//     let {name} = req.params

//     let data = arr.filter((a)=>{
//       return a == name
//     })
//     res.send(data)
// })


let arr = ['astha updh','vansi','vansi','astha']
app.get('/search',(req,res)=>{
    let {fName,lName} = req.query
    // console.log(`firstName: ${fName} lastName: ${lName}`);
    res.send(`firstName: ${fName} lastName: ${lName}` )
    
}) 