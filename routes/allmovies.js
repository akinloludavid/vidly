const express = require('express')
const router = express.Router()
const movies = require('../data/database.json')
router.get('/', (req, res) => {
  res.send(movies)
})

router.get('/:id', (req, res) => {

  let movie = movies.find(item => item.id === parseInt(req.params.id))
  if (!movie) res.status(400).send('No movie match such id')
  res.send(movie)

})

router.post('/', (req, res) => {
  const schema = Joi.object({
    title: Joi.string().min(10).required()
  })
  const result = schema.validate(req.body)
  if (result.error) {
    return res.status(400).send(result.error.details[0].message)
  }
  let movie = {
    id: movies.length + 1,
    title: req.body.title
  }

  movies.push(movie)
  res.send(movie)
})

router.put('/:id', (req, res) => {
  let movie = movies.find(item => item.id === parseInt(req.params.id))
  if (!movie) res.status(400).send('No movie match such id')
  const schema = Joi.object({
    name: Joi.string().min(10).required(),
    genre: Joi.string().min(3).required()
  })
  const result = schema.validate(req.body)
  if (result.error) {
    return res.status(400).send(result.error.details[0].message)
  }
  movie.name = req.body.name
  movie.genre = req.body.genre
  res.send(movie)
})

router.patch('/:id')

router.delete('/:id', (req, res) => {
  let movie = movies.find(item => item.id === parseInt(req.params.id))
  if (!movie) res.status(400).send('No movie match such id')
  let index = movies.indexOf(movie)
  movies.splice(index, 1)
  res.send(movies)
})


module.exports =router

