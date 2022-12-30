const nodemailer = require('nodemailer')
const conf=require('./config')

const transporter = nodemailer.createTransport({
  host: conf.host,
  port: conf.port,
  auth: {
      user: conf.auth.user,
      pass: conf.auth.pass
  }
});

const mailer = message => {
    transporter.sendMail(message, (err, info) => {
        if(err) return console.log(err)
        console.log('Email sent: ', info)
    })
}

module.exports = mailer
