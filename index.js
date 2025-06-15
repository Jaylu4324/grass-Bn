const express = require('express')
const cors = require('cors')
const cookieParse=require("cookie-parser")
require("dotenv").config()
require("./dbConfig")

const masterAdminRoutes=require("./routes/masterAdminRoutes")

const app = express()
app.use(cors({
    origin: ["*"]
}))
app.use(cookieParse())
app.use(express.json())
app.use("/masterAdmin",masterAdminRoutes)



app.listen(process.env.port, () => {
    console.log(`PORT LISTEN ON ${process.env.port}`)
})