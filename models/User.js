const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  phone: {type: String},
  manager: {type: String},
  requests: [{ type: Types.ObjectId, ref: 'Fav' }]
})

module.exports = model('User', schema)
