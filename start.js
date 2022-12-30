const express = require('express')
const bodyParser = require('body-parser')
const mailer = require('./nodemailer')
const conf=require('./config')

const app = express()

app.use(express.static(__dirname+'/assets'));
app.use(bodyParser.urlencoded({ extended: false }))
app.post('/', (req, res) => { 
    const message = {        
        from: req.body.email,
        to: conf.auth.user,
        subject: 'Заявка на консультацию',
        text: `
        Имя клиента: ${req.body.name}
        Телефон: ${req.body.phone}
        Ситуация: ${req.body.text}`
    }
    mailer(message) 
    res.redirect('/') 
})
app.get('/', (req, res) => { 
    return res.sendFile(__dirname + '/index.html')   
})
const PORT = process.env.PORT||5000;

app.listen(PORT, () => console.log(`server listening at port ${PORT}`))