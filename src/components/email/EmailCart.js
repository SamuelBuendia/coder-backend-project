import nodemailer from 'nodemailer'

const emailAdmin = 'sbuendiapuyo@gmail.com'

const sendEmailCart = (asunto, obj) => {
  let content = ''

  obj.forEach((element) => {
    content =
      content +
      `
        <div class="">
            <div>
                <strong> Nombre:  </strong> ${element.nombre}
            </div>
            <div>
                <strong> Descripción:  </strong> ${element.descripcion}
            </div>
            <div>
                <strong> Código:  </strong> ${element.codigo}
            </div>
            <div>
                <strong> Precio:  </strong> ${element.precio}
            </div>
            <div>
                <strong> Stock:  </strong> ${element.stock}
            </div>
        </div>
        <br>
        `
  })

  const htmlEmail = `
        <div class="col-6 mx-auto">
            <h2>Se registró un nuevo pedido</h2>
            <h3>Productos</h3>
            ${content}
        </div>
        `
  const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465,
    auth: {
      user: 'samuelb@gmail.com',
      pass: ''
    }
  })

  const mailOptions = {
    from: 'Backend Coder House<samuelb@gmail.com>',
    to: [emailAdmin],
    sender: 'BackendCoderHouse',
    // replyTo: req.body.email,
    subject: asunto,
    // text: req.body.message,
    html: htmlEmail
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
      res.json({ message: 'Error al enviar el mensaje' })
    } else {
      console.log('Email sent: ' + info.response)
      res.json({ message: 'Mensaje Enviado con Éxito!' })
    }
  })
}

export default sendEmailCart
