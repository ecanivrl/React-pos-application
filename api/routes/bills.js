const Bill = require("../models/Bill.js");
const express = require("express");
const router = express.Router();


// !CREATE
router.post("/add-bill", async (req,res) => {
  try{ 
   const newBill = new Bill(req.body);
   await newBill.save();
   res.status(200).json("Item added successfully")
  }catch(error){
    res.status(400).json(error)
  }
})


module.exports = router;