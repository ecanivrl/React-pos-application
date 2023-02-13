import React, { useState } from 'react';
import { Button, Card, Popconfirm, Table, message } from 'antd';
import CreateBill from '../components/cart/CreateBill';
import Header from '../components/header/Header';
import { increase, decrease, deleteCart } from '../redux/cartSlice';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';

const CartPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const columns = [
    {
      title: 'Üürün Görseli',
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
              message.success(`${record.title}  isimli Ürün Sepete 1 Adet Daha Eklendi, toplam: ${record.quantity + 1} adet oldu`);
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
                message.success(`${record.title} adlı ürün sepetinizden silindi`);
              }
              if (record.quantity > 1) {
                dispatch(decrease(record));
                message.success(`${record.title}  isimli Ürün Sepetten 1 Adet Daha Silindi 
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
      <div className="px-6">
        <h1 className="text-3xl font-bold text-center pb-5">Sepet Detay</h1>
        <Table
          className="ecani overflow-auto w-full max-h-[340px] border  rounded-md"
          dataSource={cart.cartItems}
          columns={columns}
          bordered
          pagination={false}
        />
        <div className="cart-total flex justify-end mt-4">
          <Card className="md:w-72 w-full">
            <div className="flex justify-between">
              <span>Ara Toplam</span>
              <span>549.00₺</span>
            </div>
            <div className="flex justify-between my-2">
              <span>Ara Toplam</span>
              <span className="text-red-600">43.92₺</span>
            </div>
            <div className="flex justify-between">
              <b>Toplam</b>
              <b>592.92₺</b>
            </div>
            <Button
              onClick={() => setIsModalOpen(true)}
              type="primary"
              className="mt-4 w-full"
              size="large"
            >
              Sipariş Oluştur
            </Button>
          </Card>
        </div>
      </div>
      <CreateBill setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />
    </>
  );
};

export default CartPage;
