import React from 'react'
import Header from '../components/header/Header'
import Categories from '../components/categories/Categories'
import Products from '../components/products/Products'
import CartTotals from '../components/cart/CartTotals'

const HomePage = () => {
  return (
    <>
    <Header/>
      <div className="home px-6 flex flex-col md:flex-row justify-between gap-8 md:pb-0 pb-24">
        <div className="categories overflow-auto custom-horizontal-scrollbar max-h-[calc(100vh_-_103px)] md:pb-20">
          <Categories />
        </div>
        <div className="products flex-[8] overflow-auto max-h-[calc(100vh_-_103px)] md:pb-[81px] pb-0">
          <Products />
        </div>
        <div className="cart-wrapper min-w-[300px] md:-mr-[24px] md:-mt-[24px] border">
          <CartTotals />
        </div>
      </div>
    </>
  )
}

export default HomePage