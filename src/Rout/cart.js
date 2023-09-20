const express = require('express');
const cartRoute = express.Router();
const {addToCart}= require("../Controllers/cart")
const {getToCart}= require("../Controllers/cart")
const {updateToCart}= require("../Controllers/cart")
const {deleteCart}= require("../Controllers/cart")

cartRoute.route('/panier/:id').post(addToCart);
cartRoute.route('/panier/:id').get(getToCart);
cartRoute.route('/panier/:id').put(updateToCart);
cartRoute.route('/panier/:id').delete(deleteCart);


module.exports = cartRoute 