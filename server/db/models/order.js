const Sequelize = require('sequelize')
const db = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const Order = db.define('order', {
    date: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    totalCost: {
        type: Sequelize.INTEGER,
    }
  })

  module.exports = Order;
