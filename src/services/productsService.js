import {
  getAll,
  save,
  getById,
  update,
  deleteById
} from '../daos/productsDao.js'

async function obtainData() {
  return await getAll()
}

async function createData(dato) {
  await save(dato)
  return dato
}

async function obtainDataById(dato) {
  return await getById(dato)
}

async function putData(id, dato) {
  const dataUpdate = await update(id, dato)
  return dataUpdate
}

async function deleteData(dato) {
  await deleteById(dato)
  return dato
}

export { obtainData, createData, obtainDataById, putData, deleteData }
