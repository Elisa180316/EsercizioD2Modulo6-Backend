import express from "express";
// import GitHubStrategy from "passport-github2";
// import {Strategy as GithubStrategy} from 'passport-github2'
import { Strategy as GitHubStrategy } from "passport-github2"
import passport from "passport";
import session from "express-session";
import dotenv from "dotenv";

const router = express.Router();

dotenv.config()

router.use(
  session({
    secret: process.env.GITHUB_CLIENT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
//middleware//
router.use(passport.initialize());
router.use(passport.session());
//serializzazione dati da ricevere e non ricevere//
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
   console.log(user)
  done(null, user);
});

//strategia accesso con GH//
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,

    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile)
      return done(null, profile);
    }
  )
);


//GET//
router.get(
  '/auth/github',
  passport.authenticate('github', { scope: ['user: email'] }), (req, res) => {
    console.log(req.user)
    res.send(req.user)
  });
//Caso di successo//
router.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/success');
  }
);

router.get('/success', (req, res) => {
   if (req.user) {
    const username = req.user.username;
    res.send (`Welcome back, ${username}!`)
   } else {
    res.send('Please login first.');
   }
  res.redirect('http://localhost:3000/home');
});

export default router;
