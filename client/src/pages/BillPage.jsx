import React, { useState, useEffect } from 'react';
import Header from '../components/header/Header';
import { Button, Table } from 'antd';
import PrintBill from '../components/bills/PrintBill';

const BillPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [billItems, setBillItems] = useState()

  useEffect(() => {
    const getBillItems = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/bills/get-all`);
        const data = await res.json();
        setBillItems(data);
      } catch (error) {
        console.log(error);
      }
    };
    getBillItems();
  }, []);



  const columns = [
    {
      title: 'Müşteri Adı',
      dataIndex: 'customerName',
      key: 'customerName',
      render: (text) => <span className='text-xs'>{text}</span>,
    },
    {
      title: 'Telefon Numarası',
      dataIndex: 'customerPhoneNumber',
      key: 'customerPhoneNumber',
    },
    {
      title: 'Oluşturma Tarihi',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => <span>{new Date(text).toLocaleDateString()}</span>,
    },
    {
      "title": "Sipariş Edilen Ürün",
      "dataIndex": "productTitle",
      "key": "productTitle",
    },
   
    {
      title: "Ödeme Şekli",
      dataIndex: "paymentMode",
      key: "paymentMode",
    },
    {
      title: 'Toplam Fiyat',
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (text) => <span className='font-bold'>{text} ₺</span>,
    },
    {
      title: 'İşlemler',
      dataIndex: 'actions',
      key: 'actions',
      render: (text, record) => (
        <div className='flex justify-center'>
          <Button
            onClick={() => setIsModalOpen(true)}
            type="primary"  
            className="mr-2"
            size="small"
          >
            Yazdır
          </Button>
        </div>
      ),
    }
   
  ];

  return (
    <>
      <Header />
      <div className="px-6">
        <h1 className='text-4xl font-bold text-center mb-4'>Faturalar</h1>
        <Table
          dataSource={billItems}
          columns={columns}
          bordered
          pagination={false}
        />
        
      </div>
     <PrintBill setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen}/>
    </>
  );
};

export default BillPage;
