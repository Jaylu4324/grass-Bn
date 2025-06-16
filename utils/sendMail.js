require("dotenv").config()
const nodemailer = require("nodemailer")
const transporter = nodemailer.createTransport({
    auth: {
        user: process.env.mail,
        pass: process.env.pass
    },
    service: "gmail"
})

const sendMail = async (to, from, subject, template) => {
    try {
        let info = await transporter.sendMail({
            to,
            from,
            subject,
            html: template
        })
        if (info) {
            console.log("Email Sended Successfully")
        }
    } catch (error) {
        console.log("Error while Sending Mail", error)
    }
}

module.exports={sendMail}