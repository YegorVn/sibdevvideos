const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  value: {type: String},
  name: {type: String, required: true, unique: true},
  quantity: {type: String},
  videos: [],
  owner: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('Fav', schema)
