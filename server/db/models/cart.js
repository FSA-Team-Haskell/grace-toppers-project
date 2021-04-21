const Sequelize = require('sequelize')
const db = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const Cart = db.define('cart', {
    isPurchased: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
    }
  })

  module.exports = Cart;