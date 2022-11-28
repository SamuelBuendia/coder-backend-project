import Product from '../models/productsModel.js'

let coleccion = Product

const getAll = async () => {
  try {
    const content = await coleccion.find({}).lean()
    return content
  } catch (err) {
    return { msg: `Error: ${err}` }
  }
}

const getById = async (id) => {
  try {
    const buscado = await coleccion.find({ id: id }).lean()
    return buscado
  } catch (err) {
    return { msg: `Error: ${err}` }
  }
}

const save = async (obj) => {
  try {
    let ultimoID = 0
    let estaVacio = await coleccion.find({})

    if (estaVacio != '') {
      const ultimo = await coleccion.find().sort({ _id: -1 }).limit(1)
      ultimoID = ultimo[0].id
    }

    await coleccion.create({ id: ultimoID + 1, timestamp: Date.now(), ...obj })
    return 'Producto guardado con exito'
  } catch (err) {
    console.log(`Error: ${err}`)
  }
}

const update = async (id, obj) => {
  try {
    await coleccion.findOneAndUpdate({ id: id }, { ...obj })
    return { product: 'Producto actualizado con exito' }
  } catch (error) {
    console.log(`Error: ${err}`)
  }
}

const deleteById = async (id) => {
  try {
    await coleccion.deleteOne({ id: id })
    return { product: 'Producto eliminado con exito' }
  } catch (error) {
    console.log(`Error: ${err}`)
  }
}

export { getAll, getById, save, update, deleteById }
