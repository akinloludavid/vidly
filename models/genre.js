const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
  title: String,
  genre: String,
  rating: Number
})

const Moviedb = mongoose.model('Movies', movieSchema)
module.exports = Moviedb;