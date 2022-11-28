import { Router } from 'express'

const productsRouter = Router()

import {
  getProductController,
  postProductController,
  getProductByIdController,
  putProductController,
  deleteProductController
} from '../controllers/productsController.js'

const soyAdmin = true

function middlewareIsAdmin(req, res, next) {
  // hago cualquier cosa
  if (!soyAdmin) {
    res.json({
      error: 401,
      descripcion: `ruta ${req.url} método ${req.method} no autorizada`
    })
  } else {
    next()
  }
}

productsRouter.get('/', getProductController)
productsRouter.get('/:id', getProductByIdController)
productsRouter.post('/', postProductController)
productsRouter.put('/:id', putProductController)
productsRouter.delete('/:id', deleteProductController)

export default productsRouter
