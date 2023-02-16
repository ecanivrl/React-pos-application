import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/header/Header';
import { Button, Input, Space, Spin, Table, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import Highlighter from 'react-highlight-words';
import {  SearchOutlined } from '@ant-design/icons';

const CustomerPage = () => {
  const naigate = useNavigate();
  const [billItems, setBillItems] = useState();
  const [status, setStatus] = useState(false);
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

  const Gonder = () => {
    message.success('Hade istatistiklere bakalım');
    setTimeout(() => {
      naigate('/statistic');
    }, 1100);
  };

  const columns = [
    {
      title: 'Müşteri Adı',
      dataIndex: 'customerName',
      key: 'customerName',
      ...getColumnSearchProps('customerName'),
      render: (text) => (
        <div
        key={text._id}
          className="flex justify-between items-center gap-x-5 relative"
        >
          <span>{text}</span>
          <div
            className="w-5 h-5 bg-red-500 rounded-full cursor-pointer"
            onClick={Gonder}
            onMouseMove={() => {
              setStatus(true);
            }}
            onMouseLeave={() => {
              setStatus(false);
            }}
          >
            {status && (
              <div className="absolute top-0 right-0 bg-green-200 rounded-md p-2">
                <p className="text-xs text-green-400">İstatistiklere Git</p>
              </div>
            )}
          </div>
        </div>
      ),
    },
    {
      title: 'Telefon Numarası',
      dataIndex: 'customerPhoneNumber',
      key: 'customerPhoneNumber',
      ...getColumnSearchProps('customerPhoneNumber'),
    },
    {
      title: 'İşlem Tarihi',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      render: (text) => <span>{new Date(text).toLocaleDateString(0 , 10)}</span>,
    },
    {
      title: 'İşlem Saati',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => <span>{new Date(text).toLocaleTimeString()}</span>,
    },
    {
      title: 'İşlem Tutarı',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      sorter: (a, b) => a.totalAmount - b.totalAmount,
      ...getColumnSearchProps('totalAmount'),
      render: (text) => <span>{text.toFixed(2)}₺</span>,
    },
  ];

  return (
    <>
      <Header />
      <h1 className="text-4xl font-bold text-center mb-4">Müşterilerim</h1>
      {billItems ? (
        <div className="px-6">
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
    </>
  );
};

export default CustomerPage;
