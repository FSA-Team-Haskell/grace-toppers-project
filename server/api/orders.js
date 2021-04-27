const router = require("express").Router();
const { Product , Order , Cart } = require("../db");
const { requireToken } = require("./gatekeepingMiddleware");

router.get('/', requireToken, async(req, res,next) => {
  try {
    const userId = req.user.id;
    const orders = await Order.findAll({
        where: {
            userId: userId,
        },
        include: [{model: Cart, include: Product}]
    })
    res.send(orders);
  } catch (error) {
      
  }
})

module.exports = router
