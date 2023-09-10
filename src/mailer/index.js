const nodemailer = require('nodemailer')
const config = require('../config')

module.exports.sendMail = (to, subject, message) => {
    const transporter = nodemailer.createTransport({
        service: config.mail.service,
        auth: {
            user: config.mail.user,
            pass: config.mail.pass,
        },
    })
    const options = {
        from : config.mail.from, 
        to, 
        subject, 
        text: message
    }
    transporter.sendMail(options, (error, info) =>{
        if(error) console.log(error)
        else console.log(`
            ======================================================
            code sent to email: ${to}, ${new Date().toISOString()}
            =======================================================
        `)
    })
}