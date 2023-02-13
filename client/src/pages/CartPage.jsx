import React, { useState } from 'react';
import { Button, Card, Popconfirm, Table, message } from 'antd';
import CreateBill from '../components/cart/CreateBill';
import Header from '../components/header/Header';
import { increase, decrease, deleteCart } from '../redux/cartSlice';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { SmileTwoTone } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const columns = [
    {
      title: 'Ürün Görseli',
      dataIndex: 'img',
      key: 'img',
      width: '125px',
      render: (img) => (
        <div className="flex justify-center items-center mx-auto">
          <img
            src={img}
            alt=""
            className="md:w-24 md:h-24 h-10 w-10 rounded-full object-cover cursor-pointer"
          />
        </div>
      ),
    },
    {
      title: 'Ürün Adı',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Kategori',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Ürün Fiyatı',
      dataIndex: 'price',
      key: 'price',
      render: (price) => <span className="font-bold">{price}₺</span>,
    },
    {
      title: 'Ürün Adedi',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity, record) => (
        <div className="flex items-center ">
          <Button
            onClick={() => {
              dispatch(increase(record));
              message.success(
                `${
                  record.title
                }  isimli Ürün Sepete 1 Adet Daha Eklendi, toplam: ${
                  record.quantity + 1
                } adet oldu`
              );
            }}
            type="primary"
            size="small"
            className="w-full flex items-center justify-center !rounded-full"
            icon={<PlusCircleOutlined />}
          />
          <span className="font-bold w-6 inline-block text-center">
            {record.quantity}
          </span>
          <Button
            onClick={() => {
              if (record.quantity === 1) {
                dispatch(decrease(record));
                message.success(
                  `${record.title} adlı ürün sepetinizden silindi`
                );
              }
              if (record.quantity > 1) {
                dispatch(decrease(record));
                message.success(`${
                  record.title
                }  isimli Ürün Sepetten 1 Adet Daha Silindi 
                toplam: ${record.quantity - 1} adet kaldı`);
              }
            }}
            type="primary"
            size="small"
            className="w-full flex items-center justify-center !rounded-full"
            icon={<MinusCircleOutlined />}
          />
        </div>
      ),
    },
    {
      title: 'Toplam Fiyat',
      render: (price, record) => (
        <span className="font-bold">
          {(record.quantity * record.price).toFixed(2)}₺
        </span>
      ),
    },
    {
      title: 'Actions',
      render: (_, record) => (
        <Popconfirm
          onConfirm={() => {
            dispatch(deleteCart(record));
            message.success(`${record.title} adlı ürün sepetinizden silindi`);
          }}
          title="Silmek İstediğinize Emin  misiniz?"
          okText="Evet"
          cancelText="Hayır"
        >
          <Button type="link" danger>
            Sil
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <>
      <Header />
      <div className="px-6 sm:pb-20 pb-0">
        <h1 className="text-3xl font-bold text-center pb-5">Sepet Detay</h1>
        <div className="flex flex-row gap-4 max-[1000px]:flex-col">
          {cart.cartItems.length > 0 ? (
            <Table
              className="ecani custom-horizontal-scrollbar overflow-auto w-full max:h-[540px]  max-[1000px]:h-80 border  rounded-md"
              dataSource={cart.cartItems}
              columns={columns}
              bordered
              pagination={false}
            />
          ) : (
            <div className='w-full h-96 flex justify-center items-center'>
              <Link to={"/"}>
              <div className="flex flex-col justify-center gap-5 items-center border-red-500 border sm:p-20 p-10 rounded-xl">
              <h1 className="sm:text-5xl text-2xl font-bold text-red-600">sepet boş</h1>
              <h1 className="text-2xl font-bold text-green-600">Alışverişe Git</h1>
            </div>
              </Link>
            </div>
          )}

         {cart.cartItems.length > 0 && (
           <div className="cart-total flex justify-end">
           <Card className="md:w-72 w-full h-52">
             <div className="flex justify-between">
               <span>Ara Toplam</span>
               <span>{cart.total > 0 ? cart.total.toFixed(2) : 0}₺</span>
             </div>
             <div className="flex justify-between py-2">
            <b>KDV %{cart.tax}</b>
            <span className="text-red-500">
              +
              {(cart.total * cart.tax) / 100 > 0
                ? ((cart.total * cart.tax) / 100).toFixed(2)
                : 0}
              ₺
            </span>
          </div>
          <div className="flex justify-between">
            <b className="text-green-500 sm:text-xl text-lg">Net Tutar</b>
            <span className="text-xl">
              {cart.total + (cart.total * cart.tax) / 100 > 0 ? (
                (cart.total + (cart.total * cart.tax) / 100).toFixed(2)
              ) : (
                <span>0.00</span>
              )}
              ₺
            </span>
          </div>
         
             <Button
               onClick={() => setIsModalOpen(true)}
               type="primary"
               className="mt-4 w-full"
               size="large"
             >
               Sipariş Oluştur
             </Button>
             <Link to={"/"}>
            <div className='text-red-500 text-center mt-1 w-full'>Yeni ürünler İçin Magazaya Git</div>
          </Link>
           </Card>
         </div>
         )}
        </div>
      </div>
      <CreateBill setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />
    </>
  );
};

export default CartPage;
