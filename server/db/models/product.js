const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  pictureURL: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: 'https://www.dia.org/sites/default/files/No_Img_Avail.jpg',
  },
  rating: {
    type: Sequelize.INTEGER,
    validate: {
      max: 5,
      max: 0,
    },
  },
  stock: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
    },
  },
});

module.exports = Product;
