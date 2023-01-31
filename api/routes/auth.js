const User = require("../models/User.js");
const router = require("express").Router();
const bcryptjs = require("bcryptjs");


// !Register Create User 
router.post("/register", async (req,res) => {
  try{
    const {username, email, password} = req.body;
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });
    await newUser.save();
    res.status(200).json("A new user created successfully")
  }catch(error){
    res.status(400).json(error)
  }
})



module.exports = router;