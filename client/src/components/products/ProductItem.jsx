import React from 'react';
import { addProduct } from '../../redux/cartSlice';
import { useDispatch } from 'react-redux';

const ProductItem = ({ item }) => {
  const dispatch = useDispatch();
  
  const handleClick = () => {
    dispatch(addProduct({ ...item, quantity: 1 }));
  };


 

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
