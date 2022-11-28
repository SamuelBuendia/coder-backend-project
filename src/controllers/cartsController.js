import {
  createCart,
  deleteCart,
  obtainProductsInCart,
  createProductInCart,
  deleteProductInCart,
  deleteProductsInCart
} from '../services/cartsService.js'

async function postCartController(req, res) {
  const cart = await createCart()
  res.json(cart)
}

async function deleteCartController(req, res) {
  const cart = req.params.id
  const response = await deleteCart(cart)
  res.json(response)
}

async function getProductsCartController(req, res) {
  const cartID = req.params.id
  const products = await obtainProductsInCart(cartID)
  res.json(products)
}

async function saveProductCartController(req, res) {
  const product = req.body
  const cart = req.params.id
  const response = await createProductInCart(product, cart)
  res.json(response)
}

async function deleteProductCartController(req, res) {
  const cart = req.params.id
  const product = req.params.id_prod
  const response = await deleteProductsInCart(cart, product)
  res.json(response)
}

async function deleteProductsCartController(req, res) {
  const cart = req.user
  const product = await deleteProductInCart(cart)
  res.json(product)
}

export {
  postCartController,
  deleteCartController,
  getProductsCartController,
  saveProductCartController,
  deleteProductCartController,
  deleteProductsCartController
}
