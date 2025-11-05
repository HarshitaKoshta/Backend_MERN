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
app.use('/', (req, res, next) => {
  res.send("main ni jane dunga");
  next()
})

app.get('/', (req, res) => {
  res.send("heloo backend");
})
app.listen(4000,()=>{
    console.log("server running on port no 4000");
})