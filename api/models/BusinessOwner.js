const mongoose = require('mongoose');
const {Schema} = mongoose;

const BusinessOwnerSchema = new Schema({
  name: String,
  email: {type: String, unique: true},
  password: String,
  businessName: String,
  businessContact: String,
  businessAddress: String,
  businessWebsite: String,
  userType: String,
  profileImg: String
});

const BusinessOwnerModel = mongoose.model('BusinessOwner', BusinessOwnerSchema);

module.exports = BusinessOwnerModel;