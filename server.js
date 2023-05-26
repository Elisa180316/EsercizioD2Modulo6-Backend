import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import usersRoute from  './routes/users.js'
import loginRoute from  './routes/login.js'
import postsRoute from './routes/posts.js'
import dotenv from 'dotenv'
dotenv.config()

const PORT = 5050;

const app = express();

//middleware globali(vengono utilizzati per tutte le rotte)
app.use(express.json());
app.use(cors());//abilita il server a ricevere richieste da qualsiasi origine

//rotte
app.use('/', usersRoute)
app.use('/', loginRoute)
app.use('/', postsRoute)


mongoose.connect(process.env.DB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Errore di connessione al DB'))
db.once('open', ()=>{console.log('DB connesso correttamente')})






app.listen(PORT, ()=>console.log(`Server avviato sulla porta ${PORT}`))