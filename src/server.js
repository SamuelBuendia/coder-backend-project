import express from 'express'
import connectDatabase from './components/DB/DatabaseConnection.js'
import 'dotenv/config'
import passport from './components/auth/Auth.js'
import logger from './components/logs/LoggerConf.js'
import MongoStore from 'connect-mongo'
import session from 'express-session'
import productsRouter from './routes/productsRouter.js'
import cartsRouter from './routes/cartsRouter.js'
import upload from './components/uploadMulterConf.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/static', express.static('public'))

const expirationTime = Number(process.env.TIEMPO_EXPIRACION)

app.use(
  session({
    secret: 'Samuel',
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: expirationTime
    },
    rolling: true,
    resave: true,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.URL_BASE_DE_DATOS })
  })
)

app.use(passport.session())
app.use(passport.initialize())

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.json({ msg: `El usuario no está autenticado` })
  }
}

// Routes
app.get('/', async (req, res) => {
  res.json({ msg: `Server ejecutandose, usa una ruta!` })
})

app.post(
  '/api/signup',
  passport.authenticate('signup', { failureRedirect: '/failsignup' }),
  function (req, res) {
    res.json({ msg: `Usuario registrado con éxito` })
  }
)

app.post(
  '/api/login',
  passport.authenticate('login', { failureRedirect: '/faillogin' }),
  function (req, res) {
    res.json({ msg: `Inicio de sesión Correcto` })
  }
)

app.post('/api/logout', checkAuthentication, (req, res) => {
  req.logout()
  res.json({ msg: `Se cerró sesión correctamente` })
})

app.post('/api/uploadAvatar', upload.single('myFile'), (req, res, next) => {
  const file = req.file
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
  console.log(file.path)
  res.send(file)
})

app.use('/api/productos', checkAuthentication, productsRouter)
app.use('/api/carrito', checkAuthentication, cartsRouter)

const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on('error', (error) => {
  console.log('Hubo un error...')
  console.log(error)
})

export default app
