const Category = require("../models/Category.js");
const express = require("express");
const router = express.Router();


router.get("/get-all", async (req,res)=>{
  try{
    const categories = await Category.find()
    res.status(200).json(categories)
  }catch(error){
    res.status(400).json(error)
  }
})


router.post("/add-category", async (req,res) => {
  try{ 
   const newCategory = new Category(req.body);
   await newCategory.save();
   res.status(200).json("Item added successfully")
  }catch(error){
    res.status(400).json(error)
  }
})

module.exports = router;