const express = require('express')
const router = express.Router();
const Joi = require('joi')
const Customerdb = require('../models/customer')


router.get('/', async (req, res) => {
  const customers = await Customerdb.find()
  res.send(customers)
})

router.get('/:id', async (req, res) => {
  const customer = await Customerdb.findById(req.params.id)
  if (!customer) res.status(400).send('No customer match such id')
  res.send(customer)

})

router.post('/', async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(4).required(),
    isGold: Joi.boolean(),
    phone: Joi.number()
  })
  const result = schema.validate(req.body)
  if (result.error) {
    return res.status(400).send(result.error.details[0].message)
  }
  let customer = new Customerdb({
    name: req.body.name,
    isGold: req.body.isGold,
    phone:req.body.phone
  })

  customer = await customer.save()
  res.send(customer)
})

router.put('/:id', async (req, res) => {
  let customer = await Customerdb.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    isGold: req.body.isGold,
    phone:req.body.phone
  }, {
    new: true
  })
  if (!customer) res.status(400).send('No customer match such id')
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
      isGold: Joi.boolean(),
        phone: Joi.number()
  })
  const result = schema.validate(req.body)
  if (result.error) {
    return res.status(400).send(result.error.details[0].message)
  }
  const mov = await customer.save()
  res.send(mov)
})



router.delete('/:id', async (req, res) => {
  const customer = await Customerdb.deleteOne({
    _id: req.params.id
  })
  if (!customer) res.status(400).send('No customer match such id')
  res.send(customer)
})


module.exports = router
