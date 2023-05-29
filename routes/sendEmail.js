import express from 'express'
import {createTransport} from'nodemailer'


const router = express.Router()
//Configurazione da passare a nodemailer transporter di solito è il dominio del sito, porta e cosa far inviare//
const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'sally17@ethereal.email',
        pass: 'EBkqq5TqmCFUyr4GZT'
    }
});

router.post('/sendMail', (req,res)=>{
    const {subject, message} = req.body
    const mailOptions = {
        from:'admin@epicodetest.it',
        to: 'ciao@gmail.com',
        subject,
        message
    }
    //Codice che si può riutilizzare nelle rotte scelte//
    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.error('Email non inviata')
            res.status(500).send('Email non inviata')
        }
        res.status(200).send('Email inviata correttamente')
    })
})

export default router