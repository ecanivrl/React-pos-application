import React, { useState, useEffect } from 'react';
import Header from '../components/header/Header';
import { Button, Table } from 'antd';
import PrintBill from '../components/bills/PrintBill';

const BillPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [billItems, setBillItems] = useState();
  const [customer, setCustomer] = useState();


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
      render: (text) => <span className="text-xs">{text}</span>,
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
      title: 'Ödeme Şekli',
      dataIndex: 'paymentMode',
      key: 'paymentMode',
    },
    {
      title: 'Toplam Fiyat',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (text) => <span className="font-bold">{text} ₺</span>,
    },
    {
      title: 'İşlemler',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record) => (
        <div className="flex justify-center">
          <Button
            onClick={() => {
              setIsModalOpen(true);
              setCustomer(record);
            }}
            type="primary"
            className="mr-2"
            size="small"
          >
            Yazdır
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Header />
      <div className="px-6 pb-0">
        <h1 className="text-4xl font-bold text-center mb-4">Faturalar</h1>
        <div className="categories overflow-auto custom-horizontal-scrollbar w-full h-[500px] pb-10">
          <Table
            className="ecani pb-2 custom-horizontal-scrollbar overflow-auto min-w-[700px] rounded-md "
            dataSource={billItems}
            columns={columns}
            bordered
            pagination={false}
          />
        </div>
      </div>
      <PrintBill setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} customer={customer}/>
    </>
  );
};

export default BillPage;
