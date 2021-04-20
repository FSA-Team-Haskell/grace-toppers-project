const Sequelize = require('sequelize')
const db = require('../db')


const Product = db.define('product',{
  title:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  description:{
    type: Sequelize.STRING,
    allowNull: false
  },
  price:{
    type: Sequelize.FLOAT,
    allowNull: false,
    validate:{
      min: 0
    },
  },
  pictureURL:{
    type: Sequelize.TEXT,
    allowNull: false
  },
  rating:{
    type: Sequelize.INTEGER,
    validate:{
      max: 5,
      max: 0
    }
  },
  quantity:{
    type: Sequelize.INTEGER,
    validate:{
      min: 0
    }
  }
})

module.exports = Product
