import React from 'react';
import { addProduct } from '../../redux/cartSlice';
import { useDispatch, useSelector } from 'react-redux';

const ProductItem = ({ item }) => {
  const cart = useSelector((state) => state.cart)
  const dispatch = useDispatch();
  
  const handleClick = () =>{
    dispatch(addProduct(item))
  }
 
  console.log(cart.cartItems.length)

  return (
    <div className="products-item border shadow-xl cursor-pointer transition-all select-none" onClick={handleClick}>
      <div className="products-img">
        <img
          className="h-28 object-contain  w-full border-b"
          src={item.img}
          alt=""
        />
      </div>
      <div className="products-info flex flex-col p-3">
        <span className="font-bold">{item.title}</span>
        <span>{item.price}₺</span>
      </div>
    </div>
  );
};

export default ProductItem;
