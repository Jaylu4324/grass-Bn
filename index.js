const express = require('express')
const cors = require('cors')
const cookieParse=require("cookie-parser")
require("dotenv").config()
require("./dbConfig")

const masterAdminRoutes=require("./routes/masterAdminRoutes")
const studentRoutes=require("./routes/StudentRoutes")
const quizRouters = require("./routes/quizRoutes")


const app = express()

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(cookieParse())
app.use(express.json())
app.use("/masterAdmin",masterAdminRoutes)
app.use("/student",studentRoutes)
app.use("/quiz",quizRouters)




app.listen(process.env.port, () => {
    console.log(`PORT LISTEN ON ${process.env.port}`)
})