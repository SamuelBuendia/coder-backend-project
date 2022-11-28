import mongoose from 'mongoose'
import app from '../../server.js'
import 'dotenv/config'

var DBConect = false

function connectDB(url, cb) {
  mongoose.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      if (!err) {
        DBConect = true
      }
      if (cb != null) {
        cb(err)
      }
    }
  )
}

connectDB(process.env.URL_BASE_DE_DATOS, (err) => {
  if (err) return console.log('error en conexión de base de datos', err)
  console.log('BASE DE DATOS CONECTADA')

  app.use(async (req, res) => {
    res
      .status(404)
      .json({ error: `ruta ${req.url} método ${req.method} no implementada` })
  })
})

export default {}
