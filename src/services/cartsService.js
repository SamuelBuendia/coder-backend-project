import {
  getAll,
  getById,
  save,
  update,
  deleteById,
  saveCart,
  getProductsByIdCart,
  saveProductInCart,
  deleteProductByIdCart,
  deleteAll
} from '../daos/cartsDao.js'

import sendEmailCart from '../components/email/EmailCart.js'
import sendMensajeTwilio from '../components/twilioSMS.js'

async function createCart() {
  const cart = await saveCart()
  return cart
}

async function deleteCart(id) {
  const cart = await deleteById(id)
  return cart
}

async function obtainProductsInCart(id) {
  const products = await getProductsByIdCart(id)
  return products
}

async function createProductInCart(productId, cartId) {
  const product = await saveProductInCart(productId, cartId)
  return product
}

async function deleteProductsInCart(cart, product) {
  const products = await deleteProductByIdCart(cart, product)
  return products
}

async function deleteProductInCart(user) {
  const msjSMS = {
    number: `+${user.country_code}${user.mobile}`,
    body: 'Su pedido ha sido recibido y se encuentra en proceso!',
    desde: '+19036008221'
  }
  const msjWhatsap = {
    number: `whatsapp:+${user.country_code}${user.mobile}`,
    body: `Nuevo pedido de ${user.firstName} desde ${user.email}`,
    desde: 'whatsapp:+14155238886'
  }
  sendMensajeTwilio(msjSMS)
  sendMensajeTwilio(msjWhatsap)
  sendEmailCart(
    `Nuevo pedido de ${user.firstName} desde ${user.email}`,
    await getProductsByIdCart(1)
  )

  // le pasa el Id del carro a borrar
  const products = await deleteAll(1)
  return products
}

export {
  createCart,
  deleteCart,
  obtainProductsInCart,
  createProductInCart,
  deleteProductInCart,
  deleteProductsInCart
}
