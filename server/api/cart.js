const router = require('express').Router()
const { Cart , Product , User , Order } = require('../db')

router.get('/', async (req,res, next)=>{
    try{
        const userId = req.headers.userid //may need to change to camel case
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



module.exports = router