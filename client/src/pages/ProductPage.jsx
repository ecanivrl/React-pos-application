import React from 'react'
import Header from '../components/header/Header'
import Edit from '../components/products/Edit'

const ProductPage = () => {
  return (
    <>
    <Header/>
      <div className='px-6'>
        <h1 className='text-4xl font-bold text-center mb-4'>Ürünler</h1>
        <div className='categories overflow-auto custom-horizontal-scrollbar w-full'>
      <Edit/>
        </div>
      </div>
    </>
  )
}

export default ProductPage
