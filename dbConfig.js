const mongoose=require("mongoose")
mongoose.connect(process.env.mongodb_connection_string).then(()=>{
console.log("Db Connected Succesfully")
}).catch((error)=>{
console.log(`Error while Connecting Database ${error}`)
})