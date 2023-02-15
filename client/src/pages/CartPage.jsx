import React, { useRef, useState } from 'react';
import { Button, Card, Input, Popconfirm, Space, Table, message } from 'antd';
import CreateBill from '../components/cart/CreateBill';
import Header from '../components/header/Header';
import { increase, decrease, deleteCart } from '../redux/cartSlice';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

const CartPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
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
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
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
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
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
      ...getColumnSearchProps('title'),
    },
    {
      title: 'Kategori',
      dataIndex: 'category',
      key: 'category',
      ...getColumnSearchProps('category'),
    },
    {
      title: 'Ürün Fiyatı',
      dataIndex: 'price',
      key: 'price',
      render: (text) => <span className="font-bold">{text.toFixed(2)}₺</span>,
      sorter: (a, b) => a.price - b.price,
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
      <div className="px-6">
        <h1 className="text-3xl font-bold text-center pb-5">Sepet Detay</h1>
        <div className="flex flex-row gap-4 max-[1000px]:flex-col ecani max-h-[610px] custom-horizontal-scrollbar overflow-auto pb-16">
          {cart.cartItems.length > 0 ? (
           <div className='categories overflow-auto custom-horizontal-scrollbar w-full pb-2'>
             <Table
              className="ecani custom-horizontal-scrollbar overflow-auto min-w-[700px] rounded-md"
              dataSource={cart.cartItems}
              columns={columns}
              bordered
              pagination={false}
            />
           </div>
          ) : (
            <div className="w-full h-96 flex justify-center items-center">
              <Link to={'/'}>
                <div className="flex flex-col justify-center gap-5 items-center border-red-500 border sm:p-20 p-10 rounded-xl">
                  <h1 className="sm:text-5xl text-2xl font-bold text-red-600">
                    sepet boş
                  </h1>
                  <h1 className="text-2xl font-bold text-green-600">
                    Alışverişe Git
                  </h1>
                </div>
              </Link>
            </div>
          )}

          {cart.cartItems.length > 0 && (
            <div className="cart-total flex justify-end">
              <Card className="w-72 max-[1000px]:w-full h-52 bg-gray-100">
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
                  disabled={cart.cartItems.length === 0}
                >
                  Sipariş Oluştur
                </Button>
                <Link to={'/'}>
                  <div className="text-red-500 text-center mt-1 w-full">
                    Yeni ürünler İçin Magazaya Git
                  </div>
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
