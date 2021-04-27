const router = require("express").Router();
const { Cart, Product, User, Order } = require("../db");
const { requireToken } = require("./gatekeepingMiddleware");

router.get("/", requireToken, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const productsInCart = await Cart.findAll({
      where: {
        isPurchased: false,
        userId: userId,
      },
    });
    async function getProductInfo(productId) {
      const productInfo = await Product.findByPk(productId);
      return productInfo;
    }
    const cartInfo = [];
    for (let i = 0; i < productsInCart.length; i++) {
      const productId = productsInCart[i].productId;
      const product = await getProductInfo(productId);
      const cartId = productsInCart[i].id;
      const quantityInCart = productsInCart[i].quantity;
      cartInfo.push({ product, cartId, quantityInCart });
    }
    res.send(cartInfo);
  } catch (error) {
    next(error);
  }
});

//POST /api/cart
router.post("/", requireToken, async (req, res, next) => {
  try {
    const productId = req.body.productId;
    const newCartItem = await Cart.create({ isPurchased: false });
    await newCartItem.setUser(req.user);
    await newCartItem.setProduct(await Product.findByPk(productId));
    res.send(newCartItem);
  } catch (error) {
    next(error);
  }
});

//PUT /api/cart/
router.put("/", requireToken, async (req, res, next) => {
  try {
    const cartId = req.body.cartId;
    const quantity = req.body.quantity;
    const cart = await Cart.findByPk(cartId);
    await cart.update({
      quantity: quantity,
    });
    res.send(cart);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/cart/:id
router.delete("/:id", requireToken, async (req, res, next) => {
  try {
    const cart = await Cart.findAll({
      where: {
        isPurchased: false,
        productId: req.params.id,
        userId: req.user.id,
      },
    });
    await cart[0].destroy();
    res.send(cart[0]);
  } catch (error) {
    next(error);
  }
});

// PUT /api/cart/checkout/
router.put("/checkout", requireToken, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const newOrder = await Order.create();
    await newOrder.setUser(await User.findByPk(userId));
    const orderId = newOrder.id;
    let totalCost = 0;
    const { cart } = req.body;
    for (let item of cart) {
      totalCost += item.product.price * item.quantityInCart;
      const cartLineItem = await Cart.findOne({
        where: { id: item.cartId },
        include: [Product],
      });
      console.log();
      const cartUpdate = {
        isPurchased: true,
        quantity: item.quantityInCart,
        orderId,
      };
      await cartLineItem.update(cartUpdate);
      const product = await Product.findByPk(item.product.id);
      await product.update({ stock: product.stock - item.quantityInCart });
    }
    totalCost = totalCost;
    await newOrder.update({ totalCost });
    res.status(200).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
