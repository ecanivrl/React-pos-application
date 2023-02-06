import React from 'react';
import { addProduct } from '../../redux/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';

const ProductItem = ({ item }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const handleClick = () => {
    dispatch(addProduct({ ...item, quantity: 1 }));
    if (cart.cartItems.find((cartItem) => cartItem._id === item._id)) {
      message.success('Sepete aynı üründen 1 adet daha  Eklendi');
    } else {
      message.success('Ürün Sepete  Eklendi');
    }
  };

  return (
    <div
      className="products-item border shadow-xl cursor-pointer transition-all select-none"
      onClick={handleClick}
    >
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
