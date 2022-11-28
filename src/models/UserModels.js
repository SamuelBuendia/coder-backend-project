import mongoose from 'mongoose'
const { Schema } = mongoose

let userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  date_of_birth: { type: Date, required: true },
  country_code: { type: Number, required: true },
  mobile: { type: Number, required: true, unique: true },
  avatar: { type: String }
})

let User = mongoose.model('Users', userSchema)

export default User
