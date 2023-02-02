import React,{useState, useEffect} from 'react';

const Products = () => {
  const [products, setProducts ] = useState([])

 useEffect(() => {
const getProducts = async () => {
  try{
  const res = await fetch(`http://localhost:5000/api/products/get-all`)
  const data = await res.json()
  setProducts(data)
  }catch(error){
 console.log(error)
  }
}
getProducts()
 }, [])

  return (
    <div className="products-wrapper grid grid-cols-[repeat(auto-fill,_155px)] gap-4 ">
      {products && products.map((item) => (
        <div className="products-item border hover:shadow-lg cursor-pointer transition-all select-none">
        <div className="products-img">
          <img
            className="h-28 object-cover w-full border-b"
            src={item.img}
            alt=""
          />
        </div>
        <div className="products-info flex flex-col p-3">
          <span className="font-bold">{item.title}</span>
          <span>{item.price}₺</span>
        </div>
      </div>
      ))}
    </div>
  );
};

export default Products;
