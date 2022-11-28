import {
  obtainData,
  createData,
  obtainDataById,
  putData,
  deleteData
} from '../services/productsService.js'

async function getProductController(req, res) {
  const data = await obtainData()
  res.json(data)
}

async function postProductController(req, res) {
  const data = req.body
  await createData(data)
  res.status(201).json(data)
}

async function getProductByIdController(req, res) {
  const data = req.params.id
  const product = await obtainDataById(data)
  res.status(201).json(product)
}

async function putProductController(req, res) {
  const id = req.params.id
  const data = req.body
  const dataUpdate = await putData(id, data)
  res.status(201).json(dataUpdate)
}

async function deleteProductController(req, res) {
  const data = req.params.id
  await deleteData(data)
  res.status(201).json(data)
}

export {
  getProductController,
  postProductController,
  getProductByIdController,
  putProductController,
  deleteProductController
}
