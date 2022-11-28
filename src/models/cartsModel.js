import mongoose from 'mongoose'

let cartsSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  products: []
})

let Cart = mongoose.model('carritos', cartsSchema)

export default Cart
