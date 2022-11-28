import mongoose from 'mongoose'

let productsSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  codigo: { type: Number, required: true },
  foto: { type: String, required: true },
  precio: { type: Number, required: true },
  stock: { type: Number, required: true }
})

let Product = mongoose.model('productos', productsSchema)

export default Product
