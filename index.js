const http = require('http')
const fs = require('fs')
const express = require('express')
const app = express()
const customer = require('./routes/customers')
const genre = require('./routes/genres')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/vidlyapp')
  .then(() => console.log('Connected to DB'))
  .catch((err) => console.log('Error in database connection', err))


app.use(express.json())
app.use('/customers', customer)
app.use('/genres', genre)
const port = process.env.PORT || 4500

app.listen(port, ()=>{
  console.log(`Server fired on port ${port}`)
})