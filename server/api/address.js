const router = require("express").Router();
const { Address , User } = require("../db");
const { requireToken } = require("./gatekeepingMiddleware");

router.get('/', requireToken, async(req, res,next) => {
  try {
    const userId = req.user.id;
    const addresses = await Address.findAll({
        where: {
            userId: userId,
        }
    })
    res.send(addresses);
  } catch (error) {
      
  }
})

module.exports = router
