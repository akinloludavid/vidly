const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const Joi = require('joi')


const movieSchema = new mongoose.Schema({
  title: String,
  genre: String,
  rating: Number
})

const Moviedb = mongoose.model('Movies', movieSchema)


router.get('/', async (req, res) => {
  const movies = await Moviedb.find()
  res.send(movies)
})

router.get('/:id', async (req, res) => {
  const movie = await Moviedb.findById(req.params.id)
  if (!movie) res.status(400).send('No movie match such id')
  res.send(movie)

})

router.post('/', async (req, res) => {
  const schema = Joi.object({
    title: Joi.string().min(4).required(),
    genre: Joi.string().min(4).required(),
    rating: Joi.number
  })
  const result = schema.validate(req.body)
  if (result.error) {
    return res.status(400).send(result.error.details[0].message)
  }
  let movie = new Moviedb({
    title: req.body.title,
    genre: req.body.genre
  })

  movie = await movie.save()
  res.send(movie)
})

router.put('/:id', async (req, res) => {
  let movie = await Moviedb.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    genre: req.body.genre,
  }, {
    new: true
  })
  if (!movie) res.status(400).send('No movie match such id')
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    genre: Joi.string().min(3).required()
  })
  const result = schema.validate(req.body)
  if (result.error) {
    return res.status(400).send(result.error.details[0].message)
  }
  const mov = await movie.save()
  res.send(mov)
})



router.delete('/:id', async (req, res) => {
  const movie = await Moviedb.deleteOne({
    _id: req.params.id
  })
  if (!movie) res.status(400).send('No movie match such id')
  res.send(movie)
})


module.exports = router
