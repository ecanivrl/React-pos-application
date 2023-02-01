import React, { useState, useEffect } from 'react';
import Header from '../components/header/Header';
import Categories from '../components/categories/Categories';
import Products from '../components/products/Products';
import CartTotals from '../components/cart/CartTotals';

const HomePage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/categories/get-all');
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.log(err);
      }
    };
    getCategories();
  }, []);

  return (
    <>
      <Header />
      <div className="home px-6 flex flex-col md:flex-row justify-between gap-8 md:pb-0 pb-24 ">
        <div className="categories overflow-auto custom-horizontal-scrollbar max-h-[calc(100vh_-_103px)] md:pb-7">
          <div className="pb-1">
            <Categories categories={categories} setCategories={setCategories} />
          </div>
        </div>
        <div className="products flex-[8] overflow-auto max-h-[calc(100vh_-_103px)] md:pb-12 pb-0 ">
          <Products />
        </div>
        <div className="cart-wrapper min-w-[300px] md:-mr-[24px] md:-mt-[24px] border max-[380px]">
          <CartTotals />
        </div>
      </div>
    </>
  );
};

export default HomePage;
