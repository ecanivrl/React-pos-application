import React, { useState, useEffect } from 'react';
import ProductItem from './ProductItem';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import Add from './Add';
import { useNavigate } from 'react-router-dom';

const Products = ({ categories }) => {
  const [products, setProducts] = useState([]);
  const [isAddModalOpen, setAddIsModalOpen] = useState(false);
  const navigate = useNavigate();
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
    <div className="products-wrapper grid grid-cols-[repeat(auto-fill,_155px)] gap-4 ">
      {products &&
        products.map((item) => <ProductItem item={item} key={item._id} />)}
      <div
        className="products-item min-h-[180px] border shadow-lg cursor-pointer transition-all select-none bg-purple-500
      flex justify-center items-center"
        onClick={() => setAddIsModalOpen(true)}
      >
        <PlusOutlined className="sm:text-3xl text-lg text-white hover:opacity-90" />
      </div>
      <div
      onClick={() => navigate('/products')}
        className="products-item min-h-[180px] border shadow-lg cursor-pointer transition-all select-none bg-orange-500
      flex justify-center items-center"
      >
        <EditOutlined className="sm:text-3xl text-lg text-white hover:opacity-90" />
      </div>
      <Add
        isAddModalOpen={isAddModalOpen}
        setAddIsModalOpen={setAddIsModalOpen}
        categories={categories}
        products={products}
        setProducts={setProducts}
      />
    </div>
  );
};

export default Products;
