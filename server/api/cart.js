const router = require('express').Router()
const { Cart , Product , User , Order } = require('../db')
const { requireToken } = require('./gatekeepingMiddleware');

router.get('/', requireToken, async (req,res, next)=>{
    try{
        const userId = req.user.id
        const productsInCart = await Cart.findAll({
            where: {
                isPurchased: false,
                userId: userId,
            }
        });
        async function getProductInfo(productId){
            const productInfo = await Product.findByPk(productId);
            return productInfo;
        }
        const cartInfo = [];
        for(let i = 0; i < productsInCart.length; i++){
            const productId = productsInCart[i].productId;
            const product = await getProductInfo(productId);
            cartInfo.push(product);
        }
        res.send(cartInfo);
    }catch (error){
        next(error)
    }
  })

router.post('/', requireToken, async (req, res, next) => {
    try {
        const productId = req.body.productId;
        const newCartItem = await Cart.create({ isPurchased: false});
        await newCartItem.setUser(req.user);
        await newCartItem.setProduct(await Product.findByPk(productId));
        res.send(newCartItem);
    } catch (error) {
        next(error)
    }
})

module.exports = router