const router = require("express").Router();
const { Product } = require("../db");
const { requireToken, isAdmin } = require("./gatekeepingMiddleware");

// GET api/products/
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.send(products);
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

// DELETE api/products/:id
router.delete("/:id", requireToken, isAdmin, async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.findByPk(id);
    const deletedProduct = await product.destroy();
    res.status(204);
  } catch (error) {
    console.log("delete product ERROR-->", error);
    next(error);
  }
});

// PUT api/products/:id
router.post("/", requireToken, isAdmin, async (req, res, next) => {
  try {
    const productJson = req.body;
    const newProduct = await Product.create(productJson);
    res.status(200).send(newProduct);
  } catch (error) {
    console.log("PUT product ERROR-->", error);
    next(error);
  }
});


router.put("/", requireToken, isAdmin, async (req, res, next) => {
  try {
    const { productJson, id } = req.body;
    const product = await Product.findByPk(id);
    const updatedProduct = await product.update(productJson);
    res.status(200).send(updatedProduct);
  } catch (error) {
    console.log("PUT product ERROR-->", error);
    next(error);
  }
});

module.exports = router;
