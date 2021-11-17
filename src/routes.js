const express = require('express').Router()

express.get('/', (req, res) => {
  res.render('./index.ejs')
})

module.exports = express
