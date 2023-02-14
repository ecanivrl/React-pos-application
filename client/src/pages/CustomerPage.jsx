import React,{useState, useEffect} from 'react';
import Header from '../components/header/Header';
import { Table } from 'antd';

const CustomerPage = () => {

  const [billItems, setBillItems] = useState([])

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
    },
    {
      title: 'Telefon Numarası',
      dataIndex: 'customerPhoneNumber',
      key: 'customerPhoneNumber',
    },
    {
      title: 'İşelem Tarihi',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => <span>{new Date(text).toLocaleDateString()}</span>,
    },
    {
      title: 'İşlem Saati',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => <span>{new Date(text).toLocaleTimeString()}</span>,
    },
    {
      title: "İşlem Tutarı",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (text) => <span>{text.toFixed(2)}₺</span>,
    }
  ];

  return (
    <>
      <Header />
      <div className="px-6">
        <h1 className='text-4xl font-bold text-center mb-4'>Müşterilerim</h1>
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
    </>
  );
};

export default CustomerPage;
