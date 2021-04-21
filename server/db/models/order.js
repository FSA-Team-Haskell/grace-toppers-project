const Sequelize = require('sequelize')
const db = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const Order = db.define('order', {
    date: {
      type: Sequelize.DATE,
    },
    totalCost: {
        type: Sequelize.INTEGER,
    }
  })

  module.exports = Order;