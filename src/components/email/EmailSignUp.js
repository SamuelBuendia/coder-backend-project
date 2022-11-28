import nodemailer from 'nodemailer'

const emailAdmin = 'sbuendiapuyo@gmail.com'
const asunto = 'Nuevo Registro'

const sendEmailAdmin = (user) => {

    let htmlEmail = `
    <head>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    </head>

    <div class="col-6 mx-auto">

        <h2>Se registró un nuevo usuario</h2>
        <h3>Datos del Usuario</hh3

        <div>
            <strong> Primer Nombre:  </strong> ${user.firstName}
        </div>
        <div>
            <strong> Apellido: </strong> ${user.lastName}
        </div>
        <div>
            <strong> Correo: </strong> ${user.email}
        </div>
        <div>
            <strong> Dirección: </strong> ${user.address}
        </div>
        <div>
            <strong> Fecha de Nacimiento: </strong> ${user.date_of_birth}
        </div>
        <div>
            <strong> Código Pais: </strong> ${user.country_code}
        </div>
        <div>
            <strong> Celular: </strong> ${user.mobile}
        </div>
        <div>
            <strong> Avatar: </strong>  ${user.avatar}
        </div>            
    </div> `

    const transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com',
        port: 465,
        auth: {
            user: 'samuelb@gmail.com',
            pass: ''
        }
    });
    
    const mailOptions = {
        from: 'Backend Coder House<samuelb@gmail.com>',
        to: [emailAdmin],
        sender: 'BackendCoderHouse',
        // replyTo: req.body.email,
        subject: asunto,
        // text: req.body.message,
        html: htmlEmail,
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            res.json({message: "Error al enviar el mensaje"})
        } else {
            console.log('Email sent: ' + info.response);
            res.json({message: "Mensaje Enviado con Éxito!"})
        }
    });
}

export default sendEmailAdmin