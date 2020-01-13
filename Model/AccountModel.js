let mongoose = require('mongoose')
let accountSchema = new mongoose.Schema({
  username : String,
  password :String,
  email :String
})
module.exports = mongoose.model('Account', accountSchema)