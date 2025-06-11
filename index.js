const express = require('express')
const cors = require('cors')
require("dotenv").config()



const app = express()
app.use(cors({
    origin: ["*"]
}))



app.listen(process.env.port, () => {
    console.log(`PORT LISTEN ON ${process.env.port}`)
})