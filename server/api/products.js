const router = require("express").Router();
const { Product } = require("../db");
const { requireToken, isAdmin } = require("./gatekeepingMiddleware");
// GET api/products/
router.get("/", requireToken, async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (error) {
    next(error);
  }
});

// GET api/products/:id  // getting a single hat
router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.findByPk(id);
    res.send(product);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
