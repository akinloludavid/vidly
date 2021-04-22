const http = require('http')
const fs = require('fs')
const express = require('express')
const movies = require('./data/database')
const app = express()
const Joi = require('joi')
const movieRouter = require('./routes/allmovies')

app.use(express.json())
app.use('/movies', movieRouter)
const port = process.env.PORT || 4500

app.listen(port, ()=>{
  console.log(`Server fired on port ${port}`)
})