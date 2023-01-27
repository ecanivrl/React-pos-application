const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    {
        title:{type:String, required:true},
        img:{type:String, required:true},
        price:{type:Number, required:true},
        category:{type:Number, required:true},
    },
    {timestamps:true}
)

const Product = mongoose.model('products', ProductSchema);
module.exports = Product;