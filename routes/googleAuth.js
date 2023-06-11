import express from 'express'

const router = express.Router()

import Authenticator from 'passport'
import dotenv from 'dotenv'
import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import session from 'express-session'

dotenv.config()

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL

passport.use(
    new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: GOOGLE_CALLBACK_URL
    }, (accessToken, refreshToken, profile, done) => {
        console.log(profile)
        return done(null, profile)
    })
)

//route autentificazione google
router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }))

//callback Url dopo l'autentificazione
router.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/success')
    }
)

//route per accesso alle risolse protette
router.get('/protected', (req, res) => {
    if (req.isAuthenticated()) {
        res.send('Accesso consentito')
    }
    res.redirect('/auth/google')
})

export default router