import Cart from '../models/cartsModel.js'

let coleccion = Cart

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
    return { msg: `Error: ${err}` }
  }
}

const update = async (id, obj) => {
  try {
    await coleccion.findOneAndUpdate({ id: id }, { ...obj })
    return { product: 'Producto actualizado con exito' }
  } catch (error) {
    return { msg: `Error: ${err}` }
  }
}

const deleteById = async (id) => {
  try {
    await coleccion.deleteOne({ id: id })
    return { product: 'Producto eliminado con exito' }
  } catch (error) {
    return { msg: `Error: ${err}` }
  }
}

const saveCart = async (obj) => {
  try {
    let ultimoID = 0
    let estaVacio = await coleccion.find({})

    if (estaVacio != '') {
      const ultimo = await coleccion.find().sort({ _id: -1 }).limit(1)
      ultimoID = ultimo[0].id
    }

    await coleccion.create({ id: ultimoID + 1, timestamp: Date.now(), ...obj })
    return 'Carrito creado'
  } catch (err) {
    return { msg: `Error: ${err}` }
  }
}

const getProductsByIdCart = async (id) => {
  const idParse = parseInt(id)
  try {
    const arr = await this.getAll()
    const person = arr.find((p) => p.id === idParse)
    return person.products
  } catch (err) {
    return { msg: `Error: ${err}` }
  }
}

const saveProductInCart = async (obj, id) => {
  const coleccionProducts = mongoose.model('productos')

  try {
    const producto = await coleccionProducts.find({ id: obj.id }).limit(1)

    if (producto == '') {
      return 'El producto no existe'
    }

    const carrito = await coleccion.find({ id: id })

    if (carrito == '') {
      return 'El carrito no existe'
    }

    carrito[0].products.push(producto[0])

    await coleccion.findOneAndUpdate({ id: id }, { ...carrito[0] })
    return { product: 'Producto Agregado con exito' }
  } catch (err) {
    return { msg: `Error: ${err}` }
  }
}

const deleteProductByIdCart = async (id_cart, id_prod) => {
  const coleccionProducts = mongoose.model('productos')

  try {
    const carrito = await coleccion.find({ id: id_cart })
    console.log(carrito[0])

    if (carrito == '') {
      return 'El carrito no existe'
    }

    const producto = await coleccionProducts.find({ id: id_prod }).limit(1)

    if (producto == '') {
      return 'El producto no existe'
    }

    carrito[0].products = carrito[0].products.filter((p) => p.id != id_prod)
    console.log(carrito[0])

    await coleccion.findOneAndUpdate({ id: id_cart }, { ...carrito[0] })
    return { product: 'Producto elimianado con exito' }
  } catch (err) {
    return { msg: `Error: ${err}` }
  }
}

const deleteAll = async (id_cart) => {
  const idParse = parseInt(id_cart)
  return await coleccion.updateOne({ id: idParse }, { $set: { products: [] } })
}

export {
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
}
