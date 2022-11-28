let Session = Session({
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

export default session
