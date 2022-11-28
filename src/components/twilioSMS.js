import twilio from 'twilio'

const accountSid = 'ACf2375f14ac666b1e7fe0b82cc94e06'
const authToken = 'fdef59a201c7cc41cd2cde69779086'

const client = twilio(accountSid, authToken)

const sendMensajeTwilio = async (obj) => {
  const options = {
    body: obj.body,
    from: obj.desde,
    to: obj.number
  }

  try {
    const message = await client.messages.create(options)
    return 'SMS Enviado'
  } catch (error) {
    console.log(error)
  }
}

export default sendMensajeTwilio
