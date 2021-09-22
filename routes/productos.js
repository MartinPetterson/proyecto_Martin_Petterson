var express = require('express');
var router = express.Router();
var productosModel = require('../modelos/productosModel')
/* GET home page. */
router.get('/', async function(req, res, next) {
  productos = await productosModel.getproductos();
  res.render('productos',{

  productos
  });
});

module.exports = router;
