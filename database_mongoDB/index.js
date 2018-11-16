const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shoeSchema = new Schema({
  shoeId: Number,
  name: String,
  relImageUrls: Array
});

const Shoe = mongoose.model('Shoe', shoeSchema);
