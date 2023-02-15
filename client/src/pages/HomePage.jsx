import React, { useState, useEffect } from 'react';
import Header from '../components/header/Header';
import Categories from '../components/categories/Categories';
import Products from '../components/products/Products';
import CartTotals from '../components/cart/CartTotals';

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);


  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/categories/get-all');
        const data = await res.json();
        data &&
          setCategories(
            data.map((item) => {
              return { ...item, value: item.title };
            })
          );
      } catch (err) {
        console.log(err);
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/get-all`);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  return (
    <>
      <Header />
      <div className="home px-6 flex flex-col md:flex-row justify-between gap-3 md:pb-0 pb-24">
        <div className="categories overflow-auto custom-horizontal-scrollbar max-h-[calc(100vh_-_103px)] md:pb-7">
          <div className="pb-1">
            <Categories
              categories={categories}
              setCategories={setCategories}
              setFiltered={setFiltered}
              products={products}
            />
          </div>
        </div>
        <div className="products flex-[8] overflow-auto max-h-[calc(100vh_-_103px)] pb-44 md:pb-11">
          <Products
            categories={categories}
            filtered={filtered}
            products={products}
            setProducts={setProducts}
          />
        </div>
        <div className="cart-wrapper min-w-[300px] md:-mr-[24px] md:-mt-[24px] border">
          <CartTotals />
        </div>
      </div>
    </>
  );
};

export default HomePage;
