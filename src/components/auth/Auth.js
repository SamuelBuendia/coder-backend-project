import passport from 'passport'
import LocalStrategy from 'passport-local'
import bCrypt from 'bcrypt'
import User from '../../models/UserModels.js'
import sendEmailAdmin from '../email/EmailSignUp.js'

const LocalStrategys = LocalStrategy.Strategy

passport.use(
  'signup',
  new LocalStrategys(
    {
      passReqToCallback: true,
      usernameField: 'email'
    },
    (req, email, password, done) => {
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          console.log('Error in SignUp: ' + err)
          return done(err)
        }

        if (user) {
          console.log(user)
          console.log('User already exists')
          return done(null, false)
        }

        const newUser = {
          email: email,
          password: createHash(password),
          // email: req.body.email,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          address: req.body.address,
          date_of_birth: req.body.date_of_birth,
          country_code: req.body.country_code,
          mobile: req.body.mobile,
          avatar: req.body.avatar
        }

        User.create(newUser, (err, userWithId) => {
          if (err) {
            console.log('Error in Saving user: ' + err)
            return done(err)
          }

          console.log(user)
          console.log('User Registration succesful')

          //Eviar Mail al Admin
          sendEmailAdmin(newUser)
          return done(null, userWithId)
        })
      })
    }
  )
)

// Passport Iniciar Sesion
passport.use(
  'login',
  new LocalStrategys(
    {
      usernameField: 'email'
    },
    (email, password, done) => {
      User.findOne({ email }, (err, user) => {
        if (err) return done(err)

        if (!user) {
          console.log('User Not Found with email ' + email)
          return done(null, false)
        }

        if (!isValidPassword(user, password)) {
          console.log('Invalid Password')
          return done(null, false)
        }

        return done(null, user)
      }).lean()
    }
  )
)

function isValidPassword(user, password) {
  return bCrypt.compareSync(password, user.password)
}

function createHash(password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null)
}

passport.deserializeUser((id, done) => {
  User.findById(id, done)
})

passport.serializeUser((user, done) => {
  done(null, user._id)
})

export default passport
