
import mongoose from 'mongoose'
import { Schema, model } from "mongoose"

const UserSchema = new mongoose.Schema ({
    username: {
        type: String,
        required: true,
        max: 30
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }
}, {
    //timestamps: quando utente salva i dati immessi si aggiorna le date di creazione ed aggiornamento e strict: accetta solo i dati che abbiamo richiesto
    timestamps: true,
    strict: true
})

const UserModel = model("User", UserSchema, "users");

export default UserModel