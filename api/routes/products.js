const Product = require("../models/Product.js");
const express = require("express");
const router = express.Router();

//! get all Product
router.get("/get-all", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
  }
});



module.exports = router;