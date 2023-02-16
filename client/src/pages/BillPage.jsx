import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/header/Header';
import { Button, Input, Space, Spin, Table } from 'antd';
import PrintBill from '../components/bills/PrintBill';
import Highlighter from 'react-highlight-words';
import {  SearchOutlined } from '@ant-design/icons';


const BillPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [billItems, setBillItems] = useState();
  const [customer, setCustomer] = useState();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });


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
      ...getColumnSearchProps('customerName'),
      render: (text) => <span className="text-xs">{text}</span>,
    },
    {
      title: 'Telefon Numarası',
      dataIndex: 'customerPhoneNumber',
      key: 'customerPhoneNumber',
      ...getColumnSearchProps('customerPhoneNumber'),
    },
    {
      title: 'Oluşturma Tarihi',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      render: (text) => <span>{new Date(text).toLocaleDateString()}</span>,
    },
    {
      title: 'Ödeme Şekli',
      dataIndex: 'paymentMode',
      key: 'paymentMode',
      ...getColumnSearchProps('paymentMode'),
    },
    {
      title: 'Toplam Fiyat',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      sorter: (a, b) => a.totalAmount - b.totalAmount,
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
      <h1 className="text-4xl font-bold text-center mb-4">Faturalar</h1>
      {billItems ? (
        <div className="px-6 pb-0">
        <div className="categories overflow-auto custom-horizontal-scrollbar w-full h-[500px] pb-10">
          <Table
            className="ecani pb-2 custom-horizontal-scrollbar overflow-auto min-w-[700px] rounded-md "
            dataSource={billItems}
            columns={columns}
            bordered
            pagination={false}
            rowKey={(record) => record._id}
          />
        </div>
      </div>
      ):(
        <div className='flex justify-center items-center h-screen'>
        <Spin size='large'/>
      </div>
      )}
      <PrintBill setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} customer={customer} />
    </>
  );
};

export default BillPage;
