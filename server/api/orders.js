const router = require("express").Router();
const { Product } = require("../db");
const { requireToken } = require("./gatekeepingMiddleware");

router.get('/', async(req, res,next)=>{
  
})

module.exports = router
