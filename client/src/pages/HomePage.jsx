import React, { useState, useEffect } from 'react';
import Header from '../components/header/Header';
import Categories from '../components/categories/Categories';
import Products from '../components/products/Products';
import CartTotals from '../components/cart/CartTotals';
import { Spin } from 'antd';

const HomePage = () => {
  const [categories, setCategories] = useState();
  const [products, setProducts] = useState();
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/categories/get-all");
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
        const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/products/get-all");
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
      <Header search={search} setSearch={setSearch} />
      {products && categories ? (
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
              search={search}
            />
            <div className='md:hidden border border-gray-500'>
              <CartTotals className="" />
            </div>
          </div>
          <div className="cart-wrapper min-w-[325px] md:-mr-[24px] md:-mt-[24px] border max-md:hidden">
            <CartTotals />
          </div>
        </div>
      ) : (
        <div className='flex justify-center items-center h-screen'>
          <Spin size='large' />
        </div>
      )}
    </>
  );
};

export default HomePage;
