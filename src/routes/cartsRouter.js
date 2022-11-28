import { Router } from 'express'

const cartsRouter = Router()

import {
  postCartController,
  deleteCartController,
  getProductsCartController,
  saveProductCartController,
  deleteProductCartController,
  deleteProductsCartController
} from '../controllers/cartsController.js'

cartsRouter.post('/', postCartController)
cartsRouter.delete('/:id', deleteCartController)
cartsRouter.get('/:id/productos', getProductsCartController)
cartsRouter.post('/:id/productos', saveProductCartController)
cartsRouter.delete('/:id/productos/:id_prod', deleteProductCartController)
cartsRouter.post('/:id/finalize-purchase', deleteProductsCartController)

export default cartsRouter
