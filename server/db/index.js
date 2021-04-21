//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Product = require('./models/product')
const Cart = require('./models/cart')
const Order = require('./models/order')

User.hasMany(Cart);
Cart.belongsTo(User);
Product.hasMany(Cart);
Cart.belongsTo(Product);
Order.hasMany(Cart);
Cart.belongsTo(Order);

module.exports = {
  db,
  User,
  Product,
  Cart,
  Order,
}
