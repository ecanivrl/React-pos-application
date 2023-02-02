import React from 'react';

const ProductItem = ({ item }) => {
  return (
    <div className="products-item border shadow-xl cursor-pointer transition-all select-none ">
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
