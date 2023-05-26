
import mongoose from 'mongoose'
import { Schema, model } from "mongoose"

const UserSchema = new mongoose.Schema ({
    firstname: {
        type: String,
required: true,
max: 255
    },

    lastname: {
        type: String,
        required: true
    },


    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        required: false,
        default: 0
    },
}, {
    //opzione timestamps: quando utente salva i dati immessi si aggiorna le date di creazione ed aggiornamento ed opzione strict: accetta solo i dati che abbiamo richiesto
    timestamps: true,
    strict: true
})

const UserModel = model("User", UserSchema, "users");

export default UserModel